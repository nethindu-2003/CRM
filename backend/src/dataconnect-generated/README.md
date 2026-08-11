# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListLeads*](#listleads)
  - [*GetLeadById*](#getleadbyid)
  - [*GetNotesByLead*](#getnotesbylead)
- [**Mutations**](#mutations)
  - [*CreateLead*](#createlead)
  - [*UpdateLead*](#updatelead)
  - [*DeleteLead*](#deletelead)
  - [*CreateNote*](#createnote)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListLeads
You can execute the `ListLeads` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listLeads(options?: ExecuteQueryOptions): QueryPromise<ListLeadsData, undefined>;

interface ListLeadsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLeadsData, undefined>;
}
export const listLeadsRef: ListLeadsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLeads(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLeadsData, undefined>;

interface ListLeadsRef {
  ...
  (dc: DataConnect): QueryRef<ListLeadsData, undefined>;
}
export const listLeadsRef: ListLeadsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLeadsRef:
```typescript
const name = listLeadsRef.operationName;
console.log(name);
```

### Variables
The `ListLeads` query has no variables.
### Return Type
Recall that executing the `ListLeads` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLeadsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListLeadsData {
  leads: ({
    id: UUIDString;
    name: string;
    company?: string | null;
    email?: string | null;
    phone?: string | null;
    source?: string | null;
    salesperson?: string | null;
    status: string;
    value: number;
    createdAt: DateString;
    updatedAt: DateString;
  } & Lead_Key)[];
}
```
### Using `ListLeads`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLeads } from '@dataconnect/generated';


// Call the `listLeads()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLeads();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLeads(dataConnect);

console.log(data.leads);

// Or, you can use the `Promise` API.
listLeads().then((response) => {
  const data = response.data;
  console.log(data.leads);
});
```

### Using `ListLeads`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLeadsRef } from '@dataconnect/generated';


// Call the `listLeadsRef()` function to get a reference to the query.
const ref = listLeadsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLeadsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.leads);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.leads);
});
```

## GetLeadById
You can execute the `GetLeadById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getLeadById(vars: GetLeadByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetLeadByIdData, GetLeadByIdVariables>;

interface GetLeadByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLeadByIdVariables): QueryRef<GetLeadByIdData, GetLeadByIdVariables>;
}
export const getLeadByIdRef: GetLeadByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLeadById(dc: DataConnect, vars: GetLeadByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetLeadByIdData, GetLeadByIdVariables>;

interface GetLeadByIdRef {
  ...
  (dc: DataConnect, vars: GetLeadByIdVariables): QueryRef<GetLeadByIdData, GetLeadByIdVariables>;
}
export const getLeadByIdRef: GetLeadByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLeadByIdRef:
```typescript
const name = getLeadByIdRef.operationName;
console.log(name);
```

### Variables
The `GetLeadById` query requires an argument of type `GetLeadByIdVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLeadByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetLeadById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLeadByIdData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLeadByIdData {
  lead?: {
    id: UUIDString;
    name: string;
    company?: string | null;
    email?: string | null;
    phone?: string | null;
    source?: string | null;
    salesperson?: string | null;
    status: string;
    value: number;
    createdAt: DateString;
    updatedAt: DateString;
  } & Lead_Key;
}
```
### Using `GetLeadById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLeadById, GetLeadByIdVariables } from '@dataconnect/generated';

// The `GetLeadById` query requires an argument of type `GetLeadByIdVariables`:
const getLeadByIdVars: GetLeadByIdVariables = {
  id: ..., 
};

// Call the `getLeadById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLeadById(getLeadByIdVars);
// Variables can be defined inline as well.
const { data } = await getLeadById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLeadById(dataConnect, getLeadByIdVars);

console.log(data.lead);

// Or, you can use the `Promise` API.
getLeadById(getLeadByIdVars).then((response) => {
  const data = response.data;
  console.log(data.lead);
});
```

### Using `GetLeadById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLeadByIdRef, GetLeadByIdVariables } from '@dataconnect/generated';

// The `GetLeadById` query requires an argument of type `GetLeadByIdVariables`:
const getLeadByIdVars: GetLeadByIdVariables = {
  id: ..., 
};

// Call the `getLeadByIdRef()` function to get a reference to the query.
const ref = getLeadByIdRef(getLeadByIdVars);
// Variables can be defined inline as well.
const ref = getLeadByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLeadByIdRef(dataConnect, getLeadByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lead);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lead);
});
```

## GetNotesByLead
You can execute the `GetNotesByLead` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getNotesByLead(vars: GetNotesByLeadVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotesByLeadData, GetNotesByLeadVariables>;

interface GetNotesByLeadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNotesByLeadVariables): QueryRef<GetNotesByLeadData, GetNotesByLeadVariables>;
}
export const getNotesByLeadRef: GetNotesByLeadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNotesByLead(dc: DataConnect, vars: GetNotesByLeadVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotesByLeadData, GetNotesByLeadVariables>;

interface GetNotesByLeadRef {
  ...
  (dc: DataConnect, vars: GetNotesByLeadVariables): QueryRef<GetNotesByLeadData, GetNotesByLeadVariables>;
}
export const getNotesByLeadRef: GetNotesByLeadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNotesByLeadRef:
```typescript
const name = getNotesByLeadRef.operationName;
console.log(name);
```

### Variables
The `GetNotesByLead` query requires an argument of type `GetNotesByLeadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNotesByLeadVariables {
  leadId: UUIDString;
}
```
### Return Type
Recall that executing the `GetNotesByLead` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNotesByLeadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetNotesByLeadData {
  notes: ({
    id: UUIDString;
    content: string;
    createdBy: string;
    createdByName: string;
    createdAt: DateString;
  } & Note_Key)[];
}
```
### Using `GetNotesByLead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNotesByLead, GetNotesByLeadVariables } from '@dataconnect/generated';

// The `GetNotesByLead` query requires an argument of type `GetNotesByLeadVariables`:
const getNotesByLeadVars: GetNotesByLeadVariables = {
  leadId: ..., 
};

// Call the `getNotesByLead()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNotesByLead(getNotesByLeadVars);
// Variables can be defined inline as well.
const { data } = await getNotesByLead({ leadId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNotesByLead(dataConnect, getNotesByLeadVars);

console.log(data.notes);

// Or, you can use the `Promise` API.
getNotesByLead(getNotesByLeadVars).then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

### Using `GetNotesByLead`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNotesByLeadRef, GetNotesByLeadVariables } from '@dataconnect/generated';

// The `GetNotesByLead` query requires an argument of type `GetNotesByLeadVariables`:
const getNotesByLeadVars: GetNotesByLeadVariables = {
  leadId: ..., 
};

// Call the `getNotesByLeadRef()` function to get a reference to the query.
const ref = getNotesByLeadRef(getNotesByLeadVars);
// Variables can be defined inline as well.
const ref = getNotesByLeadRef({ leadId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNotesByLeadRef(dataConnect, getNotesByLeadVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notes);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notes);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateLead
You can execute the `CreateLead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createLead(vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;

interface CreateLeadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
}
export const createLeadRef: CreateLeadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLead(dc: DataConnect, vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;

interface CreateLeadRef {
  ...
  (dc: DataConnect, vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
}
export const createLeadRef: CreateLeadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLeadRef:
```typescript
const name = createLeadRef.operationName;
console.log(name);
```

### Variables
The `CreateLead` mutation requires an argument of type `CreateLeadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLeadVariables {
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  salesperson?: string | null;
  status: string;
  value: number;
  createdAt: DateString;
  updatedAt: DateString;
}
```
### Return Type
Recall that executing the `CreateLead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLeadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLeadData {
  lead_insert: Lead_Key;
}
```
### Using `CreateLead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLead, CreateLeadVariables } from '@dataconnect/generated';

// The `CreateLead` mutation requires an argument of type `CreateLeadVariables`:
const createLeadVars: CreateLeadVariables = {
  name: ..., 
  company: ..., // optional
  email: ..., // optional
  phone: ..., // optional
  source: ..., // optional
  salesperson: ..., // optional
  status: ..., 
  value: ..., 
  createdAt: ..., 
  updatedAt: ..., 
};

// Call the `createLead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLead(createLeadVars);
// Variables can be defined inline as well.
const { data } = await createLead({ name: ..., company: ..., email: ..., phone: ..., source: ..., salesperson: ..., status: ..., value: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLead(dataConnect, createLeadVars);

console.log(data.lead_insert);

// Or, you can use the `Promise` API.
createLead(createLeadVars).then((response) => {
  const data = response.data;
  console.log(data.lead_insert);
});
```

### Using `CreateLead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLeadRef, CreateLeadVariables } from '@dataconnect/generated';

// The `CreateLead` mutation requires an argument of type `CreateLeadVariables`:
const createLeadVars: CreateLeadVariables = {
  name: ..., 
  company: ..., // optional
  email: ..., // optional
  phone: ..., // optional
  source: ..., // optional
  salesperson: ..., // optional
  status: ..., 
  value: ..., 
  createdAt: ..., 
  updatedAt: ..., 
};

// Call the `createLeadRef()` function to get a reference to the mutation.
const ref = createLeadRef(createLeadVars);
// Variables can be defined inline as well.
const ref = createLeadRef({ name: ..., company: ..., email: ..., phone: ..., source: ..., salesperson: ..., status: ..., value: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLeadRef(dataConnect, createLeadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lead_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lead_insert);
});
```

## UpdateLead
You can execute the `UpdateLead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateLead(vars: UpdateLeadVariables): MutationPromise<UpdateLeadData, UpdateLeadVariables>;

interface UpdateLeadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLeadVariables): MutationRef<UpdateLeadData, UpdateLeadVariables>;
}
export const updateLeadRef: UpdateLeadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLead(dc: DataConnect, vars: UpdateLeadVariables): MutationPromise<UpdateLeadData, UpdateLeadVariables>;

interface UpdateLeadRef {
  ...
  (dc: DataConnect, vars: UpdateLeadVariables): MutationRef<UpdateLeadData, UpdateLeadVariables>;
}
export const updateLeadRef: UpdateLeadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLeadRef:
```typescript
const name = updateLeadRef.operationName;
console.log(name);
```

### Variables
The `UpdateLead` mutation requires an argument of type `UpdateLeadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLeadVariables {
  id: UUIDString;
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  salesperson?: string | null;
  status: string;
  value: number;
  updatedAt: DateString;
}
```
### Return Type
Recall that executing the `UpdateLead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLeadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLeadData {
  lead_update?: Lead_Key | null;
}
```
### Using `UpdateLead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLead, UpdateLeadVariables } from '@dataconnect/generated';

// The `UpdateLead` mutation requires an argument of type `UpdateLeadVariables`:
const updateLeadVars: UpdateLeadVariables = {
  id: ..., 
  name: ..., 
  company: ..., // optional
  email: ..., // optional
  phone: ..., // optional
  source: ..., // optional
  salesperson: ..., // optional
  status: ..., 
  value: ..., 
  updatedAt: ..., 
};

// Call the `updateLead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLead(updateLeadVars);
// Variables can be defined inline as well.
const { data } = await updateLead({ id: ..., name: ..., company: ..., email: ..., phone: ..., source: ..., salesperson: ..., status: ..., value: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLead(dataConnect, updateLeadVars);

console.log(data.lead_update);

// Or, you can use the `Promise` API.
updateLead(updateLeadVars).then((response) => {
  const data = response.data;
  console.log(data.lead_update);
});
```

### Using `UpdateLead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLeadRef, UpdateLeadVariables } from '@dataconnect/generated';

// The `UpdateLead` mutation requires an argument of type `UpdateLeadVariables`:
const updateLeadVars: UpdateLeadVariables = {
  id: ..., 
  name: ..., 
  company: ..., // optional
  email: ..., // optional
  phone: ..., // optional
  source: ..., // optional
  salesperson: ..., // optional
  status: ..., 
  value: ..., 
  updatedAt: ..., 
};

// Call the `updateLeadRef()` function to get a reference to the mutation.
const ref = updateLeadRef(updateLeadVars);
// Variables can be defined inline as well.
const ref = updateLeadRef({ id: ..., name: ..., company: ..., email: ..., phone: ..., source: ..., salesperson: ..., status: ..., value: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLeadRef(dataConnect, updateLeadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lead_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lead_update);
});
```

## DeleteLead
You can execute the `DeleteLead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteLead(vars: DeleteLeadVariables): MutationPromise<DeleteLeadData, DeleteLeadVariables>;

interface DeleteLeadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLeadVariables): MutationRef<DeleteLeadData, DeleteLeadVariables>;
}
export const deleteLeadRef: DeleteLeadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLead(dc: DataConnect, vars: DeleteLeadVariables): MutationPromise<DeleteLeadData, DeleteLeadVariables>;

interface DeleteLeadRef {
  ...
  (dc: DataConnect, vars: DeleteLeadVariables): MutationRef<DeleteLeadData, DeleteLeadVariables>;
}
export const deleteLeadRef: DeleteLeadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLeadRef:
```typescript
const name = deleteLeadRef.operationName;
console.log(name);
```

### Variables
The `DeleteLead` mutation requires an argument of type `DeleteLeadVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLeadVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteLead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLeadData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLeadData {
  lead_delete?: Lead_Key | null;
}
```
### Using `DeleteLead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLead, DeleteLeadVariables } from '@dataconnect/generated';

// The `DeleteLead` mutation requires an argument of type `DeleteLeadVariables`:
const deleteLeadVars: DeleteLeadVariables = {
  id: ..., 
};

// Call the `deleteLead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLead(deleteLeadVars);
// Variables can be defined inline as well.
const { data } = await deleteLead({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLead(dataConnect, deleteLeadVars);

console.log(data.lead_delete);

// Or, you can use the `Promise` API.
deleteLead(deleteLeadVars).then((response) => {
  const data = response.data;
  console.log(data.lead_delete);
});
```

### Using `DeleteLead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLeadRef, DeleteLeadVariables } from '@dataconnect/generated';

// The `DeleteLead` mutation requires an argument of type `DeleteLeadVariables`:
const deleteLeadVars: DeleteLeadVariables = {
  id: ..., 
};

// Call the `deleteLeadRef()` function to get a reference to the mutation.
const ref = deleteLeadRef(deleteLeadVars);
// Variables can be defined inline as well.
const ref = deleteLeadRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLeadRef(dataConnect, deleteLeadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lead_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lead_delete);
});
```

## CreateNote
You can execute the `CreateNote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNote(vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface CreateNoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
}
export const createNoteRef: CreateNoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNote(dc: DataConnect, vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface CreateNoteRef {
  ...
  (dc: DataConnect, vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
}
export const createNoteRef: CreateNoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNoteRef:
```typescript
const name = createNoteRef.operationName;
console.log(name);
```

### Variables
The `CreateNote` mutation requires an argument of type `CreateNoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNoteVariables {
  leadId: UUIDString;
  content: string;
  createdBy: string;
  createdByName: string;
  createdAt: DateString;
}
```
### Return Type
Recall that executing the `CreateNote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNoteData {
  note_insert: Note_Key;
}
```
### Using `CreateNote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNote, CreateNoteVariables } from '@dataconnect/generated';

// The `CreateNote` mutation requires an argument of type `CreateNoteVariables`:
const createNoteVars: CreateNoteVariables = {
  leadId: ..., 
  content: ..., 
  createdBy: ..., 
  createdByName: ..., 
  createdAt: ..., 
};

// Call the `createNote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNote(createNoteVars);
// Variables can be defined inline as well.
const { data } = await createNote({ leadId: ..., content: ..., createdBy: ..., createdByName: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNote(dataConnect, createNoteVars);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
createNote(createNoteVars).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

### Using `CreateNote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNoteRef, CreateNoteVariables } from '@dataconnect/generated';

// The `CreateNote` mutation requires an argument of type `CreateNoteVariables`:
const createNoteVars: CreateNoteVariables = {
  leadId: ..., 
  content: ..., 
  createdBy: ..., 
  createdByName: ..., 
  createdAt: ..., 
};

// Call the `createNoteRef()` function to get a reference to the mutation.
const ref = createNoteRef(createNoteVars);
// Variables can be defined inline as well.
const ref = createNoteRef({ leadId: ..., content: ..., createdBy: ..., createdByName: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNoteRef(dataConnect, createNoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.note_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.note_insert);
});
```

