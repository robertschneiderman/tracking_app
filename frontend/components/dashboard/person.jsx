import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/dashboard/index';
// import Container from './/_container';

class Person extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getTasks();
  }

  render() {
    return(
      <div className="person">
        <h2>Rob</h2>

      </div>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  getTasks: () => dispatch(actions.getTasks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Person);