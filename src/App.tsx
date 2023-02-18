import React from 'react';
import { useNear } from './near/near-context';
import * as nearConfig from './near/near-config';
import { useContract } from './near/near-hooks';
import RGB from './components/rgb/RGB';
import Page from './components/page/Page';

function App() {
  const { walletConnection } = useNear();
  const { read, change } = useContract(walletConnection, nearConfig.NEAR_CONTRACT_ID);
  const [rgbValue, setRGBValue] = React.useState<number[] | null>(null);

  React.useEffect(() => {
    const get = async () => {
      const value = await read();
      if (!value) {
        return;
      }
      setRGBValue(value)
    }
    get();
  }, [read]);

  const handleColorChange = React.useCallback(
    async (changedValue: number[]) => {
      if (!changedValue) {
        return;
      }
      const [r, g, b] = changedValue;
      await change({ r, g, b });
      setRGBValue(changedValue);
    },
    [change]
  );

  return (
    <Page>
      { walletConnection?.isSignedIn() && <RGB value={rgbValue} onChange={handleColorChange} /> }
    </Page>
  );
}

export default App;
