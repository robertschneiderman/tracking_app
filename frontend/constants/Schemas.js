import { normalize, Schema, arrayOf } from 'normalizr';

const userHistorySchema = new Schema('userHistories', { idAttribute: '_id' });
const buddyHistorySchema = new Schema('buddyHistories', { idAttribute: '_id' });
const taskSchema = new Schema('tasks', { idAttribute: '_id' });
const goalSchema = new Schema('goals', { idAttribute: '_id' });

userHistorySchema.define({
  tasks: arrayOf(taskSchema),
});

buddyHistorySchema.define({
  tasks: arrayOf(taskSchema),
});

taskSchema.define({
    goals: arrayOf(goalSchema)
});