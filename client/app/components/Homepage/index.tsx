import React from 'react';

import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Homepage = () => {
  return (
    <div className="homepage">
      <Typography>
        <Title level={2}>Mern Boilerplate</Title>
        <Paragraph>
          This is a MERN stack boilerplate and starter, MongoDB, Express JS,
          React, Node JS.
        </Paragraph>
        <Paragraph>
          This is a foundation project where others can use it as starter for
          their projects.
          <Text strong>
            {' '}
            To help in easy and faster development, tools integrations and
            scalability.
          </Text>
        </Paragraph>
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
