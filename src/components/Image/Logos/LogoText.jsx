import IMAGE from "../Image";
import logo_text from "../../../assets/images/svg/CYDEA-GRC-Logo-text.svg";

const LogoText = ({ width = 200, height = 200 }) => {
  return <IMAGE src={logo_text} height={height} width={width} />;
};

export default LogoText;
