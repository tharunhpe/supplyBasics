import React from 'react';
import PropTypes from 'prop-types';

const CLASS_ROOT = 'hpelogo';

const propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string.isRequired,
  inverse: PropTypes.bool,
};

export default function Logo(props) {
  const {
    className,
    inverse,
    size,
  } = props;
  const classes = [CLASS_ROOT];
  let height = 96;

  if (inverse) {
    classes.push(`${CLASS_ROOT}--inverse`);
  }
  if (className) {
    classes.push(className);
  }
  if (size === 'small') {
    height = 48;
  } else if (size === 'large') {
    height = 144;
  }

  return (
    <svg
      className={classes.join(' ')}
      version="1.1"
      height={`${height}px`}
      viewBox="0 0 336 141"
    >
      <g fill="none" stroke="none" fillRule="evenodd">
        <path className="logo-icon__rect" d="M0.492,0.322 L0.492,33.265 L0.493,33.265 L115.183,33.265 L115.183,0.322 L0.492,0.322 L0.492,0.322 Z M108.015,26.098 L7.662,26.098 L7.662,7.49 L108.016,7.49 L108.016,26.098 L108.015,26.098 Z" fill="#00B388" />
      </g>
    </svg>
  );
}

Logo.propTypes = propTypes;
