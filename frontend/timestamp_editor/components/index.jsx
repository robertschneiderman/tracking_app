import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {router, hashHistory} from 'react-router';
import moment from 'moment';

import TaskField from './task_field';
import TimeField from './time_field';

import * as actions from '../actions';
import * as timestampActions from '../../timestamp/actions';

class TimestampEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };

        this.closeEditor = this.closeEditor.bind(this);     
        this.editTimestamp = this.editTimestamp.bind(this);     
    }

    componentWillMount() {
        // on refresh
        if (!this.props.timestampEditor.timestamp._id) {
            hashHistory.push('/calendar');
        }
    }

    closeEditor() {
        // remember to clear form
        hashHistory.push('/calendar');
    }

    getTask() {
        return this.props.tasks && this.props.tasks[this.props.params.task.id];
    } 

    isStartBeforeEnd(start, end) {
        return moment(start).unix() < moment(end).unix();
    }   

    editTimestamp() {
        let { editTimestamp, timestampEditor} = this.props;
        let {start, end} = timestampEditor.timestamp;
        if (this.isStartBeforeEnd(start, end)) {
            editTimestamp(timestampEditor);
            this.setState({error: ''});
        } else {
            this.setState({error: 'Start must be before end'});
        }
    }

    render() {
        // let {task, start, end} = this.props;
        let {timestampEditor, storeDataWithIndeces, changeTaskValue, changeTimestampValue, tasks} = this.props;
        if (timestampEditor) {
        let task = tasks[timestampEditor.originalTaskId];
            return(
                <div className="timestamp-editor-wrapper" onClick={this.openModal}>
                    <button onClick={this.closeEditor} className="close-editor-btn">X</button>
                    <div className="timestamp-editor">
                        <div className="tbp-btns">
                            <button className="tbp-btn" onClick={this.deleteTimestamp}>Delete</button>
                            <button className="tbp-btn" onClick={this.editTimestamp}>Done</button>
                        </div>
                        <span style={{color: 'red'}}>{this.state.error}</span>
                        <TaskField tasks={tasks} task={task} changeTaskValue={changeTaskValue} />
                        <TimeField time={timestampEditor.timestamp.start} field="start" storeDataWithIndeces={storeDataWithIndeces} changeTimestampValue={changeTimestampValue} />
                        <TimeField time={timestampEditor.timestamp.end} field="end" storeDataWithIndeces={storeDataWithIndeces} changeTimestampValue={changeTimestampValue} />
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {
    let { timestamp, timestampEditor, task } = state;
    return {
        timestamps: timestamp,
        tasks: task,
        timestampEditor
    };
};

const mapDispatchToProps = dispatch => ({
    storeDataWithIndeces: payload => dispatch(actions.storeDataWithIndeces(payload)),
    changeTaskValue: payload => dispatch(actions.changeTaskValue(payload)),
    changeTimestampValue: payload => dispatch(actions.changeTimestampValue(payload)),
    editTimestamp: payload => dispatch(actions.editTimestamp(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimestampEditor);