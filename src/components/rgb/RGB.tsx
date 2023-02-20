import React, { FocusEvent } from 'react';
import Form from 'react-bootstrap/Form';
import clsx from 'clsx';
import styles from './rgb.module.css';
import { hexToRgb, rgbToHex } from '../../utils';


interface RGBProps {
  value: number[] | undefined,
  label: string | undefined;
  onChange(value: number[]): void;
  className?: string;
  disabled?: boolean;
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
    (evt: FocusEvent<HTMLInputElement>) => {
      const color = hexToRgb(evt.target.value);;
      if (!color) {
        return;
      }
      props.onChange([color.r, color.g, color.b]);
    },
    [props]
  );

  return (
    <Form.Group className={clsx(styles.group, props.className)}>
      <Form.Label className={clsx(
        styles.label,
        props.disabled && styles.labelDisabled)
      }>
        {props.label}
      </Form.Label>
      <Form.Control type="color"
        className={styles.control}
        disabled={props.disabled}
        value={value}
        onChange={handleChange} />
    </Form.Group>
  )
}

export default RGB;