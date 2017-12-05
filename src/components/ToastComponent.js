import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Box from 'grommet/components/Box';
import Toast from 'grommet/components/Toast';
import CircleInformationIcon from 'grommet/components/icons/base/CircleInformation';

const propTypes = {
  icon: PropTypes.node,
  message: PropTypes.string,
  linkSection: PropTypes.node,
  onClose: PropTypes.func,
  showToastBool: PropTypes.bool,
};
export const defaultProps = {
  icon: <CircleInformationIcon colorIndex="light-1" />,
  message: '',
  onViewDetails: () => {},
  onClose: () => {},
};

function ToastComponent(props) {
  const {
    icon,
    message,
    linkSection,
    onClose,
    showToastBool,
  } = props;
  return (
    <Box>
      {showToastBool && (
      <Toast
        id="ToastComponent"
        onClose={onClose}
        colorIndex="accent-2"
      >
        <Box
          align="center"
          direction="row"
          flex="grow"
        >
          <Box flex="grow" direction="row" align="center">
            {icon}
            <span id="toastLabel">{message}</span>
          </Box>
          <Box>
            <Box align="end">
              {linkSection}
            </Box>
          </Box>
        </Box>
      </Toast>
        )}
    </Box>
  );
}

ToastComponent.propTypes = propTypes;
ToastComponent.defaultProps = defaultProps;

export default injectIntl(ToastComponent);
