import { DatePicker } from "@fluentui/react-datepicker-compat";
import { makeStyles } from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
    maxWidth: "400px",
  },
});

export function DateInput(props: Partial<DatePickerProps>) {
  const styles = useStyles();

  return (
    <div className={styles.root} >
        <label className={props.className}>{props.about}</label>
        <DatePicker
            className={props.className}
            placeholder="Selecione a data..."
            {...props}
        />
    </div>
  );
};