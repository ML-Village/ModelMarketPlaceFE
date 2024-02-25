import React from 'react';
import { Navbar } from 'flowbite-react';
import { Avatar} from "@/components/ui/avatar";
import { FaShoppingCart, FaUser, FaRegCreditCard, FaWallet  } from "react-icons/fa";

export const Navbase = ({navleft}) => {
    return (
        <Navbar fluid rounded>
            
                {navleft}
                
                {/* wallet area */}
                <div className="flex justify-center items-center">
                    {/* <div className="flex items-center
                        mx-2 px-2 h-10 rounded-md
                        bg-gray-300">
                            <span className="mx-2" ><FaWallet/></span>
                            <span className="mx-2">Login</span>
                        </div> */}

                    <div className="flex items-center
                    mx-2 px-2 h-10 rounded-md
                    bg-gray-300">
                        <span className="mx-2" ><FaRegCreditCard/></span>
                        <span className="mx-2">8.88</span>
                        <span className="mr-4">ETH</span>
                    </div>

                    <Avatar className="bg-gray-300 flex justify-center items-center">
                        <FaUser />
                    </Avatar>

                    <div className="bg-gray-300 aspect-square w-10 mx-2
                    flex justify-center items-center rounded-md
                    ">
                        <FaShoppingCart />
                    </div>
                </div>
    </Navbar>
    )
}
