import HomeSlider from '@/components/screen/home/home.slider';
import * as React from 'react';
import {
  Container
} from '@mui/material';


export default function HomePage() {
  return (
    <Container>
      <HomeSlider />
      <HomeSlider />
      <HomeSlider />
      <HomeSlider />
    </Container>

  );
}
