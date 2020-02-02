import React from 'react';

import { Router } from 'react-router-dom';
import { Layout } from 'antd';

import history from './utils/history';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AppRouter from './routes';
import styles from './app.css';
import './styles/less/main.less'; // Import application less styles

// No need to import the antd styles. babel-plugin-import has been configured in babel config file to help in importing individually components on demand and automatically import the corresponding stylesheet.
// import 'antd/dist/antd.less';

// Import application sass styles
// import './styles/sass/main.scss';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <div className={styles.application}>
      <Router history={history}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ padding: '16px', marginTop: '64px' }}>
              <div className="container">
                <AppRouter />
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
