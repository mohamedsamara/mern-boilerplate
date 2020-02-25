import React from 'react';

import { Typography, Icon } from 'antd';
import Button from '../Button';

const { Text } = Typography;

const PageHeader = ({ loading = false, title, onBack }) => {
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
