import { redirect } from "react-router-dom";
import { deleteData } from "../../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
  // delete the user
  deleteData({ key: "userName" });
  toast.success("You've deleted your account!");
  // return redirect
  return redirect("/");
}