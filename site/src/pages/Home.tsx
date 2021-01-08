import {
	Button, Divider, Typography, List, ListItem,
	TableHead, Table, TableContainer, TableCell, TableRow,
	Paper,
	TableBody
} from '@material-ui/core';
import { } from 'material-ui';
import React from 'react';
import ReactPlayer from 'react-player';
import { useGlobalStyles } from '../common/AppTheme';


interface iVideo {
	fileName: string,
	duration: number,
	index: number,
	width: number,
	height: number,
}

// import metadata from '../metadata.json';

export const Home = () => {

	const [metadata, set_metadata] = React.useState<iVideo[]>([])
	const [currentVideo, set_currentVideo] = React.useState<iVideo | null>(null)

	const globalClasses = useGlobalStyles()

	React.useEffect(() => { init() }, [])
	async function init() {
		const res = await fetch("media/metadata.json")
		const meta = (await res.json()) as iVideo[]
		set_metadata(meta)
		set_currentVideo(meta[0])
		return () => { }
	}


	// React.useEffect(() => {
	// const videoPath = `media/${currentIndex}___${currentVideo.fileName.replace('.mkv', '.mp4')}`

	function Contents() {
		if (currentVideo === null)
			return <Typography variant="h3">loading..</Typography>

		const videoPath = `media/${currentVideo.index}.mp4`
		const aspectRatio = (currentVideo.height / currentVideo.width) * 100
		return <>
			<Typography variant="h4">{currentVideo.fileName}</Typography>
			<div style={{
				position: 'relative',
				width: '100%',
				// height: '100%'
				paddingTop: `${aspectRatio}%`,//16:9
				// backgroundColor: 'rgb(0,0,0)'
			}} >
				<video key={videoPath} controls style={{
					position: 'absolute',
					top: '0', left: '0',
					width: '100%', height: '100%'
				}}>
					<source src={videoPath}></source>
				</video>
			</div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>File Name</TableCell>
							<TableCell align="right">Duration</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{metadata.map((entry, index) => {
							return <TableRow key={index} onClick={e => set_currentVideo(entry)}>
								{/* <Button > */}
								<TableCell>{entry.fileName}</TableCell>
								<TableCell align="right">{(entry.duration / 60).toFixed(2)}</TableCell>
								{/* </Button> */}
							</TableRow>
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	}

	return (
		<>
			<Typography variant="h1" className={globalClasses.title}>MeTube</Typography>
			<div style={{
				display: 'grid',
				gridTemplateColumns: '2.5fr 5fr 2.5fr'
			}}>
				<div style={{
					gridColumn: `2 / 3`,
				}}>
					<Contents />
				</div>
			</div>
		</>
	)
}
