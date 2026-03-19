import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    }, [navigate]);

    return null;
}

export default AdminLogout;