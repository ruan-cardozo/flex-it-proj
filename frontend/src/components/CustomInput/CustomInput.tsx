import { useId, Input, Label, makeStyles } from "@fluentui/react-components";
import type { InputProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
    maxWidth: "400px",
  }
});


function CustomInput(props: InputProps) {
  const inputId = useId("input");
  const style = useStyles();

  return (
    <div className={style.root}>
      <Label className={props.className} htmlFor={inputId} size={props.size} disabled={props.disabled}>
        {props.about}
      </Label>
      <Input id={inputId} {...props} />
    </div>
  );
};

export default CustomInput;