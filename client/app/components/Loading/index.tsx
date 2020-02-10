import React from 'react';

import { Icon } from 'antd';

const Loading = ({ fullscreen = false, loading = false }) => {
  return (
    <div className="loading-box">
      {loading && (
        <div className={`loading${fullscreen ? ' fullscreen' : ''}`}>
          <Icon type="loading" style={{ fontSize: '30px', color: '#08c' }} />
        </div>
      )}
    </div>
  );
};

export default Loading;
