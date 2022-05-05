import React from 'react'
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarItem = ({ title, route, icon, isActive }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(route)
    }

    return (
        <li className='cursor-pointer w-auto sm:w-full' onClick={handleNavigate}>
            <span className={`flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg  hover:bg-blue hover:text-white ${isActive ? 'bg-blue text-white' : 'bg-white text-gray-900'}`}>
                <img className='w-6 h-6' src={icon} alt={title} />
                <span className="ml-3 hidden sm:block">{title}</span>
            </span>
        </li>
    )
}

SidebarItem.propTypes = {
    title: PropTypes.string,
    route: PropTypes.string,
    icon: PropTypes.any,
    isActive: PropTypes.bool,
};

export default SidebarItem;