import React from 'react';
import Box from 'grommet/components/Box';
import Navigation from 'components/Navigation';
import NoDataComponent from './NoDataComponent';
import NoDataGraphComponent from './NoDataGraphComponent';

export default function NoDashboardComponent() {
  return (
    <Box>
      <Navigation />
      <Box pad={{ vertical: 'small' }}>
        <NoDataComponent />
        <NoDataGraphComponent />
      </Box>
    </Box>
  );
}
