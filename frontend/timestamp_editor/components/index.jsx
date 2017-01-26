import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {router, hashHistory} from 'react-router';

import TaskField from './task_field';
import TimeField from './time_field';

import * as actions from '../actions';

class TimeBlockPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);   
        this.closeEditor = this.closeEditor.bind(this);     
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    closeEditor() {
        // remember to clear form
        hashHistory.push('/calendar');
    }

    render() {
        let {task, start, end} = this.props;
        return(
            <div className="timestamp-editor-wrapper" onClick={this.openModal}>
                <button onClick={this.closeEditor} className="close-editor-btn">X</button>
                <div className="timestamp-editor">
                    <div className="tbp-btns">
                        <button className="tbp-btn" onClick={this.props.deleteTimestamp}>Delete</button>
                        <button className="tbp-btn" onClick={this.props.editTimestamp}>Done</button>
                    </div>
                    <TimeField time={start} />
                    <TimeField time={end} />
                </div>
            </div>
        );
    }
                    // <TaskField task={task} />
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    action: payload => dispatch(actions.changeField(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeBlockPopup);