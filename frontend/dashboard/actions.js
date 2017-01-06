// export const alternateHistories = payload => ({
//     type: 'CHANGE_HISTORY_INDEX',
//     payload
// });

export function getDashboardData({goals, tasks, histories, users}) {
  return function(dispatch) {
    dispatch({type: 'RECEIVE_GOALS', payload: goals });
    dispatch({type: 'RECEIVE_TASKS', payload: tasks });
    dispatch({type: 'RECEIVE_HISTORIES', payload: histories });
    dispatch({type: 'RECEIVE_USERS', payload: users });  
  };
}