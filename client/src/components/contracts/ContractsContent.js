import React from 'react';
import { Breadcrumb, Table } from 'antd';
import DrawerForm from '../drawer-form/DrawerForm';

const ContractsContent = ({ isVisible, showDrawer, closeDrawer }) => {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }} />
      <DrawerForm
        isVisible={isVisible}
        showDrawer={showDrawer}
        closeDrawer={closeDrawer}
      />
      <Table className='site-layout-content' />
    </>
  );
};

export default ContractsContent;
