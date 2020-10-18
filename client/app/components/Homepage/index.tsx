import React from 'react';

import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Homepage: React.FC = (): JSX.Element => {
  return (
    <div className="homepage">
      <Typography>
        <Title level={2}>Mern Boilerplate</Title>
        <Paragraph>
          This is a MERN project, using MongoDB, Express, React, Node.
        </Paragraph>
        <Paragraph>
          There are different approaches and implementations in this boileplate.
        </Paragraph>
      </Typography>
    </div>
  );
};

export default Homepage;
