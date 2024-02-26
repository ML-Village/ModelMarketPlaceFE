import {AccountInterface} from 'starknet';
import useWalletId from '@/stores/web3Store/hooks/useWalletId';
import useStarknetWallets from '@/stores/web3Store/hooks/useStarknetWallets';

export default function useAccount(): [AccountInterface | undefined]{
	
    const [walletId] = useWalletId();
    const [starknetWallets] = useStarknetWallets();

    const account = starknetWallets?.data?.find(o => o.id === walletId)?.wallet?.account
	return [account];
}