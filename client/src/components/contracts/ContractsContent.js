import React, { useEffect } from 'react';
import { Input } from 'antd';
import DrawerForm from '../drawer-form/DrawerForm';
import { useContractContext } from '../../context/contractContext';
import Table from '../table/TableComponent';
import Loading from '../Loading';

const ContractsContent = ({ isVisible, showDrawer, closeDrawer }) => {
  const {
    contracts,
    loading,
    fetchContracts,
    queryContracts,
  } = useContractContext();
  const { Search } = Input;

  const searchHandler = query => {
    queryContracts(query);
  };

  useEffect(() => {
    fetchContracts();
    //eslint-disable-next-line
  }, [loading]);

  if (loading) {
    return <Loading className='site-layout-content' />;
  }

  return (
    <>
      <Search
        style={{ widows: 200 }}
        placeholder='Номер договора/Имя'
        allowClear
        enterButton='Найти'
        size='large'
        onSearch={searchHandler}
      />
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
