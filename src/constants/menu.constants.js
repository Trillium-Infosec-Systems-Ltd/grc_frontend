// import DashboardIcon from '../assets/icon/dashboard.svg';
// import { ReactComponent as AssetsIcon } from '../assets/icon/assets.svg';
// import { ReactComponent as ThreatsIcon } from '../assets/icon/threats_hub.svg';
// import { ReactComponent as VulnerabilityIcon } from '../assets/icon/Vulnerability.svg';
import { ROUTES } from './routes.constants';
// ... import all other icons

export const SIDE_MENU = [
    {
        key: ROUTES.PRIVATE.ROOT,
        // icon: <HomeFilled style={{ width: 18, height: 18 }} />,
        label: 'Dashboard',
    },
    {
        key: ROUTES.PRIVATE.ASSETS.PARENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Assets',
    },
    {
        key: ROUTES.PRIVATE.THREATS_HUB,
        // icon: <ThreatsIcon style={{ width: 18, height: 18 }} />,
        label: 'Threats Hub',
    },
    {
        key: ROUTES.PRIVATE.VULNERABILITY,
        // icon: <VulnerabilityIcon style={{ width: 18, height: 18 }} />,
        label: 'Vulnerability Management',
    },
    {
        key: ROUTES.PRIVATE.CONTROLS,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Controls',
    },
    {
        key: ROUTES.PRIVATE.COMPLIANCE,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Compliance',
    },
    {
        key: ROUTES.PRIVATE.INCIDENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Incident Management',
    },
    {
        key: ROUTES.PRIVATE.RISK.PARENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Risk Management',
    },
    {
        key: ROUTES.PRIVATE.REPORTS,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Reports',
    },
    {
        key: ROUTES.PRIVATE.PROFILE,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Profile',
    },
    {
        key: ROUTES.PRIVATE.SETTING,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Setting',
    },
];
