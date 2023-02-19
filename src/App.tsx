import * as nearConfig from './near/near-config';
import Page from './components/page/Page';
import RGBContract from './components/rgb-contract/RGBContract';
import { useNear } from './near/near-context';

function App() {
  const { walletConnection } = useNear();
  return (
    <Page>
      { nearConfig.nearContractIds.map(
        (contractId: string) => (
          <RGBContract contractId={contractId}
            key={contractId}
            disabled={!walletConnection?.isSignedIn()}
          />
      ))}
    </Page>
  );
}

export default App;
