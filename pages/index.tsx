import React from 'react';
import { Grid, Button, Image, Input, Text, Range } from '../components/elements'


const Main = (props) => {
  return (
    <React.Fragment >
      메인
      <Text>
        props
      </Text>
      <Input label="하" />
      <Grid>
        <Range />
      </Grid>
      <Button />
    </React.Fragment >
  )
}

export default Main