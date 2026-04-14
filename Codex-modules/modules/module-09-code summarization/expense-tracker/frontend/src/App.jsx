import { useEffect, useMemo, useState } from "react";
import {
  createTransaction,
  deleteTransaction,
  fetchSummary,
  fetchTransactions,
  saveBudget
} from "./api";

const today = new Date().toISOString().slice(0, 10);
const currentMonth = today.slice(0, 7);

const initialTransaction = {
  type: "expense",
  amount: "",
  category: "Food",
  description: "",
  paymentMethod: "Debit card",
  date: today
};

function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value || 0);
}

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [transactionForm, setTransactionForm] = useState(initialTransaction);
  const [budgetForm, setBudgetForm] = useState({
    category: "Food",
    month: currentMonth,
    limit: 500
  });
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    search: ""
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => {
    const defaultCategories = ["Food", "Travel", "Rent", "Shopping", "Bills", "Health", "Salary"];
    const transactionCategories = transactions.map((transaction) => transaction.category);
    return [...new Set([...defaultCategories, ...transactionCategories])];
  }, [transactions]);

  async function loadDashboard(nextFilters = filters) {
    setLoading(true);
    const [nextTransactions, nextSummary] = await Promise.all([
      fetchTransactions(nextFilters),
      fetchSummary()
    ]);
    setTransactions(nextTransactions);
    setSummary(nextSummary);
    setLoading(false);
  }

  useEffect(() => {
    loadDashboard().catch((error) => {
      setStatus(error.message);
      setLoading(false);
    });
  }, []);

  function updateTransactionField(field, value) {
    setTransactionForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateFilter(field, value) {
    const nextFilters = {
      ...filters,
      [field]: value
    };
    setFilters(nextFilters);
    loadDashboard(nextFilters).catch((error) => setStatus(error.message));
  }

  async function handleTransactionSubmit(event) {
    event.preventDefault();
    setStatus("");

    try {
      await createTransaction(transactionForm);
      setTransactionForm({
        ...initialTransaction,
        type: transactionForm.type,
        category: transactionForm.category,
        paymentMethod: transactionForm.paymentMethod
      });
      await loadDashboard();
      setStatus("Transaction saved.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleBudgetSubmit(event) {
    event.preventDefault();
    setStatus("");

    try {
      await saveBudget({
        ...budgetForm,
        limit: Number(budgetForm.limit)
      });
      await loadDashboard();
      setStatus("Budget saved.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleDelete(id) {
    setStatus("");

    try {
      await deleteTransaction(id);
      await loadDashboard();
      setStatus("Transaction deleted.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <main className="app-shell">
      <section className="dashboard-band" aria-label="Expense dashboard">
        <div>
          <p className="eyebrow">Code summarization lab</p>
          <h1>Expense Tracker</h1>
          <p className="intro">
            Track income, record spending, review budget progress, and use the codebase for
            summarization practice.
          </p>
        </div>

        <div className="summary-grid" aria-live="polite">
          <article className="metric">
            <span>Total income</span>
            <strong>{formatMoney(summary?.totalIncome)}</strong>
          </article>
          <article className="metric">
            <span>Total expenses</span>
            <strong>{formatMoney(summary?.totalExpenses)}</strong>
          </article>
          <article className="metric">
            <span>Balance</span>
            <strong>{formatMoney(summary?.balance)}</strong>
          </article>
          <article className="metric">
            <span>Top category</span>
            <strong>{summary?.topCategory || "Loading"}</strong>
          </article>
        </div>
      </section>

      <section className="workspace">
        <form className="panel" onSubmit={handleTransactionSubmit}>
          <h2>Add transaction</h2>
          <label>
            Type
            <select
              value={transactionForm.type}
              onChange={(event) => updateTransactionField("type", event.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>

          <label>
            Amount
            <input
              type="number"
              min="0"
              step="0.01"
              value={transactionForm.amount}
              onChange={(event) => updateTransactionField("amount", event.target.value)}
              placeholder="86.50"
            />
          </label>

          <label>
            Category
            <input
              value={transactionForm.category}
              onChange={(event) => updateTransactionField("category", event.target.value)}
              placeholder="Food"
            />
          </label>

          <label>
            Description
            <input
              value={transactionForm.description}
              onChange={(event) => updateTransactionField("description", event.target.value)}
              placeholder="Groceries"
            />
          </label>

          <label>
            Payment method
            <input
              value={transactionForm.paymentMethod}
              onChange={(event) => updateTransactionField("paymentMethod", event.target.value)}
              placeholder="Debit card"
            />
          </label>

          <label>
            Date
            <input
              type="date"
              value={transactionForm.date}
              onChange={(event) => updateTransactionField("date", event.target.value)}
            />
          </label>

          <button type="submit">Save transaction</button>
        </form>

        <form className="panel budget-panel" onSubmit={handleBudgetSubmit}>
          <h2>Budget</h2>
          <label>
            Category
            <input
              value={budgetForm.category}
              onChange={(event) =>
                setBudgetForm((current) => ({ ...current, category: event.target.value }))
              }
            />
          </label>

          <label>
            Month
            <input
              type="month"
              value={budgetForm.month}
              onChange={(event) =>
                setBudgetForm((current) => ({ ...current, month: event.target.value }))
              }
            />
          </label>

          <label>
            Limit
            <input
              type="number"
              min="0"
              step="1"
              value={budgetForm.limit}
              onChange={(event) =>
                setBudgetForm((current) => ({ ...current, limit: event.target.value }))
              }
            />
          </label>

          <button type="submit">Save budget</button>

          <div className="budget-list">
            {summary?.budgetProgress?.map((budget) => (
              <div className="budget-row" key={budget.id}>
                <span>{budget.category}</span>
                <span>
                  {formatMoney(budget.spent)} of {formatMoney(budget.limit)}
                </span>
                <strong className={budget.status}>{budget.status}</strong>
              </div>
            ))}
          </div>
        </form>
      </section>

      <section className="transaction-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ledger</p>
            <h2>Transactions</h2>
          </div>
          {status && <p className="status">{status}</p>}
        </div>

        <div className="filters">
          <select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)}>
            <option value="">All types</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search description"
          />
        </div>

        <div className="transaction-list">
          {loading && <p>Loading transactions...</p>}
          {!loading &&
            transactions.map((transaction) => (
              <article className="transaction-row" key={transaction.id}>
                <div>
                  <strong>{transaction.description || transaction.category}</strong>
                  <span>
                    {transaction.category} | {transaction.paymentMethod || "No method"} |{" "}
                    {transaction.date}
                  </span>
                </div>
                <div className="amount-actions">
                  <strong className={transaction.type}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatMoney(transaction.amount)}
                  </strong>
                  <button type="button" onClick={() => handleDelete(transaction.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          {!loading && transactions.length === 0 && <p>No transactions match the current filters.</p>}
        </div>
      </section>
    </main>
  );
}

export default App;
