import React from 'react'
import PropTypes from "prop-types";

import Sidebar from "pages/Layout/Sidebar";

const Main = ({ children }) => {
    return (
        <div className='flex flex-col sm:flex-row'>
            <Sidebar />
            <div className="container sm:mt-0 py-4 w-full overflow-y-auto h-screen ">
                {children}
            </div>
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.any.isRequired,
};

export default Main;