import IMAGE from "../Image";
import { ASSET } from "../../../constants/assetConstants";

const LogoText = ({ width = 200, height = 200 }) => {
  return <IMAGE src={ASSET.LOGO_TEXT} height={height} width={width} />;
};

export default LogoText;
