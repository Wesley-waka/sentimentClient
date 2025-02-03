import { useState } from 'react';
import Web3 from 'web3';

interface Props {
    onConnect: (a: string) => void;
}

const ConnectWallet = ({ onConnect }: Props) => {
    const [walletAddress, setWalletAddress] = useState('');

    const connectMetaMask = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (window.ethereum) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const web3 = new Web3(window.ethereum);
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setWalletAddress(accounts[0]);
                onConnect(accounts[0]); // Pass the connected wallet address to the parent component
            } catch (error) {
                console.error('User denied account access or error occurred:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    return (
        <div>
            {walletAddress ? (
                <p>Connected: {walletAddress}</p>
            ) : (
                <button className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-300 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200' onClick={connectMetaMask}>Connect Wallet</button>
            )}
        </div>
    );
};

export default ConnectWallet;