import React, { useEffect, useState } from 'react';
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
    singleContract,
    amount,
  } = useContractContext();
  const { Search } = Input;

  const [formData, setFormData] = useState({
    id: '',
    date: '',
    contractNumber: '',
    fullName: '',
    summ: 0,
    validity: '',
    phone: '',
    email: '',
    status: '',
    comment: '',
  });

  const searchHandler = query => {
    if (query.length === 0) {
      queryContracts(query);
    }
    if (query.length >= 3) {
      queryContracts(query);
    }
  };

  useEffect(() => {
    fetchContracts();
    //eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (singleContract !== null) {
      setFormData({
        id: singleContract.key || singleContract._id,
        date: singleContract.date,
        contractNumber: singleContract.contractNumber,
        fullName: singleContract.fullName,
        summ: singleContract.summ,
        validity: singleContract.validity,
        phone: singleContract.phone,
        email: singleContract.email,
        status: singleContract.status,
        comment: singleContract.comment,
      });
      showDrawer();
    }
    //eslint-disable-next-line
  }, [singleContract]);

  if (loading) {
    return <Loading className='site-layout-content' />;
  }

  return (
    <>
      <Search
        style={{ widows: 200 }}
        placeholder='Номер договора/Имя'
        allowClear
        size='large'
        onSearch={searchHandler}
        onChange={e => searchHandler(e.target.value)}
      />
      <h3>Количество договоров: {amount}</h3>
      <DrawerForm
        isVisible={isVisible}
        showDrawer={showDrawer}
        closeDrawer={closeDrawer}
        formData={formData}
        setFormData={setFormData}
      />
      <Table contracts={contracts} />
    </>
  );
};

export default ContractsContent;
