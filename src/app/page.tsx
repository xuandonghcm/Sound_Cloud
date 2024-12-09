
import HomeSlider from '@/components/screen/home/Slider';
import * as React from 'react';
import {
  Container
} from '@mui/material';
import { getTopTracksByCategories } from '@/service/tracks';
import { CategoryType } from '@/constants/globalConstants';

export default async function HomePage() {

  const categoriesChillRequest: IGetTopTracksByCategoriesRequest =
  {
    category: CategoryType.CHILL,
    limit: 10

  }
  const categoriesWorkoutsRequest: IGetTopTracksByCategoriesRequest =
  {
    category: CategoryType.WORKOUT,
    limit: 10

  }
  const categoriesPartyRequest: IGetTopTracksByCategoriesRequest =
  {
    category: CategoryType.PARTY,
    limit: 10

  }

  const [chills, workouts, partys] = await Promise.all([
    getTopTracksByCategories(categoriesChillRequest),
    getTopTracksByCategories(categoriesWorkoutsRequest),
    getTopTracksByCategories(categoriesPartyRequest),
  ]);

  return (
    <Container>
      <HomeSlider data={chills?.data ?? []} title={CategoryType.CHILL} />
      <HomeSlider data={workouts?.data ?? []} title={CategoryType.WORKOUT} />
      <HomeSlider data={partys?.data ?? []} title={CategoryType.PARTY} />

    </Container>

  );
}

