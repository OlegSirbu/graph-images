import { merge, findIndex } from "lodash";

export const IMAGE_KEY = "image";

const actions = {};
const initialState = {
  search: "",
  imageIds: [],
  images: [],
  page: 1,
  perPage: 4,
  pageScrollPosition: 0
};

// ------------------------------------
// Reducer
// ------------------------------------

const reducer = (state = initialState, action) => {
  const handler = actions[action.type];
  return handler ? handler(state, action) : state;
};

export default reducer;

// ------------------------------------
// Selectors
// ------------------------------------

export const selectState = state => state[IMAGE_KEY];
export const selectImageSearch = state => selectState(state).search;
export const selectPrevImageId = (state, currentId) => {
  const imageIds = selectState(state).imageIds;
  const currentImageIdIndex = findIndex(imageIds, id => id === currentId);
  return imageIds[currentImageIdIndex - 1];
};

export const selectNextImageId = (state, currentId) => {
  const imageIds = selectState(state).imageIds;
  const currentImageIdIndex = findIndex(imageIds, id => id === currentId);
  return imageIds[currentImageIdIndex + 1];
};

// ------------------------------------
// Actions
// ------------------------------------

const SAVE_IMAGE_IDS = `${IMAGE_KEY}/SAVE_IMAGE_IDS`;

export function saveImageIds(ids) {
  return {
    type: SAVE_IMAGE_IDS,
    payload: { ids }
  };
}

const SET_IMAGES = `${IMAGE_KEY}/SET_IMAGES`;

export function setImages(images) {
  return {
    type: SET_IMAGES,
    payload: { images }
  };
}

const SET_PAGE = `${IMAGE_KEY}/SET_PAGE`;

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: { page }
  };
}

const SET_PAGE_SCROLL_POSITION = `${IMAGE_KEY}/SET_PAGE_SCROLL_POSITION`;

export function setPageScrollPosition(pageScrollPosition) {
  return {
    type: SET_PAGE_SCROLL_POSITION,
    payload: { pageScrollPosition }
  };
}

actions[SAVE_IMAGE_IDS] = (state, { payload }) =>
  merge({}, state, {
    imageIds: payload.ids
  });

actions[SET_PAGE] = (state, { payload }) =>
  merge({}, state, {
    page: payload.page
  });

actions[SET_IMAGES] = (state, { payload }) =>
  merge({}, state, {
    images: payload.images
  });

actions[SET_PAGE_SCROLL_POSITION] = (state, { payload }) =>
  merge({}, state, {
    pageScrollPosition: payload.pageScrollPosition
  });

const APPLY_SEARCH = `${IMAGE_KEY}/APPLY_SEARCH`;

export function applySearch(searchValue) {
  return {
    type: APPLY_SEARCH,
    payload: { searchValue }
  };
}

actions[APPLY_SEARCH] = (state, { payload }) =>
  merge({}, state, {
    search: payload.searchValue
  });
