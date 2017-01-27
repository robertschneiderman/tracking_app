import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {router, hashHistory} from 'react-router';
import moment from 'moment';

import TaskField from './task_field';
import TimeField from './time_field';

import * as actions from '../actions';
import * as timestampActions from '../../timestamp/actions';

class TimeBlockPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: '',
            start: {},
            end: {}
        };

        this.closeEditor = this.closeEditor.bind(this);     
        this.editTimestamp = this.editTimestamp.bind(this);     
    }

    closeEditor() {
        // remember to clear form
        hashHistory.push('/calendar');
    }

    getTimestamp() {
        return this.props.timestamps && this.props.timestamps[this.props.params.id];
    }

    editTimestamp() {
        let {timestampEditor} = this.props;
        let result = {};
        for (let key in timestampEditor) {
            let field = timestampEditor[key];
            if (key === 'start' || key === 'end') {
                let datesData = field['dates'][0];
                let datesIdx = field['dates'][1];
                let hoursData = field['hours'][0];
                let hoursIdx = field['hours'][1];
                let minutesData = field['minutes'][0];
                let minutesIdx = field['minutes'][1];
                let meridiemsData = field['meridiems'][0];
                let meridiemsIdx = field['meridiems'][1];
                let year = moment().year();           
                let subResult = moment(`${datesData[datesIdx]} ${year} ${hoursData[hoursIdx]}:${minutesData[minutesIdx]} ${meridiemsData[meridiemsIdx]}`, "ddd MMM DD YYYY h:mm A").format('YYYY-MM-DD hh:mm:ss');
                result[key] = `${subResult}.000Z`;
            } else {

            }
        }
    }

    render() {
        // let {task, start, end} = this.props;
        let timestamp = this.getTimestamp();
        let {storeDataWithIndeces, changeValue, tasks} = this.props;
        if (timestamp) {
            return(
                <div className="timestamp-editor-wrapper" onClick={this.openModal}>
                    <button onClick={this.closeEditor} className="close-editor-btn">X</button>
                    <div className="timestamp-editor">
                        <div className="tbp-btns">
                            <button className="tbp-btn" onClick={this.deleteTimestamp}>Delete</button>
                            <button className="tbp-btn" onClick={this.editTimestamp}>Done</button>
                        </div>
                        <TaskField tasks={tasks} />
                        <TimeField time={timestamp.start} field="start" storeDataWithIndeces={storeDataWithIndeces} changeValue={changeValue} />
                        <TimeField time={timestamp.end} field="end" storeDataWithIndeces={storeDataWithIndeces} changeValue={changeValue} />
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

const mapStateToProps = state => {
    let { timestamp, timestampEditor, tasks } = state;
    return {
        timestamps: timestamp,
        timestampEditor,
        tasks
    };
};

const mapDispatchToProps = dispatch => ({
    storeDataWithIndeces: payload => dispatch(actions.storeDataWithIndeces(payload)),
    changeValue: payload => dispatch(actions.changeValue(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeBlockPopup);