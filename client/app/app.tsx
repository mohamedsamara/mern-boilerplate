import React, { useEffect } from 'react';

// import { DatePicker } from 'antd';

// import 'antd/dist/antd.less';

// Import application less styles
import './styles/less/main.less';

// Import application sass styles
import './styles/sass/main.scss';

import './app.css';

const App: React.FC = () => {
  const callApi = async () => {
    /* eslint-disable compat/compat */
    const response = await fetch('/api/notes');
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <img src="images/social_icons/facebook.png" alt="facebook logo" />
    </div>
  );
};

export default App;
