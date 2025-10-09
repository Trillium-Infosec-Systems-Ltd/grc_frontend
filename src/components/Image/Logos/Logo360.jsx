import IMAGE from "../Image";
import { ASSET } from "../../../constants/assetConstants";

const Logo360 = ({ width = 200, height = 200 }) => {
  return <IMAGE src={ASSET.LOGO_360} height={height} width={width} />;
};

export default Logo360;
