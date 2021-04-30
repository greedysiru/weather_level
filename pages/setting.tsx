import { Range } from 'components/elements';
import React from 'react';
import styled from 'styled-components'

const Setting = (props) => {
  
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

  console.log(list)

  
  return (
    <Container>
      <Contents>
        {list.map((ele,idx)=>{
          return <Range key={idx} label={ele.label} value={ele.value}  />
        })}
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