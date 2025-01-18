
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingBudgets, waait } from "../../helpers";

export const deleteBudget = async ({ params }) => {
  const { id } = params;
  
  try {
    // Delete Budget
    await deleteItem({ key: "budgets", id });

    // Find and delete associated expenses
    const associatedExpenses = getAllMatchingBudgets({
      category: "expenses",
      key: "budgetId",
      value: id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({ key: "expenses", id: expense.id });
    }); 

    // Notify user
    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error(`There was a problem deleting your budget ${e.message}`);
  }

  await waait();
  return redirect("/");
}