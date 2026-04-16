import { Col, Row, Typography } from "antd";
import BarChartGallery from "../../chart_gallery/BarChart";
import DoughnutChart from "../../chart_gallery/DoughnutChart";
import RadarChartGallery from "../../chart_gallery/RadarChart";
import AreaLineChart from "../../chart_gallery/AreaLineChart";
import { getDashboardData } from "../../lib/mock/dashboard";

const { Title } = Typography;

function Dashboard() {
  let complianceData = getDashboardData("compliance", "ISO_27001") ?? {};
  console.log({ complianceData });

  return (
    <Row gutter={[20, 80]}>
      <Col span={12} style={{ height: "350px" }}>
        <Title level={4}>Compliance Status</Title>
        <DoughnutChart data={complianceData} />
      </Col>
      <Col span={12} style={{ height: "350px" }}>
        <Title level={4}>Risk</Title>
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
