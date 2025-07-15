// import DashboardIcon from '../assets/icon/dashboard.svg';
// import { ReactComponent as AssetsIcon } from '../assets/icon/assets.svg';
// import { ReactComponent as ThreatsIcon } from '../assets/icon/threats_hub.svg';
// import { ReactComponent as VulnerabilityIcon } from '../assets/icon/Vulnerability.svg';
import { ROUTES } from './routesConstants';
// ... import all other icons

const {PRIVATE} = ROUTES;

export const SIDE_MENU = [
    {
        key: PRIVATE.ROOT,
        // icon: <HomeFilled style={{ width: 18, height: 18 }} />,
        label: 'Dashboard',
    },
    {
        key: PRIVATE.ASSETS.PARENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Assets',
    },
    {
        key: PRIVATE.THREATS_HUB.PARENT,
        // icon: <ThreatsIcon style={{ width: 18, height: 18 }} />,
        label: 'Threats Hub',
    },
    {
        key: PRIVATE.VULNERABILITY.PARENT,
        // icon: <VulnerabilityIcon style={{ width: 18, height: 18 }} />,
        label: 'Vulnerability Management',
    },
    {
        key: PRIVATE.CONTROLS.PARENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Controls',
    },
    {
        key: PRIVATE.COMPLIANCE.PARENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Compliance',
    },
    // {
    //     key: PRIVATE.INCIDENT.PARENT,
    //     // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
    //     label: 'Incident Management',
    // },
    {
        key: PRIVATE.RISK.PARENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Risk Management',
    },
    // {
    //     key: PRIVATE.REPORTS,
    //     // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
    //     label: 'Reports',
    // },
    // {
    //     key: PRIVATE.PROFILE,
    //     // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
    //     label: 'Profile',
    // },
    // {
    //     key: PRIVATE.SETTING,
    //     // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
    //     label: 'Setting',
    // },
    {
        key: PRIVATE.ADMINISTRATION.PARENT,
        // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
        label: 'Administartion',
        children: [
            { key: PRIVATE.ADMINISTRATION.CHILD.ASSET_TYPE.PARENT, label: 'Asset Types' },
            { key: PRIVATE.ADMINISTRATION.CHILD.DEPARTMENTS.PARENT, label: 'Departments' },
            { key: PRIVATE.ADMINISTRATION.CHILD.CONTROL_QUESTIONS.PARENT, label: 'Control Questions' },
            // { key: PRIVATE.ADMINISTRATION.CHILD.COMPLIANCE_QUESTIONS.PARENT, label: 'Compliance Questions' },
            { key: PRIVATE.ADMINISTRATION.CHILD.ORGANIZATIONS.PARENT, label: 'Organizations' },
        ]
    },
];
