import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

import { Link, useLoaderData } from "react-router-dom";
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../../helpers";
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);
  
  // create user
  if (_action === "createUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Werlcome, ${values.userName}`);
    } catch (e) {
      throw new Error(`There was a problem creating your expense ${e.message}`);
    }
  }
  
  // create budget
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created successfully!");
    } catch (e) {
      throw new Error(`There was a problem creating your budget ${e.message}`);
    }
  }

  // create expense
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error(`There was a problem creating your expense ${e.message}`);
    }
  }

  // delete expense
  if (_action === "deleteExpense") {
    try {
      deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success("Expense deleted successfully!");
    } catch (e) {
      throw new Error(`There was a problem deleting your expense ${e.message}`);
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {
              budgets && budgets.length > 0 ? (
                <div className="grid-lg">
                  <div className="flex-lg">
                    <AddBudgetForm />
                    <AddExpenseForm budgets={budgets} />
                  </div>
                  <h2>Existing Budgets</h2>
                  <div className="budgets">
                    {
                      budgets.map((budget) => (
                        <BudgetItem key={budget.id} budget={budget} />
                      ))
                    }
                  </div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Recent Expenses</h2>
                        <Table expenses={expenses} />
                        { expenses.length > 8 && (
                          <Link to="expenses" className="btn btn--dark">View all expenses</Link>
                        )}
                      </div>
                    )
                  }
                </div>
              ) : (
                <div className="grid-sm">
                  <p>Personal budgeting is the secret of financial freedom</p>
                  <p>Create a budget to get started!</p>
                  <AddBudgetForm />
                </div>
              )
            }
          </div>
        </div>
      ) : <Intro />}
    </>
  );
};

export default Dashboard;