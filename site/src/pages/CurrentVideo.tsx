import { makeStyles, Typography } from '@material-ui/core';
import React, { useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { createCastInstance } from './castInstance';
import { iVideo } from './IVideo';
import { loadCast } from './loadCast';

interface iProps {
	set_currentVideo: (iVideo) => void,
	currentVideo: iVideo
}



export const CurrentVideo = ({ currentVideo, set_currentVideo }: iProps) => {


	const [castButton, set_castButton] = React.useState(<div></div>)

	const aspectRatio = (currentVideo.height / currentVideo.width) * 100
	const videoPath = `media/${currentVideo.index}.mp4`

	const classes = makeStyles(theme => ({
		videoContainer: {
			position: 'relative',
			width: '100%',
			// height: '100%'
			paddingTop: `${aspectRatio}%`,//16:9
			// backgroundColor: 'rgb(0,0,0)'
		},
		video:
		{
			position: 'absolute',
			top: '0', left: '0',
			width: '100%', height: '100%'
		}
	}))()

	async function init() {
		console.log('loading..');
		const castInstance = await createCastInstance()
		set_castButton(castInstance.castButton)
		castInstance.onConnected.addListener(async (val) => {
			console.dir("connected!")
			await castInstance.setMedia(videoPath)
		})
	}
	React.useEffect(() => {
		// init()
		return () => { }
	}, [])
	return <>
		<Typography variant="h4">{currentVideo.fileName}</Typography>
		<div className={classes.videoContainer} >
			{/* <video className={classes.video} key={videoPath} controls>
				<source src={videoPath}></source>
			</video> */}
			{castButton}
		</div>
	</>
}

