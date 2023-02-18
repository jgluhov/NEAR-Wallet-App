import React from 'react';
import { useConnect } from './near-hooks';
import { Near, WalletConnection } from 'near-api-js';
import * as nearConfig from './near-config';

type NearContextType = {
  nearConnection: Near | null;
  walletConnection: WalletConnection | null;
  contractId: string;
}

const NearContext = React.createContext<NearContextType>({
  nearConnection: null,
  walletConnection: null,
  contractId: nearConfig.NEAR_CONTRACT_ID
});

interface INearProviderProps {
  children: React.ReactNode;
}

export const NearProvider = (props: INearProviderProps) => {
  const { nearConnection, walletConnection } = useConnect(
    nearConfig.connectionConfig,
    nearConfig.NEAR_APP_KEY_PREFIX
  );
  const value = {
    nearConnection,
    walletConnection,
    contractId: nearConfig.NEAR_CONTRACT_ID
  };
  return (
    <NearContext.Provider value={value}>
      { props.children }
    </NearContext.Provider>
  )
}

export const useNear = () => {
  return React.useContext(NearContext);
}