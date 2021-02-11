import { schema } from 'normalizr';

export const dataSchema = new schema.Entity(
  'data',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfData = new schema.Array(dataSchema);

export const planSchema = new schema.Entity(
  'plans',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfPlans = new schema.Array(planSchema);

