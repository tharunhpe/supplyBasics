import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  name: PropTypes.string.isRequired,
  variance: PropTypes.string.isRequired,
  onItemHover: PropTypes.func.isRequired,
  displayValue: PropTypes.string.isRequired,
  displayLabel: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  totalValue: PropTypes.number.isRequired,
};

const defaultProps = {
  intl: '',
  name: '',
  variance: '',
  onItemHover: () => {},
  displayLabel: '',
  displayValue: '',
  series: [{
    label: '',
    colorIndex: '',
    value: 0,
  }],
  totalValue: 0,
};

function ComplianceMeter(props) {
  const {
    intl,
    name,
    variance,
    series,
    displayLabel,
    displayValue,
    onItemHover,
    totalValue,
  } = props;

  let value = '';
  let label = '';

  if (variance !== '0') {
    value = displayValue || variance;
    label = displayLabel || intl.formatMessage(messages.notCompliant);
  } else {
    value = displayValue || series[0].value;
    label = displayLabel || intl.formatMessage(messages.compliant);
  }

  return (
    <Box pad="none" margin="none">
      <Box
        direction="column"
        justify="start"
        align="start"
        pad="none"
        announce
        responsive
      >
        <Box align="start" justify="start">
          <span>{name}</span>
        </Box>
        <Box align="start" justify="start">
          <span>{`${value} of ${totalValue} ${label}`}</span>
        </Box>
      </Box>
      <Meter
        className="complianceSummaryMeter"
        size="small"
        type="bar"
        stacked
        max={totalValue}
        series={series}
        onActive={(index) => { onItemHover(series, index); }}
      />
    </Box>
  );
}

ComplianceMeter.propTypes = propTypes;
ComplianceMeter.defaultProps = defaultProps;

export default injectIntl(ComplianceMeter);
