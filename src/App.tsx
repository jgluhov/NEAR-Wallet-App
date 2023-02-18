import React from 'react';
import { useNear } from './near/near-context';
import * as nearConfig from './near/near-config';
import { useContract } from './near/near-hooks';
import RGB from './components/rgb/RGB';
import Page from './components/page/Page';

function App() {
  const { wallet } = useNear();
  const { get, set } = useContract(wallet, nearConfig.NEAR_CONTRACT_ID);
  const [rgbValue, setRGBValue] = React.useState<number[] | null>(null);

  React.useEffect(() => {
    const read = async () => {
      const value = await get();
      if (!value) {
        return;
      }
      setRGBValue(value)
    }
    read();
  }, [get]);

  const handleColorChange = React.useCallback(
    async (changedValue: number[]) => {
      if (!changedValue) {
        return;
      }
      const [r, g, b] = changedValue;
      await set({ r, g, b });
      setRGBValue(changedValue);
    },
    [set]
  );


  return (
    <Page>
      { wallet?.isSignedIn() && <RGB value={rgbValue} onChange={handleColorChange} /> }
    </Page>
  );
}

export default App;
