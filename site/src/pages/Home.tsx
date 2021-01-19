import { makeStyles } from '@material-ui/core/styles';
import {
	Button, Divider, Typography, List, ListItem,
	TableHead, Table, TableContainer, TableCell, TableRow,
	Paper,
	TableBody,
	ButtonBase
} from '@material-ui/core';
import { } from 'material-ui';
import React from 'react';
import ReactPlayer from 'react-player';
import { useGlobalStyles } from '../common/AppTheme';
import { iVideo } from './IVideo';
import { VideoList } from './VideoList';
import { CurrentVideo } from './CurrentVideo';

export interface iViewedItems {
	[key: string]: boolean
}


const storageKey = "viewedItems"

export const Home = () => {
	const [metadata, set_metadata] = React.useState<iVideo[]>([])

	const globalClasses = useGlobalStyles()
	const [viewedItems, set_viewedItems] = React.useState(JSON.parse(localStorage.getItem(storageKey)) as iViewedItems || {})
	const [nextItem, set_nextItem] = React.useState<iVideo>(null)

	window.localStorage.getItem("")
	React.useEffect(() => { init().catch(console.error) }, [])
	async function init() {
		const res = await fetch("media/metadata.json")
		const meta = (await res.json()) as iVideo[]
		set_metadata(meta)
		// set_currentVideo(meta[0])
		return () => { }
	}

	React.useEffect(() => {
		trySetNextItem()
	}, [metadata, viewedItems])

	function trySetNextItem() {
		function getNextIndex() {
			for (let i = metadata.length - 1; i >= 0; i--) {
				if (viewedItems[i] === true && i + 1 !== metadata.length)
					return i + 1
			}
			return 0
		}
		const i = getNextIndex()
		if (metadata[i] != null) {
			set_nextItem(metadata[i])
			console.log(metadata[i].fileName);
		}
	}

	function updateViewedItems(index: number, status = true) {
		set_viewedItems(curr => {
			curr[index] = status
			localStorage.setItem(storageKey, JSON.stringify(curr))
			return curr
		})
		trySetNextItem()
	}

	function clearLocalStorage() {
		localStorage.clear()
		set_viewedItems({})
	}

	function handleView(index: number) {
		updateViewedItems(index)
		window.location.href = `${window.location.href}media/${index}.mp4`
	}


	const classes = makeStyles(theme => ({
		container: {
			display: 'grid',
			gridTemplateColumns: '0.1fr 10fr 0.1fr'
		},
		content: {
			gridColumn: `2 / 3`,
		},
		actionBar: {
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr'
		}
	}))()


	return (
		<>
			{/* <Typography variant="h1" className={globalClasses.title}>MeTube</Typography> */}
			<div className={classes.container} >
				<div className={classes.content}>
					<div className={classes.actionBar}>
						<Button
							onClick={e => handleView(nextItem?.index)}
						>Play Next:<br />{nextItem?.fileName}</Button>
						<div />
						<Button
							onClick={clearLocalStorage}>Clear View History</Button>
						{/* {currentVideo !== null && <CurrentVideo currentVideo={currentVideo} set_currentVideo={set_currentVideo} />} */}
					</div>
					<VideoList
						metadata={metadata}
						viewedItems={viewedItems}
						updateViewedItems={updateViewedItems}
						handleView={handleView}
					/>
				</div>
			</div>
		</>
	)
}
