import { makeStyles, useId, Input, Label } from "@fluentui/react-components";
import type { InputProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    gap: "2px",
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "200px",
  },
});

function CustomInput(props: InputProps) {
  const inputId = useId("input");
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label className={props.className} htmlFor={inputId} size={props.size} disabled={props.disabled}>
        {props.about}
      </Label>
      <Input id={inputId} {...props} />
    </div>
  );
};

export default CustomInput;