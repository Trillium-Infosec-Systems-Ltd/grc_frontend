import { Col, Row, Typography } from "antd";
import BarChartGallery from "../../chart_gallery/BarChart";
import DoughnutChart from "../../chart_gallery/DoughnutChart";
import RadarChartGallery from "../../chart_gallery/RadarChart";
import AreaLineChart from "../../chart_gallery/AreaLineChart";

const { Title } = Typography;

function Dashboard() {
  return (
    <Row gutter={[20, 80]}>
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
      </Col>
    </Row>
  );
}

export default Dashboard;
