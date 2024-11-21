import { DatePicker } from "@fluentui/react-datepicker-compat";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";

interface DateInputProps extends Partial<DatePickerProps> {
  about: string;
  className?: string;
}

export function DateInput(props: DateInputProps) {
  const { about, className, ...datePickerProps } = props;

  return (
    <div className={className}>
      <label className={className}>{about}</label>
      <DatePicker
        className={className}
        placeholder="Selecione a data..."
        {...datePickerProps}
      />
    </div>
  );
}