import React from 'react';
import { connect } from 'react-redux';
// import Container from './/_container';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.incrementGoal = this.incrementGoal.bind(this);
  }

  incrementGoal() {

  }

  render() {
    return(
      <div className="task">
        <label htmlFor="">{}</label>
        <button className="" onClick={this.incrementGoal}></button>
      </div>
    )
  }
}

const mapStateToProps = () => {

}

const mapDispatchToProps = () => {

}

export default connect(mapStateToProps, mapDispatchToProps)(Task);