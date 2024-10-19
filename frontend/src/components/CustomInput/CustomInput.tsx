import { useId, Input, Label } from "@fluentui/react-components";
import type { InputProps } from "@fluentui/react-components";

function CustomInput(props: InputProps) {
  const inputId = useId("input");

  return (
    <div className={props.className}>
      <Label className={props.className} htmlFor={inputId} size={props.size} disabled={props.disabled}>
        {props.about}
      </Label>
      <Input id={inputId} {...props} />
    </div>
  );
};

export default CustomInput;