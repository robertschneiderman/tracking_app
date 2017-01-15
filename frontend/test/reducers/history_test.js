import { renderComponent , expect } from '../test_helper';
import reducer from '../../history/reducer.js';
import * as actions from '../../history/actions.js';

let histories = {
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

const updatedhistory = {
    _id: '2',
    name: 'fitness',
    type: 'time',    
    goals: []
};

let newHistorys = {
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

describe('historyReducer', () => {
    
  describe('RECEIVE_HISTORIES', () => {
    let state;
    beforeEach(() => {
      state = reducer(
        {}, 
        actions.receiveHistories(histories)
      );
    });
    it('should output state that is object of objects', () => {
        expect(state).to.be.an('object');
        expect(state['1']).to.be.an('object');
    });   
    it('should properly receive histories', () => {
        expect(state).to.be.equal(histories);
    });       
  });

//   describe('RECEIVE_HISTORY', () => {
//     let state;
//     beforeEach(() => {
//       state = reducer(
//         fakeTasks, 
//         actions.receiveTask(updatedTask)
//       );
//     });
//     it('should modify correct task', () => {
//         expect(state).to.deep.equal(newTasks);
//     });   
//   });
});
