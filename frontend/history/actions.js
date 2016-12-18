import { normalize, Schema, arrayOf } from 'normalizr';

const userHistorySchema = new Schema('userHistories', { idAttribute: '_id' });
const buddyHistorySchema = new Schema('buddyHistories', { idAttribute: '_id' });
const taskSchema = new Schema('tasks', { idAttribute: '_id' });
const goalSchema = new Schema('goals', { idAttribute: '_id' });

let fakeResponse = {
    userHistories: [
    {
        _id: 1,
        tasks: [
            {
                _id: 1,
                name: "task1",
                goals: [{
                    _id: 1,
                    name: "goal1"
                }]
            },{
                _id: 2,
                name: "task2",
                goals: [{
                    _id: 2,
                    name: "goal2"
                }]
            }
        ]
    },{
        _id: 2,
        tasks: [
            {
                _id: 3,
                name: "task3",
                goals: [{
                    _id: 3,
                    name: "goal3"
                }]
            },{                
                _id: 4,
                name: "task4",
                goals: [{
                    _id: 4,
                    name: "goal4"                    
                }]
            }
        ]
    }    
]};

userHistorySchema.define({
  tasks: arrayOf(taskSchema),
});

buddyHistorySchema.define({
  tasks: arrayOf(taskSchema),
});

taskSchema.define({
    goals: arrayOf(goalSchema)
});

export const requestHistories = payload => ({
    type: 'REQUEST_HISTORIES',
    payload
});

export const receiveHistories = payload => {
    // debugger;    
    // payload = normalize(payload, {
    //     userHistories: arrayOf(userHistorySchema),
    //     buddyHistories: arrayOf(buddyHistorySchema),
    //     tasks: arrayOf(taskSchema),
    //     goals: arrayOf(goalSchema)
    // });
    // debugger;

    return {
        type: 'RECEIVE_HISTORIES',
        payload
    };
};

export const receiveHistory = payload => ({
    type: 'RECEIVE_HISTORY',
    payload
});

export const updateHistory = payload => ({
    type: 'UPDATE_HISTORY',
    payload
});

export const alternateHistories = payload => ({
    type: 'ALTERNATE_HISTORIES',
    payload
});