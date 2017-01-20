import React from 'react';
import { renderComponent, expect } from '../test_helper';
import Calendar from '../../calendar/components/index';
import DayLabel from '../../calendar/components/day_label';
import Day from '../../calendar/components/day';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import configureStore from 'redux-mock-store';
// import { createStore } from 'redux';


// const store = createStore({});


// let Component = TestUtils.renderIntoDocument(
//   <Provider store={store({})}>
//     {() => <Calendar />}
//   </Provider>
// );

let initialState = {
    user: {
        "58813e4bad8a3da595c1a0c1": {
            __v: 5,
            _id: "58813e4bad8a3da595c1a0c1",
            buddy: null,
            email: "doug@aol.com",
            histories: ["58813e59ad8a3da595c1a0c3"],
            name: "Doug",
            password: "$2a$10$y95qfPNDK0Vlzhk4fmVsveVAEvCAVZp/reGpBWuPH4ds1CKpZiIX."            
        }
    },
    history: {
        "58813e59ad8a3da595c1a0c3": {
            _id: "58813e59ad8a3da595c1a0c3",
            date: "2017-01-20T08:00:00.000Z",
            tasks: ["58813e67ad8a3da595c1a0c4"]
        }
    },
    task: {
        "58813e67ad8a3da595c1a0c4": {
            _id: "58813e67ad8a3da595c1a0c4",
            color: "orange",
            goals: ["58813e67ad8a3da595c1a0c7", "58813e67ad8a3da595c1a0c6", "58813e67ad8a3da595c1a0c5"],
            name: "Meditation",
            timestamps: ["58814076ad8a3da595c1a0c9"],
            type: "time"
        }
    },
    goal: {
        "58813e67ad8a3da595c1a0c5": {
            _id : "58813e67ad8a3da595c1a0c5",
            count : 0,
            goal : 22260,
            interval : "monthly",
            lastAssessed : null,
            nextAssessed : "2017-02-01T08:00:00.000Z",
            originalMultiplier: 0.3702508960573477,
            streak: 0
        }
    },
    timestamp: {
        "58814076ad8a3da595c1a0c9": {
            _id: "58814076ad8a3da595c1a0c9",
            end: "2017-01-19T22:40:57.536Z",
            start: "2017-01-19T22:40:54.326Z"
        }
    },
    calendar: {
        loading: false,
        weekIdx: 0
    }
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('<Calendar />', () => {
    let wrapper, days, dayLabels;
    beforeEach(() => {
        wrapper = mount(<Calendar store={store} />);
        days = wrapper.find(Day);
        dayLabels = wrapper.find('.labels');
    });
    
    it('should have 7 consecutive labels', () => {
        expect(dayLabels.children()).to.have.length(7);
    });

    it('should have 7 consecutive days', () => {
        expect(days.children()).to.have.length(7);
    });

    it('the first day should be a Monday', () => {
        let lastMonday = new Date().getDate() - (new Date().getDay() + 6) % 7;
        let fistHistory = dayLabels.childAt(0).props().date;
        expect(fistHistory).to.be.equal(lastMonday);
    });    

    
});