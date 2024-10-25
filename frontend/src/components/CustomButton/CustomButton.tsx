import { Button, makeStyles } from "@fluentui/react-components";

interface CustomButtonProps {
  onClick: () => void; 
  icon: JSX.Element;
  about: string;
}

const useStyles = makeStyles({
  wrapper: {
    columnGap: "15px",
    display: "flex",
  },
  button: {
    color: "white", 
    width: "100%",
    marginLeft: "10px",
    marginRight: "10px",
    justifyContent: "flex-start",
    ":hover": {
      color: "#0f6cbd", 
      backgroundColor: "white",
      borderRadius: "5px",
    },
  },
  about: {
    marginLeft: "8px",
    fontSize: "20px",
  },
  icon: {
    fontSize: "20px",
    marginLeft: "5px",
    marginTop: "5px",
  },  
});

export const CustomButton = ({onClick,icon,about}: CustomButtonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <Button onClick={onClick}  className={styles.button} appearance="transparent">
        <span className={styles.icon}>{icon as any}</span>
        <span className={styles.about}>{about}</span>
      </Button>
    </div>
  );
};