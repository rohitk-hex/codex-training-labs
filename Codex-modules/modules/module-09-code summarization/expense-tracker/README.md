# Expense Tracker App

This sample app is for the code summarization lab. It includes a simple Node.js backend and a React frontend that participants can inspect with Codex.

## Project Layout

- `backend/` - Express API with in-memory expense, income, budget, and summary endpoints.
- `frontend/` - React UI for adding transactions, viewing totals, filtering records, and setting category budgets.

## Run The Backend

```powershell
cd backend
npm install
npm start
```

The backend runs on `http://localhost:4100`.

## Run The Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs on the Vite URL printed in the terminal, usually `http://localhost:5173`.

## API Overview

- `GET /api/transactions` - List transactions, optionally filtered by `type`, `category`, or `search`.
- `POST /api/transactions` - Add an income or expense transaction.
- `PUT /api/transactions/:id` - Update a transaction.
- `DELETE /api/transactions/:id` - Delete a transaction.
- `GET /api/budgets` - List budgets.
- `POST /api/budgets` - Create or update a category budget.
- `GET /api/summary` - Return totals, balance, top category, recent transactions, and budget progress.

Data is stored in memory, so it resets when the backend restarts.
