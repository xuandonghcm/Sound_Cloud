import HomeSlider from '@/components/screen/home/home.slider';
import * as React from 'react';
import {
  Container
} from '@mui/material';

import { GET_TOP_TRACKS_BY_CATEGORIES } from '@/constants/endpoints';
import { sendRequest } from '@/utils/api';
import { IBackendRes } from '@/types/backend';

export default async function HomePage() {

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    endpoint: GET_TOP_TRACKS_BY_CATEGORIES,
    method: 'POST',
    body: {
      category: 'CHILL',
      limit: 1
    }
  })

  console.log("check>>>", res.message)

  return (
    <Container>
      <HomeSlider />
      <HomeSlider />
      <HomeSlider />
      <HomeSlider />
    </Container>

  );
}

