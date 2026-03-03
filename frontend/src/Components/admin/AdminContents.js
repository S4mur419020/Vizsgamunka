import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminContents() {
    return (
        <div className="admin-layout" style={{ display: "flex" }}>
            <AdminSidebar />
            <Outlet />
        </div>
    );
}

export default AdminContents;