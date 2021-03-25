import React from 'react';
import { Table } from 'antd';
import { columns } from './tableStructure';

const TableComponent = ({ contracts }) => {
  return (
    <Table
      onRow={rowData => {
        return {
          onClick: () => {
            console.log(rowData.key);
          },
        };
      }}
      dataSource={contracts}
      columns={columns}
    />
  );
};

export default TableComponent;
