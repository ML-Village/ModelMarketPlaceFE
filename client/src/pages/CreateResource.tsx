import React from 'react';
import { CreateNavBar } from '@/components/Navbar';
import { BiDumbbell } from "react-icons/bi";
import { FaBridge } from "react-icons/fa6";
import { HiArrowUpOnSquareStack } from "react-icons/hi2";

export const CreateResource = () => {
    return (
        <div>
            <CreateNavBar />
            
            <div className="container mx-auto mt-10 border flex justify-between items-center
            px-10 py-8
            ">
                <div className="text-3xl font-semibold w-4/5 border">
                    Pick From A List of Available Project Contracts To Supply Model Training and Integration Resources To
                </div>

                {/* explanation div */}
                <div className="border rounded-lg w-[400px]
                px-10 py-14 bg-gray-300 ml-auto
                ">
                    
                    <p className="font-semibold text-lg">
                    If there is a Project Contract deployed, you'll be able to:
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><BiDumbbell /></div>
                        <div className="">Register and Share Python Repositories/Libraries/APIs that provide state outcomes to help train agents and models for the project.</div>
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><FaBridge /></div>
                        <div className="">Deploy and Register Cairo contracts that wrap around listed Giza/Orion Models and Agents so that they integrate back into the parent project contracts.</div>
                    </p>

                    <br></br>

                    <p className="font-semibold text-lg">
                    The community can:
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><HiArrowUpOnSquareStack /></div>
                        <div className="">Upload, Register and List Models that work with the parent project contracts via Giza/Orion compiled Cairo code.</div>
                    </p>

                </div>

                

            </div>
        </div>
    )
}
