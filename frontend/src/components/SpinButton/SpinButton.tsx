import * as React from "react";
import {
  makeStyles,
  tokens,
  useId,
  Label,
  SpinButton,
} from "@fluentui/react-components";
import type { SpinButtonProps } from "@fluentui/react-components";

const useLayoutStyles = makeStyles({
  base: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    gap: "2px",
    marginLeft: "10px",

    "> label": {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

interface CustomSpinButtonProps extends Omit<SpinButtonProps, 'value' | 'onChange' | 'displayValue'> {
  value: number;
  onChange: (value: number) => void;
  applyFormatter?: boolean;
  about?: string;
}

const CustomSpinButton: React.FC<CustomSpinButtonProps> = ({
  value,
  onChange,
  applyFormatter = false,
  about,
  ...props
}) => {
  const formatter = (val: number) => (applyFormatter ? `${val}kg` : `${val}`);

  const parser = (formattedValue: string) => {
    let parsedValue = formattedValue;
    if (applyFormatter) {
      parsedValue = parsedValue.replace("kg", "");
    }
    return parseFloat(parsedValue);
  };

  const handleSpinButtonChange: SpinButtonProps["onChange"] = (_ev, data) => {
    let newValue: number = value;

    if (data.value !== undefined && data.value !== null) {
      newValue = data.value;
    } else if (data.displayValue !== undefined && data.displayValue !== null) {
      const parsed = parser(data.displayValue);
      if (!Number.isNaN(parsed)) {
        newValue = parsed;
      }
    }

    onChange(newValue);
  };

  const layoutStyles = useLayoutStyles();
  const id = useId();

  return (
    <div className={layoutStyles.base}>
      {about && <Label htmlFor={id}>{about}</Label>}
      <SpinButton
        {...props}
        id={id}
        value={value}
        displayValue={formatter(value)}
        onChange={handleSpinButtonChange}
      />
    </div>
  );
};

export default CustomSpinButton;