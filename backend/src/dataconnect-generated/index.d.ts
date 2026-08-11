import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateLeadData {
  lead_insert: Lead_Key;
}

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

export interface CreateNoteData {
  note_insert: Note_Key;
}

export interface CreateNoteVariables {
  leadId: UUIDString;
  content: string;
  createdBy: string;
  createdByName: string;
  createdAt: DateString;
}

export interface DeleteLeadData {
  lead_delete?: Lead_Key | null;
}

export interface DeleteLeadVariables {
  id: UUIDString;
}

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

export interface GetLeadByIdVariables {
  id: UUIDString;
}

export interface GetNotesByLeadData {
  notes: ({
    id: UUIDString;
    content: string;
    createdBy: string;
    createdByName: string;
    createdAt: DateString;
  } & Note_Key)[];
}

export interface GetNotesByLeadVariables {
  leadId: UUIDString;
}

export interface Lead_Key {
  id: UUIDString;
  __typename?: 'Lead_Key';
}

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

export interface Note_Key {
  id: UUIDString;
  __typename?: 'Note_Key';
}

export interface UpdateLeadData {
  lead_update?: Lead_Key | null;
}

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

interface CreateLeadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLeadVariables): MutationRef<CreateLeadData, CreateLeadVariables>;
  operationName: string;
}
export const createLeadRef: CreateLeadRef;

export function createLead(vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;
export function createLead(dc: DataConnect, vars: CreateLeadVariables): MutationPromise<CreateLeadData, CreateLeadVariables>;

interface UpdateLeadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLeadVariables): MutationRef<UpdateLeadData, UpdateLeadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLeadVariables): MutationRef<UpdateLeadData, UpdateLeadVariables>;
  operationName: string;
}
export const updateLeadRef: UpdateLeadRef;

export function updateLead(vars: UpdateLeadVariables): MutationPromise<UpdateLeadData, UpdateLeadVariables>;
export function updateLead(dc: DataConnect, vars: UpdateLeadVariables): MutationPromise<UpdateLeadData, UpdateLeadVariables>;

interface DeleteLeadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLeadVariables): MutationRef<DeleteLeadData, DeleteLeadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLeadVariables): MutationRef<DeleteLeadData, DeleteLeadVariables>;
  operationName: string;
}
export const deleteLeadRef: DeleteLeadRef;

export function deleteLead(vars: DeleteLeadVariables): MutationPromise<DeleteLeadData, DeleteLeadVariables>;
export function deleteLead(dc: DataConnect, vars: DeleteLeadVariables): MutationPromise<DeleteLeadData, DeleteLeadVariables>;

interface CreateNoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNoteVariables): MutationRef<CreateNoteData, CreateNoteVariables>;
  operationName: string;
}
export const createNoteRef: CreateNoteRef;

export function createNote(vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;
export function createNote(dc: DataConnect, vars: CreateNoteVariables): MutationPromise<CreateNoteData, CreateNoteVariables>;

interface ListLeadsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLeadsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLeadsData, undefined>;
  operationName: string;
}
export const listLeadsRef: ListLeadsRef;

export function listLeads(options?: ExecuteQueryOptions): QueryPromise<ListLeadsData, undefined>;
export function listLeads(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLeadsData, undefined>;

interface GetLeadByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLeadByIdVariables): QueryRef<GetLeadByIdData, GetLeadByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLeadByIdVariables): QueryRef<GetLeadByIdData, GetLeadByIdVariables>;
  operationName: string;
}
export const getLeadByIdRef: GetLeadByIdRef;

export function getLeadById(vars: GetLeadByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetLeadByIdData, GetLeadByIdVariables>;
export function getLeadById(dc: DataConnect, vars: GetLeadByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetLeadByIdData, GetLeadByIdVariables>;

interface GetNotesByLeadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNotesByLeadVariables): QueryRef<GetNotesByLeadData, GetNotesByLeadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetNotesByLeadVariables): QueryRef<GetNotesByLeadData, GetNotesByLeadVariables>;
  operationName: string;
}
export const getNotesByLeadRef: GetNotesByLeadRef;

export function getNotesByLead(vars: GetNotesByLeadVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotesByLeadData, GetNotesByLeadVariables>;
export function getNotesByLead(dc: DataConnect, vars: GetNotesByLeadVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotesByLeadData, GetNotesByLeadVariables>;

