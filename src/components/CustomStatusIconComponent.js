import React, { PropTypes } from 'react';
import StatusIcon from 'grommet/components/icons/Status';
import BrandGrommetPathIcon from 'grommet/components/icons/base/BrandGrommetPath';
import ClockIcon from 'grommet/components/icons/base/Clock';
import InProgressIcon from 'grommet/components/icons/base/InProgress';

const propTypes = {
  value: PropTypes.string.isRequired,
};

export default function CustomStatusIconComponent(props) {
  const { value } = props;
  if (value === 'orange') {
    return (
      <BrandGrommetPathIcon className="mediumRiskStatus" size="xsmall" colorIndex="accent-3" />
    );
  } else if (value === 'black') {
    return (
      <BrandGrommetPathIcon className="noPolicyStatus" size="xsmall" colorIndex="accent-3" />
    );
  } else if (value === 'neutral-2-t') {
    return (
      <BrandGrommetPathIcon className="notMeasuredStatus" size="xsmall" colorIndex="neutral-2-t" />
    );
  } else if (value === 'noschedule') {
    return (
      <ClockIcon size="xsmall" />
    );
  } else if (value === 'scheduled') {
    return (
      <ClockIcon size="xsmall" colorIndex="brand" />
    );
  } else if (value === 'running') {
    return (
      <InProgressIcon size="xsmall" colorIndex="accent-3" />
    );
  }
  return (
    <StatusIcon value={value} size="small" />
  );
}

CustomStatusIconComponent.propTypes = propTypes;
