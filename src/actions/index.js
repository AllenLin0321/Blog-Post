import _ from 'lodash';
import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const { data } = await jsonPlaceholder.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: data });
};
/* 上面的寫法相同於下面的
export const fetchPosts = function() {
  return async function(dispatch) {
    const { data } = await jsonPlaceholder.get('/posts');
    dispatch({ type: 'FETCH_POSTS', payload: data });
  };
};
*/

export const fetchUser = userId => async dispatch => {
  const { data } = await jsonPlaceholder.get(`/users/${userId}`);
  dispatch({ type: 'FETCH_USER', payload: data });
};

/* User Lodash Memoize  */
// export const fetchUser = userId => dispatch => _fetchUser(userId, dispatch);
// const _fetchUser = _.memoize(async (userId, dispatch) => {
//   const { data } = await jsonPlaceholder.get(`/users/${userId}`);
//   dispatch({ type: 'FETCH_USER', payload: data });
// });
