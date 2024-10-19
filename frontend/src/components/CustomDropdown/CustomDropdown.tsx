import {
  Dropdown,
  makeStyles,
  Option,
  useId,
} from "@fluentui/react-components";
import type { DropdownProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
    maxWidth: "400px",
  },
});

interface CustomDropdownProps extends Partial<DropdownProps> {
    dropdownOptions: Array<string>;
}

function CustomDropdown({dropdownOptions, ...props}: CustomDropdownProps)  {
  const dropdownId = useId("dropdown-default");

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label className={props.className} id={dropdownId}>{props.about}</label>
      <Dropdown
        aria-labelledby={dropdownId}
        placeholder={props.placeholder}
        {...props}
      >
        {dropdownOptions.map((option) => (
          <Option key={option}>
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

export default CustomDropdown;