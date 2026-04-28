import { Col, Row, Typography, Select, Button, Dropdown, Flex } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import BarChartGallery from "../../chart_gallery/BarChart";
import DoughnutChart from "../../chart_gallery/DoughnutChart";
import useDashboardHook from "../../hooks/useDashboardHook";

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
  const {
    frameworks,
    activeFramework,
    compliance,
    riskByStatus,
    riskByCategory,
    setActiveFramework
  } = useDashboardHook();

  return (
    <Row gutter={[20, 80]}>
      <Col span={12} style={{ height: "350px" }}>
        <Flex justify="space-between" style={{ alignItems: "center"}}>
        <Title level={4}>Compliance Status</Title>
          <Dropdown
            menu={{
              items: exportOptions,
              onClick: () => console.log("Exporting..."),
            }}
            placement="bottomRight"
          >
            <Button icon={<ArrowDownOutlined />} color="cyan" variant="solid">
              Export
            </Button>
          </Dropdown>
        </Flex>
        <Flex justify="space-between" alignItems="center">
          <Select
            showSearch
            placeholder="Framework"
            optionFilterProp="label"
            value={activeFramework}
            onChange={setActiveFramework}
            options={frameworks ?? []}
            style={{ width: 200 }}
          />
        </Flex>
        <DoughnutChart data={compliance} />
      </Col>
      <Col span={12} style={{ height: "350px" }}>
        <Flex justify="space-between" style={{ alignItems: "center"}}>
        <Title level={4}>Risk</Title>
          <Dropdown
            menu={{
              items: exportOptions,
              onClick: () => console.log("Exporting..."),
            }}
            placement="bottomRight"
          >
            <Button icon={<ArrowDownOutlined />} color="cyan" variant="solid">
              Export
            </Button>
          </Dropdown>
        </Flex>
        <DoughnutChart data={riskByStatus} />
      </Col>
      <Col span={24} style={{ height: "350px", marginTop: '30px' }}>
      <Flex justify="space-between" style={{ alignItems: "center"}}>
        <Title level={4}>Risk By Asset Category</Title>
        <Dropdown
            menu={{
              items: exportOptions,
              onClick: () => console.log("Exporting..."),
            }}
            placement="bottomRight"
          >
            <Button icon={<ArrowDownOutlined />} color="cyan" variant="solid">
              Export
            </Button>
          </Dropdown>
        </Flex>
        <BarChartGallery data={riskByCategory} isStacked />
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
