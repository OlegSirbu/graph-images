import React, { useState, useEffect, Suspense } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import { map, uniqBy } from "lodash";
import { Waypoint } from "react-waypoint";
import { Link } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  LikeImage as LikeImageMutation,
  UnlikeImage as UnlikeImageMutation
} from "queries/images.graphql";
import { Images as ImagesQuery } from "queries/images.graphql";
import {
  Alignment,
  Button,
  Icon,
  InputGroup,
  Navbar as BlueprintNavbar,
  Spinner
} from "@blueprintjs/core";

import { Container, ImageCard, Navbar } from "ui-kit";

import {
  selectImageSearch,
  setPage,
  setImages,
  setPageScrollPosition,
  selectState,
  saveImageIds,
  applySearch
} from "modules/image/image";

import logoImage from "images/logo.svg";
import classes from "./List.scss";
import appClasses from "styles/app.scss";

import useDebounce from "../../hooks/useDebounce";
import useImages from "../../hooks/useImages";
import PopoverMenu from "../../components/PopoverMenu";
import LoginDialog from "../../components/LoginDialog";

const mapStateToProps = state => ({
  searchValue: selectImageSearch(state),
  images: selectState(state).images,
  page: selectState(state).page,
  perPage: selectState(state).perPage,
  pageScrollPosition: selectState(state).pageScrollPosition
});

const actions = {
  saveImageIds,
  applySearch,
  setPage,
  setImages,
  setPageScrollPosition
};

const List = ({
  page,
  setPage,
  perPage,
  images,
  setImages,
  pageScrollPosition,
  setPageScrollPosition,
  applySearch,
  searchValue,
  saveImageIds,
  history
}) => {
  const handleSearch = searchValue => {
    applySearch(searchValue);
  };

  const handlerLogin = e => {
    e.preventDefault();
    setIsShowLoginForm(true);
  };

  const handlerSetUserName = name => {
    localStorage.setItem("user_name", name);
    setUserName(name);
  };

  const handlerLogOut = () => {
    localStorage.removeItem("user_name");
    setUserName(null);
  };

  const handlerLike = ({ variables, likes }) => {
    likes > 0
      ? handlerUnLikeImage({ variables })
      : handlerLikeImage({ variables });
  };

  const updateCacheWithLike = (cache, imageLiked) => {
    images.forEach(img => {
      if (imageLiked.id === img.id) {
        img.likes = imageLiked.likes;
      }
    });

    setImages(images);

    cache.writeQuery({
      query: ImagesQuery,
      data: {
        images: {
          data: images
        }
      }
    });
  };

  const [handlerLikeImage] = useMutation(LikeImageMutation, {
    update(cache, { data: { likeImage } }) {
      updateCacheWithLike(cache, likeImage);
    }
  });

  const [handlerUnLikeImage] = useMutation(UnlikeImageMutation, {
    update(cache, { data: { unlikeImage } }) {
      updateCacheWithLike(cache, unlikeImage);
    }
  });

  const handlerClickImage = id => {
    history.push(`images/${id}`);
    setPageScrollPosition(document.scrollingElement.scrollTop);
  };

  if (pageScrollPosition) {
    document.scrollingElement.scrollTop = pageScrollPosition;
  }

  const delay = searchValue === "" ? 0 : 2000;
  const { loading: loadingInput, debouncedValue } = useDebounce(
    searchValue,
    delay
  );

  const { loading, error, data, fetchMore } = useQuery(ImagesQuery, {
    variables: {
      search: debouncedValue,
      page: page,
      perPage: perPage,
      source: "unsplash"
    },
    fetchPolicy: "cache-and-network"
  });

  // const { loading, error, imagesData } = useImages(
  //   debouncedValue,
  //   page,
  //   perPage
  // );

  // const getAllImages = () => {
  //   return uniqBy([...images, ...imagesData], "id");
  // };

  // useEffect(() => {
  //   const allImages = getAllImages();
  //   // set images by search result
  //   if (searchValue !== "") {
  //     setImages(imagesData);
  //   } else if (imagesData.length > 0 && allImages) {
  //     // set images with scroll result
  //     setImages(allImages);
  //     saveImageIds(map(allImages, "id"));
  //   }
  // }, [imagesData]);

  const [user, setUserName] = useState(localStorage.getItem("user_name"));
  const [isShowLoginForm, setIsShowLoginForm] = useState(false);

  if (error) throw new Error(error);
  if (loading) return null;

  return (
    <>
      <Navbar>
        {isShowLoginForm && (
          <LoginDialog
            open={isShowLoginForm}
            setUserName={handlerSetUserName}
            handlerSetShowLoginDialog={setIsShowLoginForm}
          />
        )}
        <BlueprintNavbar.Group align={Alignment.LEFT}>
          <InputGroup
            leftIcon="search"
            onChange={({ target }) => {
              handleSearch(target.value);
            }}
            placeholder="Search..."
            rightElement={loadingInput && <Spinner size={Spinner.SIZE_SMALL} />}
            value={searchValue}
          />
        </BlueprintNavbar.Group>
        <BlueprintNavbar.Group align={Alignment.CENTER}>
          <Link to="/">
            <img src={logoImage} />
          </Link>
        </BlueprintNavbar.Group>
        {user ? (
          <PopoverMenu user={user} handlerLogOut={handlerLogOut} />
        ) : (
          <BlueprintNavbar.Group align={Alignment.RIGHT}>
            <span className="bp3-text-small bp3-text-muted">
              Hello, stranger!
            </span>
            <BlueprintNavbar.Divider />
            <Link
              to="/images/new"
              className={appClasses.noUnderline}
              onClick={handlerLogin}
            >
              <Button
                icon={<Icon icon="add" iconSize={14} />}
                text="Add image"
              />
            </Link>
          </BlueprintNavbar.Group>
        )}
      </Navbar>
      <Container transparent>
        <div className={classes.list}>
          {data.images.data.map((image, index) => (
            <React.Fragment key={index}>
              <ImageCard
                key={image.id}
                likes={image.likes}
                imageId={image.id}
                imageURL={image.url.raw}
                title={image.author ? `@${image.author.username}` : "unknown"}
                subtitle={image.description}
                className={classes.item}
                handleClick={handlerClickImage.bind(this, image.id)}
                handlerLikeImage={handlerLike}
              />
              {index === data.images.data.length - 1 && (
                <Waypoint
                  onEnter={() => {
                    // setPage(page + 1);
                    fetchMore({
                      query: ImagesQuery,
                      variables: {
                        page: page + 1,
                        perPage: perPage,
                        cursor: data.images.data.length
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        debugger;
                        setPage(page + 1);
                        if (!fetchMoreResult) return prev.images.data;
                        return Object.assign({}, prev, {
                          data: [
                            ...prev.images.data,
                            ...fetchMoreResult.images.data
                          ]
                        });
                      }
                    });
                  }}
                />
              )}
            </React.Fragment>
          ))}
          {loading && <Spinner size={Spinner.SIZE_LARGE} />}
        </div>
      </Container>
    </>
  );
};

List.propTypes = {
  saveImageIds: PT.func.isRequired,
  setPage: PT.func,
  setImages: PT.func,
  setPageScrollPosition: PT.func,
  searchValue: PT.string,
  applySearch: PT.func
};

List.defaultProps = {
  searchValue: ""
};

export default connect(mapStateToProps, actions)(List);
