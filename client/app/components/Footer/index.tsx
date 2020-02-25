import React from 'react';

import { Layout } from 'antd';

const { Footer: FooterAntd } = Layout;

const Footer: React.FC = (): JSX.Element => {
  return <FooterAntd>Mern Boilerplate © {new Date().getFullYear()}</FooterAntd>;
};

export default Footer;
