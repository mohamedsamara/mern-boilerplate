import React from 'react';

import { DatePicker } from 'antd';

import 'antd/dist/antd.less';

// Import application less styles
import './styles/less/main.less';

// Import application sass styles
import './styles/less/main.less';

const App: React.FC = () => {
  return (
    <div>
      <div className="section">
        <ul>App works!</ul>
        <img src={'images/social_icons/facebook.png'} />
      </div>
      <DatePicker />
    </div>
  );
};

export default App;
