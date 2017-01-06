import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateToggler from './date_toggler';
import Persons from './persons';
import * as taskActions from '../task/actions';
import * as userActions from '../user/actions';
import * as historyActions from '../history/actions';
import selector from '../selectors/objToArray';
import merge from 'lodash/merge';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loading, user, buddy, userTasks, buddyTasks, date, index } = this.props;
        if (this.props.user44) {
        return (
            this.props.user &&
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
                    index={index} />
                />
            </div>
        ); } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {
    const { data, user, history, task, goal, dashboard } = state;
    let { users, histories, tasks, goals} = user; // temp
    const { entities } = data;
    const { index, date, loading } = dashboard;
    // let { tasks } = entities;
    users = users ? merge([], selector(users)) : [];
    let newUsers = [];
    users.forEach((user, i) => {
        newUsers[i] = {};
        newUsers[i].histories = user.histories.map(historyId => histories[historyId]);
        newUsers[i].histories.forEach(historyy => {
            historyy.tasks = historyy.tasks.map(taskId => tasks[taskId]);
            historyy.tasks.forEach(task => {
                task.goals = task.goals.map(goalId => goals[goalId]);
            });
        });
    });


  return {
    user: newUsers[0],
    buddy: newUsers[1],
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