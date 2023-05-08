export const addData = (product) => {
  return {
    type: "ADDDATA",
    payload: [...product],
  };
};
