import * as React from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  makeStyles,
} from "@fluentui/react-components";
import { SaveFilled, ArrowExitFilled } from "@fluentui/react-icons";

interface CustomFormProps {
  formTitle: string;
  dialogContent?: any;
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles({
  dialogSurface: {
    width: "80vw", // 80% da largura da viewport
    maxWidth: "800px", // Largura máxima de 800px
    height: "80vh", // 80% da altura da viewport
    maxHeight: "600px", // Altura máxima de 600px
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  dialogBody: {
    flex: 1,
    overflowY: "auto",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px 24px"
  },
  dialogTitle: {
    marginLeft: "10px"
  }
});

const DialogForm: React.FC<CustomFormProps> = ({ formTitle, dialogContent, isOpen, onClose }) => {

  const styles = useStyles();


  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogSurface className={styles.dialogSurface}>
        <DialogBody className={styles.dialogBody}>
          <DialogTitle className={styles.dialogTitle}>{formTitle}</DialogTitle>
          <DialogContent>
            {dialogContent}
          </DialogContent>
          <DialogActions className={styles.dialogActions}>
            <Button appearance="secondary" onClick={onClose} icon={<ArrowExitFilled />}>Fechar</Button>
            <Button appearance="primary" icon={<SaveFilled/>}>Salvar</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
    );
};

export default DialogForm;