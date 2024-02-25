import React from 'react';
import { Navbar, Dropdown } from 'flowbite-react';
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routing/routes';

export const Navlogohome = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar.Brand href={import.meta.env.VITE_HOSTURL} 
                className="mx-6"
                >
                    <img src="mlvillagelogo.png" className="h-6 mr-3 sm:h-9" alt="ML Village Logo"/>
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ML Village</span>
                </Navbar.Brand>
                    
                    {/* nav buttons */}
                    <div className="flex justify-center items-center gap-3
                    text-orange-500
                    mx-4">
                        <span className="hover:font-bold">Collections</span>
                        <span className="hover:font-bold">Stats</span>
                        <Dropdown label={<span className="hover:font-bold">Create</span>} inline arrowIcon={false}
                        className=""
                        >
                            <Dropdown.Item onClick={()=>navigate(ROUTES.createresource)}>Create Project Resources</Dropdown.Item>
                            <Dropdown.Item>Create Model</Dropdown.Item>
                        </Dropdown>
                    </div>
                
                {/* search bar */}
                <div className="w-1/4 mr-auto border rounded-md border-gray-300 
                flex flex-row flex-nowrap justify-start items-center
                hover:border-orange-400
                mx-2 px-2
                ">
                    <span className="mx-2">
                        <HiMagnifyingGlass />
                    </span>
                        <Input type="text" placeholder="Search"
                        className=""
                        />
                </div>
        </>
    )
}
