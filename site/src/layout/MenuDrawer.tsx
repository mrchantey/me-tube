import React from 'react';
import { makeStyles, SwipeableDrawer, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Toolbar, Paper } from '@material-ui/core';
import {
	Home as HomeIcon,
	Info as InfoIcon,
	AccountCircle as AccountCircleIcon,
	People as PeopleIcon,
	Settings as SettingsIcon,
	AccountTree as GraphsIcon,
	Dns as NodesIcon,
	PlayArrow as PlayArrowIcon
} from '@material-ui/icons';
import { appThemeState, useGlobalStyles } from '../common/AppTheme';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
	root: {
		// height
	},
	drawerContainer: {
		// overflow: 'auto'
	},
	drawerSlide: {
		// display: 'block',
		minWidth: '300em',
	},
	drawerPermanent: {
		minHeight: '100%',
		// width: '20em'
		// width: '3em'

	}
}))






const MenuDrawer = () => {

	const [themeState, set_themeState] = useRecoilState(appThemeState)
	const history = useHistory()

	const set_isOpen = (val: boolean) => set_themeState(state => ({ ...state, menuDrawerOpen: val }))

	function goTo(url: string) {
		if (!themeState.menuDrawerPermanent) set_isOpen(false)
		history.push(url)
	}

	const classes = useStyles()
	const globalClasses = useGlobalStyles()


	const MultiDrawer = (props: any) => {

		return themeState.menuDrawerPermanent ?
			<Paper className={clsx(classes.drawerPermanent, !themeState.menuDrawerOpen && globalClasses.hide)}>
				{props.children}
			</Paper> :

			<SwipeableDrawer className={classes.drawerSlide}
				anchor="left"
				open={themeState.menuDrawerOpen}
				onClose={() => set_isOpen(false)}
				onOpen={() => set_isOpen(true)}
			>
				{props.children}
			</SwipeableDrawer>
	}
	return (
		<MultiDrawer>
			<List>
				<ListItem button onClick={_ => goTo('/')} >
					<ListItemIcon><HomeIcon /></ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<Divider />
				{/* <ListItem button onClick={_ => goTo('/demo')} >
					<ListItemIcon><PlayArrowIcon /></ListItemIcon>
					<ListItemText primary="Demo" />
				</ListItem> */}
				{/* <ListItem button onClick={_ => goTo('/user')}>
					<ListItemIcon><AccountCircleIcon /></ListItemIcon>
					<ListItemText primary="Profile" />
				</ListItem>
				<ListItem button onClick={_ => goTo('/nodes')}>
					<ListItemIcon><NodesIcon /></ListItemIcon>
					<ListItemText primary="Nodes" />
				</ListItem>
				<ListItem button onClick={_ => goTo('/contact')} >
					<ListItemIcon><InfoIcon /></ListItemIcon>
					<ListItemText primary="Contact" />
				</ListItem>
				<ListItem button onClick={_ => goTo('/settings')}>
					<ListItemIcon><SettingsIcon /></ListItemIcon>
					<ListItemText primary="Settings" />
				</ListItem> */}
			</List>
		</MultiDrawer >
	)
}


export default MenuDrawer