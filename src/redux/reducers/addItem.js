const addItem = [];

const addItems = (state = addItem, action) => {
  switch (action.type) {
    case "ADDDATA":
      return [...action.payload];

    default:
      return state;
  }
};

export default addItems;
