import queryString from "query-string"

export const getParamValue = (location, paramName) => queryString.parse(location.search)[paramName]
