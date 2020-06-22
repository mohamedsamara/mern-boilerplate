import React, { memo } from 'react';

import { Icon } from 'antd';

interface Props {
  fullscreen?: boolean;
  loading?: boolean;
}

const Loading: React.FC<Props> = (props): JSX.Element => {
  const { fullscreen = false, loading = false } = props;

  return (
    <div className={`loading-box${fullscreen ? ' fullscreen' : ''}`}>
      {loading && (
        <div className="loading">
          <Icon type="loading" style={{ fontSize: '30px', color: '#08c' }} />
        </div>
      )}
    </div>
  );
};

export default memo(Loading);
