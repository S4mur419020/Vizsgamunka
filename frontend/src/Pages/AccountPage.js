import { Link, Outlet, useLocation } from "react-router-dom";
import "../css/Account.css";
import useTranslation from "../i18n/useTranslation";

export default function AccountPage() {
    const loc = useLocation();
    const { t } = useTranslation();
    const active = (path) => loc.pathname.includes(path) ? "active" : "";

    return (
        <div className="account-wrapper">

            <aside className="account-sidebar">

                <Link to="/account/profile" className={active("profile")}>{t("nav.profile")}</Link>
                <Link to="/account/password" className={active("password")}>{t("nav.passwordChange")}</Link>
                <Link to="/account/addresses" className={active("addresses")}>{t("nav.addresses")}</Link>
                <Link to="/account/orders" className={active("orders")}>{t("nav.orders")}</Link>
                <Link to="/account/discounts" className={active("discounts")}>{t("nav.discounts")}</Link>
                <Link to="/account/benefits" className={active("benefits")}>{t("nav.benefits")}</Link>

            </aside>

            <main className="account-content">
                <Outlet />
            </main>

        </div>
    );
}