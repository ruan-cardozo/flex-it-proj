import { DatePicker } from "@fluentui/react-datepicker-compat";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";

export function DateInput(props: Partial<DatePickerProps>) {

  return (
    <div className={props.className} >
        <label className={props.className}>{props.about}</label>
        <DatePicker
            className={props.className}
            placeholder="Selecione a data..."
            {...props}
        />
    </div>
  );
};