import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function PublicRoute() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("auth-token");

        if (token && (location.pathname === "/" || location.pathname === "/user/signup" || location.pathname === "/user/login")) {
            navigate("/user/homepage");
        }
    }, [location, navigate]);

    return <Outlet />;
}

export default PublicRoute;
