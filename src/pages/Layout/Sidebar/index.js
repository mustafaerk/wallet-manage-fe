import React from 'react'

import { SidebarItem } from "components";
import { SidebarList } from "constant/Sidebar";

const Sidebar = () => {

    const handleCheckRouteActive = (route) => {
        return  window.location.pathname == route || false
    };

    return (
        <aside className="bg-ligthBlack block h-20 sm:h-screen w-full sm:w-1/6" aria-label="Sidebar">
            <div className="overflow-y-auto w-full h-20 sm:h-screen py-4 px-3 rounded">
                <ul className="flex flex-row sm:flex-col gap-2 items-center justify-center">
                    {SidebarList.map(item => <SidebarItem route={item.route} title={item.text} key={item.text} icon={item.icon} isActive={handleCheckRouteActive(item.route)} />)}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar