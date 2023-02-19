import React from 'react';
import ReactLoading from 'react-loading';
import { IColorContract } from '../../near/near-hooks';
import styles from './rgb-contract.module.css';
import RGB from '../rgb/RGB';


interface IContractProps {
  contract: IColorContract | null;
}

const RGBContract = (props: IContractProps) => {
  const [rgbValue, setRGBValue] = React.useState<number[] | undefined>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      setRGBValue(await props.contract?.get());
      setIsLoading(false);
    }
    get();
  }, [props.contract]);

  const handleColorChange = React.useCallback(
    async (changedValue: number[]) => {
      if (!changedValue) {
        return;
      }
      const [r, g, b] = changedValue;
      setIsLoading(true);
      await props.contract?.set({ r, g, b });
      setIsLoading(false);
      setRGBValue(changedValue);
    },
    [props.contract]
  );

  return (
    <div className={styles.contract}>
      <RGB value={rgbValue}
        className={styles.control}
        onChange={handleColorChange}
        label={props.contract?.contractId}
      />
      { isLoading && <ReactLoading type={'cylon'} color='#bbc0c4' /> }
    </div>
  )
}

export default RGBContract;