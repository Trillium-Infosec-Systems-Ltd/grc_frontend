import { isNotNullOrEmpty, isNullOrEmpty } from "../../utils/utils";

export const FRAMEWORKS_KEYS = {
  ISO_27001: "ISO 27001",
  PISF: "PISF",
  NIST_CSF: "NIST CSF",
};

export const FRAMWORKS_MOCK = [
  {
    id: "1",
    label: "ISO 27001",
    value: FRAMEWORKS_KEYS.ISO_27001,
  },
  {
    id: "2",
    label: "PISF",
    value: FRAMEWORKS_KEYS.PISF,
  },
  {
    id: "3",
    label: "NIST CSF",
    value: FRAMEWORKS_KEYS.NIST_CSF,
  },
];

export const COMPLIANCE_STATUS_MOCK = {
  COMPLIANT: "Compliant",
  NON_COMPLIANT: "Non-Compliant",
  PARTIALLY_COMPLIANT: "Partially Compliant",
};

export const RISK_STATUS_MOCK = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  VERY_HIGH: "Very High",
};

export const ASSET_CATEGORY_MOCK = {
  CLOUD_APP: "Cloud Portals/Applications",
  VM: "VM",
  PREM_APP: "On-Prem Applications",
  DIGITAL_INFO: "Digital Information",
  SERVER: "Server",
  LAPTOPS: "Laptops",
  PEOPLE: "People",
};

export const DASHBOARD_MOCK = {
  COMPLIANCE: {
    [FRAMEWORKS_KEYS.ISO_27001]: [
      {
        name: "Compliant",
        value: 38,
      },
      {
        name: "Non-Compliant",
        value: 30,
      },
      {
        name: "Partially Compliant",
        value: 25,
      },
    ],
    [FRAMEWORKS_KEYS.PISF]: [
      {
        name: "Compliant",
        value: 28,
      },
      {
        name: "Non-Compliant",
        value: 33,
      },
      {
        name: "Partially Compliant",
        value: 15,
      },
    ],
    [FRAMEWORKS_KEYS.NIST_CSF]: [
      {
        name: "Compliant",
        value: 20,
      },
      {
        name: "Non-Compliant",
        value: 23,
      },
      {
        name: "Partially Compliant",
        value: 28,
      },
    ],
  },
  RISK_BY_STATUS: [
    {
      name: "Low",
      value: 0,
    },
    {
      name: "Medium",
      value: 398,
    },
    {
      name: "High",
      value: 501,
    },
    {
      name: "Very High",
      value: 1228,
    },
  ],
  RISK_BY_ASSET_CATEGORY: [
    {
      name: ASSET_CATEGORY_MOCK.CLOUD_APP,
      Low: 0,
      Medium: 13,
      High: 50,
      "Very High": 109,
    },
    {
      name: ASSET_CATEGORY_MOCK.VM,
      Low: 0,
      Medium: 28,
      High: 96,
      "Very High": 240,
    },
    {
      name: ASSET_CATEGORY_MOCK.PREM_APP,
      Low: 0,
      Medium: 18,
      High: 76,
      "Very High": 243,
    },
    {
      name: ASSET_CATEGORY_MOCK.DIGITAL_INFO,
      Low: 0,
      Medium: 29,
      High: 109,
      "Very High": 291,
    },
    {
      name: ASSET_CATEGORY_MOCK.SERVER,
      Low: 0,
      Medium: 15,
      High: 34,
      "Very High": 162,
    },
    {
      name: ASSET_CATEGORY_MOCK.LAPTOPS,
      Low: 0,
      Medium: 276,
      High: 83,
      "Very High": 0,
    },
    {
      name: ASSET_CATEGORY_MOCK.PEOPLE,
      Low: 0,
      Medium: 19,
      High: 52,
      "Very High": 183,
    },
  ],
};

export const getDashboardData = (doctype, framework = null) => {
    console.log({ framework });
    
  let data = [];
  if (isNullOrEmpty(doctype)) return [];
  doctype = doctype.toUpperCase();
  data = DASHBOARD_MOCK[doctype] ?? [];

  if (isNotNullOrEmpty(framework)) {
    framework = framework.toUpperCase();
    data = data[framework] ?? [];
  }
  return data;
};
