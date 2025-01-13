import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData, waait } from "../../helpers";
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
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
      throw new Error("There was a problem creating your account");
    }
  }
  
  // create budget
  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created successfully");
    } catch (e) {
      throw new Error(`There was a problem creating your budget ${e.message}`);
    }
  }
}

const Dashboard = () => {
  const { userName, budgets } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {/* {budgets ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : <Intro />}
    </>
  );
};

export default Dashboard;