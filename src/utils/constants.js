// List of possible statuses known by grommet
export const GROMMET_STATUSES = {
  OK: 'ok',
  Ok: 'OK',
  CRITICAL: 'critical',
  Critical: 'Critical',
  WARNING: 'warning',
  UNKNOWN: 'unknown',
  DISABLED: 'disabled',
};

// please use CustomStatusIconComponent for the following
// statuses to work
export const CUSTOM_STATUSES = {
  NO_SCHEDULE: 'noschedule',
  SCHEDULED: 'scheduled',
  RUNNING: 'running',
};

// List of compliance details statuses and their grommet correspondent
export const RESULT_STATUSES_MAP = {
  COMPLIANT: GROMMET_STATUSES.OK,
  EXCEPTED: GROMMET_STATUSES.Ok,
  'NOT COMPLIANT IN RSLO': GROMMET_STATUSES.WARNING,
  'NOT COMPLIANT OUT RSLO': GROMMET_STATUSES.CRITICAL,
  'NOT MEASURED': GROMMET_STATUSES.UNKNOWN,
  ERROR: GROMMET_STATUSES.Critical,
};

// List of job compliance details statuses and their grommet correspondent
export const JOB_RESULT_STATUSES_MAP = {
  COMPLIANT: GROMMET_STATUSES.OK,
  EXCEPTED: GROMMET_STATUSES.Ok,
  'NOT COMPLIANT': GROMMET_STATUSES.CRITICAL,
  ERROR: GROMMET_STATUSES.Critical,
};


// List of compliance details statuses and their display value
export const RESULT_STATUSES_DISPLAY_MAP = {
  COMPLIANT: 'Compliant',
  EXCEPTED: 'Excepted',
  'NOT COMPLIANT IN RSLO': 'Not Compliant - Within RSLO',
  'NOT COMPLIANT OUT RSLO': 'Not Compliant - Out of RSLO',
  'NOT MEASURED': 'Not Measured',
  ERROR: 'Failed',
};

// List of job compliance details statuses and their display value
export const JOB_RESULT_STATUSES_DISPLAY_MAP = {
  COMPLIANT: 'Compliant',
  EXCEPTED: 'Excepted',
  'NOT COMPLIANT': 'Non Compliant',
  ERROR: 'Failed',
};

// Filter operators are used to filter by a property
// starting with, containing or ending with the string value
export const FILTER_OPERATORS = {
  STARTS: 'LIKE-STARTS',
  ENDS: 'LIKE-ENDS',
  CONTAINS: 'LIKE-CONTAINS',
  IN: 'IN',
};

// Possible sort parameter types
export const PARAM_TYPES = {
  OBJECT: 'object',
  STRING: 'string',
  TIMESTAMP: 'timestamp',
  NUMBER: 'number',
};

export const FILTER_SQL_OPERATORS = {
  IN: 'IN',
  EQ: 'EQ',
};

export const DEFAULT_FILTER_VALUE = 'All';

export const JOB_REFRESH_RATE = {
  ACTIVE: 5000,
  INACTIVE: 10000,
};

export const JOB_STATUSES_MAP = {
  DEFINED: 'DEFINED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  WARNING: 'WARNING',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  TIMEOUT: 'TIMEOUT',
  SCHEDULED: 'SCHEDULED',
  NOTSTARTED: 'NOTSTARTED',
};

// TODO: remove this mapping, when there's api support to filter by name.
export const CVE_NAMES_MAP = {
  'CVE-2014-0160': 'Heartbleed',
  'CVE-2014-3566': 'Poodle',
  'CVE-2014-6271': 'ShellShock',
  'CVE-2017-0144': 'WannaCry',
};
// TODO: remove this mapping, when there's api support to filter by name.
export const CVE_DISPLAY_LABELS_MAP = {
  heartbleed: 'Heartbleed',
  poodle: 'Poodle',
  shellshock: 'ShellShock',
  wannacry: 'WannaCry',
};

export const POLICY_COMPLIANCE_JOB_TYPES_MAP = {
  POLICY_REMEDIATE: 'POLICY_REMEDIATE',
  POLICY_ADHOC_SCAN: 'POLICY_ADHOC_SCAN',
  POLICY_ADHOC_REMEDIATE: 'POLICY_ADHOC_REMEDIATE',
  POLICY_SCAN: 'POLICY_SCAN',
};

export const DEBOUNCE_SEARCH_TIME = 1000;
