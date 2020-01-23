import React from 'react';

import { Router } from 'react-router-dom';

import history from './utils/history';

// No need to import the antd styles. babel-plugin-import has been configured in babel config file to help
// in importing individually components on demand and automatically import the corresponding stylesheet.

// import 'antd/dist/antd.less';

// Import application less styles
import './styles/less/main.less';

// Import application sass styles
import './styles/sass/main.scss';

import './app.css';

import AppRouter from './routes';

const App: React.FC = () => {
  return (
    <div className="application">
      <Router history={history}>
        <AppRouter />
      </Router>
    </div>
  );
};

export default App;
