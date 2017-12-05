import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import WaypointIcon from 'grommet/components/icons/base/Waypoint';
import ResourcesIcon from 'grommet/components/icons/base/Resources';
import AuthorIcon from 'grommet/components/icons/base/Brush';
import SettingsOptionIcon from 'grommet/components/icons/base/Configure';
import { Link } from 'react-router-dom';

const propTypes = {
  iconSize: PropTypes.string,
  padAttributes: PropTypes.object,
  boxDirection: PropTypes.string,
};

const defaultProps = {
  iconSize: 'medium',
  padAttributes: {
    horizontal: 'large',
    vertical: 'small',
  },
  boxDirection: 'row',
};

function Navigation(props) {
  const {
    iconSize,
    padAttributes,
    boxDirection,
   } = props;

  const author = (
    <Link id="authorAccess" to="/author" style={{ textDecoration: 'none' }}>
      <Box id="navigationAuthor" pad={padAttributes} align="center" justify="center" direction="row">
        <Box pad="small" align="start" justify="center">
          <AuthorIcon colorIndex="brand" size={iconSize} />
        </Box>
        <Box pad="none" align="start" justify="center">
          <Label margin="small">Author</Label>
        </Box>
      </Box>
    </Link>
  );

  const resourceManagement = (
    <Link id="resourceManagementAccess" to="/provision" style={{ textDecoration: 'none' }}>
      <Box id="navigationResourceManagement" pad={padAttributes} align="center" justify="center" direction="row">
        <Box pad="small" align="start" justify="center">
          <ResourcesIcon colorIndex="brand" size={iconSize} />
        </Box>
        <Box pad="none" align="start" justify="center">
          <Label margin="small">Resource Management</Label>
        </Box>
      </Box>
    </Link>
  );

  const settings = (
    <Link id="settingsAccess" to="/settings" style={{ textDecoration: 'none' }}>
      <Box id="navigationSettings" pad={padAttributes} align="center" justify="center" direction="row">
        <Box pad="small" align="start" justify="center">
          <SettingsOptionIcon colorIndex="brand" size={iconSize} />
        </Box>
        <Box pad="none" align="start" justify="center">
          <Label margin="small">Settings</Label>
        </Box>
      </Box>
    </Link>
  );

  const getStarted = (
    <Link id="getStartedTab" to="/gettingstarted" style={{ textDecoration: 'none' }}>
      <Box id="navigationgetStarted" pad={padAttributes} align="center" justify="center" direction="row">
        <Box pad="small" align="start" justify="center">
          <WaypointIcon colorIndex="brand" size={iconSize} />
        </Box>
        <Box pad="none" align="start" justify="center">
          <Label margin="small">Get Started</Label>
        </Box>
      </Box>
    </Link>
  );

  // TODO add correct path to Settings and add intl.
  return (
    <Box direction={boxDirection} separator="bottom" justify="between">
      <Box direction="row">
        {author}
        {resourceManagement}
        {settings}
      </Box>
      {getStarted}
    </Box>
  );
}

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default injectIntl(Navigation);
