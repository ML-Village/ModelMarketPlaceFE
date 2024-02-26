import { getStarknet} from 'get-starknet-core';
import useAddress from './useAddress';
import useProvider from './useProvider';
import useStarknetWallets from './useStarknetWallets';
import { Contract } from 'starknet';
import ethABI from '@/constants/abis/ethABI.json';

export default async function useEthBalance(): Promise<[number | undefined]> {
	// const [address] = useAddress();
    // const provider = useProvider();
    // const contract = new Contract(ethABI, "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7", provider[0]?.web3Provider);
    // //const balance = await contract.balanceOf(starknet.account);
    // console.log("stark wallets")
    // console.log(provider[0]);
	return [10];
}