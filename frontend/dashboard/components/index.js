import React, {Component} from 'react';
import { connect } from 'react-redux';
import DateToggler from './date_toggler';
import Persons from './persons';
import { normalize, denormalize, schema } from 'normalizr';
import {userSchema, historySchema, taskSchema, goalSchema, timestampSchema} from '../../user/schemas';

import * as goalActions from '../../goal/actions';
import * as timestampActions from '../../timestamp/actions';
import * as userActions from '../../user/actions';
import * as historyActions from '../../history/actions';
import selector from '../../selectors/objToArray';
import merge from 'lodash/merge';
import moment from 'moment';


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const { loading, users, buddy, date, index } = this.props;
        if (this.props.users) {
        return (
            <div className="dashboard">
                <DateToggler {...this.props} />
                <Persons {...this.props} />
            </div>
        ); } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {

    const { data, user, history, task, goal, dashboard } = state;
    // const { data, dashboard } = state;
    let entities = data;
    let { index, date, loading } = dashboard;

    // let users = user;
    // let { tasks } = entities;

    // let users = user ? merge([], selector(user)) : [];

    // let entities = {users: user, histories: history, tasks: task, goals: goal};

    // debugger;
    // let mySchema = { users: [userSchema] };

    // let denormalizedData = denormalize({ users: [ '589a663f037ebd0dc4a4bca8' ] }, mySchema, entities);
    // let users = data;
    // if (denormalizedData[0]) {
        // debugger;
        // loading = false;
    // }

    
    // users.forEach((user, i) => {
    //     newUsers[i] = {};
    //     newUsers[i].id = user._id;
    //     newUsers[i].name = user.name;
    //     newUsers[i].histories = merge([], user.histories.map(historyId => history[historyId]));
    //     newUsers[i].histories.forEach(historyy => {
    //         historyy.tasks = merge([], historyy.tasks.map(taskId => task[taskId]));
    //         historyy.tasks.forEach(task => {
    //             task.goals = merge([], task.goals.map(goalId => goal[goalId]));
    //         });
    //     });
    // });

    // date = (Object.keys(history).length !== 0 && users[0]) ? moment(users[0].histories[index].date).format('MMMM Do YYYY') : '';


    return {
        users: user,
        histories: history,
        tasks: task,
        goals: goal,
        dashboard,
        index,
        date: 'TODAY!',
        loading
    };
};

const mapDispatchToProps = dispatch => ({
    requestHistories: userId => dispatch(historyActions.requestHistories(userId)),
    alternateHistories: payload => dispatch(historyActions.alternateHistories(payload)),
    clearHistories: userId => dispatch(historyActions.clearHistories(userId)),
    incrementGoal: (taskId, count) => dispatch(goalActions.incrementGoals(taskId, count)),
    createTimestamp: (taskId) => dispatch(timestampActions.createTimestamp(taskId)),
    finishTimestamp: (taskId) => dispatch(timestampActions.finishTimestamp(taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);