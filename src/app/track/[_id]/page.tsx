'use client'
import { useEffect, useState } from 'react'
import WaveCommon from '@/components/common/track/Wave'
import { BACKEND_TRACKS_URL } from '@/constants/service.Constants'


const DetailTrackPage = (props: any) => {
    const { params } = props


    return (
        <WaveCommon />
    )
}
export default DetailTrackPage;