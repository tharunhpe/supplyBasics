import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';

const propTypes = {
  label: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

const defaultProps = {
  label: '',
  alt: null,
};

function Suggestion(props) {
  const {
    label,
    alt,
  } = props;

  return (
    <Box
      direction="row"
      justify="between"
    >
      <span>{label}</span>
      { alt &&
        <span className="secondary">
          {alt}
        </span>
      }
    </Box>
  );
}

Suggestion.propTypes = propTypes;
Suggestion.defaultProps = defaultProps;

export default Suggestion;
