import { GET_BACKEND_TRACKS } from '@/constants/service.Constants';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(requet: NextRequest) {
    const url = new URL(requet.url);

    const searchParam = new URLSearchParams(url.searchParams);
    const audio = searchParam.get("audio") || "";

    const calltoURL = GET_BACKEND_TRACKS(audio);

    return await fetch(calltoURL)
}