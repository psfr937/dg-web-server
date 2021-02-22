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


export const pmSchema = new schema.Entity(
  'pms',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfPms = new schema.Array(pmSchema);

export const pltSchema = new schema.Entity(
  'plts',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfPlts = new schema.Array(pltSchema);


export const inventorySchema = new schema.Entity(
  'inventories',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfInventories = new schema.Array(inventorySchema);

export const cidSchema = new schema.Entity(
  'cids',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfCids = new schema.Array(cidSchema);