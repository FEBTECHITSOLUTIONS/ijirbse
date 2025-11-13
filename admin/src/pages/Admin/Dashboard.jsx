import { Outlet } from "react-router-dom";
import Sidebar from '../../components/admin/Sidebar.jsx'
import Header from '../../components/admin/Header.jsx'

import { CiMenuFries } from "react-icons/ci";
export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
    <div className="lg:hidden">
        <CiMenuFries />
       </div>
        <div className="">
          <Outlet />
        </div>
           
      </div>
    </div>
  );
}
