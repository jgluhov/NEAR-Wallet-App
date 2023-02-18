import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './rgb.module.css';
import { hexToRgb, rgbToHex } from '../../utils';

interface RGBProps {
  value: number[] | null,
  onChange(value: number[]): Promise<void>;
}

const RGB = (props: RGBProps) => {
  const [ value, setValue ] = React.useState('');

  React.useEffect(() => {
    if (!props.value) {
      return;
    }
    const [ r, g, b ] = props.value;
    setValue(rgbToHex(r,g,b))
  }, [props.value]);

  const handleChange = React.useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const color = hexToRgb(evt.target.value);;
      if (!color) {
        return;
      }
      props.onChange([color.r, color.g, color.b]);
    },
    [props]
  );

  return (
    <Form.Group className={styles.rgbGroup}>
      <Form.Label className={styles.rgbLabel}>Choose color</Form.Label>
      <Form.Control type="color" value={value} onChange={handleChange} />
    </Form.Group>
  )
}

export default RGB;