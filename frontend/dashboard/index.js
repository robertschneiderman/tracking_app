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
        const { userTasks, buddyTasks } = this.props;        
        if (userTasks.length === 0 && buddyTasks.length === 0) {
            this.props.requestHistories(0);
        }
    }

    render() {
        const { user, buddy, userTasks, buddyTasks, date, index } = this.props;
        return (
            <div className="dashboard">
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
  const { user, entities, history } = state;
  const { currentUser } = user;
  const buddy = currentUser.buddy;
  const { index, date } = history;
  let { userTasks, buddyTasks } = entities;

  return {
    user,
    userTasks,
    buddy,
    buddyTasks,
    index,
    date
  };
};

const mapDispatchToProps = dispatch => ({
    requestHistories: userId => dispatch(historyActions.requestHistories(userId)),
    alternateHistories: payload => dispatch(historyActions.alternateHistories(payload)),
    clearHistories: userId => dispatch(historyActions.clearHistories(userId)),
    incrementGoal: (taskId, count) => dispatch(taskActions.incrementGoal(taskId, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);