import React from 'react';
import { useConnect } from './near-hooks';
import { Near, WalletConnection } from 'near-api-js';
import * as nearConfig from './near-config';

type NearContextType = {
  near: Near | null;
  wallet: WalletConnection | null;
  contractId: string;
}

const NearContext = React.createContext<NearContextType>({
  near: null,
  wallet: null,
  contractId: nearConfig.NEAR_CONTRACT_ID
});

interface INearProviderProps {
  children: React.ReactNode;
}

export const NearProvider = (props: INearProviderProps) => {
  const { near, wallet } = useConnect(
    nearConfig.connectionConfig,
    nearConfig.NEAR_APP_KEY_PREFIX
  );
  const value = {
    near,
    wallet,
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