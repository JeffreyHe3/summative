import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../context";

function ProtectedRoutes() {
    const { email } = useStoreContext();

    return (
        email ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes;