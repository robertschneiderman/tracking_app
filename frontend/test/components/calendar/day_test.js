import React from 'react';
import { renderComponent, expect } from '../../test_helper';
import Day from '../../../calendar/components/day';
import TimeBlock from '../../../calendar/components/time_block';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { initialState } from './calendar_helpers';

initialState.timestamps = [{
    id: "58814076ad8a3da595c1a0c9",
    start: "2017-01-19T01:00:00.000Z",
    end: "2017-01-19T01:05:00.000Z"
}];

const mockStore = configureStore();
const store = mockStore(initialState);
console.log('store: ', store.getState().history);

// TDD for selectors???

describe('<Day />', () => {
    let wrapper, timeBlock;
    beforeEach(() => {
        wrapper = mount(<Day store={store} />);
        timeBlock = wrapper.find(TimeBlock);
    });

    it('renders a 2880px height day in the calendar', () => {
        
    });

    it('fills timeblocks where it needs to', () => {
        expect(timeBlock).to.have.length(1);
    });
});