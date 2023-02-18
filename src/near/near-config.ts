import { ConnectConfig } from "near-api-js";

export const NEAR_CONTRACT_ID = 'frontend-test-1.badconfig.testnet';
export const NEAR_APP_KEY_PREFIX = 'near-wallet-app';
export const connectionConfig: ConnectConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

