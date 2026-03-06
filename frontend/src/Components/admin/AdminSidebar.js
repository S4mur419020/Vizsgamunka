import { NavLink } from "react-router-dom";

function AdminSidebar() {
    const getNavClass = ({ isActive }) => isActive ? "active" : "";
    return (
        <aside className="admin-sidebar">
            <NavLink to="/admin/products" className={getNavClass}>Termékek</NavLink>
            <NavLink to="/admin/orders" className={getNavClass}>Rendelések</NavLink>
            <NavLink to="/admin/discounts" className={getNavClass}>Kedvezmények</NavLink>
            <NavLink to="/admin/users" className={getNavClass}>Felhasználók</NavLink>
            <NavLink to="/admin/statistics" className={getNavClass}>Statisztikák</NavLink>
        </aside>
    );
}
export default AdminSidebar;