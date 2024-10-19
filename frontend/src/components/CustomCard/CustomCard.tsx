import {
  makeStyles,
  tokens,
  Button,
  Text,
  Caption1,
  Subtitle1,
  Body1,
  mergeClasses,
} from "@fluentui/react-components";
import { bundleIcon, DumbbellFilled, DumbbellRegular, ArrowNextFilled } from "@fluentui/react-icons";
import { Card, CardHeader, CardProps } from "@fluentui/react-components";

interface CustomCardProps {
    about?: string;
    cardTitle: string;
    cardParagraph: string;
    onClick?: () => void;
    className?: string;
}

interface CardExampleProps extends CardProps {
    cardParagraph: string;
    onClick?: () => void;
    dialogTrigger?: boolean;
}

const useStyles = makeStyles({
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

const DumbbellIcon = bundleIcon(DumbbellFilled, DumbbellRegular);

const Header = ({ title, description }: Record<string, string>) => {
  const styles = useStyles();

  return (
    <header>
      {title ? (
        <Subtitle1 as="h4" block className={styles.title}>
          {title}
        </Subtitle1>
      ) : null}

      {description ? (
        <Body1 as="p" block className={styles.description}>
          {description}
        </Body1>
      ) : null}
    </header>
  );
};

const CardExample = ({ dialogTrigger,onClick, cardParagraph, className, ...props}: CardExampleProps) => {
  const styles = useStyles();

  return (
    <Card
      {...props}
      className={mergeClasses(className, styles.card)}
      onClick={onClick}
    >
    <DumbbellIcon className={styles.icon} />
      <CardHeader
        header={<Text weight="semibold"></Text>}
        description={<Caption1 className={styles.caption}>{props.about}</Caption1>}
        action={
          <Button
            onClick={onClick}
            appearance="transparent"
            icon={<ArrowNextFilled />}
            aria-label="More options"
          />
        }
      />
      <p className={styles.text}>
         {cardParagraph}
      </p>
    </Card>
  );
};

export const CustomCard = ({ onClick, cardTitle, about, cardParagraph, className}: CustomCardProps) => {

  return (
    <div className={className}>
      <section>
        <Header
          description={about || ""}
        />
        <CardExample onClick={onClick} about={cardTitle} cardParagraph={cardParagraph} />
      </section>
    </div>
  );
};