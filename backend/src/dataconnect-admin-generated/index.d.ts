import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

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

/** Generated Node Admin SDK operation action function for the 'CreateLead' Mutation. Allow users to execute without passing in DataConnect. */
export function createLead(dc: DataConnect, vars: CreateLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateLeadData>>;
/** Generated Node Admin SDK operation action function for the 'CreateLead' Mutation. Allow users to pass in custom DataConnect instances. */
export function createLead(vars: CreateLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateLeadData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateLead' Mutation. Allow users to execute without passing in DataConnect. */
export function updateLead(dc: DataConnect, vars: UpdateLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLeadData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateLead' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateLead(vars: UpdateLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateLeadData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteLead' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteLead(dc: DataConnect, vars: DeleteLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLeadData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteLead' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteLead(vars: DeleteLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteLeadData>>;

/** Generated Node Admin SDK operation action function for the 'CreateNote' Mutation. Allow users to execute without passing in DataConnect. */
export function createNote(dc: DataConnect, vars: CreateNoteVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateNoteData>>;
/** Generated Node Admin SDK operation action function for the 'CreateNote' Mutation. Allow users to pass in custom DataConnect instances. */
export function createNote(vars: CreateNoteVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateNoteData>>;

/** Generated Node Admin SDK operation action function for the 'ListLeads' Query. Allow users to execute without passing in DataConnect. */
export function listLeads(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListLeadsData>>;
/** Generated Node Admin SDK operation action function for the 'ListLeads' Query. Allow users to pass in custom DataConnect instances. */
export function listLeads(options?: OperationOptions): Promise<ExecuteOperationResponse<ListLeadsData>>;

/** Generated Node Admin SDK operation action function for the 'GetLeadById' Query. Allow users to execute without passing in DataConnect. */
export function getLeadById(dc: DataConnect, vars: GetLeadByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLeadByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetLeadById' Query. Allow users to pass in custom DataConnect instances. */
export function getLeadById(vars: GetLeadByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetLeadByIdData>>;

/** Generated Node Admin SDK operation action function for the 'GetNotesByLead' Query. Allow users to execute without passing in DataConnect. */
export function getNotesByLead(dc: DataConnect, vars: GetNotesByLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetNotesByLeadData>>;
/** Generated Node Admin SDK operation action function for the 'GetNotesByLead' Query. Allow users to pass in custom DataConnect instances. */
export function getNotesByLead(vars: GetNotesByLeadVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetNotesByLeadData>>;

