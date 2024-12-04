import * as React from "react";
import { makeStyles, tokens, Tab, TabList } from "@fluentui/react-components";
import {
  DataHistogramRegular,
  DataHistogramFilled,
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
const FormNew = bundleIcon(FormNewFilled, FormNewRegular);

const useStyles = makeStyles({
    root: {
      marginTop: '-2%',
      display: "flex",
      flexDirection: "column", // Colocar em coluna para que o TabList fique acima
      alignItems: "center", // Centralizar horizontalmente
      justifyContent: "center", // Adiciona alinhamento geral
      rowGap: "20px", // Espaçamento entre os elementos
      padding: "20px",
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
  thirdTabComponent: JSX.Element;
}

export const CustomTabList = ({firstTabComponent,secondTabComponent,thirdTabComponent}: CustomTabListProps) => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] =
    React.useState<TabValue>("conditions");

  const onTabSelect = (_: SelectTabEvent, data: SelectTabData) => {
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
          Editar/Excluir
        </Tab>
      </TabList>
      <div className={styles.panels}>
        {selectedValue === "arrivals" && firstTabComponent}
        {selectedValue === "departures" && secondTabComponent}
        {selectedValue === "conditions" && thirdTabComponent}
      </div>
    </div>
  );
};