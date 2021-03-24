import React from 'react';
import { Layout, Divider } from 'antd';

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Divider>&copy; Clubs Travel {new Date().getFullYear()}</Divider>
    </Footer>
  );
};

export default Footer;
