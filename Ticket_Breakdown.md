# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

***

## User Story
As a Facility user, I want to be able to store custom ids for my Agents so that I can identify them better on the generated reports.

## 1. Add custom id field to Agents table on the database

### Details:
Update Agents database to include the new "custom_id" field, to allow Facilities to handle their own custom ids for Agents.

### Acceptance Criteria:
- Update Agents table and create a new column named "custom_id" on the DB.
- "custom_id" is a string with a maximum size of 50.
- "custom_id" field must be unique.
- "custom_id" field is nullable.
- "custom_id" field must be indexed using Hash for faster retrieval.

### Technical Details:
- Use DB migration tool to generate the new field following the guidelines metioned above.
- Update documentation.

### Estimation:
8 hours

## 2. Refactor getShiftsByFacility to include agent's "custom_id"

### Details:
Refactor getShiftsByFacility function to return agent's "custom_id" field.

### Acceptance Criteria:
- The function getShiftsByFacility is refactored and the custom_id field is added to the returning agent's data.
- If custom_id is not set for an Agent (null value on DB), null is returned as the value for the field on the object.

### Technical Details:
- Update query used to retrieve the data to include the "custom_id" in the selected columns.
- Update AgentModel file and include "custom_id" attribute. The field should be:
    - String
    - maximun size: 50
    - nullable
    - unique
- Update unit tests to include the "custom_id" field.
- Update documentation.

### Estimation:
8 hours

## 3. Refactor generateReport to include "custom_id" field

### Details:
Refactor the report generation logic and replace the internal database id (primary key) by the "custom_id" field whenever possible.

### Acceptance Criteria:

- Replace each reference to the "id" on the report to use the "custom_id" instead. This is true only if "custom_id" is not null.
- If agent's "custom_id" field is null on the DB, use the "id" instead.

### Technical Details:
- Refactor function generateReport and replace any reference to the "id" by  the "custom_id" instead 
- Add logic to ensure that the "id" is used as a fallback when the "custom_id" is null.
- Update unit tests to include the "custom_id" field.
- Update documentation.

### Estimation:
8 hours

## 4. Add "custom_id" field for on Agent creation/update

### Details:
Enable Facility to set a value for the new "custom_id" field related to the Agent.

### Acceptance Criteria:

- New text input field is added to the Agent creation/update form.
- The input field is not required.
- Input's value is saved to database when user clicks the save button.

### Implementation Details:

- Refeactor frontend componenet and add a new text input field for Agent create/update in the UI.
- Update API/Controller to acept the the "custom_id" field
- Update documentation.

### Estimation:
8 hours