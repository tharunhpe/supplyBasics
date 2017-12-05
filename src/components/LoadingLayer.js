import React from 'react';
import PropTypes from 'prop-types';
import Layer from 'grommet/components/Layer';
import Spinning from 'grommet/components/icons/Spinning';

const propTypes = {
  messages: PropTypes.string,
  loadingLayerBool: PropTypes.bool,
};

const defaultProps = {
  messages: '',
  loadingLayerBool: true,
};

export default function LoadingLayer({ messages, loadingLayerBool }) {
  return (
    <div>
      {loadingLayerBool &&
        <Layer flush className="loadingLayer">
          <Spinning className="loadingListWrapper" />
        </Layer>
      }
    </div>
  );
}

LoadingLayer.propTypes = propTypes;
LoadingLayer.defaultProps = defaultProps;
