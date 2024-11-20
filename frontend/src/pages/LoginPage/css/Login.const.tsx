import { makeStyles } from "@fluentui/react-components";

export const useLoginStyles = makeStyles({
    row: {
        maxWidth: '100%',
        maxHeight: '100%',
        marginTop: '400px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    titleDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customInput: {
        boxShadow: '0 0 8px rgba(0,0,0,0.24) 0 14px 28px rgba(0,0,0,0.28)',
        padding: '10px',
        color: 'white',
        width: '500px',
        height: '50px',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '12px',
        marginBottom: '20px',
       },
       box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        width: '600px',
        padding: '20px',
        backgroundColor: '#0f6cbd',
        marginTop: '-300px',
        height: '450px',
        borderRadius: '20px',
       }, 
       title: {
        display: 'flex',
        fontSize: '80px',
        marginTop: '5%',
        textAlign: 'center',
        alignItems: 'center',
       },
        button: {
         backgroundColor: '#0f6cbd',
         color: 'white',
         padding: '10px',
         borderRadius: '20px',
         marginTop: '35px',
         marginLeft: '20px',
         width: '200px',
        },
        titleBox: {
            color: 'white',
            fontSize: '50px',
        }
});
