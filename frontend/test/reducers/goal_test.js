import { renderComponent , expect } from '../test_helper';
import reducer from '../../goal/reducer.js';
import * as actions from '../../goal/actions.js';

let oldGoals = {
    '1': {
        _id: '1',
        interval: 'weekly',
        count: 0,
        goal: 5
    },
    '2': {
        _id: '2',
        interval: 'weekly',
        count: 0,
        goal: 5
    },
    '3': {
        _id: '3',
        interval: 'monthly',
        count: 0,
        goal: 22
    }        
};

let goalsToUpdate = [{
        _id: '2',
        interval: 'weekly',
        count: 1,
        goal: 5
    },{
        _id: '3',
        interval: 'monthly',
        count: 1,
        goal: 22
    }      
];

let newGoals = {
    '1': {
        _id: '1',
        interval: 'weekly',
        count: 0,
        goal: 5
    },
    '2': {
        _id: '2',
        interval: 'weekly',
        count: 1,
        goal: 5
    },
    '3': {
        _id: '3',
        interval: 'monthly',
        count: 1,
        goal: 22
    }        
};

describe('goalReducer', () => {
    
  describe('RECEIVE_GOALS', () => {
    let state;
    beforeEach(() => {
      state = reducer(
        oldGoals, 
        actions.receiveGoals(oldGoals)
      );
    });
    it('should output state that is object of objects', () => {
        expect(state).to.be.an('object');
        expect(state['1']).to.be.an('object');
    });   
  });

  describe('RECEIVE_UPDATED_GOALS', () => {
    let state;
    beforeEach(() => {
      state = reducer(
        oldGoals, 
        actions.receiveUpdatedGoals(goalsToUpdate)
      );
    });
    it('should modify correct goal', () => {
        expect(state).to.deep.equal(newGoals);
    });   
  });
});