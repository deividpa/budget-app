import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";

export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Dashboard = () => {
  const { userName } = useLoaderData();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userName}!</p>
    </div>
  );
};

export default Dashboard;