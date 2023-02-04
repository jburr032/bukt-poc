import { Grid, GridItem } from '@chakra-ui/react';
import Navbar from './Navbar';

export default function GridLayout({
  leftSide = <Navbar />,
  center,
  rightSide,
}) {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={1} padding="0px 25px">
      <GridItem colSpan={1}>{leftSide}</GridItem>
      <GridItem
        colSpan={2}
        borderLeft="0.5px solid #E2E8F0"
        borderRight="0.5px solid #E2E8F0"
      >
        {center}
      </GridItem>
      <GridItem colSpan={1}>{rightSide}</GridItem>
    </Grid>
  );
}
