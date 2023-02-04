import { Grid, GridItem, Text, Avatar, Button } from '@chakra-ui/react';

export default function Follower({ followBtn = true }) {
  return (
    <Grid templateColumns="repeat(12, 1fr)" paddingRight="10px">
      <GridItem colSpan={1}>
        <Avatar />
      </GridItem>
      <GridItem colSpan={9}>
        <div style={{ paddingLeft: '10px' }}>
          <Text fontWeight="bold">Mo Yazdani</Text>
          <Text fontSize="12px" color="rgb(83, 100, 113)">
            @moyo
          </Text>
        </div>
      </GridItem>
      <GridItem colSpan={2}>
        {followBtn && (
          <Button
            variant="ghost"
            borderRadius="25px"
            border="1px solid"
            borderColor="#80808033"
          >
            Following
          </Button>
        )}
      </GridItem>
    </Grid>
  );
}
