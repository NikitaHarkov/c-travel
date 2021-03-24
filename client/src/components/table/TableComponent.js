import React from 'react';
import { Table } from 'antd';
import { columns } from './tableStructure';

const TableComponent = () => {
  return (
    <Table
      onRow={(_, rowIndex) => {
        return {
          onClick: () => {
            console.log(rowIndex);
          },
        };
      }}
      //  dataSource={data}
      columns={columns}
    />
  );
};

export default TableComponent;
