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
     display: "flex",
     flexWrap: "wrap",
     },
   customDropdown: {
     marginLeft: "10px",
   },
   customInput: {
     marginLeft: "10px",
     display: "flex",
     flexDirection: "column",
     gap: "2px",
     maxWidth: "200px",
   }
});

export const useStylesExercise = makeStyles({
    dialogContentGrid: {
      display: "flex",
      flexWrap: "wrap",
      },
    customDropdown: {
      marginLeft: "10px",
    },
    customInput: {
      marginLeft: "10px",
    }
});