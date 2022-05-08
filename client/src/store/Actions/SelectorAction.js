export const Selection = (select) => {
  return {
    type: "select",
    payload: select,
  };
};

export const remover = (id) => {
  return {
    type: "rm",
    payload: id,
  };
};

export const NonSelection = (payload) => {
  return {
    type: "done",
    payload: payload,
  };
};
