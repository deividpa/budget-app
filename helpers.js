export const waait = () => new Promise(res => setTimeout(res, Math.random() * 2000));

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