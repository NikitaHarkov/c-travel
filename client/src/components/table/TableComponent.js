import React from 'react';
import { Table } from 'antd';
import { columns } from './tableStructure';
import { useContractContext } from '../../context/contractContext';

const TableComponent = ({ contracts }) => {
  const { getSingleContract } = useContractContext();

  return (
    <Table
      onRow={rowData => {
        return {
          onClick: () => {
            getSingleContract(rowData.key);
          },
        };
      }}
      dataSource={contracts}
      columns={columns}
    />
  );
};

export default TableComponent;
