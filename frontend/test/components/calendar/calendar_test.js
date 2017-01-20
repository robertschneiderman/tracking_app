import React from 'react';
import { renderComponent, expect } from '../../test_helper';
import Calendar from '../../../calendar/components/index';
import DayLabel from '../../../calendar/components/day_label';
import Day from '../../../calendar/components/day';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import configureStore from 'redux-mock-store';
import { normalizedState } from './calendar_helpers';

const mockStore = configureStore();
const store = mockStore(normalizedState);

describe('<Calendar />', () => {
    let wrapper, days, dayLabels;
    beforeEach(() => {
        wrapper = mount(<Calendar store={store} />);
        days = wrapper.find(Day);
        dayLabels = wrapper.find(DayLabel);
    });
    
    it('should have 7 consecutive labels', () => {
        expect(dayLabels).to.have.length(7);
    });

    it('should have 7 consecutive days', () => {
        expect(days).to.have.length(7);
    });

    it('the first day should be a Monday', () => {
        let lastMonday = new Date().getDate() - (new Date().getDay() + 6) % 7;
        let fistHistory = dayLabels.first().props().date;
        expect(fistHistory).to.be.equal(lastMonday);
    });    

    
});