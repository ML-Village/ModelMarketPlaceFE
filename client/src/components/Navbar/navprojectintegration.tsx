import React from 'react';
import { FaArrowLeft } from "react-icons/fa";


export const NavProjectIntegration = () => {
    return (
        <div className="flex justify-start items-center
        py-1 mx-2
        ">
            <span className="bg-gray-500/20 rounded-full p-2 mx-3
            hover:cursor-pointer
            ">
                <FaArrowLeft />
            </span>
            <span className="text-xl">
                Create Project Integration Resources
            </span>
        </div>
    )
}
