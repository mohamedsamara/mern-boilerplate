import React from 'react';

import { Router } from 'react-router-dom';

import history from './utils/history';

import Application from './containers/Application';

import styles from './app.css';
import './styles/less/main.less'; // Import application less styles

// No need to import the antd styles. babel-plugin-import has been configured in babel config file to help in importing individually components on demand and automatically import the corresponding stylesheet.
// import 'antd/dist/antd.less';

// Import application sass styles
// import './styles/sass/main.scss';

const App: React.FC = () => {
  return (
    <div className={styles.application}>
      <Router history={history}>
        <Application />
      </Router>
    </div>
  );
};

export default App;
