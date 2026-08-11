# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createLead, updateLead, deleteLead, createNote, listLeads, getLeadById, getNotesByLead } from '@dataconnect/generated';


// Operation CreateLead:  For variables, look at type CreateLeadVars in ../index.d.ts
const { data } = await CreateLead(dataConnect, createLeadVars);

// Operation UpdateLead:  For variables, look at type UpdateLeadVars in ../index.d.ts
const { data } = await UpdateLead(dataConnect, updateLeadVars);

// Operation DeleteLead:  For variables, look at type DeleteLeadVars in ../index.d.ts
const { data } = await DeleteLead(dataConnect, deleteLeadVars);

// Operation CreateNote:  For variables, look at type CreateNoteVars in ../index.d.ts
const { data } = await CreateNote(dataConnect, createNoteVars);

// Operation ListLeads: 
const { data } = await ListLeads(dataConnect);

// Operation GetLeadById:  For variables, look at type GetLeadByIdVars in ../index.d.ts
const { data } = await GetLeadById(dataConnect, getLeadByIdVars);

// Operation GetNotesByLead:  For variables, look at type GetNotesByLeadVars in ../index.d.ts
const { data } = await GetNotesByLead(dataConnect, getNotesByLeadVars);


```