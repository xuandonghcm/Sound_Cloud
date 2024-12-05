
import HomeSlider from '@/components/screen/home/home.slider';
import * as React from 'react';
import {
  Container
} from '@mui/material';
import { getTopTracksByCategories } from '@/service/tracks';

export default async function HomePage() {
  const categoriesChillRequest: IGetTopTracksByCategoriesRequest =
  {
    category: "CHILL",
    limit: 1

  }
  const res = await getTopTracksByCategories(categoriesChillRequest);
  console.log(res)



  return (
    <Container>

      <HomeSlider />
      <HomeSlider />
      <HomeSlider />
      <HomeSlider />
    </Container>

  );
}

