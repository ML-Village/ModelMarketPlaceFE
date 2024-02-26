import React from 'react';
import { Navbar } from 'flowbite-react';
import { Avatar} from "@/components/ui/avatar";
import { FaShoppingCart, FaUser, FaRegCreditCard, FaWallet  } from "react-icons/fa";
import useIsWalletConnected from '@/stores/web3Store/hooks/useIsWalletConnected';
import useIsWalletModalOpen from '@/stores/web3Store/hooks/useIsWalletModalOpen';
import useAddress from '@/stores/web3Store/hooks/useAddress';
import { WalletModal } from '@//components/Modals/WalletModal';

export const Navbase = ({navleft}) => {

    const [isWalletConnected] = useIsWalletConnected();
    const [, setIsWalletModalOpen] = useIsWalletModalOpen();
	const [address] = useAddress();

    return (
        <Navbar fluid rounded>
            
                {navleft}
                
                {/* wallet area */}
                <div className="flex justify-center items-center">
                    <WalletModal/>
                    {isWalletConnected ? 
                        <div className="flex items-center
                        mx-2 px-2 h-10 rounded-md
                        bg-gray-300"
                        onClick={()=>setIsWalletModalOpen(true)}
                        >
                            <span className="mx-2" ><FaRegCreditCard/></span>
                            <span className="mx-2">8.88</span>
                            <span className="mr-4">ETH</span>
                        </div>

                        :

                        <div className="flex items-center
                        mx-2 px-2 h-10 rounded-md
                        bg-gray-300" 
                        onClick={()=>setIsWalletModalOpen(true)}
                        >
                            <span className="mx-2" ><FaWallet/></span>
                            <span className="mx-2">Login</span>
                        </div> 
                    }

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
