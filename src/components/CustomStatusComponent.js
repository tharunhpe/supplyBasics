import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Status from 'grommet/components/icons/Status';

const propTypes = {
  size: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number,
};

const defaultProps = {
  size: 'medium',
  value: 'ok',
  text: 'Status',
};

const CLASS_NAMES = {
  ok: 'grommetux-notification--status-ok grommetux-background-color-index-ok',
  critical: 'grommetux-notification--status-critical grommetux-background-color-index-critical',
  disabled: 'grommetux-notification--status-disabled grommetux-background-color-index-disabled',
  warning: 'grommetux-notification--status-warning grommetux-background-color-index-warning',
  unknown: 'grommetux-notification--status-unknown grommetux-background-color-index-unknown',
};

function CustomStatusComponent(props) {
  const {
    size,
    value,
    text,
    timestamp,
  } = props;

  let timestampNode;
  if (timestamp) {
    timestampNode = (
      <Heading tag="h5" margin="none">
        <FormattedDate
          value={timestamp}
          weekday="long"
          day="numeric"
          month="long"
          year="numeric"
          hour="numeric"
          minute="numeric"
          second="numeric"
        />
      </Heading>
    );
  }

  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      direction="row"
      colorIndex={value}
      className={CLASS_NAMES[value.toLowerCase()]}
      align="center"
      flex={false}
    >
      <Status
        className="grommetux-notification__status"
        size={size}
        value={value}
      />
      <Box direction="column" flex={false}>
        <Heading tag="h3" margin="none">
          {text}
        </Heading>
        {timestampNode}
      </Box>
    </Box>
  );
}

CustomStatusComponent.propTypes = propTypes;
CustomStatusComponent.defaultProps = defaultProps;

export default CustomStatusComponent;
