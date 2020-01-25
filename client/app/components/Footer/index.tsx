import React from 'react';

import { Layout } from 'antd';

const Footer = () => {
  const { Footer: FooterAntd } = Layout;

  return <FooterAntd>Mern Boilerplate © {new Date().getFullYear()}</FooterAntd>;
};

export default Footer;
