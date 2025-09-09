import IMAGE from "../Image";
import logo_360 from "../../../assets/images/svg/Cydea360-Logo.svg";

const Logo360 = ({ width = 200, height = 200 }) => {
  return <IMAGE src={logo_360} height={height} width={width} />;
};

export default Logo360;
