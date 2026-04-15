# Test Cases For The ToDo Stack

This document lists sample test cases for the React + Node ToDo application. The cases are written in a QA/testing-document style so they can be converted into manual tests, automated tests, or Codex prompts.

## Test Environment

- Backend: Node.js API running on `http://localhost:4000`
- Frontend: React app running on the configured Vite URL
- Test data: Use unique task titles for every run, such as `QA task <timestamp>`
- Scope: Create task, list tasks, toggle completion, validation, and basic app reliability

## 1. Unit Testing

### TC-UNIT-001: Validate Required Task Title

- Objective: Confirm the task validation logic rejects missing or empty task titles.
- Preconditions: Backend validation function or equivalent logic is available for testing.
- Test Data:
  - `{ title: "" }`
  - `{ title: "   " }`
  - `{}`
- Steps:
  1. Call the task validation logic with an empty title.
  2. Call it again with a whitespace-only title.
  3. Call it again with no title field.
- Expected Result:
  - Each invalid payload returns a validation error.
  - No task object is created from invalid input.
- Priority: High

### TC-UNIT-002: Validate Correct Task Payload

- Objective: Confirm a valid task title passes validation.
- Preconditions: Backend validation function or equivalent logic is available for testing.
- Test Data: `{ title: "Buy notebooks", due: "2026-04-20", notes: "For class" }`
- Steps:
  1. Call the validation logic with the valid payload.
  2. Capture the validation result.
- Expected Result:
  - Validation passes without an error.
  - Optional fields do not block task creation.
- Priority: High

### TC-UNIT-003: Toggle Completed State

- Objective: Confirm task completion state can be flipped from false to true and back to false.
- Preconditions: Toggle logic or equivalent task state update logic is available.
- Test Data: `{ id: "task-1", title: "Unit test task", completed: false }`
- Steps:
  1. Toggle the task once.
  2. Verify `completed` becomes `true`.
  3. Toggle the same task again.
  4. Verify `completed` becomes `false`.
- Expected Result:
  - The first toggle marks the task complete.
  - The second toggle clears the completed flag.
- Priority: High

## 2. Integration Testing

### TC-INT-001: Create Task And Retrieve It From The API

- Objective: Confirm the backend can create a task and return it from the task list.
- Preconditions: Backend server is running.
- Test Data: `{ title: "Integration task", due: null, notes: "Created by integration test" }`
- Steps:
  1. Send `POST /tasks` with the test payload.
  2. Confirm the response status is `201`.
  3. Send `GET /tasks`.
  4. Search the returned list for the created task ID.
- Expected Result:
  - The created task appears in the task list.
  - The task has `completed: false`.
  - The response includes `id`, `title`, and `createdAt`.
- Priority: High

### TC-INT-002: Create Task And Toggle Completion Twice

- Objective: Confirm POST and PATCH endpoints work together and the second PATCH clears completion.
- Preconditions: Backend server is running.
- Test Data: `{ title: "Toggle integration task" }`
- Steps:
  1. Send `POST /tasks`.
  2. Store the returned task ID.
  3. Send `PATCH /tasks/:id/complete`.
  4. Verify `completed` is `true`.
  5. Send `PATCH /tasks/:id/complete` again.
  6. Verify `completed` is `false`.
- Expected Result:
  - The task is created successfully.
  - The first PATCH marks it complete.
  - The second PATCH clears the completed flag.
- Priority: High

## 3. End-To-End Testing

### TC-E2E-001: Add A Task Through The UI

- Objective: Confirm a user can create a task from the React frontend and see it in the list.
- Preconditions:
  - Backend server is running.
  - Frontend app is running.
- Test Data:
  - Title: `E2E task`
  - Due date: Any valid future date
  - Notes: `Created from end-to-end test`
- Steps:
  1. Open the frontend app in a browser.
  2. Enter the title, due date, and notes.
  3. Click the save/submit button.
  4. Wait for the task list to update.
- Expected Result:
  - A success message is displayed.
  - The new task appears in the task list.
  - The task shows the entered title, due date, and notes.
- Priority: High

### TC-E2E-002: Complete And Reopen A Task Through The UI

- Objective: Confirm the user can toggle task completion from the frontend.
- Preconditions:
  - Backend and frontend are running.
  - At least one task exists in the UI.
- Test Data: Existing task from TC-E2E-001
- Steps:
  1. Click the completion button for the task.
  2. Confirm the task appears completed.
  3. Click the same button again.
  4. Confirm the task appears active or incomplete.
- Expected Result:
  - The UI updates after each click.
  - The task can move from incomplete to complete and back to incomplete.
- Priority: High

## 4. Front End Testing

### TC-FE-001: Required Title Field Prevents Empty Submission

- Objective: Confirm the frontend does not submit a task without a title.
- Preconditions: Frontend app is running.
- Test Data:
  - Title: empty
  - Due date: optional
  - Notes: optional
- Steps:
  1. Open the task form.
  2. Leave the title field empty.
  3. Click the submit button.
- Expected Result:
  - The browser or app prevents submission.
  - No new task is added to the list.
- Priority: High

### TC-FE-002: Form Clears After Successful Save

- Objective: Confirm form fields reset after a successful task submission.
- Preconditions:
  - Frontend and backend are running.
  - Backend is reachable from the frontend.
- Test Data:
  - Title: `Frontend form reset task`
  - Notes: `Check field reset`
- Steps:
  1. Enter task details in the form.
  2. Submit the form.
  3. Observe the form fields after success.
- Expected Result:
  - The title field is cleared.
  - Optional fields are cleared.
  - A success message is displayed.
- Priority: Medium

### TC-FE-003: Error Message Displays When Backend Is Unavailable

- Objective: Confirm the frontend shows a useful error when the backend cannot be reached.
- Preconditions:
  - Frontend is running.
  - Backend server is stopped.
- Test Data: `{ title: "Backend unavailable task" }`
- Steps:
  1. Open the frontend app.
  2. Try to submit a new task.
- Expected Result:
  - The UI displays an error state.
  - The page does not crash.
  - The user can retry after the backend is restored.
- Priority: Medium

## 5. API Testing

### TC-API-001: GET Tasks Returns A JSON Array

- Objective: Confirm `GET /tasks` returns a valid JSON list.
- Preconditions: Backend server is running.
- Steps:
  1. Send `GET /tasks`.
  2. Check the response status.
  3. Check the response body type.
- Expected Result:
  - Status code is `200`.
  - Response body is a JSON array.
- Priority: High

### TC-API-002: POST Task Requires Title

- Objective: Confirm `POST /tasks` rejects requests without a valid title.
- Preconditions: Backend server is running.
- Test Data: `{ notes: "Missing title" }`
- Steps:
  1. Send `POST /tasks` with no title.
  2. Check the response status and body.
- Expected Result:
  - Status code is `400`.
  - Response body contains an error message.
  - No task is created.
- Priority: High

### TC-API-003: PATCH Missing Task Returns 404

- Objective: Confirm the API handles unknown task IDs correctly.
- Preconditions: Backend server is running.
- Test Data: `missing-task-id`
- Steps:
  1. Send `PATCH /tasks/missing-task-id/complete`.
  2. Check the response status and body.
- Expected Result:
  - Status code is `404`.
  - Response body contains `Task not found` or an equivalent error.
- Priority: High

## 6. Performance Testing

### TC-PERF-001: GET Tasks Responds Within Acceptable Time

- Objective: Confirm the task list endpoint responds quickly under normal load.
- Preconditions: Backend server is running.
- Load Profile: 100 `GET /tasks` requests.
- Steps:
  1. Send 100 requests to `GET /tasks`.
  2. Record response times.
  3. Calculate average and 95th percentile response time.
- Expected Result:
  - Error rate is 0%.
  - Average response time is below 150 ms in a local test environment.
  - 95th percentile response time is below 300 ms in a local test environment.
- Priority: Medium

### TC-PERF-002: POST Tasks Handles Repeated Submissions

- Objective: Confirm the API can handle repeated task creation without failures.
- Preconditions: Backend server is running.
- Load Profile: 50 sequential or concurrent `POST /tasks` requests with unique titles.
- Steps:
  1. Generate 50 unique task payloads.
  2. Submit them to `POST /tasks`.
  3. Record response status and response time.
  4. Send `GET /tasks` and confirm created tasks are present.
- Expected Result:
  - All valid POST requests return `201`.
  - No duplicate ID is generated.
  - The server remains responsive after the test.
- Priority: Medium

## 7. Security Testing

### TC-SEC-001: Reject Empty Or Whitespace Title

- Objective: Confirm the API does not accept invalid task titles.
- Preconditions: Backend server is running.
- Test Data:
  - `{ title: "" }`
  - `{ title: "   " }`
- Steps:
  1. Send each payload to `POST /tasks`.
  2. Observe status codes and response bodies.
- Expected Result:
  - Each request returns `400`.
  - No invalid task is created.
- Priority: High

### TC-SEC-002: Handle Script-Like Input Safely

- Objective: Confirm script-like task input does not execute in the UI.
- Preconditions:
  - Backend and frontend are running.
  - Frontend displays task titles from the backend.
- Test Data: `{ title: "<script>alert('xss')</script>" }`
- Steps:
  1. Submit the script-like title through the API or UI.
  2. Load the frontend task list.
  3. Observe whether any script executes.
- Expected Result:
  - The title is displayed as text or safely handled.
  - No alert or injected script runs.
  - The app remains usable.
- Priority: High

### TC-SEC-003: Large Payload Does Not Crash The Server

- Objective: Confirm unusually large input is handled safely.
- Preconditions: Backend server is running.
- Test Data: A task title or notes field with several thousand characters.
- Steps:
  1. Send the large payload to `POST /tasks`.
  2. Observe the response.
  3. Send `GET /tasks` after the request.
- Expected Result:
  - The server returns a controlled response.
  - The server does not crash.
  - Follow-up API requests still work.
- Priority: Medium

## 8. Regression Testing

### TC-REG-001: Create And Toggle Flow Still Works After Changes

- Objective: Confirm core task behavior remains stable after code changes.
- Preconditions:
  - Latest frontend and backend code is running.
  - Any new feature branch changes are included.
- Steps:
  1. Create a task using `POST /tasks` or the UI.
  2. Toggle completion once.
  3. Toggle completion again.
  4. Retrieve the task list.
- Expected Result:
  - Task creation still works.
  - Completion toggling still works.
  - The final task state is correct.
- Priority: High

### TC-REG-002: Validation Behavior Does Not Regress

- Objective: Confirm invalid task creation remains blocked after updates.
- Preconditions: Backend server is running with latest code.
- Test Data:
  - Missing title
  - Empty title
  - Whitespace-only title
- Steps:
  1. Submit each invalid payload to `POST /tasks`.
  2. Check response status and error message.
- Expected Result:
  - Each invalid request returns `400`.
  - Error response remains understandable.
  - Invalid tasks are not added to the task list.
- Priority: High

## 9. Smoke Testing

### TC-SMOKE-001: Backend Starts And Responds

- Objective: Confirm the backend is running before deeper testing begins.
- Preconditions: Backend dependencies are installed.
- Steps:
  1. Start the backend server.
  2. Send `GET /tasks`.
- Expected Result:
  - Server starts without errors.
  - `GET /tasks` returns status `200`.
  - Response body is a JSON array.
- Priority: Critical

### TC-SMOKE-002: Frontend Loads Successfully

- Objective: Confirm the React frontend opens in the browser.
- Preconditions:
  - Frontend dependencies are installed.
  - Frontend dev server is running.
- Steps:
  1. Open the frontend URL in a browser.
  2. Confirm the main page renders.
- Expected Result:
  - Page loads without a blank screen.
  - Task form is visible.
  - No critical console error blocks app usage.
- Priority: Critical

### TC-SMOKE-003: Basic Task Creation Works

- Objective: Confirm the app can perform its most important action.
- Preconditions:
  - Backend and frontend are running.
  - Frontend can connect to backend.
- Test Data: `{ title: "Smoke test task" }`
- Steps:
  1. Submit a new task through the UI.
  2. Observe the task list.
- Expected Result:
  - Task is saved successfully.
  - Task appears in the list.
- Priority: Critical

## 10. Acceptance Testing

### TC-ACC-001: User Can Manage A Task From Creation To Completion

- Objective: Confirm the application satisfies the core user requirement.
- User Story: As a user, I want to add a task and mark it complete so that I can track my work.
- Preconditions:
  - Backend and frontend are running.
  - User can access the frontend in a browser.
- Acceptance Criteria:
  - User can enter a task title.
  - User can optionally enter due date and notes.
  - User can save the task.
  - User can see the saved task in the list.
  - User can mark the task complete.
  - User can mark the task incomplete again.
- Steps:
  1. Open the frontend app.
  2. Enter a valid task title.
  3. Add optional due date and notes.
  4. Submit the form.
  5. Confirm the task appears in the list.
  6. Mark the task complete.
  7. Mark the task incomplete.
- Expected Result:
  - The full user journey succeeds without errors.
  - The final task state matches the last user action.
- Priority: High

### TC-ACC-002: User Receives Feedback For Invalid Input

- Objective: Confirm the app guides the user when required input is missing.
- User Story: As a user, I want to know when I missed required information so that I can correct it.
- Preconditions: Frontend app is running.
- Acceptance Criteria:
  - Empty title cannot be submitted.
  - User receives visible validation feedback.
  - No invalid task appears in the list.
- Steps:
  1. Open the frontend app.
  2. Leave the task title empty.
  3. Try to submit the form.
- Expected Result:
  - Submission is blocked.
  - The user can correct the title and submit again.
- Priority: High
