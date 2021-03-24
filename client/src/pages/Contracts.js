import React, { useState } from 'react';
import styled from 'styled-components';
import './Contracts.css';
import { Link } from 'react-router-dom';
import { DrawerForm, Footer } from '../components';
import { Layout, Button, Breadcrumb } from 'antd';
import { useUserContext } from '../context/userContext';

const Contracts = () => {
  const {
    user: { username },
    logout,
  } = useUserContext();
  const [isVisible, setIsVisible] = useState(false);

  const showDrawer = () => setIsVisible(true);
  const closeDrawer = () => setIsVisible(false);

  const { Header, Content } = Layout;
  return (
    <Wrapper>
      <Layout className='layout'>
        <Header>
          <Link to='/contracts'>
            <div className='contracts-logo' />
          </Link>
          <Button type='primary' shape='round' size='large' onClick={logout}>
            Logout
          </Button>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} />
          <DrawerForm
            isVisible={isVisible}
            showDrawer={showDrawer}
            closeDrawer={closeDrawer}
          />
          <div className='site-layout-content'>Content</div>
        </Content>
        <Footer />
      </Layout>
    </Wrapper>
  );
};

const Wrapper = styled.main``;

export default Contracts;
