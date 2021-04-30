import { Button, Grid, Range } from 'components/elements';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components'
// TODO : value 값 기준으로 정렬, 0인거 숨기기, 숨기기-펼침처리, 

const Setting = (props) => {
  const [isHidden, setIsHidden] = useState(true)
  const list = [
    {type:'mise',value:'10', label:'미세먼지'},
    {type:'corona',value:'6', label:'코로나'},
    {type:'temp',value:'9', label:'기온'},
    {type:'rainPer',value:'3', label:'강수확률'},
    {type:'uv',value:'0', label:'자외선 지수'},
    {type:'flower',value:'0', label:'꽃가루 농도 지수'},
    {type:'wind',value:'0', label:'바람세기'},
    {type:'foodPoisoning',value:'0', label:'식중독 지수'},
    {type:'asthma',value:'0', label:'천식폐 지수'},
  ]
  // 정렬잘됨ㅇㅇ
  list.sort((a,b)=>{
    return parseInt(b.value) - parseInt(a.value)
  })

  const RangeList = list.map((ele,idx)=>{
          return <Range isHidden={ele.value==="0"? isHidden:false} value={ele.value} label={ele.label} />
    
  })

  console.log(list)
  const onSave = ()=>{
    console.log('하이')
  }

  const onCancle = ()=>{

  }
  
  return (
    <Container>
      <Contents>
        {RangeList}
        <Grid>
          <Button _onClick={onSave}>저장</Button>
          <Button>취소</Button>
        </Grid>
      </Contents>      
    </Container>
  )
}

const Container = styled.div`    
  width:100%;
  height:100%;
  ${props=>props.theme.flex.row};  
  ${props=>props.theme.border_box};  
  justify-content:center;  
  align-items:center;
  overflow:hidden;
  
`

const Contents = styled.div`
  width:50%;
  border:1px solid black;   
`
export default Setting;