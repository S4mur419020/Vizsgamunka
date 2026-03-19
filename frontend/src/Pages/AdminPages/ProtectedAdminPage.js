import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

function ProtectedAdminPage({ children }) {
    const navigate = useNavigate();
    const { user, loading } = useAuthContext();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate("/login", { replace: true });
            } else if (user.role_id !== 1) {
                navigate("/", { replace: true });
            }
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Betöltés...</div>;

    return user?.role_id === 1 ? children : null;
}

export default ProtectedAdminPage;