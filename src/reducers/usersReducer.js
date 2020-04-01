export default (state = [], { type, payload }) => {
  switch (type) {
    case 'FETCH_USER':
      return [...state, payload];
    default:
      return state;
  }
};
