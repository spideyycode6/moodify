import { useAuth } from '../hooks/useAuth';
import { Navigate } from "react-router-dom";
import Loader from "../../ui/Loader";

export default function Protect({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return <Loader />
    }
    if (!user) {
        return <Navigate to="/register" />
    }
    return children;
}