import React, { useState } from 'react';

import Stack from '@mui/material/Stack';

import MainDrawer from './components/menu/MainDrawer';
import PlaybackControls from './components/player/PlayBar';

import { PRIMARY_COLOR } from './config/color_palette';

import './App.css';

const DEBUG = false;


export default function App() {

    function logoutAction() {
        console.log('LOGOUT IS NOT IMPLEMENTED');
    }

    /***************/
    /* AudioPlayer */
    /***************/

    const apiPlayCallString = 'http://localhost:8444/api/v1/play/'

    /* Note: If no media data is available, HTMLMediaElement.duration will
    return NaN. */

    const [volume, setVolume] = useState(() => 100);
    const [duration, setDuration] = useState(() => 0);
    const [paused, setPaused] = useState(() => true);
    const [currentTime, setCurrentTime] = useState(() => 0);
    // const [message, setMessage] = useState("");
    const [queue, setQueue] = useState([]);
    const [queueHeadIdx, setQueueHeadIdx] = useState(() => null);
    const [audioPlayer, setAudioPlayer] = useState(() => {
        let audioPlayer = new Audio();

        //https://stackoverflow.com/questions/64474338/audio-player-returns-uncaught-in-promise-domexception-the-element-has-no-su
        audioPlayer.crossOrigin = "anonymous";

        setQueue([
            {
                Title: "All I've Got",
                album: "All I've Got",
                artist: 'Ryan McKay',
                ID: '3201',
                Album_ID: '1601'
            }
        ]);

        setQueueHeadIdx(0);

        audioPlayer.src = apiPlayCallString + '3201';

        const updatePlaybar = () => {
            setCurrentTime(audioPlayer.currentTime);
            
            //https://stackoverflow.com/questions/34656758/setinterval-with-random-time-in-javascript
            let rand = Math.floor(Math.random() * (510 - 110 + 1) + 110); //Generate Random number between 0 and 1000
            setTimeout(updatePlaybar, rand);
        }

        updatePlaybar();

        audioPlayer.oncanplay = function () {
            setDuration(audioPlayer.duration);
        }

        return audioPlayer;
    });


    audioPlayer.onended = function () {
        if (queueHeadIdx !== queue.length - 1) {
            console.log(queue);
            audioPlayer.src = apiPlayCallString + queue[queueHeadIdx + 1].ID;
            audioPlayer.play();
            setCurrentTime(audioPlayer.currentTime);
            setQueueHeadIdx(currIdx => ++currIdx);
        }
        else {
            setPaused(true);
        }
    }


    const playOrPauseAudio = () => {
        if (paused === false) {
            audioPlayer.pause();
            setPaused(true);
        }
        else {
            audioPlayer.play();
            setPaused(false);
        }
    }


    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        audioPlayer.volume = newVolume / 100;
    }


    const movePlayPosition = (newPlayPosition) => {
        if (newPlayPosition >= 99.7) {
            newPlayPosition = 99.7;
        }
        audioPlayer.currentTime = newPlayPosition / 100 * duration;
        setCurrentTime(audioPlayer.currentTime);
    }


    const skipPlayback = (skipAmount) => {
        audioPlayer.currentTime = audioPlayer.currentTime + skipAmount;
        setCurrentTime(audioPlayer.currentTime);
    }


    const skipBack = () => {
        if (Math.floor(audioPlayer.currentTime) < 3 && queueHeadIdx !== 0) {
            audioPlayer.src = apiPlayCallString + queue[queueHeadIdx - 1].ID;
            if (!paused) {
                audioPlayer.play();
                setPaused(false);
            }
            setCurrentTime(audioPlayer.currentTime);
            setQueueHeadIdx(currIdx => --currIdx);
        }
        else {
            audioPlayer.currentTime = 0;
            setCurrentTime(audioPlayer.currentTime);
            audioPlayer.play();
            setPaused(false);
        }
    }


    const skipForward = () => {
        if (queueHeadIdx === queue.length - 1) {
            audioPlayer.currentTime = audioPlayer.duration;
            setCurrentTime(audioPlayer.currentTime);
        }
        else {
            audioPlayer.src = apiPlayCallString + queue[queueHeadIdx + 1].ID;
            if (!paused) {
                audioPlayer.play();
                setPaused(false);
            }
            setCurrentTime(audioPlayer.currentTime);
            setQueueHeadIdx(currIdx => ++currIdx);
        }
    }


    /**
     * Can be used in Tracks View Header to set queue and play the first track
     * when a user clicks on the play button.
     * @param {Array} newQueueTracksInfo An array of track objects to make
     * up the new queue.
     * @param {Number} newQueueHead The index of the track in the new queue
     * to play first.
     */
    const setNewQueueAndPlay = (newQueueTracksInfo, newQueueHead) => {
        setQueue(newQueueTracksInfo);
        setQueueHeadIdx(newQueueHead);
        audioPlayer.src = apiPlayCallString + newQueueTracksInfo[newQueueHead].ID;
        audioPlayer.play();
        setPaused(false);
        setCurrentTime(audioPlayer.currentTime);
    }


    return (
        <Stack direction='column'
            spacing={0}
            sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: PRIMARY_COLOR,

                border: DEBUG ? 1 : 0,
                borderColor: 'red',
            }}
        >
            <MainDrawer
                title='Lossless Spotify'
                user='Ali'
                logoutAction={logoutAction}

                setNewQueueAndPlay={setNewQueueAndPlay}
            />
            <PlaybackControls
                paused={paused}
                playOrPauseAudio={playOrPauseAudio}
                skipBack={skipBack}
                skipForward={skipForward}
                movePlayPosition={movePlayPosition}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                changeVolume={changeVolume}
                skipPlayback={skipPlayback}

                currentTrackInfo={queue[queueHeadIdx]}
            />
        </Stack>
    );
}