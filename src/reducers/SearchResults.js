
const initialState = {
  clients : [],
  isHiddenClients: false

};

const SearchResults = (state = initialState, action) =>{
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        clients : action.payload.results,
        isHiddenClients: state.isHiddenClients
      }
    case "HIDE_CLIENTS":
    return {
      ...state,
      isHiddenClients : action.payload.isHidden,
      clients: state.clients
    };

    default:
      return state;
  }
}

export default SearchResults;
