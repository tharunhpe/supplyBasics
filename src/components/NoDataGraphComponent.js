import React from 'react';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Tile from 'grommet/components/Tile';

let index = 0;
const barGraphs = [];
const noOfTimes = 3;
function getComponent(key) {
  return (
    <Box pad={{ horizontal: 'medium' }} key={key}>
      <Meter
        series={[
          { label: 'Gen 7', value: 0, colorIndex: 'graph-1' },
          { label: 'Gen 8', value: 0, colorIndex: 'graph-2' },
          { label: 'Gen 9', value: 0, colorIndex: 'graph-3' },
        ]}
        label={false}
        max={100}
        size="small"
      />
    </Box>
  );
}

for (index = 0; index < noOfTimes;) {
  barGraphs.push(getComponent(index));
  index = index + 1;
}

function NoDataGraphComponent() {
  return (
    <Box align="center">
      <Box direction="row" align="center" >
        <Tile size="small">
          <Meter size="small" value={50} colorIndex="grey-4-a" type="circle" />
        </Tile>
        <Tile size="small">
          <Meter size="small" value={30} colorIndex="grey-4-a" type="circle" />
        </Tile>
        <Tile size="small">
          <Meter size="small" value={70} colorIndex="grey-4-a" type="circle" />
        </Tile>
      </Box>
      <Box direction="row" >
        <Tile align="center" flex >
          <Box direction="row" responsive={false} align="center" >
            {barGraphs}
          </Box>
        </Tile>
      </Box>
    </Box>
  );
}

export default NoDataGraphComponent;
