# Codex Summarization Questions

Use these prompts to practice asking Codex for different levels of code summaries.

## Whole App

1. Summarize this expense tracker app in five bullet points for a beginner developer.
2. Explain how data moves from the React form to the Express backend and back to the dashboard.
3. Give me a file-by-file summary of the backend and frontend.
4. What are the main responsibilities of the backend compared with the frontend?
5. Summarize the app as if I need to present it in a two-minute classroom demo.

## Backend

1. Summarize `backend/src/server.js` and list every API route it exposes.
2. Explain how transaction validation works in the backend.
3. What does `getSummary()` calculate, and which data structures does it use?
4. Summarize the difference between `getFilteredTransactions()` and `getBudgetProgress()`.
5. What are the limitations of this backend if we wanted to use it in production?

## Frontend

1. Summarize `frontend/src/App.jsx` by component responsibility and state variable.
2. Explain how the frontend loads transactions and summary data.
3. What happens when a user submits the Add transaction form?
4. Summarize the budget workflow in plain English.
5. Identify which UI elements read from the `summary` object.

## API Layer

1. Summarize `frontend/src/api.js` and explain why it has a shared `request()` helper.
2. Trace the `createTransaction()` call from button click to backend response.
3. Which functions in `api.js` mutate data, and which only fetch data?
4. Explain how query filters are built for `fetchTransactions()`.

## Debugging And Improvement

1. What bugs or edge cases might exist in this expense tracker?
2. Which parts of the code would you refactor first, and why?
3. What tests should be added for the backend routes?
4. What tests should be added for the React UI?
5. How would you modify this app to store data in a real database?

## Summary Formats

1. Create a one-paragraph executive summary of the app.
2. Create a high-level architecture summary.
3. Create a detailed onboarding summary for a new developer.
4. Create a table with each file, its purpose, and key functions.
5. Create a glossary of important variables and functions in this app.
