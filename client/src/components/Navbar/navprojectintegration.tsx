import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


export const NavProjectIntegration = () => {
    const navigate = useNavigate()

    return (
        <div className="flex justify-start items-center
        py-1 mx-2
        ">
            <span className="bg-gray-500/20 rounded-full p-2 mx-4
            hover:cursor-pointer hover:bg-gray-700/50
            "
            onClick={()=> navigate(-1)}
            >
                <FaArrowLeft />
            </span>
            <span className="text-xl">
                Create Project Integration Resources
            </span>
        </div>
    )
}
