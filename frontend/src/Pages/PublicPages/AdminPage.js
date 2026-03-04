import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./AdminCss/AdminPages.css";

function AdminContents() {
  return (
    <div className="admin-layout">
      <main className="admin-main">
        <Outlet />
      </main>
      <AdminSidebar /> 
    </div>
  );
}

export default AdminContents;