export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_POSTS':
      return payload;
    default:
      return state;
  }
};
