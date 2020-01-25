import React from 'react';

import { Router } from 'react-router-dom';
import { Layout } from 'antd';

import history from './utils/history';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AppRouter from './routes';
import './styles/less/main.less'; // Import application less styles
import styles from './app.css';

// No need to import the antd styles. babel-plugin-import has been configured in babel config file to help in importing individually components on demand and automatically import the corresponding stylesheet.
// import 'antd/dist/antd.less';

// Import application sass styles
// import './styles/sass/main.scss';

const App: React.FC = () => {
  const { Content } = Layout;

  return (
    <div className={styles.application}>
      <Router history={history}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content style={{ padding: '0 16px', marginTop: 80 }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
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
