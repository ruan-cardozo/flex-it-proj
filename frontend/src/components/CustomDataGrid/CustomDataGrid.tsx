import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  DataGridCellFocusMode,
} from "@fluentui/react-components";

type ValueCell = {
  label: string;
  icon: JSX.Element;
};

type CategoriaCell = {
  label: string;
  status: string;
};

type Item = {
  Nome: ValueCell;
  Categoria: CategoriaCell;
};

interface CustomDataGridProps {
  items: Item[];
}

const items: Item[] = [
  {
    Nome: { label: "Meeting notes", icon: <DocumentRegular /> },
    Categoria: { label: "Max Mustermann", status: "available" },
  },
  {
    Nome: { label: "Thursday presentation", icon: <FolderRegular /> },
    Categoria: { label: "Erika Mustermann", status: "busy" },
  },
  {
    Nome: { label: "Training recording", icon: <VideoRegular /> },
    Categoria: { label: "John Doe", status: "away" },
  },
  {
    Nome: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    Categoria: { label: "Jane Doe", status: "offline" },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "Nome",
    compare: (a, b) => a.Nome.label.localeCompare(b.Nome.label),
    renderHeaderCell: () => "Nome",
    renderCell: (item) => (
      <TableCellLayout media={item.Nome.icon}>{item.Nome.label}</TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "Categoria",
    compare: (a, b) => a.Categoria.label.localeCompare(b.Categoria.label),
    renderHeaderCell: () => "Categoria",
    renderCell: (item) => (
      <TableCellLayout
        media={
          <Avatar
            aria-label={item.Categoria.label}
            name={item.Categoria.label}
          />
        }
      >
        {item.Categoria.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn<Item>({
    columnId: "Visualizar exercício",
    renderHeaderCell: () => "Visualizar exercício",
    renderCell: () => <Button icon={<OpenRegular />}>Abrir</Button>,
  }),
  createTableColumn<Item>({
    columnId: "Ações",
    renderHeaderCell: () => "Ações",
    renderCell: () => (
      <>
        <Button aria-label="Editar" icon={<EditRegular />} />
        <Button aria-label="Remover" icon={<DeleteRegular />} />
      </>
    ),
  }),
];

const getCellFocusMode = (columnId: string): DataGridCellFocusMode => {
  switch (columnId) {
    case "singleAction":
      return "none";
    case "actions":
      return "group";
    default:
      return "cell";
  }
};

function CustomDataGrid() {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      getRowId={(item) => item.Nome.label}
      style={{ minWidth: "550px" }}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId}>
            {({ renderCell, columnId }) => (
              <DataGridCell focusMode={getCellFocusMode(columnId)}>
                {renderCell(item)}
              </DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
}

export default CustomDataGrid;