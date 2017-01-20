import React, {Component} from 'react';
import { connect } from 'react-redux';
import Day from './day';
import DayLabel from './day_label';
import TimeGraph from './time_graph';
import * as goalActions from '../../goal/actions';
import * as timestampActions from '../../timestamp/actions';
import * as userActions from '../../user/actions';
import * as historyActions from '../../history/actions';
import selector from '../../selectors/objToArray';
import merge from 'lodash/merge';
import moment from 'moment';


class Calendar extends Component {
    constructor(props) {
        super(props);
    }

    getDates() {
        let today = moment();
        let dayNumber = (moment().add(6, 'days').get('day')) % 7;
        let dates = [];
        
        for (let i = 0; i <= 6; i++) {
            let date = moment().subtract(dayNumber, 'days').add(i, 'days').subtract(this.props.weekIdx, 'weeks');
            dates.push(date.get('date'));
        }        
        return dates;
    }

    renderDays() {
        let dates = this.getDates();
        let { weekIdx } = this.props.weekIdx;
        let { histories } = this.props.user;
        let currentDate = moment();
        let days = [];
        let labels = [];
        let histIdx = histories.length-1;
        for (let i = 0; i < dates.length; i++) {
            let date = dates[i];
            let history = histories[histIdx];
            if (history && moment(history.date).get('date') === date) {
                days.push(<Day key={i} history={histories[histIdx]}/>);
                labels.push(<DayLabel key={`${i}-1`} date={date} idx={i}/>);
                histIdx--;
            } else {
                days.push(<Day key={i}/>);
                labels.push(<DayLabel key={`${i}-1`} date={date} idx={i}/>);
            }
        }
        return { labels, days };
    }

    render() {
        const { loading, user, buddy, date, index } = this.props;

        if (this.props.user) {
            let {days, labels } = this.renderDays();
            return (
                <div className="calendar">
                    <div className="labels">{labels}</div>                    
                    <div className="days">
                        <TimeGraph />
                        {days}
                    </div>
                </div>
            ); 
        } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {

    const { user, history, task, goal, timestamp, calendar } = state;
    let { weekIdx, loading } = calendar;

    let users = user ? merge([], selector(user)) : [];
    let newUsers = [];

    // let histories = histories.slice(weekIdx * 7, weekIdx * 7 + 7);
    users.forEach((user, i) => {
        newUsers[i] = {};
        newUsers[i].id = user._id;
        newUsers[i].name = user.name;
        user.histories = user.histories.slice(weekIdx * 7, weekIdx * 7 + 7);
        newUsers[i].histories = merge([], user.histories.map(historyId => history[historyId]));
        newUsers[i].histories.forEach(historyy => {
            historyy.tasks = merge([], historyy.tasks.map(taskId => task[taskId]));
            historyy.tasks.forEach(task => {
                task.goals = merge([], task.goals.map(goalId => goal[goalId]));
                task.timestamps = merge([], task.timestamps.map(tsId => timestamp[tsId]));
            });
        });
    });
    // date = (Object.keys(history).length !== 0 && newUsers[0]) ? newUsers[0].histories[index].date : '';

    return {
        user: newUsers[0],
        weekIdx,
        loading
    };
};

const mapDispatchToProps = dispatch => ({
    requestHistories: userId => dispatch(historyActions.requestHistories(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);