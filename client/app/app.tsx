import React, { useEffect } from 'react';

// import { DatePicker } from 'antd';

import 'antd/dist/antd.less';

// Import application less styles
import './styles/less/main.less';

// Import application sass styles
import './styles/sass/main.scss';

const App: React.FC = () => {
  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="test">
      <div className="section">
        <ul>App works!</ul>
      </div>
      {/* <DatePicker /> */}
    </div>
  );
};

export default App;
