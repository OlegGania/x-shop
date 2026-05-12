import type { CSSProperties } from "react";

type TitleProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  size?: CSSProperties["fontSize"];
  weight?: CSSProperties["fontWeight"];
  lineHeight?: CSSProperties["lineHeight"];
  style?: CSSProperties;
};

const Title = ({
  level,
  text,
  size,
  weight,
  lineHeight,
  style,
}: TitleProps) => {
  const titleStyles = {
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    ...style,
  };

  switch (level) {
    case 1:
      return <h1 style={titleStyles}>{text}</h1>;
    case 2:
      return <h2 style={titleStyles}>{text}</h2>;
    case 3:
      return <h3 style={titleStyles}>{text}</h3>;
    case 4:
      return <h4 style={titleStyles}>{text}</h4>;
    case 5:
      return <h5 style={titleStyles}>{text}</h5>;
    case 6:
      return <h6 style={titleStyles}>{text}</h6>;
    default:
      return <h1 style={titleStyles}>{text}</h1>;
  }
};

export default Title;
