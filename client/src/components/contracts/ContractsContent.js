import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import DrawerForm from '../drawer-form/DrawerForm';
import { useContractContext } from '../../context/contractContext';
import Table from '../table/TableComponent';
import Loading from '../Loading';

const ContractsContent = ({ isVisible, showDrawer, closeDrawer }) => {
  const { contracts, loading, fetchContracts } = useContractContext();

  useEffect(() => {
    fetchContracts();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading className='site-layout-content' />;
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }} />
      <DrawerForm
        isVisible={isVisible}
        showDrawer={showDrawer}
        closeDrawer={closeDrawer}
      />
      <Table contracts={contracts} />
    </>
  );
};

export default ContractsContent;
