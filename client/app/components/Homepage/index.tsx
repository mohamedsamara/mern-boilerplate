import React from 'react';

import { PageHeader } from 'antd';

const Homepage = () => {
  return (
    <div className="homepage">
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        title="MERN Boilerplate"
      />
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
