import { redirect } from "react-router-dom";
import { deleteData } from "../../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  // delete the user
  deleteData({ key: "userName" });
  deleteData({ key: "budgets" });
  deleteData({ key: "expenses" });
  toast.success("You've deleted your account!");
  // return redirect
  return redirect("/");
}