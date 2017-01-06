import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateToggler from './date_toggler';
import Persons from './persons';
import * as goalActions from '../../goal/actions';
import * as userActions from '../../user/actions';
import * as historyActions from '../../history/actions';
import selector from '../../selectors/objToArray';
import merge from 'lodash/merge';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loading, user, buddy, date, index } = this.props;

        if (this.props.user) {
        return (
            <div className="dashboard">
                <DateToggler 
                    date={date} 
                    index={index} />
                <Persons 
                    user={user} 
                    buddy={buddy} 
                    index={index}
                    incrementGoal={this.props.incrementGoal} />
            </div>
        ); } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {

    const { data, user, history, task, goal, dashboard } = state;
    const { entities } = data;
    const { index, date, loading } = dashboard;
    // let { tasks } = entities;

    let users = user ? merge([], selector(user)) : [];
    let newUsers = [];
    
    users.forEach((user, i) => {
        newUsers[i] = {};
        newUsers[i].id = user._id;
        newUsers[i].name = user.name;
        newUsers[i].histories = merge([], user.histories.map(historyId => history[historyId]));
        newUsers[i].histories.forEach(historyy => {
            historyy.tasks = merge([], historyy.tasks.map(taskId => task[taskId]));
            historyy.tasks.forEach(task => {
                task.goals = merge([], task.goals.map(goalId => goal[goalId]));
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
    incrementGoal: (taskId, count) => dispatch(goalActions.incrementGoals(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);