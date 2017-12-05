import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Image from 'grommet/components/Image';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import NavControlComponent from './NavControlComponent';


const propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  actions: PropTypes.array,
  visibleProgress: PropTypes.bool.isRequired,
  onBack: PropTypes.func,
  backURL: PropTypes.string,
  disableLinks: PropTypes.bool,
  iconComp: PropTypes.node,
  isNavSideBarActive: PropTypes.bool.isRequired,
};

const defaultProps = {
  title: '',
  actions: [],
  visibleProgress: false,
  onBack: () => { },
  disableLinks: false,
  isNavSideBarActive: false,
};

export default function TitleSection(props) {
  const {
    actions,
    title,
    icon,
    visibleProgress,
    onBack,
    backURL,
    disableLinks,
    iconComp,
    isNavSideBarActive,
  } = props;
  const navComp = (<NavControlComponent
    iconComp={iconComp}
    isNavSideBarActive={isNavSideBarActive}
  />);
  const actionButtons = (
    <Menu id="titleSectionMenu" direction="row" justify="start">
      {
        actions.map((action, index) => {
          if (action.onClick || !action.path) {
            return (
              <Box key={index} direction="row" pad={{ horizontal: 'small', vertical: 'small' }}>
                <Button
                  id={`${action.id}`}
                  key={index}
                  onClick={visibleProgress === false ? action.onClick : null}
                  label={action.label}
                  plain
                  fill
                />
              </Box>
            );
          }
          return (
            <Link
              id={`${action.id}-link`}
              key={index}
              to={disableLinks ? '#' : action.path}
              style={{ textDecoration: 'none' }}
            >
              <Box direction="row" pad={{ horizontal: 'small', vertical: 'small' }}>
                <Button
                  id={`${action.id}`}
                  onClick={() => { }}
                  label={action.label}
                  plain
                  fill
                />
              </Box>
            </Link>
          );
        })
      }
    </Menu>
  );

  const iconName = icon && (<Image src={icon} size="thumb" />);
  return (
    <Box separator="bottom" direction="row" >
      {navComp}
      <Box
        pad={{ horizontal: 'medium', vertical: 'small' }}
        direction="row"
        flex="grow"
      >
        {backURL ? (
          <Link
            to={disableLinks ? '#' : backURL}
            style={{ textDecoration: 'none' }}
          >
            <Title
              onClick={onBack}
              className="grommetux-anchor--primary grommetux-anchor--icon-label"
              id={`title-icon-${title}`}
            >
              <LinkPreviousIcon />
              {title}
            </Title>
          </Link>
        ) : (
          <Title id={`title-${title}`}>
            {iconName}
            {title}
          </Title>
          )
        }
      </Box>
      <Box>
        {
          !!actions.length &&
            (
              <Menu id="Actions" label="Actions" dropAlign={{ right: 'right' }}>
                {actionButtons}
              </Menu>
            )
        }
      </Box>
    </Box>
  );
}

TitleSection.propTypes = propTypes;
TitleSection.defaultProps = defaultProps;
