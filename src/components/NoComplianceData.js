import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import messages from './messages';

const propTypes = {
  intl: intlShape.isRequired,
  complianceScoreTitle: PropTypes.string.isRequired,
};

const defaultProps = {
  intl: '',
  complianceScoreTitle: '',
};

export function generateEmptySeries() {
  const series = [];
  const emptyData = {
    label: 'No Data',
    value: 0,
    colorIndex: 'light-2',
  };
  series.push(emptyData);
  series.push(emptyData);
  series.push(emptyData);
  return series;
}

function NoComplianceData(props) {
  const {
    intl,
    complianceScoreTitle,
  } = props;
  const series = generateEmptySeries();

  const graphComp = (
    <Box pad="none">
      <span>{intl.formatMessage(messages.noComplianceData)}</span>
      <Meter
        size="small"
        type="bar"
        series={series}
      />
    </Box>
  );

  return (
    <Box direction="column" pad="none" align="start" basis="1/3">
      <Box
        pad={{ vertical: 'none' }}
        direction="column"
        justify="start"
        align="baseline"
        className="pad-for-list"
      >
        <Box
          pad={{ vertical: 'small' }}
          margin="none"
        >
          <Heading tag="h4" margin="none" className="label-fixed-size" strong>
            {complianceScoreTitle}
          </Heading>
        </Box>
      </Box>
      <Box
        className="pad-for-list"
        pad={{ vertical: 'none' }}
        margin="none"
      >
        {graphComp}
      </Box>
    </Box>
  );
}

NoComplianceData.propTypes = propTypes;
NoComplianceData.defaultProps = defaultProps;

export default injectIntl(NoComplianceData);
