
import HomeSlider from '@/components/screen/home/Slider';
import * as React from 'react';
import {
  Container
} from '@mui/material';
import { getTopTracksByCategories } from '@/service/tracks';
import { CategoryType } from '@/constants/globalConstants';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(">>> check session server: ", session)

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

  console.error("Errors occurred:");

  if (chills.error || workouts.error || partys.error) {
    console.error("Errors occurred:", chills?.error);
    return (
      <>
        <div>
          <h1>Error</h1>
          {chills.message}<br />
          {chills.statusCode}
        </div>
        <div>
          <h1>Error</h1>
          {partys.message}<br />
          {partys.statusCode}
        </div>
        <div>
          <h1>Error</h1>
          {workouts.message}<br />
          {workouts.statusCode}
        </div>
      </>

    );
  }

  return (

    <Container>
      <HomeSlider data={chills?.data ?? []} title={CategoryType.CHILL} />
      <HomeSlider data={workouts?.data ?? []} title={CategoryType.WORKOUT} />
      <HomeSlider data={partys?.data ?? []} title={CategoryType.PARTY} />
    </Container>

  );

  // Xử lý kết quả thành công

}

