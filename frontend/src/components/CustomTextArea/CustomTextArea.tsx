import { Field, makeStyles, Textarea } from "@fluentui/react-components";
import type { TextareaProps } from "@fluentui/react-components";

const useStyles = makeStyles({
    textLabel: {
        width: "50%",
        alignContent: "flex-end"
    }
});

function CustomTextArea(props: Partial<TextareaProps>) {

    const style = useStyles();

    return (
        <Field className={style.textLabel} label={props.about}>
            <Textarea {...props} />
        </Field>
    );
}

export default CustomTextArea;