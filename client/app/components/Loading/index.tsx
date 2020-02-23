import React from 'react';

import { Icon } from 'antd';

const Loading = ({ fullscreen = false, loading = false, auth = false }) => {
  return (
    auth &&
    loading && (
      <div className={`loading-box${fullscreen ? ' fullscreen' : ''}`}>
        <div className="loading">
          <Icon type="loading" style={{ fontSize: '30px', color: '#08c' }} />
        </div>
      </div>
    )
  );
};

export default Loading;
