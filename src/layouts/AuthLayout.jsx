import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';

const AuthLayout = () => {
    const user = useSelector((state) => state.session.user);

    if (!user) {
        return <Navigate to={ROUTES.PUBLIC.ROOT} replace />;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Outlet />
        </div>
    );
};

export default AuthLayout;
