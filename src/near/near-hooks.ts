import { keyStores, connect, WalletConnection, Contract, Near, ConnectConfig } from 'near-api-js';
import React from 'react';
import { IRGBValue, hexToRgb } from '../utils';

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

interface IColorContract extends Contract {
  get(): number[];
  set(value: object, gas?: string, deposit?: string): void;
}

export const useConnect = (connectionConfig: ConnectConfig, appKeyPrefix: string) => {
  const [near, setNear] = React.useState<Near | null>(null);
  const [wallet, setWallet] = React.useState<WalletConnection | null>(null);

  React.useEffect(() => {
    const connectTo = async () => {
      // Initialize connection to the NEAR testnet
      const nearConnection = await connect({ keyStore, ...connectionConfig });
      setNear(nearConnection)

      // Initializing Wallet based Account. It can work with NEAR testnet wallet that
      // is hosted at http://wallet.testnet.near.org
      setWallet(new WalletConnection(nearConnection, appKeyPrefix));
    }
    connectTo();
  }, [connectionConfig, appKeyPrefix]);

  return { near, wallet };
}

export const useContract = (
  walletConnection: WalletConnection | null,
  contractId: string
) => {
  const [contract, setContract] = React.useState<IColorContract | null>(null);

  const get = React.useCallback(async () => {
    if (!contract || !walletConnection) {
      return null;
    }

    const value = await contract.get()
    return value;
  }, [walletConnection, contract])

  const set = React.useCallback(async (rgb: IRGBValue) => {
    if (!contract || !walletConnection) {
      return;
    }
    
    try {
      await contract.set(rgb)
    } catch (e) {
      console.log(e);
    }

  }, [contract, walletConnection])

  React.useEffect(() => {
    if (!walletConnection) {
      return;
    }
    const createContract = async () => {
      setContract(await new Contract(walletConnection.account(), contractId, {
        viewMethods: ['get'],
        changeMethods: ['set']
      }) as IColorContract);
    }

    createContract();
  }, [walletConnection, contractId])

  return {set, get};
}
