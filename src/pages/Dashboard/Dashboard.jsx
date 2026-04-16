import {
  Col,
  Row,
  Typography,
  Select,
  Button,
  Dropdown,
  Flex,
} from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import BarChartGallery from "../../chart_gallery/BarChart";
import DoughnutChart from "../../chart_gallery/DoughnutChart";
import RadarChartGallery from "../../chart_gallery/RadarChart";
import AreaLineChart from "../../chart_gallery/AreaLineChart";
import {
  FRAMEWORKS_KEYS,
  FRAMWORKS_MOCK,
  getDashboardData,
} from "../../lib/mock/dashboard";
import { useMemo, useState } from "react";

const { Title } = Typography;

const exportOptions = [
  {
    key: "1",
    label: "PDF",
  },
  {
    key: "2",
    label: "Excel",
  },
];

function Dashboard() {
  const [activeFramework, setActiveFramework] = useState(
    FRAMEWORKS_KEYS.ISO_27001,
  );
  let initialData = useMemo(() => getDashboardData("compliance") ?? {}, []);
  let complianceData = initialData[activeFramework] ?? [];

  console.log({ complianceData });

  return (
    <Row gutter={[20, 80]}>
      <Col span={12} style={{ height: "350px" }}>
        <Title level={4}>Compliance Status</Title>
        <Flex justify="space-around" alignItems="center">
        <Select
          showSearch
          placeholder="Framework"
          optionFilterProp="label"
          value={activeFramework}
          onChange={setActiveFramework}
          options={FRAMWORKS_MOCK ?? []}
          style={{ width: 200 }}
        />
        <Dropdown
            menu={{
              items: exportOptions,
              onClick: () => console.log("Exporting..."),
            }}
            placement="bottomRight"
          >
            <Button icon={<ArrowDownOutlined />} color="cyan" variant="solid">Export</Button>
          </Dropdown>
        </Flex>
        <DoughnutChart data={complianceData} />
      </Col>
      <Col span={12} style={{ height: "350px" }}>
        <Title level={4}>Risk</Title>
        <Flex justify="end" alignItems="center">
          <Dropdown
            menu={{
              items: exportOptions,
              onClick: () => console.log("Exporting..."),
            }}
            placement="bottomRight"
          >
            <Button icon={<ArrowDownOutlined />} color="cyan" variant="solid">Export</Button>
          </Dropdown>
        </Flex>
        <DoughnutChart data={getDashboardData("risk_by_status")} />
      </Col>
      <Col span={24} style={{ height: "350px" }}>
        <Title level={4}>Risk By Asset Category</Title>
        <BarChartGallery
          data={getDashboardData("RISK_BY_ASSET_CATEGORY")}
          isStacked
        />
      </Col>
      {/* 
      <Col span={16} style={{ height: "350px" }}>
        <Title level={4}>Weekly Activity</Title>
        <BarChartGallery />
      </Col>
      <Col span={8} style={{ height: "350px" }}>
        <Title level={4}>Key Statistics</Title>
        <DoughnutChart />
      </Col>
      <Col span={8} style={{ height: "350px" }}>
        <Title level={4}>Risk Severity Radar</Title>
        <RadarChartGallery />
      </Col>
      <Col span={16} style={{ height: "350px" }}>
        <Title level={4}>Incidents History</Title>
        <AreaLineChart />
      </Col> */}
    </Row>
  );
}

export default Dashboard;
