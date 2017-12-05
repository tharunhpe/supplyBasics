import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import LayerHeader from 'components/LayerHeader';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';

const propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  okButtonLabel: PropTypes.string,
  onOkClick: PropTypes.func,
};
const defaultProps = {
  onOkClick: () => {},
  okButtonLabel: '',
  title: '',
  message: '',
};

class ConfirmationDialogComponent extends Component {
  componentWillMount() {
  }
  render() {
    const {
      onOkClick,
      message,
      title,
      okButtonLabel,
    } = this.props;
    return (
      <Box flex={false} size="medium">
        <LayerHeader
          title={title}
        />
        <Section key="sect" className="popup-label-text-section" pad={{ vertical: 'none', horizontal: 'small' }}>
          <span className="label-text">
            {message}
          </span>
          <Footer pad={{ vertical: 'small' }} justify="between">
            <Button
              id="confirmationDialogueButton"
              label={okButtonLabel}
              primary
              onClick={onOkClick}
            />
          </Footer>
        </Section>
      </Box>
    );
  }
}

ConfirmationDialogComponent.propTypes = propTypes;
ConfirmationDialogComponent.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps,
  mapDispatchToProps)(ConfirmationDialogComponent);
