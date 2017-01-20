import React, {Component} from 'react';
import Modal from 'react-modal';

import TaskField from './task_field';
import TimeField from './time_field';

// import * as actions from '../actions';

class TimeBlockPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);        
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }  

    render() {
        let {task, start, end} = this.props;
        return(
            <div className="time-block-popup-wrapper" onClick={this.openModal}>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="time-block-popup"                    
                    overlayClassName="time-block-popup-overlay"                    
                    contentLabel="Example Modal"                
                >
                    <TaskField task={task} />
                    <TimeField time={start} />
                    <TimeField time={end} />
                </Modal>
            </div>
        );
    }
}

export default TimeBlockPopup;