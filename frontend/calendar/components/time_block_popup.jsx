import React, {Component} from 'react';
import Modal from 'react-modal';

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
        console.log("hopen!!!");
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }  

    render() {
        const customStyles = {
            content : {
                backgroundColor       : 'white',
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };  
        let {task, start, end} = this.props;      
        return(
            <div className="time-block-popup" onClick={this.openModal}>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}                    
                    contentLabel="Example Modal"                
                >
                    <div className="task-field">
                        <label htmlFor="" className="task-field-label">Task: </label>
                        <p>{task.name}</p>
                    </div>

                    <div className="task-field">
                        <label htmlFor="" className="task-field-label">Start Time: </label>
                        <p>{start}</p>
                    </div>

                    <div className="task-field">
                        <label htmlFor="" className="task-field-label">End Time: </label>
                        <p>{end}</p>
                    </div>
                </Modal>            
            </div>
        );
    }
}

export default TimeBlockPopup;