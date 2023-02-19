import React from 'react';
import ReactLoading from 'react-loading';
import { useContract } from '../../near/near-hooks';
import styles from './rgb-contract.module.css';
import RGB from '../rgb/RGB';
import { useNear } from '../../near/near-context';


interface IContractProps {
  contractId: string;
  disabled: boolean;
}

const RGBContract = (props: IContractProps) => {
  const { walletConnection } = useNear();
  const contract = useContract(walletConnection, props.contractId);
  const [rgbValue, setRGBValue] = React.useState<number[] | undefined>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    contract?.get()
      .then((contractValue: number[]) => setRGBValue(contractValue))
      .finally(() => setIsLoading(false))
  }, [contract]);

  const handleColorChange = React.useCallback(
    (changedValue: number[]) => {
      if (!changedValue) {
        return;
      }
      
      const [r, g, b] = changedValue;
      
      setIsLoading(true);
      contract?.set({ r, g, b }).then(() => {
        setIsLoading(false);
        setRGBValue(changedValue);
      });
    },
    [contract]
  );

  return (
    <div className={styles.contract}>
      <RGB value={rgbValue}
        disabled={props.disabled}
        className={styles.control}
        onChange={handleColorChange}
        label={contract?.contractId}
      />
      { isLoading && <ReactLoading type={'cylon'} color='#bbc0c4' /> }
    </div>
  )
}

export default RGBContract;