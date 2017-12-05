// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';

const defaultProps = {
  isNavSideBarActive: false,
  boxDirection: 'row',
  onResourceIconClick: () => {},
};

function NavControlComponent(props) {
  const { iconComp, isNavSideBarActive } = props;
  if (!isNavSideBarActive) {
    return (<Box>
      {iconComp}
    </Box>);
  }
  return null;
}

const propTypes = {
  iconComp: PropTypes.node,
  isNavSideBarActive: PropTypes.bool,
};

NavControlComponent.propTypes = propTypes;
NavControlComponent.defaultProps = defaultProps;

export default NavControlComponent;
