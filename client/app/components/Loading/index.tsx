import React from 'react';

import { Icon } from 'antd';

interface Props {
  fullscreen?: boolean;
  loading?: boolean;
  auth?: boolean;
}

const Loading: React.FC<Props> = (props): JSX.Element => {
  const { fullscreen = false, loading = false, auth = false } = props;

  return (
    <div className={`loading-box${fullscreen ? ' fullscreen' : ''}`}>
      {!auth && loading && (
        <div className="loading">
          <Icon type="loading" style={{ fontSize: '30px', color: '#08c' }} />
        </div>
      )}
    </div>
  );
};

export default Loading;
