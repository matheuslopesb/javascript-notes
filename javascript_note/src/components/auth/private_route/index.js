import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({component: Component}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('user')) 
            navigate("/login");
    })
    

    return (
        <Component/>
    )
};

export default PrivateRoute;