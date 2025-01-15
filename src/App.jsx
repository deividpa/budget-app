import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import ExpensesPage, { expensesLoader } from "./pages/ExpensesPage";
import Error from "./pages/Error";

import Main, { mainLoader } from "./layouts/Main";

import { ToastContainer } from 'react-toastify';

import { logoutAction } from "./actions/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        loader: expensesLoader,
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  },
  
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
