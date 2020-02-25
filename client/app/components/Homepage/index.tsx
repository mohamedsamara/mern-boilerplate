import React from 'react';

import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Homepage: React.FC = (): JSX.Element => {
  return (
    <div className="homepage">
      <Typography>
        <Title level={2}>Mern Boilerplate</Title>
        <Paragraph>
          This is a MERN stack boilerplate and starter, using MongoDB, Express
          JS, React, Node JS.
        </Paragraph>
        <Paragraph>
          This stack is built to help developers build React web applications
          faster with no need to create any boilerplate code.
        </Paragraph>
        <Paragraph>
          There are different approaches and implementations in this boileplate
          and they exist only to meet different preferences and needs. For
          example there is LESS and Sass preprocessors with a nice folder/file
          structure to style the application. You can simply pick one and remove
          the other.
        </Paragraph>
        <Text strong> This stack is also scalable and easy to use.</Text>
      </Typography>
      <div className="cube-animation">
        <div className="scene">
          <div className="cube">
            <div className="face front">MongoDB</div>
            <div className="face right">Express</div>
            <div className="face left">React</div>
            <div className="face back">Node</div>
            <div className="face top">Typescript</div>
            <div className="face bottom">Webpack</div>
          </div>
        </div>
        <div className="scene">
          <div className="cube">
            <div className="face front">less</div>
            <div className="face right">sass</div>
            <div className="face left">css</div>
            <div className="face back">postcss</div>
            <div className="face top">eslint</div>
            <div className="face bottom">stylelint</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
