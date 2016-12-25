import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateToggler from './date_toggler';
import Persons from './persons';
import * as taskActions from '../task/actions';
import * as userActions from '../user/actions';
import * as historyActions from '../history/actions';
import selector from '../selectors/objToArray';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { user, buddy } = this.props;        
        // if (user.tasks.length === 0 && buddy.tasks.length === 0) {
            this.props.requestHistories(0);
        // }
    }

    render() {
        const { loading, user, buddy, userTasks, buddyTasks, date, index } = this.props;
        return (
            !loading &&
            <div className="dashboard">
                <h1>NOTLOADING</h1>
                <DateToggler 
                    date={date}
                    index={index} />
                <Persons 
                    user={user}
                    buddy={buddy}
                    userTasks={userTasks}
                    buddyTasks={buddyTasks}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
  const { data, history } = state;
  const { entities } = data;
  const { index, date, loading } = history;
  let { tasks } = entities;

  let userTasks = [];
  let buddyTasks = [];


  if (!Array.isArray(entities.histories)) {

    data.result = data.result.users.map(userId => entities.users[userId]);
    data.result.forEach(user => {
        user.histories = user.histories.map(historyId => entities.histories[historyId]);        
        user.histories.forEach(historyy => {
            historyy.tasks = historyy.tasks.map(taskId => entities.tasks[taskId]);
            historyy.tasks.forEach(task => {
                task.goals = task.goals.map(goalId => entities.goals[goalId]);
            });
        });
    });
    debugger;
  }

let [user, buddy] = data.result;

  return {
    user,
    buddy,
    index,
    date,
    loading
  };
};

const mapDispatchToProps = dispatch => ({
    requestHistories: userId => dispatch(historyActions.requestHistories(userId)),
    alternateHistories: payload => dispatch(historyActions.alternateHistories(payload)),
    clearHistories: userId => dispatch(historyActions.clearHistories(userId)),
    incrementGoal: (taskId, count) => dispatch(taskActions.incrementGoal(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);