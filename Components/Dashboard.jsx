import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <ToastContainer/>
    </div>
  )
}

export default Dashboard;
