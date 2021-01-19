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
	updateViewedItems: (number, boolean?) => void,
	handleView: (number) => void
}


export const VideoList = ({ metadata, viewedItems, updateViewedItems, handleView }: iProps) => {

	const classes = makeStyles(theme => ({
		tableBody: {
		},
		tableRow: {
			height: '10vh',
			"&:nth-child(even)": { backgroundColor: theme.palette.background.paper },
			"&:nth-child(odd)": { backgroundColor: theme.palette.action.disabledBackground },
			// backgroundColor: theme.palette.background.paper,
			"&:hover": {
				cursor: 'pointer',
				backgroundColor: theme.palette.action.hover,
			},
			"&:active": {
				cursor: 'pointer',
				backgroundColor: theme.palette.action.active,
			},
		}
	}))()

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
			<TableBody className={classes.tableBody}>
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