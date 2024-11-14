import { makeStyles, tokens } from "@fluentui/react-components";

export const useStylesCustomCard = makeStyles({
    main: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
    title: { margin: "0 0 12px" },
    description: { margin: "0 0 12px" },
    card: {
      width: "700px",
      maxWidth: "100%",
      maxHeight: "100%",
      height: "200px",
    },
    caption: {
      color: tokens.colorNeutralForeground3,
    },
    logo: {
      borderRadius: "4px",
      width: "48px",
      height: "48px",
    },
    icon: {
      width: "40px",
      height: "40px",
    },
    text: { margin: "0" },
});

export const useStylesTraining = makeStyles({
   dialogContentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    flexDirection: 'column'
    },
   customDropdown: {
     marginLeft: "10px",
     width: "100%"
   },
   customInput: {
     marginLeft: "5px",
     flexDirection: "column",
     gridTemplateRows: "repeat(1fr)",
     justifyItems: "start",
     gap: "2px",
     width: "100%",
     maxWidth: "400px",
     display: "grid",
   },
   dateInput: {
      marginLeft: "5px",
      width: "100%",
      maxWidth: "400px",
   },
   exerciseList: {
    borderLeft: "1px solid black",
    paddingLeft: "20px",
   },
   saveExerciseButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2px",
    width: "150px",
    maxWidth: "200px",
    borderRadius: "10px"
   },
   addExerciseSaveButton: {
    marginTop: "12px",
    width: "150px",
    maxWidth: "200px",
    borderRadius: "10px",
   }
});

export const useStylesExercise = makeStyles({
  dialogContentGrid: {
    flexDirection: 'column',
     },
   customDropdown: {
     marginLeft: "10px",
     width: "100%"
   },
   customInput: {
     marginLeft: "5px",
     flexDirection: "column",
     gridTemplateRows: "repeat(1fr)",
     justifyItems: "start",
     gap: "2px",
     width: "100%",
     maxWidth: "400px",
     display: "grid",
   },
   dateInput: {
      marginLeft: "10px",
      width: "100%",
      maxWidth: "400px",
   },
   customSpinButton: {
      marginLeft: "10px",
      width: "100%"
   }
});