import { BACKEND_TRACKS_URL } from '@/constants/service.Constants';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(requet: NextRequest) {
    const url = new URL(requet.url);
    const searchParam = new URLSearchParams(url.searchParams);
    const audio = searchParam.get("audio") || "";
    const calltoURL = `${BACKEND_TRACKS_URL}${audio}`;

    try {
        // Fetch file âm thanh từ backend
        const response = await fetch(calltoURL);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch audio file' }, { status: response.status });
        }

        // Đảm bảo các header phù hợp để client nhận dạng file âm thanh
        const headers = new Headers(response.headers);
        headers.set('Content-Disposition', `inline; filename="${audio}"`);
        headers.set('Content-Type', 'audio/mpeg');

        // Trả về stream dữ liệu nhị phân cho client
        const stream = response.body;

        return new Response(stream, { headers, status: 200 });

    } catch (error) {

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}