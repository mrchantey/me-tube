import React from 'react';
import {
	TableHead, Table, TableContainer, TableCell, TableRow, TableBody,
	Paper,
} from '@material-ui/core';
import { iVideo } from './IVideo';


import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { iViewedItems } from './Home';


interface iProps {
	metadata: Array<iVideo>,
	viewedItems: iViewedItems,
	updateViewedItems: (number, boolean?) => void
}


export const VideoList = ({ metadata, viewedItems, updateViewedItems }: iProps) => {



	const classes = makeStyles(theme => ({
		tableRow: {
			// minHeight: '100px',
			backgroundColor: theme.palette.background.paper,
			"&:hover": {
				cursor: 'pointer',
				backgroundColor: theme.palette.action.hover,
			},
			"&:active": {
				cursor: 'pointer',
				backgroundColor: theme.palette.action.active,
			}
		}
	}))()

	function handleView(index: number) {
		updateViewedItems(index)
		window.location.href = `${window.location.href}media/${index}.mp4`
	}
	const [key, set_key] = React.useState(0)

	return <TableContainer component={Paper}>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>File Name</TableCell>
					<TableCell align="right">Duration</TableCell>
					<TableCell align="right">Watched</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{metadata.map((entry, index) => {


					return <TableRow key={index} className={classes.tableRow}				>
						<TableCell
							onClick={e => handleView(entry.index)}
						>{entry.fileName}</TableCell>
						<TableCell align="right">{(entry.duration / 60).toFixed(2)}</TableCell>
						<TableCell
							key={key}
							onClick={e => {
								set_key(Math.random())
								updateViewedItems(index, !viewedItems[entry.index])
							}}
							align="right">{viewedItems[entry.index] == true ? "yes" : ""}</TableCell>
						{/* </Button> */}
					</TableRow>
				})}
			</TableBody>
		</Table>
	</TableContainer>

}