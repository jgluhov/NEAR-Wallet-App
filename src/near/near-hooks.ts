import { keyStores, connect, WalletConnection, Contract, Near, ConnectConfig } from 'near-api-js';
import React from 'react';
import { IRGBValue } from '../utils';

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

interface IColorContract extends Contract {
  get(): number[];
  set(value: object, gas?: string, deposit?: string): void;
}

export const useConnect = (connectionConfig: ConnectConfig, appKeyPrefix: string) => {
  const [nearConnection, setNearConnection] = React.useState<Near | null>(null);
  const [walletConnection, setWalletConnection] = React.useState<WalletConnection | null>(null);

  React.useEffect(() => {
    const connectTo = async () => {
      const near = await connect({ keyStore, ...connectionConfig });
      setNearConnection(near)

      setWalletConnection(new WalletConnection(near, appKeyPrefix));
    }
    connectTo();
  }, [connectionConfig, appKeyPrefix]);

  return { nearConnection, walletConnection };
}

export const useContract = (
  walletConnection: WalletConnection | null,
  contractId: string
) => {
  const [contract, setContract] = React.useState<IColorContract | null>(null);

  const read = React.useCallback(async () => {
    let value;
    try {
      value = await contract?.get();
    } catch (e) {
      console.log(e);
    }
    return value;
  }, [contract])

  const change = React.useCallback(async (rgb: IRGBValue) => {
    try {
      await contract?.set(rgb)
    } catch (e) {
      console.log(e);
    }
  }, [contract])

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

  return {change, read};
}
