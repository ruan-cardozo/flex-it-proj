import {
  EditRegular,
  DocumentBorderPrintRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableColumnDefinition,
  Button,
  DataGridCellFocusMode,
} from "@fluentui/react-components";

// Define o tipo genérico do item
type Item = Record<string, any>;

interface CustomDataGridProps {
  items: Item[]; // Dados a serem exibidos
  columns: TableColumnDefinition<Item>[]; // Definições de colunas
  onOpenItem?: (item: Item) => void; // Callback para "Abrir"
  onEditItem?: (item: Item) => void; // Callback para "Editar"
  onDeleteItem?: (item: Item) => void; // Callback para "Remover"
}

// Função para definir o modo de foco da célula
const getCellFocusMode = (columnId: string): DataGridCellFocusMode => {
  switch (columnId) {
    case "Ações":
      return "group"; // Foco em grupo para a coluna de ações
    default:
      return "cell";  // Foco padrão para outras colunas
  }
};

// Função que adiciona a coluna de ações no final das colunas
const addActionsColumn = (
  columns: TableColumnDefinition<Item>[],
  onOpenItem?: (item: Item) => void,
  onEditItem?: (item: Item) => void,
  onDeleteItem?: (item: Item) => void
): TableColumnDefinition<Item>[] => {
  return [
    ...columns,
    {
      columnId: 'Ações',
      compare: () => 0, // Comparação neutra para a coluna de ações
      renderHeaderCell: () => 'Ações', // Cabeçalho da coluna
      renderCell: (item: Item) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          {onOpenItem && (
            <Button
              icon={<DocumentBorderPrintRegular />}
              onClick={() => onOpenItem(item)}
              size="small"
              appearance="transparent"
              title="Imprimir exercício" />
          )}
          {onEditItem && (
            <Button
              icon={<EditRegular />}
              onClick={() => onEditItem(item)}
              size="small"
              appearance="transparent"
              title="Editar" />
          )}
          {onDeleteItem && (
            <Button
              icon={<DeleteRegular />}
              onClick={() => onDeleteItem(item)}
              size="small"
              appearance="transparent"
              title="Excluir" />
          )}
        </div>
      )
    },
  ];
};

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  items,
  columns,
  onOpenItem,
  onEditItem,
  onDeleteItem,
}) => {
  // Adiciona a coluna de ações
  const updatedColumns = addActionsColumn(columns, onOpenItem, onEditItem, onDeleteItem);

  return (
    <DataGrid
      items={items}
      columns={updatedColumns}
      sortable
      getRowId={(item) => item.id} // Supondo que os itens têm uma propriedade `id`
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
};

export default CustomDataGrid;
