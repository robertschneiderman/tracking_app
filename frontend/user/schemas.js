import { normalize, schema } from 'normalizr';

export const goalSchema = new schema.Entity('goals', {}, { idAttribute: '_id' });
export const timestampSchema = new schema.Entity('timestamps', {}, { idAttribute: '_id' });
export const taskSchema = new schema.Entity('tasks', {goals: [goalSchema]}, { idAttribute: '_id' });
export const historySchema = new schema.Entity('histories', {tasks: [taskSchema]}, { idAttribute: '_id' });
export const userSchema = new schema.Entity('users', {histories: [historySchema]}, { idAttribute: '_id' });


// const shipSchema = new schema.Entity('ships', {}, {idAttribute: '_id'});
// const boardSchema = new schema.Entity('boards', { ships: [shipSchema] }, {idAttribute: '_id'});
// const gameSchema = new schema.Entity('games', { boards: [boardSchema] }, {idAttribute: '_id'});
// const userSchema = new schema.Entity('users', { games: [gameSchema] }, {idAttribute: '_id'});