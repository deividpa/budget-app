import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteItem, fetchData, waait } from "../../helpers";

import Table from "../components/Table";

// loader
export async function expensesLoader() {
  const expenses = await fetchData("expenses");
  return { expenses };
}

// action
export async function expensesAction({ request }) {
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
}

const ExpensesPage = () => {

  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <h2>Recent Expenses <small>({expenses.length})</small></h2>
            <Table expenses={expenses} />
          </div>
        ) : (
          <p>No expenses found</p>
        )
      }
    </div>
  )
}

export default ExpensesPage