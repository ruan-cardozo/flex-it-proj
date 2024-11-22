import * as React from "react";
import { makeStyles, tokens, Tab, TabList } from "@fluentui/react-components";
import {
  DataHistogramRegular,
  DataHistogramFilled,
  AirplaneTakeOffRegular,
  AirplaneTakeOffFilled,
  FormNewFilled,
  FormNewRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import type {
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from "@fluentui/react-components";

const DataHistogram = bundleIcon(DataHistogramFilled, DataHistogramRegular);
const AirplaneTakeOff = bundleIcon(
  AirplaneTakeOffFilled,
  AirplaneTakeOffRegular
);
const FormNew = bundleIcon(FormNewFilled, FormNewRegular);

const useStyles = makeStyles({
  root: {
    marginTop: '-2%',
    alignItems: "flex-start",
    display: "flex",
    justifyContent: "flex-start",
    padding: "50px 20px",
    rowGap: "20px"
  },
  panels: {
    padding: "0 10px",
    "& th": {
      textAlign: "left",
      padding: "0 30px 0 0",
    },
  },
  propsTable: {
    "& td:first-child": {
      fontWeight: tokens.fontWeightSemibold,
    },
    "& td": {
      padding: "0 30px 0 0",
    },
  },
});

interface CustomTabListProps {
  firstTabComponent: JSX.Element;
  secondTabComponent: JSX.Element;
  ThirdTabComponent: JSX.Element;
}

export const CustomTabList = ({firstTabComponent,secondTabComponent,ThirdTabComponent}: CustomTabListProps) => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] =
    React.useState<TabValue>("conditions");

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  return (
    <div className={styles.root}>
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <Tab id="Arrivals" icon={<DataHistogram />} value="arrivals">
          Gráficos
        </Tab>
        <Tab id="Departures" icon={<FormNew />} value="departures">
          Cadastro
        </Tab>
        <Tab id="Conditions" icon={<FormNew />} value="conditions">
          Merda
        </Tab>
      </TabList>
      <div className={styles.panels}>
        {selectedValue === "arrivals" && firstTabComponent}
        {selectedValue === "departures" && secondTabComponent}
        {selectedValue === "conditions" && ThirdTabComponent}
      </div>
    </div>
  );
};