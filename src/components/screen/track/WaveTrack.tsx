'use client'

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useWavesurfer } from "@/utils/customHooks";
import { useSearchParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { WaveSurferOptions } from 'wavesurfer.js';
import '@/style/wave.scss'
import Image from 'next/image';
import Box from '@mui/material/Box/Box';
import { Typography, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';


const WaveTrack = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);

    const [time, setTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");


    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient;
        if (typeof window !== "undefined") {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
            gradient.addColorStop(0, theme.palette.background.wavetop!) // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, theme.palette.background.wavetop!) // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, theme.palette.background.wavebottom!) // Bottom color
            gradient.addColorStop(1, theme.palette.background.wavebottom!) // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            progressGradient.addColorStop(0, theme.palette.background.progresswavetop!) // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, theme.palette.background.progresswavetop!) // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, theme.palette.background.progresswavebottom!) // Bottom color
            progressGradient.addColorStop(1, theme.palette.background.progresswavebottom!) // Bottom color
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 100,
            barWidth: 3,
            url: `/api?audio=${fileName}`,
        }
    }, []);
    const wavesurfer = useWavesurfer(containerRef, optionsMemo);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!wavesurfer) return
        setIsPlaying(false)

        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => {
                setDuration(formatTime(duration));
            }),
            wavesurfer.on('timeupdate', (currentTime) => {
                setTime(formatTime(currentTime));
            }),
            wavesurfer.on('interaction', () => {
                wavesurfer.play()
            })
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    // On play button click
    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();

        }
    }, [wavesurfer]);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]

    const calLeft = (moment: number) => {
        const totalSongsTime = 199;
        const percent = (moment / totalSongsTime) * 100;
        return `${percent}%`;
    }

    return (
        <>
            <Grid container spacing={2}
                sx={{
                    paddingTop: 2, paddingRight: 2, paddingLeft: 2,
                    Height: { xs: "250px", md: "270px" }, // Đặt chiều cao tối thiểu
                    overflow: "auto",
                    background: "linear-gradient(135deg, var(--wavebgt) 0%, var(--wavebgf) 100%)",

                }}
            >
                {/* Phần bên phải */}
                <Grid
                    item
                    xs={12}
                    md={3}
                    sx={{
                        order: { xs: 0, md: 1 }, alignItems: "center",
                        minHeight: { xs: "250px", md: "270px" }, // Đặt chiều cao tối thiểu
                        overflow: "auto",

                    }}
                >
                    <Box sx={{ alignItems: "center" }}>
                        <Image src={'/images/chill1.png'}
                            alt={'aaa'}
                            width={250} // Đặt chiều rộng mong muốn
                            height={250} />
                    </Box>
                </Grid>

                {/* Phần bên trái */}
                <Grid
                    item
                    xs={12}
                    md={9}
                    sx={{
                        order: { xs: 1, md: 0 },
                        Height: { xs: "250px", md: "300px" }, // Đặt chiều cao tối thiểu
                        overflow: "auto",
                    }}
                >
                    <Grid >
                        {/* Hàng đầu tiên của bên trái */}
                        <Grid item xs={12} sx={{ height: '150px', }}>
                            <Box sx={{ display: 'flex', gap: 2, padding: 2, alignItems: "center" }}>
                                {/* Bên trái - Cột 1 chiếm 1/5 và cột 2 chiếm 4/5 */}
                                <Box sx={{ flex: 1, height: '100%' }}>
                                    <div
                                        onClick={() => onPlayClick()}
                                        className='info-button-play'
                                    >
                                        {isPlaying === true ?
                                            <PauseIcon className='info-icon' />
                                            :
                                            <PlayArrowIcon className='info-icon' />
                                        }
                                    </div>
                                </Box>

                                <Box sx={{ flex: 9, height: '100%' }}>
                                    {/* Cột 2 chia thành 2 dòng */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        {/* Dòng 1 trong Cột 2 */}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{
                                                padding: '0 5px',
                                                fontSize: '30px',
                                                width: 'fit-content',
                                                color: theme.palette.text.white,
                                                backgroundColor: theme.palette.background.darkstormy
                                            }}>Túy Âm</Typography>
                                        </Box>

                                        {/* Dòng 2 trong Cột 2 */}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{
                                                padding: '0 5px',
                                                marginTop: '10px',
                                                fontSize: '20px',
                                                width: 'fit-content',
                                                color: theme.palette.text.white,
                                                backgroundColor: theme.palette.background.darkstormy
                                            }}>Xesi, Masew, Nhật Nguyễn</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Hàng thứ hai của bên trái */}
                        <Grid item xs={12} sx={{ height: '150px' }}>
                            <div ref={containerRef} className="wave-form-show">
                                <div className="time" >{time}</div>
                                <div className="duration" >{duration}</div>
                                <div ref={hoverRef} className="hover-wave"></div>
                                <div className="overlay-wave"></div>
                                <div className="comments"
                                    style={{ position: "relative" }}
                                >
                                    {
                                        arrComments.map(item => {
                                            return (
                                                <Tooltip title={item.content}>
                                                    <Image
                                                        onPointerMove={(e) => {
                                                            const hover = hoverRef.current!;
                                                            hover.style.width = calLeft(item.moment + 3);
                                                        }}
                                                        key={item.id}
                                                        height={20}
                                                        width={20}
                                                        src={`/images/chill1.png`}
                                                        alt="cmt"
                                                        style={{
                                                            position: "absolute",
                                                            top: 71,
                                                            zIndex: 20,
                                                            left: calLeft(item.moment)
                                                        }}
                                                    />
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </>


    )

}

export default WaveTrack;