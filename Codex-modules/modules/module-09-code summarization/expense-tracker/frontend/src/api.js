const API_BASE_URL = import.meta.env.VITE_API_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || payload.errors?.join(", ") || "Request failed");
  }

  return payload;
}

export function fetchTransactions(filters = {}) {
  const query = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  const suffix = query.toString() ? `?${query.toString()}` : "";
  return request(`/api/transactions${suffix}`);
}

export function createTransaction(transaction) {
  return request("/api/transactions", {
    method: "POST",
    body: JSON.stringify(transaction)
  });
}

export function deleteTransaction(id) {
  return request(`/api/transactions/${id}`, {
    method: "DELETE"
  });
}

export function fetchSummary() {
  return request("/api/summary");
}

export function saveBudget(budget) {
  return request("/api/budgets", {
    method: "POST",
    body: JSON.stringify(budget)
  });
}
