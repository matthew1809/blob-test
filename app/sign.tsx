'use client';

import {
  parseGwei,
  toBlobs,
  stringToHex
} from 'viem';
import { loadKZG } from 'kzg-wasm';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';

// import { setupKzg } from 'viem'

const Sign = () => {
  const { primaryWallet } = useDynamicContext();

  const handle = async () => {
    try {
      if (!primaryWallet || !isEthereumWallet(primaryWallet)) {
        console.log('no primary wallet or is not ethereum wallet');
      };

      const kzg = await loadKZG();

      const client = await primaryWallet!.getWalletClient();

      const blobs = toBlobs({ data: stringToHex('hello world') })
 
      const hash = await client.sendTransaction({
        blobs,
        kzg,
        maxFeePerBlobGas: parseGwei('30'),
        to: '0x0000000000000000000000000000000000000000',
      })

      console.log('eth_signTransaction call was successful', hash);
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
