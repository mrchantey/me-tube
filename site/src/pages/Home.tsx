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

	window.localStorage.getItem("")
	React.useEffect(() => { init().catch(console.error) }, [])
	async function init() {
		const res = await fetch("media/metadata.json")
		const meta = (await res.json()) as iVideo[]
		set_metadata(meta)
		// set_currentVideo(meta[0])
		return () => { }
	}

	function updateViewedItems(index: number) {
		set_viewedItems(curr => {
			curr[index] = true
			localStorage.setItem(storageKey, JSON.stringify(curr))
			return curr
		})
	}

	function clearLocalStorage() {
		localStorage.clear()
		set_viewedItems({})
	}

	return (
		<>
			<Typography variant="h1" className={globalClasses.title}>MeTube</Typography>
			<div style={{
				display: 'grid',
				gridTemplateColumns: '0.1fr 10fr 0.1fr'
			}}>
				<div style={{
					gridColumn: `2 / 3`,
				}}>
					<Button onClick={clearLocalStorage}>Clear View History</Button>
					{/* {currentVideo !== null && <CurrentVideo currentVideo={currentVideo} set_currentVideo={set_currentVideo} />} */}
					<VideoList
						metadata={metadata}
						viewedItems={viewedItems}
						updateViewedItems={updateViewedItems}
					/>
				</div>
			</div>
		</>
	)
}
