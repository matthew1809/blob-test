'use client';

import { useCallback } from 'react';
import {
  Chain as vChain,
  parseGwei,
} from 'viem';
import { loadKZG } from 'kzg-wasm';
import { blob } from '@/constants';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';

// import { setupKzg } from 'viem'
// import { mainnetTrustedSetupPath } from 'viem/node'
 
const Sign = () => {
  const { primaryWallet } = useDynamicContext();

  const handle = async () => {
    try {
      if (!primaryWallet || !isEthereumWallet(primaryWallet)) {
        console.log('no primary wallet or is not ethereum wallet');
      };
      const kzg = await loadKZG();

      const signer = await primaryWallet!.getWalletClient();

      await signer.signTransaction({
        blobs: [blob],
        blobVersionedHashes: [
          '0x01747efc9c3c7bd29518c662cb1cf19b9362b372502f096b20a0c0793211ccd0',
        ],
        data: '0x77c243eb0000000000000000000000005da800332ae8c6b6479a6dae56991d25e48e24a1',
        kzg,
        nonce: 0x7,
        maxFeePerBlobGas: parseGwei('30'),
        to: '0x0d72aC8E388e340Ed30517C3523be8C7d207d53e',
      });

      console.log('eth_signTransaction call was successful');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="p-4 inline-flex items-center justify-center rounded-lg border-2 border-[#3B3636] shadow-lg w-64"
      onClick={() => {
        handle();
      }}
    >
      Sign Blob Tx
    </button>
  );
};

export default Sign;
