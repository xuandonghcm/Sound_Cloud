'use client'
import { PATH_SERVER } from '@/constants/service.Constants'
import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useWavesurfer } from '@wavesurfer/react';
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles';
import Timeline from "wavesurfer.js/dist/plugins/timeline";
import { WaveSurferOptions } from 'wavesurfer.js';

import '@/style/wave.scss'



const WaveCommon = () => {
    const theme = useTheme();
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio') || "";
    const containerRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>("0.00");
    const [durationr, setDuration] = useState<string>("0.00");
    const hoverRef = useRef<HTMLDivElement>(null);
    let wave_surfer = null;
    let current_Time = 0;
    let is_playing = false;
    let waveColor, progressColor;
    if (typeof window !== 'undefined') {
        const optionsMemo = useMemo<Omit<WaveSurferOptions, 'container'>>(() => {
            var ctx = document.createElement('canvas').getContext('2d')!;
            waveColor = ctx.createLinearGradient(0, 0, 0, 185);
            waveColor.addColorStop(0.5, theme.palette.background.wavetop!);
            waveColor.addColorStop(0.5, theme.palette.background.wavebottom!);

            progressColor = ctx.createLinearGradient(0, 0, 0, 185);
            progressColor.addColorStop(0.5, theme.palette.background.progresswavetop!);
            progressColor.addColorStop(0.5, theme.palette.background.progresswavebottom!);
            return {
                barWidth: 1,
                height: 200,
                waveColor: waveColor,
                progressColor: progressColor,
                url: PATH_SERVER(audio),

                plugins: [Timeline.create()],
            }
        }, [theme, audio])

        const { wavesurfer, currentTime, isPlaying } = useWavesurfer({
            container: containerRef,
            ...optionsMemo,
        })
        wave_surfer = wavesurfer;
        current_Time = currentTime;
        is_playing = isPlaying;

    }



    const onPlayPause = useCallback(() => {
        wave_surfer && wave_surfer.playPause()
    }, [wave_surfer])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }


    useEffect(() => {
        if (wave_surfer) {
            wave_surfer.on('decode', (duration) => {
                setDuration(formatTime(duration));

            }),
                wave_surfer.on('timeupdate', (currentTime) => {
                    setTime(formatTime(currentTime))
                })

            const hover = hoverRef.current!;
            const waveform = containerRef.current!;
            waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))
        }
    }, [wave_surfer]);

    return (
        <>
            <div ref={containerRef} className='wave-form-container'>
                <div className="time" >{time}</div>
                <div className="duration" >{durationr}</div>
                <div ref={hoverRef} className="hover-wave"></div>
            </div >

            <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>

                <div>
                    <p>Current time: {current_Time || 0}</p> {/* Hiển thị currentTime */}
                    <br />
                </div>

            </div>
            <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>


                <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
                    {is_playing ? 'Pause' : 'Play'}
                </button>
            </div>
        </>

    )
}
export default WaveCommon;