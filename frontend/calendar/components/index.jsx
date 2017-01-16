import React, {Component} from 'react';
import { connect } from 'react-redux';
import Day from './day';
import * as goalActions from '../../goal/actions';
import * as timestampActions from '../../timestamp/actions';
import * as userActions from '../../user/actions';
import * as historyActions from '../../history/actions';
import selector from '../../selectors/objToArray';
import merge from 'lodash/merge';


class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    getDates() {
        let today = new Date();
        let dayNumber = (today.getDay() + 6) % 7;
        let firstDate = new Date();
        firstDate.setDate(today.getDate() - dayNumber);
        
        let dates = [firstDate.getDate()];
        
        for (let i = 1; i <= 6; i++) {
            let date = new Date();
            date.setDate(firstDate.getDate() + i);
            dates.push(date.getDate());
        }        
        return dates;
    }

    renderDays() {
        let dates = this.getDates();
        return dates.map(date => {
            return (
                <Day date={date}/>
            );
        });
    }

    render() {
        const { loading, user, buddy, date, index } = this.props;

        if (this.props.user) {
        return (
            <div className="calendar">
                {this.renderDays()}
            </div>
        ); } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {

    const { data, user, history, task, goal, dashboard } = state;
    const { entities } = data;
    let { index, date, loading } = dashboard;
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

    date = (Object.keys(history).length !== 0 && newUsers[0]) ? newUsers[0].histories[index].date : '';

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
    incrementGoal: (taskId, count) => dispatch(goalActions.incrementGoals(taskId, count)),
    createTimestamp: (taskId) => dispatch(timestampActions.createTimestamp(taskId)),
    finishTimestamp: (taskId) => dispatch(timestampActions.finishTimestamp(taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);