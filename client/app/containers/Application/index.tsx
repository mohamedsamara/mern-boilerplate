import React from 'react';

import { Layout } from 'antd';

import Header from '../../components/Header';
import StickyHeader from '../../components/StickyHeader';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import AppRouter from '../../routes';

import styles from './styles.css';

const { Content } = Layout;

const Application: React.FC = (): JSX.Element => {
  return (
    <div className={styles.application}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Header />
          <StickyHeader />
          <Content style={{ padding: '16px', marginTop: '64px' }}>
            <div className="container">
              <AppRouter />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default Application;
