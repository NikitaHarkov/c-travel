import React from 'react';
import { Table } from 'antd';
import { columns } from './tableStructure';

const TableComponent = ({ contracts }) => {
  return (
    <Table
      onRow={(_, rowIndex) => {
        return {
          onClick: () => {
            console.log(rowIndex);
          },
        };
      }}
      dataSource={contracts}
      columns={columns}
    />
  );
};

export default TableComponent;
