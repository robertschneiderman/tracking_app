import { renderComponent , expect } from '../test_helper';
import reducer from '../../task/reducer.js';
import * as actions from '../../task/actions.js';

let fakeTasks = {
    '1': {
        _id: '1',
        name: 'meditation',
        type: 'frequency',
        goals: []
    },
    '2': {
        _id: '2',
        name: 'fitness',
        type: 'frequency',
        goals: []
    },
    '3': {
        _id: '3',
        name: 'work',
        type: 'time',
        goals: []
    }
};

const updatedTask = {
    _id: '2',
    name: 'fitness',
    type: 'time',    
    goals: []
};

let newTasks = {
    '1': {
        _id: '1',
        name: 'meditation',
        type: 'frequency',
        goals: []
    },
    '2': {
        _id: '2',
        name: 'fitness',
        type: 'time',
        goals: []
    },
    '3': {
        _id: '3',
        name: 'work',
        type: 'time',
        goals: []
    }
};

describe('taskReducer', () => {
    
  describe('RECEIVE_TASKS', () => {
    let state;
    beforeEach(() => {
      state = reducer(
        fakeTasks, 
        actions.receiveTasks(fakeTasks)
      );
    });
    it('should output state that is object of objects', () => {
        expect(state).to.be.an('object');
        expect(state['1']).to.be.an('object');
    });   
  });

  describe('RECEIVE_TASK', () => {
    let state;
    beforeEach(() => {
      state = reducer(
        fakeTasks, 
        actions.receiveTask(updatedTask)
      );
    });
    it('should modify correct task', () => {
        expect(state).to.deep.equal(newTasks);
    });   
  });
});
