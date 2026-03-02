import { Link, Outlet, useLocation } from "react-router-dom";
import "../css/Account.css";

export default function AccountPage() {
    const loc = useLocation();

    const active = (path) => loc.pathname.includes(path) ? "active" : "";

    return (
        <div className="account-wrapper">

            <aside className="account-sidebar">

                <Link to="/account/profile" className={active("profile")}>Személyes adatok</Link>
                <Link to="/account/password" className={active("password")}>Jelszó megváltoztatása</Link>
                <Link to="/account/addresses" className={active("addresses")}>Címeim</Link>
                <Link to="/account/orders" className={active("orders")}>Rendeléseim</Link>
                <Link to="/account/discounts" className={active("discounts")}>Kedvezménykódok</Link>
                <Link to="/account/benefits" className={active("benefits")}>Előnyeim</Link>

            </aside>

            <main className="account-content">
                <Outlet />
            </main>

        </div>
    );
}