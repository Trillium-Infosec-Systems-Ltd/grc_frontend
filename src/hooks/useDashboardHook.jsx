import { useCallback, useEffect, useState } from "react";
import { callApi } from "../axios/callApi";
import { APIS } from "../constants/apiConstants";
import { isNotNullOrEmpty, isNullOrEmpty } from "../utils/utils";
import { useSelector } from "react-redux";

const COMLIANCE_INIT = {
  data: [],
  frameworks: [],
  selected_framework: "",
};
const RISK_INIT = {
  riskByCategory: [],
  riskByStatus: [],
};

const useDashboardHook = () => {
  const { user, userQuery } = useSelector((state) => state.session);
  const { org_id = "" } = user;

  const [isLoading, setIsLoading] = useState(false);
  const [complianceData, setComplianceData] = useState(COMLIANCE_INIT);
  const [riskData, setRiskData] = useState(RISK_INIT);

  const {
    data: compliance = [],
    frameworks = [],
    selected_framework: activeFramework = "",
  } = complianceData ?? COMLIANCE_INIT;

  const { riskByStatus = [], riskByCategory = [] } = riskData ?? RISK_INIT;

  useEffect(() => {
    getComplianceData();
  }, [activeFramework, org_id]);

  useEffect(() => {
    getRiskByStatus();
    getRiskByCategory();
  }, [org_id]);

  const getComplianceData = useCallback(async () => {
    setIsLoading(true);
    let PAYLOAD = { ...APIS.DASHBOARD_COMPLIANCE };
    if (isNotNullOrEmpty(activeFramework)) {
      PAYLOAD = {
        ...PAYLOAD,
        PARAMS: {
          QUERY: { framework: activeFramework },
        },
      };
    }
    const result = await callApi(PAYLOAD);

    const {
      data = [],
      frameworks = [],
      selected_framework = {},
    } = result?.data ?? {};
    const { value: fValue = "" } = selected_framework;

    setComplianceData({
      data,
      frameworks,
      selected_framework: fValue,
    });

    setIsLoading(false);
  }, [activeFramework, org_id]);

  const getRiskByStatus = useCallback(async () => {
    setIsLoading(true);
    let PAYLOAD = { ...APIS.DASHBOARD_RISKS_BY_STATUS };
    const result = await callApi(PAYLOAD);

    const { RISK_BY_STATUS = [] } = result?.data ?? {};
    getRiskByCategory(RISK_BY_STATUS);

    // setIsLoading(false);
  }, [org_id]);

  const getRiskByCategory = useCallback(async (RISK_BY_STATUS = []) => {
    let PAYLOAD = { ...APIS.DASHBOARD_RISKS_BY_ASSET_CATEGORY };
    const result = await callApi(PAYLOAD);

    const { RISK_BY_ASSET_CATEGORY = [] } = result?.data ?? {};

    if (isNullOrEmpty(RISK_BY_STATUS)) {
      setRiskData((prev) => ({
        ...prev,
        riskByCategory: RISK_BY_ASSET_CATEGORY,
      }));
    } else {
      setRiskData({
        riskByStatus: RISK_BY_STATUS,
        riskByCategory: RISK_BY_ASSET_CATEGORY,
      });
    }

    setIsLoading(false);
  }, [org_id]);

  return {
    isLoading,
    frameworks,
    activeFramework,
    compliance,
    riskByStatus,
    riskByCategory,
    setActiveFramework: (value) =>
      setComplianceData((prev) => ({ ...prev, selected_framework: value })),
  };
};

export default useDashboardHook;
