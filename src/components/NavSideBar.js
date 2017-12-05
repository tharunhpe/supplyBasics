// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import React from 'react';
import PropTypes from 'prop-types';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import CloseIcon from 'grommet/components/icons/base/Close';
import WaypointIcon from 'grommet/components/icons/base/Waypoint';
import AuthorIcon from 'grommet/components/icons/base/Brush';
import Label from 'grommet/components/Label';
import Heading from 'grommet/components/Heading';
import { NavLink } from 'react-router-dom';
import ResourcesIcon from 'grommet/components/icons/base/Resources';
import SettingsOptionIcon from 'grommet/components/icons/base/Configure';

function NavSideBar(props) {
  const { id, items, label, onNavSideBarClose, learnMoreLink } = props;
  const resourceIconComp = <ResourcesIcon colorIndex={'plain'} />;
  const authorIconComp = <AuthorIcon colorIndex={'plain'} />;
  const settingsIconComp = <SettingsOptionIcon colorIndex={'plain'} />;
  let resourceIcon = false;
  let authorIcon = false;
  let settingsIcon = false;
  if (label === 'Resource Management') {
    resourceIcon = true;
  } else if (label === 'Settings') {
    settingsIcon = true;
  } else {
    authorIcon = true;
  }
  const links = items.map((page, index) =>
    (<NavLink
      id={`${id}-${page.label}`}
      to={page.path}
      key={index}
      style={{ textDecoration: 'none' }}
      activeClassName="activeLink"
    >
      <Title>
        {page.icon}
        <Label margin="none">{page.label}</Label>
      </Title>
    </NavLink>));
  return (
    <Sidebar colorIndex="light-2" fixed separator="all">
      <Box basis="xxlarge" className="navSideBar" pad={{ vertical: 'small' }}>
        <Header size="large" justify="between" pad={{ horizontal: 'small' }}>
          <Title onClick={onNavSideBarClose} a11yTitle="Close Menu">
            {settingsIcon && settingsIconComp}
            {resourceIcon && resourceIconComp}
            {authorIcon && authorIconComp}
            <Heading strong tag="h4" align="center">{label}</Heading>
          </Title>
          <Button
            icon={<CloseIcon />}
            onClick={onNavSideBarClose}
            plain
            a11yTitle="Close Menu"
          />
        </Header>
        <Menu fill primary className="navSideBar">
          {links}
        </Menu>
      </Box>
      <Footer pad={{ horizontal: 'medium', vertical: 'small' }}>
        <Anchor
          label="Get Started"
          target="_blank"
          onClick={learnMoreLink}
          primary
          icon={<WaypointIcon />}
        />
      </Footer>
    </Sidebar>
  );
}
NavSideBar.propTypes = {
  onNavSideBarClose: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string,
  })),
  label: PropTypes.string,
  id: PropTypes.string,
  learnMoreLink: PropTypes.func,
};
export default NavSideBar;
