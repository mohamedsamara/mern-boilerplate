import React, { MouseEvent } from 'react';

import { Typography, Icon } from 'antd';
import Button from '../Button';

const { Text } = Typography;

interface Props {
  loading?: boolean;
  title?: string;
  onBack?: (event: MouseEvent<HTMLElement>) => void;
}

const PageHeader: React.FC<Props> = (props): JSX.Element => {
  const { loading = false, title, onBack } = props;
  return (
    <div className="page-header">
      {onBack && (
        <Button type="link" onClick={onBack}>
          <Icon type="left" />
          Back
        </Button>
      )}
      <div className="page-header-title">
        <Text>{title}</Text>
      </div>
      <div className="page-loading-header">
        {loading && (
          <Icon type="loading" style={{ fontSize: '30px', color: '#08c' }} />
        )}
      </div>
    </div>
  );
};

export default PageHeader;
