import React, { useState, useEffect } from 'react';
import TableBuilder from '../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    render: (text) => <b>{text}</b>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Criticality',
    dataIndex: 'criticality',
    render: (text) => (
      <Tag color={text === 'Critical' ? 'volcano' : text === 'High' ? 'red' : 'orange'}>
        {text}
      </Tag>
    ),
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
  },
  {
    title: 'Compliance Status',
    dataIndex: 'compliance',
  },
  {
    title: 'Last Updated',
    dataIndex: 'updated',
  },
  {
    title: 'Details',
    render: (_, record) => (
      <Button shape="round" onClick={() => console.log(record)}>
        Manage
      </Button>
    ),
  },
];

export const assetData = [
  {
    id: 1,
    description: 'Web Server 1',
    type: 'Server',
    criticality: 'High',
    owner: 'Ahsan A.',
    compliance: 'Compliant (ISO 27001)',
    updated: '20 Feb 2025',
  },
  {
    id: 2,
    description: 'Database 2',
    type: 'Database',
    criticality: 'Critical',
    owner: 'Mahir M.',
    compliance: 'Non-Compliant (PCI-DSS)',
    updated: '18 Feb 2025',
  },
  {
    id: 3,
    description: 'Firewall 3',
    type: 'Network Security',
    criticality: 'High',
    owner: 'SOC Team',
    compliance: 'Compliant (NIST CSF)',
    updated: '15 Feb 2025',
  },
  {
    id: 4,
    description: 'Endpoint 4',
    type: 'Workstation',
    criticality: 'Medium',
    owner: 'IT Team',
    compliance: 'Partially Compliant (CIS v8)',
    updated: '10 Feb 2025',
  },
  {
    id: 5,
    description: 'Cloud Storage',
    type: 'Cloud Resource',
    criticality: 'High',
    owner: 'M. Ali Aziz',
    compliance: 'Compliant (SOC 2)',
    updated: '21 Feb 2025',
  },
];


const RiskList = () => {
  const navigate = useNavigate();
  const [riskList, setRiskList] = useState([]);

  useEffect(() => {
    let result = getAssetsList();
    setRiskList(result)
  }, []);

  return <div>
    <div className="table-header">
      <h2 className="title">List of Risks</h2>
      <div className="actions">
        <span className="filter-btn">🔍 Filter</span>
        <span className="add-btn" onClick={() => navigate(ROUTES.PRIVATE.RISK.PARENT + ROUTES.PRIVATE.RISK.CREATE)}>+ Add New Risk</span>
      </div>
    </div><TableBuilder columns={columns} data={riskList ?? []} /></div>;
};

export default RiskList;
