export const receiveEntities = payload => ({
    type: 'RECEIVE_ENTITIES',
    data: payload
});


const collectData = (user, parents, child) => {
  let result = [];
  parents.forEach(parent => {
    let children = parent[child];
    result = result.concat(children);
  });
  return result;
};

const userAndBuddyData = (user, parents, child) => {
  let userData = collectData(user, parents, child);
  if (user.buddy) userData.concat(collectData(user.buddy, parent, child));
  return userData;
};

export function receiveDashboardData(users) {
  return function(dispatch) {
    // users.forEach(user => {
      let user = users[0];
      let histories = user.histories;
      let tasks = userAndBuddyData(user, histories, 'tasks');
      let goals = userAndBuddyData(user, tasks, 'goals');
      let timestamps = userAndBuddyData(user, tasks, 'timestamps');

      // if (user.buddy) histories.concat(user.buddy.histories);
      // let tasks = histories.map(history => history.tasks);
      // if (user.buddy) tasks.concat(user.buddy.tasks);
      // let goals = tasks.map(task => task.goals);
      // if (user.buddy) goals.concat(user.buddy.goals); 
      // let timestamps = tasks.map(task => task.timestamps);
      // if (user.buddy) timestamps.concat(user.buddy.timestamps);

      dispatch({type: 'RECEIVE_GOALS', payload: goals });
      dispatch({type: 'RECEIVE_TIMESTAMPS', payload: timestamps });
      dispatch({type: 'RECEIVE_TASKS', payload: tasks });
      dispatch({type: 'RECEIVE_HISTORIES', payload: histories });
      dispatch({type: 'RECEIVE_USERS', payload: users });
    // });
  };
}

// export function receiveDashboardData({users}) {
//   return function(dispatch) {
//     dispatch({type: 'RECEIVE_GOALS', payload: users.histories.tasks.goals });
//     dispatch({type: 'RECEIVE_TIMESTAMPS', payload: users.histories.tasks.timestamps });
//     dispatch({type: 'RECEIVE_TASKS', payload: users.histories.tasks });
//     dispatch({type: 'RECEIVE_HISTORIES', payload: users.histories });
//     dispatch({type: 'RECEIVE_USERS', payload: users });  
//   };
// }