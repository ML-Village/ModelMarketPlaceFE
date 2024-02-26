import React, {FC, useId, useEffect, useState} from 'react';
import { Button, Modal } from 'flowbite-react';
import useConnectWallet from '@/stores/web3Store/hooks/useConnectWallet';
import useDisconnectWallet from '@/stores/web3Store/hooks/useDisconnectWallet';
import useIsWalletConnected from '@/stores/web3Store/hooks/useIsWalletConnected';
import useIsWalletModalOpen from '@/stores/web3Store/hooks/useIsWalletModalOpen';
import useStarknetWallets from '@/stores/web3Store/hooks/useStarknetWallets';
import { STARKNET_WALLETS } from '@/stores/web3Store/web3Store.variables';

export const WalletModal : FC = () => {
    const [openModal, setOpenModal] = useState(true);

    const [starknetWallets] = useStarknetWallets();
	const { connectWallet } = useConnectWallet();
	const { disconnectWallet } = useDisconnectWallet();
	const [isWalletConnected] = useIsWalletConnected();
	const [isWalletModalOpen, setIsWalletModalOpen] = useIsWalletModalOpen();

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	// prevent safari users having the modal with nothing inside
	const isStarknetAvailable = STARKNET_WALLETS.some((wallet) => {
		return starknetWallets.data?.some((w) => w.id === wallet.id);
	});

	const uuid = useId();

    useEffect(() => {
		if (!uuid) {
			return;
		}
		if (isWalletModalOpen) {
			// @ts-ignore
			clearTimeout(window[`modal-timeout-${uuid}`]);
			setTimeout(() => {
				document.body.style.overflow = 'hidden';
				setIsModalVisible(true);
			}, 10);
		} else {
			// @ts-ignore
			window[`modal-timeout-${uuid}`] = setTimeout(() => {
				document.body.style.overflow = 'visible';
				document.body.style.overflowX = 'hidden';

				setIsModalVisible(false);
			}, 400);
		}
	}, [isWalletModalOpen, uuid]);

	// const closeModal = (e: MouseEvent) => {
	// 	// @ts-ignore
	// 	if (e.target?.getAttribute('class')?.includes('modalBackground')) {
	// 		setIsWalletModalOpen(false);
	// 	}
	// };

	const handleDisconnectWallet = () => {
		setIsWalletModalOpen(false);

		setTimeout(() => {
			disconnectWallet();
		}, 300);
	};

    if (!isWalletModalOpen && !isModalVisible) {
		return <></>;
	}

    return (
        <Modal dismissible show={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)}>
            <Modal.Body className="flex flex-col justify-center">
            {!isStarknetAvailable ? (
                <button className="">
                        Starknet is not available on your browser
                </button>
            ) : isWalletConnected ? (
                <button className="border rounded-md py-2 px-4 bg-gray-300 hover:bg-gray-500 hover:text-white" onClick={() => handleDisconnectWallet()}>
                        Disconnect Wallet
                </button>
            ) : (
                STARKNET_WALLETS.map((wallet) => {
                    const starknetWalletInstance = starknetWallets.data?.find((w) => w.id === wallet.id);

                    if (!starknetWalletInstance) return null;

                    if (!starknetWalletInstance.isInstalled) {
                        return (
                            <a
                                key={wallet.id}
                                href={starknetWalletInstance.downloadUrl}
                                target='_blank'
                                rel='noreferrer'
                                className=""
                            >
                                <img src={wallet.srcLogo} alt={`${wallet.name}'s logo`} width={60} height={60} />

                                <span>
                                    {`Install ${wallet.name}`}
                                </span>
                            </a>
                        );
                    }

                    return (
                        <button key={wallet.id} className="flex items-center px-8 py-2" onClick={() => connectWallet(wallet.id)}>
                            <img src={wallet.srcLogo} alt={`${wallet.name}'s logo`} width={60} height={60} />
                            <span className="mx-2 text-xl">
                                {wallet.name}
                            </span>
                        </button>
                    );
                })
            )}
            </Modal.Body>
        </Modal>
    )
}
