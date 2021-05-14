import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AirPollution from 'src/components/DetailAirPollution';
import Corona from 'src/components/DetailCorona';
import DetailDaily from 'src/components/DetailDaily';
import DetailThreeDays from 'src/components/DetailThreeDays';
import DetailWeekly from 'src/components/DetailWeekly';
import { Button, Grid } from 'src/components/elements';
import styled from 'styled-components';
import { RootState } from '../redux/modules';

const Detail = (props) => {
  const { match, history } = props;

  const isLoaded = useSelector((state: RootState) => state.weather.isLoaded);
  const isDesktopMode = useSelector((state: RootState) => state.common.isDesktopMode);

  const [isMultiView, setIsMultiView] = useState(false);

  useEffect(() => {
    if (match.params.type === 'daily') {
      setIsMultiView(true);
    }
  }, []);
  const components = {
    daily: DetailDaily,
    weekly: DetailWeekly,
    three: DetailThreeDays,
    corona: Corona,
    airPollution: AirPollution,
  };

  const Component = components[match.params.type];

  const goBack = () => {
    history.push('/');
  };

  if (!isLoaded) {
    return null;
  }
  return (
    <Container full={isMultiView && isDesktopMode}>
      <Grid isColumn height="100%" width="100%">
        <Component category={match.params.category} />
      </Grid>
      <Grid>
        <Button _onClick={goBack}>이전</Button>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: ${(props) => (props.full ? '50%' : '100%')};
  max-width: ${(props) => (props.full ? '' : '360px')};
  height: 83%;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex.column};
  justify-content: flex-start;
  align-items: center;
`;

export default Detail;
