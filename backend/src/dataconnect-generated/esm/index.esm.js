import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'backend',
  location: 'us-east4'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
export const createLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLead', inputVars);
}
createLeadRef.operationName = 'CreateLead';

export function createLead(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createLeadRef(dcInstance, inputVars));
}

export const updateLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLead', inputVars);
}
updateLeadRef.operationName = 'UpdateLead';

export function updateLead(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateLeadRef(dcInstance, inputVars));
}

export const deleteLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLead', inputVars);
}
deleteLeadRef.operationName = 'DeleteLead';

export function deleteLead(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteLeadRef(dcInstance, inputVars));
}

export const createNoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNote', inputVars);
}
createNoteRef.operationName = 'CreateNote';

export function createNote(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createNoteRef(dcInstance, inputVars));
}

export const listLeadsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLeads');
}
listLeadsRef.operationName = 'ListLeads';

export function listLeads(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listLeadsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getLeadByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLeadById', inputVars);
}
getLeadByIdRef.operationName = 'GetLeadById';

export function getLeadById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLeadByIdRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

export const getNotesByLeadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNotesByLead', inputVars);
}
getNotesByLeadRef.operationName = 'GetNotesByLead';

export function getNotesByLead(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getNotesByLeadRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}

