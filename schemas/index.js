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


export const addressSchema = new schema.Entity(
  'addresses',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfAddresses = new schema.Array(addressSchema);

export const btSchema = new schema.Entity(
  'bts',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfBts = new schema.Array(btSchema);



export const clientSchema = new schema.Entity(
  'clients',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfClient = new schema.Array(clientSchema)

export const visitSchema = new schema.Entity(
  'visits',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfVisit = new schema.Array(visitSchema)

export const serviceSchema = new schema.Entity(
  'services',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfService = new schema.Array(serviceSchema);

export const productSchema = new schema.Entity(
  'products',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfProduct = new schema.Array(productSchema);

export const staffSchema = new schema.Entity(
  'staffs',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfStaff = new schema.Array(staffSchema);

export const ownVisitsSchema = new schema.Entity(
  'ownVisits',
  {},
  {
    idAttribute: 'id'
  }
);

export const arrayOfOwnVisits = new schema.Array(ownVisitsSchema);

