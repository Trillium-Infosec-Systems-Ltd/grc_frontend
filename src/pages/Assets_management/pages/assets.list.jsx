import React, { useState, useEffect } from 'react';
import TableBuilder from '../../../components/Table/Table.Builder';
import { Button, Tag } from 'antd';
import { getAssetsList } from '../../../services/assets.management.service'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes.constants';
import AppLoader from '../../../components/Loader/loader';
import { FilterFilled } from '@ant-design/icons';

const AssetsList = () => {
  const navigate = useNavigate();
  const [stateRef, setStateRef] = useState({
    isLoading: false,
    assets: []
  });

  const { isLoading, assets } = stateRef;

  useEffect(() => {
    getAssetsList({ setter: setStateRef });
  }, []);

  const columns = [
    {
      title: 'Description',
      dataIndex: 'asset_name',
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text, record) => <p style={{ cursor: 'pointer' }} onClick={() => navigate(ROUTES.PRIVATE.ASSETS.PARENT + ROUTES.PRIVATE.ASSETS.EDIT, {
        state: { id: record?.id ?? null },
      })}>{text}</p>,
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
  ]

  return <div>
    <AppLoader isLoading={isLoading}>
      <div className="table-header">
        <h2 className="title">List of Assets</h2>
        <div className="actions">
          <span className="filter-btn"><FilterFilled /> Filter</span>
          <span className="add-btn" onClick={() => navigate(ROUTES.PRIVATE.ASSETS.PARENT + ROUTES.PRIVATE.ASSETS.CREATE)}>+ Add New Asset</span>
        </div>
      </div><TableBuilder columns={columns} data={assets ?? []} />
    </AppLoader></div>;
};

export default AssetsList;
