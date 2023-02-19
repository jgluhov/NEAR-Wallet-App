import {
  keyStores,
  connect,
  WalletConnection,
  Contract,
  Near,
  ConnectConfig
} from 'near-api-js';
import React from 'react';

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

export interface IColorContract extends Contract {
  get(): Promise<number[]>;
  set(value: object, gas?: string, deposit?: string): Promise<void>;
}

export const useConnect = (
  connectionConfig: ConnectConfig,
  appKeyPrefix: string
) => {
  const [nearConnection, setNearConnection] = React.useState<Near | null>(null);
  const [walletConnection, setWalletConnection] = React.useState<WalletConnection | null>(null);

  React.useEffect(() => {
    connect({ keyStore, ...connectionConfig })
      .then((near: Near) => {
        setNearConnection(near)
        setWalletConnection(new WalletConnection(near, appKeyPrefix));
      });
  }, [connectionConfig, appKeyPrefix]);

  return { nearConnection, walletConnection };
}

export const useContract = (
  walletConnection: WalletConnection | null,
  contractId: string
) => {
  const [contract, setContract] = React.useState<IColorContract | null>(null);
  
  React.useEffect(() => {
    if (!walletConnection) {
      return;
    }
    setContract(new Contract(walletConnection.account(), contractId, {
      viewMethods: ['get'],
      changeMethods: ['set']
    }) as IColorContract);
  }, [walletConnection, contractId])

  return contract;
}
