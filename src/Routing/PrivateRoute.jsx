import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function PrivateRoute() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("auth-token");

        if (!token && (location.pathname === "/user/homepage" || location.pathname === "/user/myprofile")) {
            navigate("/");
        }
    }, [location, navigate]);

    return <Outlet />;
}

export default PrivateRoute;
