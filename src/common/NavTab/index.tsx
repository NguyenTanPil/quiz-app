import React, { useState } from 'react';
import { Container, NavContainer, NavItem, TabContainer, TabItem } from './NavTabStyles';

type NavTabProps = {
  tabList: string[];
  activeTab: string;
  children: React.ReactElement[];
  setActiveTab: (value: string) => void;
};

const NavTab = ({ tabList, activeTab, children, setActiveTab }: NavTabProps) => {
  return (
    <Container>
      <TabContainer>
        {tabList.map((tab) => (
          <TabItem key={tab} tabName={tab} activeTab={activeTab} onClick={() => setActiveTab(tab)}>
            {tab}
          </TabItem>
        ))}
      </TabContainer>
      <NavContainer>
        {tabList.map((tab, idx) => (
          <NavItem key={tab} tabName={tab} activeTab={activeTab}>
            {children[idx]}
          </NavItem>
        ))}
      </NavContainer>
    </Container>
  );
};

export default NavTab;
