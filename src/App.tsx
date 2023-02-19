import { useNear } from './near/near-context';
import * as nearConfig from './near/near-config';
import { useContract } from './near/near-hooks';
import Page from './components/page/Page';
import RGBContract from './components/rgb-contract/RGBContract';

function App() {
  const { walletConnection } = useNear();
  const contract = useContract(walletConnection, nearConfig.NEAR_CONTRACT_ID);

  return (
    <Page>
      { walletConnection?.isSignedIn() && (
        <RGBContract contract={contract} />
      )}
    </Page>
  );
}

export default App;
