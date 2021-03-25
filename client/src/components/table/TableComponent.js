import React from 'react';
import { Table } from 'antd';
import { columns } from './tableStructure';
import { useContractContext } from '../../context/contractContext';

const TableComponent = ({ contracts }) => {
  const { setSingleContract } = useContractContext();

  return (
    <Table
      onRow={rowData => {
        return {
          onClick: () => {
            setSingleContract(rowData);
          },
        };
      }}
      dataSource={contracts}
      columns={columns}
    />
  );
};

export default TableComponent;
