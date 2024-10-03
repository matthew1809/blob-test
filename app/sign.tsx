'use client';

import {
  parseGwei,
  toBlobs,
  stringToHex
} from 'viem';
import { loadKZG } from 'kzg-wasm';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { isEthereumWallet } from '@dynamic-labs/ethereum';
import { sepolia } from 'viem/chains';

// import { setupKzg } from 'viem'

const Sign = () => {
  const { primaryWallet } = useDynamicContext();

  const handle = async () => {
    try {
      if (!primaryWallet || !isEthereumWallet(primaryWallet)) {
        console.log('no primary wallet or is not ethereum wallet');
      };

      const kzg = await loadKZG();

      const client = await primaryWallet.getWalletClient();
      console.log('client', client)

      const blobs = toBlobs({ data: stringToHex('hello world') })
 
      const hash = await client.sendTransaction({
        account: client.account,
        blobs,
        kzg,
        maxFeePerBlobGas: parseGwei('300'),
        to: '0x722009F87f88A77B9D3cB3e8DC661b4957e05c5F',
        gas: 21000n,
        chain: sepolia
      })

      console.log('eth_signTransaction call was successful', hash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        handle();
      }}
    >
      Sign Blob Tx
    </button>
  );
};

export default Sign;
