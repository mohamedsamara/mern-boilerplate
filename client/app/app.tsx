import React from 'react';

import { Router } from 'react-router-dom';

import history from './utils/history';
import Header from './components/Header';
import AppRouter from './routes';
import './styles/less/main.less'; // Import application less styles
import styles from './app.css';

// No need to import the antd styles. babel-plugin-import has been configured in babel config file to help in importing individually components on demand and automatically import the corresponding stylesheet.
// import 'antd/dist/antd.less';

// Import application sass styles
// import './styles/sass/main.scss';

const App: React.FC = () => {
  return (
    <div className={styles.application}>
      <Router history={history}>
        <Header />
        <main className="main">
          <AppRouter />
        </main>
      </Router>
    </div>
  );
};

export default App;
