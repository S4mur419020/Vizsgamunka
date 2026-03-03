import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar"; // ha külön importálod

function AdminContents() {
    return (
        <div className="admin-layout" style={{ display: "flex" }}>
            <AdminSidebar />
            <Outlet />
        </div>
    );
}

export default AdminContents;