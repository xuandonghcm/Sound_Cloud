'use client'
import { PATH_SERVER } from '@/constants/service.Constants'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { useSearchParams } from 'next/navigation'


const WaveCommon = () => {
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio') || "";
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: containerRef.current!,
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: PATH_SERVER(audio)
        })
        wavesurfer.on('click', () => {
            wavesurfer.play()
        })
    }, [])
    return (
        <div ref={containerRef}>
            tracks
        </div>
    )
}
export default WaveCommon;