
const initialState = {
  general: {},
  job:{},
  contact:{},
  address: {}
};

const Details = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_DETAILS":
      return { ...state,
        general: action.payload.general,
        job: action.payload.job,
        contact: action.payload.contact,
        address: action.payload.address,
      };
    default:
      return state;
  }
}

export default Details;
