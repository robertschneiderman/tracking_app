import React from 'react';
import { renderComponent, expect } from '../../test_helper';
import Day from '../../../calendar/components/day';
import TimeBlock from '../../../calendar/components/time_block';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { denormalizedState } from './calendar_helpers';

denormalizedState.timestamps = [{
    id: "58814076ad8a3da595c1a0c9",
    start: "2017-01-19T03:00:00.000Z",
    end: "2017-01-19T01:05:00.000Z"
}];

const mockStore = configureStore();
// const store = mockStore(denormalizedState);
// console.log('store: ', store.getState().history);

// TDD for selectors???

// console.log('denormalizedState: ', denormalizedState);

describe('<Day />', () => {
    let wrapper, timeBlock;
    beforeEach(() => {
        let { user } = denormalizedState;
        let { histories } = user;
        wrapper = mount(<Day history={histories[0]} start={histories[0].tasks[0].timestamps[0]} />);
        timeBlock = wrapper.find(TimeBlock);
    });

    it('fills timeblocks where it needs to', () => {
        expect(timeBlock).to.have.length(1);
    });   

    it('calculates correct start and end time', () => {
        expect(timeBlock.props().start).to.equal(60);
        expect(timeBlock.props().end).to.equal(65);
    });      
});