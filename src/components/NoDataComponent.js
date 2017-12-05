import React from 'react';
import Heading from 'grommet/components/Heading';
import Tile from 'grommet/components/Tile';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';

export default function NoDataComponent() {
  return (
    <Tile align="center" flex >
      <Header size="small" >
        <Heading tag="h5" align="center" >
          <Box>
            <strong>
              One Screen to rule them all
            </strong>
          </Box>
            Here is your one stop shop for monitoring your environment.
            We are building our charts to keep track of your Compliance and Capacity
        </Heading>
      </Header>
    </Tile>
  );
}
