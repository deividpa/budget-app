export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// Generate random color
export const generateRandomColor = () => {
    const existigBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${existigBudgetsLength * 34} 65% 50%`;
}

// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// create new budget
export const createBudget = ({ name, amount }) => {
    const newItem ={
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
}

// create new expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId,
    };

    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
}

// Delete data from local storage
export const deleteData = ({ key }) => {
    localStorage.removeItem(key);
}

// Total spent on a budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    return expenses.reduce((acc, expense) => {
        if (expense.budgetId === budgetId) {
            return acc + expense.amount;
        }
        return acc;
    }, 0);
}

// Formatting

// Formate date to locale string
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
}

// Format currency
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
    });
}

// Format percentage
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}