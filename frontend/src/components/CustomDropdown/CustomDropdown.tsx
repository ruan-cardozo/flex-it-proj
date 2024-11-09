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
    value: string;
    onChange?: (event: any, option?: string) => void;
}

function CustomDropdown({dropdownOptions, value, onChange, ...props}: CustomDropdownProps) {
  const dropdownId = useId("dropdown-default");

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label className={props.className} id={dropdownId}>{props.about}</label>
      <Dropdown
        aria-labelledby={dropdownId}
        placeholder={props.placeholder}
        value={value} // Certifique-se de passar o valor selecionado aqui
        onOptionSelect={(event, data) => onChange && onChange(data.optionValue)} // Atualizando o estado ao selecionar uma opção
        {...props}
      >
        {dropdownOptions.map((option) => {
          return (
            <Option key={option} value={option}>
              {option}
            </Option>
          );
        })}
      </Dropdown>
    </div>
  );
};


export default CustomDropdown;