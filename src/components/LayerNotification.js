import React from 'react';
import PropTypes from 'prop-types';
import CustomStatus from 'components/CustomStatusComponent';

const propTypes = {
  statusObj: PropTypes.object,
};

const defaultProps = {
  statusObj: null,
};

export default function LayerNotification({ statusObj }) {
  if (!statusObj) {
    return null;
  }

  return (
    <CustomStatus
      size={statusObj.size}
      value={statusObj.value}
      text={statusObj.text}
      timestamp={statusObj.timestamp ? statusObj.timestamp : null}
    />
  );
}

LayerNotification.propTypes = propTypes;
LayerNotification.defaultProps = defaultProps;
