// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';

import Notification from 'grommet/components/Notification';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import { JOB_STATUSES_MAP } from 'utils/constants';

const propTypes = {
  activeJob: PropTypes.object,
  startedMessage: PropTypes.string,
  completedMessage: PropTypes.string,
  showDetailsMessage: PropTypes.string,
  jobStatus: PropTypes.string,
};

export const defaultProps = {
  intl: {},
  startedMessage: '',
  completedMessage: '',
  showDetailsMessage: '',
  notificationMessage: '',
  jobStatus: '',
  activeJob: null,
};

function JobAlertBanner(props) {
  const {
    activeJob,
    startedMessage,
    completedMessage,
    showDetailsMessage,
    jobStatus,
  } = props;

  if (!activeJob) {
    return null;
  }

  const dateToDisplay = activeJob.endTime || activeJob.startTime;
  const date = dateToDisplay ? new Date(parseInt(dateToDisplay, 10)) : new Date();

  return (
    <Section
      pad="none"
    >
      <Notification
        pad={{ vertical: 'none', horizontal: 'none' }}
        message={`${activeJob.jobName} - ${jobStatus}`}
        status="Unknown"
      >
        <Box direction="row" margin="none">
          { activeJob.jobStatus === JOB_STATUSES_MAP.RUNNING &&
            <Box pad="none" align="center" justify="center">
              <Spinning />
            </Box>
          }
          <Box
            pad={{ vertical: 'none', horizontal: activeJob.jobStatus === JOB_STATUSES_MAP.RUNNING ? 'small' : 'none' }}
            align="start"
            justify="center"
          >
            <span className="secondary">
              {
                `${[JOB_STATUSES_MAP.RUNNING, JOB_STATUSES_MAP.NOTSTARTED].indexOf(activeJob.jobStatus) !== -1
                  ? startedMessage : completedMessage} ${' '}`
              }
              <FormattedDate
                value={date}
                year="numeric"
                month="long"
                day="2-digit"
                hour="numeric"
                minute="numeric"
                second="numeric"
              />
            </span>
            { activeJob.jobStatus === JOB_STATUSES_MAP.COMPLETED &&
              <Link to={`/provision/activity/${activeJob.uuid}`}>
                {showDetailsMessage}
              </Link>
            }
          </Box>
        </Box>
      </Notification>
    </Section>
  );
}

JobAlertBanner.propTypes = propTypes;
JobAlertBanner.defaultProps = defaultProps;

export default JobAlertBanner;
