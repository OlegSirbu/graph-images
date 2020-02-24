import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { get, uniqBy } from "lodash";
import { Images } from "queries/images.graphql";

export default function useImages(search, page, perPage) {
  // const [images, setImages] = useState([]);

  // const compledHandler = data => {
  //   setImages(prevImages => {
  //     return [...prevImages, ...data.images.data];
  //   });
  // };

  const { loading, error, data, fetchMore } = useQuery(Images, {
    // onCompleted: compledHandler,
    variables: {
      search: search,
      page: page,
      perPage: perPage,
      source: "unsplash"
    }
  });

  // useEffect(() => {
  //   fetchMore({
  //     query: Images,
  //     variables: {
  //       page,
  //       perPage
  //     },
  //     updateQuery: (previousResult, { fetchMoreResult }) => {
  //       const typename = get(previousResult, "images.__typename", "");
  //       const oldImages = get(previousResult, "images.data", []);
  //       const newImages = get(fetchMoreResult, "images.data", []);
  //       const dataD = uniqBy([...oldImages, ...newImages], "id");

  //       return newImages.length && typename
  //         ? {
  //             images: {
  //               __typename: typename,
  //               data: dataD
  //             }
  //           }
  //         : previousResult;
  //     }
  //   });
  // }, [page]);

  // console.log("res", { data }, loading, error);

  return {
    imagesData: data ? data.images.data : [],
    loading,
    error
  };
}
