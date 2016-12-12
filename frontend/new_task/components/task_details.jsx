import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../actions';
// import Container from './/_container';

class TaskDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  submitForm(e) {
    e.preventDefault();
    console.log("this.state:", this.state);
    this.props.createTask(this.state);
  }

  updateValue(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return(
      <div className="task-details">
        <h2>Task</h2>
        <form onSubmit={this.submitForm.bind(this)} className="">
          <input
            value={this.state.name}
            onChange={this.updateValue.bind(this)}
            name="name"
            className="input"
            type="text"
            placeholder="Name" />
          <input
            value={this.state.description}
            onChange={this.updateValue.bind(this)}
            name="description"
            className="input"
            type="text"
            placeholder="Description" />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  createTask: info => dispatch(createTask(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);