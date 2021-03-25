import React, { useState } from 'react';
import styled from 'styled-components';
import './Contracts.css';
import { Link } from 'react-router-dom';
import { ContractsContent, Footer } from '../../components';
import { Layout, Button } from 'antd';
import { useUserContext } from '../../context/userContext';
import { useContractContext } from '../../context/contractContext';

const Contracts = () => {
  const { logout } = useUserContext();
  const {
    clearContractState,
    clearContractStateByLogout,
  } = useContractContext();
  const [isVisible, setIsVisible] = useState(false);

  const logoutAndClear = () => {
    clearContractStateByLogout();
    logout();
  };

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => {
    clearContractState();
    setIsVisible(false);
  };

  const { Header, Content } = Layout;
  return (
    <Wrapper>
      <Layout className='layout'>
        <Header>
          <Link to='/contracts'>
            <div className='contracts-logo' />
          </Link>
          <div style={{ marginTop: 10 }}>
            <Button
              type='primary'
              shape='round'
              size='large'
              onClick={logoutAndClear}
            >
              Выйти
            </Button>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <ContractsContent
            isVisible={isVisible}
            showDrawer={showDrawer}
            closeDrawer={closeDrawer}
          />
        </Content>
        <Footer />
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.main``;

export default Contracts;
