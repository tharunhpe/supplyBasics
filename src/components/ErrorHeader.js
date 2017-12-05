import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';

const propTypes = {
  errorMessage: PropTypes.string,
  onCloseError: PropTypes.func,
};

const defaultProps = {
  errorMessage: '',
  onCloseError: () => {},
};

function ErrorHeader(props) {
  const {
    errorMessage,
    onCloseError,
} = props;

  return (
    <Box flex="grow" id="notificationBar">
      <Notification
        message={errorMessage}
        status="critical"
        onClick={onCloseError}
      />
    </Box>
  );
}

ErrorHeader.propTypes = propTypes;
ErrorHeader.defaultProps = defaultProps;

export default ErrorHeader;
