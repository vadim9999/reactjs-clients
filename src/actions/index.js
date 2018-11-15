
export const displayDetails = details => ({
  type: "DISPLAY_DETAILS",
  payload: details
});

export const searchresults = results => ({
  type: "SET_SEARCH_RESULTS",
  payload: results
});

export const hideClients = isHidden => ({
  type: "HIDE_CLIENTS",
  payload : isHidden
})
