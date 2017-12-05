import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';

const propTypes = {
  complianceScore: PropTypes.object.isRequired,
  complianceScoreTitle: PropTypes.string,
  onItemHover: PropTypes.func,
  activeSerie: PropTypes.number,
};

export const defaultProps = {
  complianceScore: {},
  complianceScoreTitle: '',
  onItemHover: () => {},
  activeSerie: -1,
};

const colorsMap = [
  {
    value: 'Low',
    colorIndex: 'accent-1',
    label: 'Compliant',
  },
  {
    value: 'Medium',
    colorIndex: 'warning',
    label: 'Non Compliant In RSLO',
  },
  {
    value: 'High',
    colorIndex: 'critical',
    label: 'Non Compliant Out RSLO',
  },
  {
    value: 'InOutRSLO',
    colorIndex: 'critical',
    label: 'Non Compliant',
  },
  {
    value: 'No Variances',
    colorIndex: 'unset',
    label: 'Unknown',
  },
];

function ComplianceScore(props) {
  const {
    complianceScore,
    complianceScoreTitle,
    onItemHover,
    activeSerie,
  } = props;

  if (complianceScore.Excepted) {
    const index = _.findIndex(colorsMap, (item) => item.value === 'Low');
    colorsMap[index].label = `Compliant ( ${complianceScore.Excepted.value} Excepted )`;
  }

  const series = [{ value: 0, label: '', colorIndex: 'unset' }];

  if (Object.keys(complianceScore).length) {
    colorsMap.forEach((el, index) => {
      series.push({
        label: el.value,
        value: complianceScore[el.value] ? complianceScore[el.value].percent : 0,
        displayValue: complianceScore[el.value] ? complianceScore[el.value].value : 0,
        colorIndex: el.colorIndex,
        index,
      });
    });
  }

  return (
    <Box pad={{ vertical: 'none' }}>
      <Box
        pad={{ vertical: 'none' }}
        direction="row"
        justify="start"
        align="baseline"
        className="pad-for-list"
      >
        <Box
          pad={{ vertical: 'none' }}
          margin="none"
        >
          <Heading tag="h4" margin="none" className="label-fixed-size" strong>
            {complianceScoreTitle}
          </Heading>
        </Box>
      </Box>
      <Box
        direction="row"
        justify="between"
        align="center"
        size="medium"
        pad={{ vertical: 'small', between: 'small' }}
        responsive={false}
      >
        <Value
          className="secondary"
          value={complianceScore.totalScore.value}
          units="Variances"
          align="start"
          size="small"
        />
        <span className="secondary">
          {activeSerie > 0 ? `${series[activeSerie].displayValue} - ${colorsMap[activeSerie - 1].label}` : <Box pad="small" />}
        </span>
      </Box>
      <Box pad={{ horizontal: 'none', vertical: 'small' }}>
        <Meter
          size="medium"
          type="bar"
          series={series}
          onActive={onItemHover}
          stacked
        />
      </Box>
    </Box>
  );
}

ComplianceScore.propTypes = propTypes;
ComplianceScore.defaultProps = defaultProps;

export default injectIntl(ComplianceScore);
