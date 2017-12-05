import React from 'react';
import PropTypes from 'prop-types';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';

const propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  navigateBack: PropTypes.func.isRequired,
};

const defaultProps = {
  title: 'Layer',
  subtitle: '',
  editMode: false,
  navigateBack: () => {},
};

export default function LayerHeader({ title, editMode, navigateBack, subtitle }) {
  const backButton = editMode ? (
    <Button
      icon={<LinkPreviousIcon />}
      onClick={navigateBack}
    />) : null;

  return (
    <Header className="display-block" separator="bottom" pad={{ vertical: 'small', horizontal: 'medium' }}>
      <Title>
        {backButton}
        <Heading tag="h3" className="pop-up-heading" strong>
          {title}
        </Heading>
      </Title>
      { subtitle && <Heading tag="h4" className="pop-up-heading" strong>
        {subtitle}
      </Heading>
      }
    </Header>
  );
}

LayerHeader.propTypes = propTypes;
LayerHeader.defaultProps = defaultProps;
