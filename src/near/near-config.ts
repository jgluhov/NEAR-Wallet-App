import { ConnectConfig } from "near-api-js";

export const nearContractIds = [
  'frontend-test-1.badconfig.testnet',
  'frontend-test-2.badconfig.testnet',
  'frontend-test-3.badconfig.testnet',
  'frontend-test-4.badconfig.testnet',
  'frontend-test-5.badconfig.testnet'
];

export const NEAR_APP_KEY_PREFIX = 'near-wallet-app';
export const CONTRACT_ID = 'frontend-test-1.badconfig.testnet';

export const connectionConfig: ConnectConfig = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

