import React, {useEffect, useState} from 'react';
import { Navbar } from 'flowbite-react';
import { Avatar} from "@/components/ui/avatar";
import { FaShoppingCart, FaUser, FaRegCreditCard, FaWallet  } from "react-icons/fa";
import useIsWalletConnected from '@/stores/web3Store/hooks/useIsWalletConnected';
import useIsWalletModalOpen from '@/stores/web3Store/hooks/useIsWalletModalOpen';
import useAddress from '@/stores/web3Store/hooks/useAddress';
import { WalletModal } from '@//components/Modals/WalletModal';
import useWalletId from '@/stores/web3Store/hooks/useWalletId';
import useStarknetWallets from '@/stores/web3Store/hooks/useStarknetWallets';
import useAccount from '@/stores/web3Store/hooks/useAccount';
import { Contract, uint256 } from 'starknet';
import {eth} from '@/constants/abis/eth';
import useProvider from '@/stores/web3Store/hooks/useProvider';
import {addressShortener} from '@/utils';
import { formatEther } from 'viem';

export const Navbase = ({navleft}) => {

    const [isWalletConnected] = useIsWalletConnected();
    const [, setIsWalletModalOpen] = useIsWalletModalOpen();
	const [address] = useAddress();
    const provider = useProvider();
    const [account] = useAccount();

    const [ethBalance, setEthBalance] = useState(0)

    // GET ETH BALANCE
    useEffect(() => {
        const contract = new Contract(eth.abi, 
            "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", 
            provider[0]?.web3Provider);
        
        async function getBalance() {
            // contract.connect(account)
            // const balance = await contract.balanceOf();
            const balance = await contract.balanceOf(account?.address);
            setEthBalance(Number(formatEther(BigInt(uint256.uint256ToBN(balance.balance)))) || 0);
        }
        
        getBalance();
        //console.log("running...")

    }, [account])

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
                            <span className="mx-2">{ethBalance.toFixed(2)}</span>
                            <span className="mr-2">ETH</span>
                            <span className="mx-2 mr-4">|</span>
                            <span className="mr-4">{addressShortener(address?.address)}</span>
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
