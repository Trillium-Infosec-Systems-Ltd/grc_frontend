import { ROLE } from "./keysConstants";
import { ROUTES } from "./routesConstants";

const { PRIVATE } = ROUTES;

export const SIDE_MENU = (user = {}) => {
  const { role = null } = user;
  return [
    {
      key: PRIVATE.ROOT,
      label: "Dashboard",
      icon: "/src/assets/icon/dashboard.svg",
    },
    {
      key: PRIVATE.ASSETS.PARENT,
      label: "Assets",
      icon: "/src/assets/icon/assets.svg",
    },
    {
      key: PRIVATE.THREATS_HUB.PARENT,
      label: "Threats Hub",
      icon: "/src/assets/icon/threats_hub.svg",
    },
    {
      key: PRIVATE.VULNERABILITY.PARENT,
      label: "Vulnerability Management",
      icon: "/src/assets/icon/Vulnerability.svg",
    },
    {
      key: PRIVATE.CONTROLS.PARENT,
      label: "Controls",
      icon: "/src/assets/icon/controls.svg",
    },
    {
      key: PRIVATE.COMPLIANCE.PARENT,
      label: "Compliance",
      icon: "/src/assets/icon/compliance.svg",
    },
    // {
    //     key: PRIVATE.INCIDENT.PARENT,
    //     // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
    //     label: 'Incident Management',
    // },
    {
      key: PRIVATE.RISK.PARENT,
      label: "Risk Management",
      icon: "/src/assets/icon/risk_management.svg",
    },
    // {
    //     key: PRIVATE.REPORTS,
    //     // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
    //     label: 'Reports',
    // },
    {
      key: PRIVATE.USERS.PARENT,
      // icon: <AssetsIcon style={{ width: 18, height: 18 }} />,
      label: "User Management",
      icon: "/src/assets/icon/user_management.svg",
      show: role === ROLE.SUPER_ADMIN || role === ROLE.PARTNER,
    },
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
      icon: "/src/assets/icon/settings.svg",
      label: "Administartion",
      children: [
        {
          key: PRIVATE.ADMINISTRATION.CHILD.ASSET_TYPE.PARENT,
          label: "Asset Types",
        },
        {
          key: PRIVATE.ADMINISTRATION.CHILD.DEPARTMENTS.PARENT,
          label: "Departments",
        },
        {
          key: PRIVATE.ADMINISTRATION.CHILD.CONTROL_QUESTIONS.PARENT,
          label: "Control Questions",
        },
        // { key: PRIVATE.ADMINISTRATION.CHILD.COMPLIANCE_QUESTIONS.PARENT, label: 'Compliance Questions' },
        {
          key: PRIVATE.ADMINISTRATION.CHILD.ORGANIZATIONS.PARENT,
          label: "Organizations",
          show: role === ROLE.SUPER_ADMIN || role === ROLE.PARTNER,
        },
      ],
    },
  ];
};
