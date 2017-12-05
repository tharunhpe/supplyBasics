import React, { PropTypes } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import Box from 'grommet/components/Box';
import Notification from 'grommet/components/Notification';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  errors: PropTypes.array,
  onDismissError: PropTypes.func,
};

const defaultProps = {
  errors: [],
  onDismissError: () => { },
};

function ErrorHandler(props) {
  const {
    intl,
    errors,
    onDismissError,
  } = props;

  return (
    <div id="error-Section">
      {
        errors.map((error, index) =>
          (
            <div key={`error-row-${index}`}>
              <Box flex="grow" id={`notificationBar-${index}`} className="errorPanel">
                <Notification
                  className="error-header"
                  id={`error-${index + 1}`}
                  message={parseError(error, intl)}
                  status="critical"
                  onClick={() => { onDismissError(index); }}
                />
              </Box>
            </div>
          ),
        )
      }
    </div>
  );
}

export function parseError(errorObj, intl) {
  const message = errorObj ? (
                    errorObj.message ||
                    errorObj.error ||
                    intl.formatMessage(messages.genericErrorMessage)
                  ) : intl.formatMessage(messages.genericErrorMessage);
  return message;
}

ErrorHandler.propTypes = propTypes;
ErrorHandler.defaultProps = defaultProps;

export default injectIntl(ErrorHandler);
