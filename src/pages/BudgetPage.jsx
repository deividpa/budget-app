import { useLoaderData } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingBudgets, waait } from "../../helpers";

import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function budgetLoader({ params}) {
  const budget = await getAllMatchingBudgets({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingBudgets({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The Budget you are looking for does not exist");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  await waait();

  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);

  // delete expense
  if (_action === "deleteExpense") {
    try {
      deleteItem({ key: "expenses", id: values.expenseId });
      return toast.success("Expense deleted successfully!");
    } catch (e) {
      throw new Error(`There was a problem deleting your expense ${e.message}`);
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
}

const BudgetPage = () => {

  const { budget, expenses } = useLoaderData();

  return (
    <div 
      className='grid-lg'
      style={{"--accent": budget.color}}
    >
      <h1 className="h2">
        <span className="accent">{budget.name} </span>
        <span>Overview</span>
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {
        expenses && expenses.length > 0 && (
          <>
            <h2>
              <span className="accent">{budget.name} </span>
              <span>Expenses</span>
            </h2>
            <Table expenses={expenses} showBudget={false} />
          </>
      )}
    </div>
  )
}

export default BudgetPage