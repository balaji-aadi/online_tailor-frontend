import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated } = useSelector((state) => state.store);
    const activeUser = useSelector((state) => state.store.currentUser);
    console.log("activeUser",activeUser)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(activeUser?.user_role?.name)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};
export default ProtectedRoute;

export const PublicRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.store);

    return isAuthenticated ? <Navigate to="/" replace /> : children;
};
