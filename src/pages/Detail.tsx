import React from 'react'
import DetailDaily from 'src/components/DetailDaily';
import DetailThreeDays from 'src/components/DetailThreeDays';
import DetailWeekly from 'src/components/DetailWeekly';
import { Button, Grid } from 'src/components/elements';
import Header from 'src/components/Header';
import styled from 'styled-components'

const Detail = props => {
    const {match,history} = props;
    console.log(match.params.category)

    const components = {
        daily: DetailDaily,
        weekly: DetailWeekly,
        three:DetailThreeDays
    }

    const Component = components[match.params.type]
    
    const goBack = ()=>{
        history.push('/')
    }

    const mainStyle = {
        width:'100%',
        height:'100%',
        backgroundColor:'yellow'
    }
    return (
        <Grid
            isColumn
            width="100%"
            height="100%"
            jc="space-between"
        >
            <Header />
            <Component category={match.params.category}/>  
            <Button _onClick={goBack}>이전으로</Button>
        </Grid>
    )
}



export default Detail
