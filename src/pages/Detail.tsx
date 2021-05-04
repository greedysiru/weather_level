import React from 'react'
import DetailDaily from 'src/components/DetailDaily';
import DetailThreeDays from 'src/components/DetailThreeDays';
import DetailWeekly from 'src/components/DetailWeekly';
import { Grid } from 'src/components/elements';
import Header from 'src/components/Header';
import styled from 'styled-components'

const Detail = props => {
    const {match} = props;
    console.log(match.params.category)

    const components = {
        daily: DetailDaily,
        weekly: DetailWeekly,
        three:DetailThreeDays
    }

    const Component = components[match.params.type]
        
    return (
        <Grid
            isColumn
            width="100%"
            height="100%"
            jc="flex-start"
        >
            <Header />
            <Component category={match.params.category}/>  
        </Grid>
    )
}



export default Detail
