import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, makeStyles, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { appThemeState, useGlobalStyles } from '../common/AppTheme';
import { useRecoilState } from 'recoil';



const Header = (props: any) => {

	const [appTheme, set_appTheme] = useRecoilState(appThemeState)

	const styles = useGlobalStyles()


	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" onClick={_ => set_appTheme(state => ({ ...state, menuDrawerOpen: !state.menuDrawerOpen }))}>
					<MenuIcon />
				</IconButton>
				<div className={styles.horizontalBuffer} />
				{/* <IconButton edge="end" onClick={_ => props.history.push("/user")}> */}
				<IconButton edge="end" >
					{/* <Avatar src={photoUrl} /> */}
					<Avatar />
				</IconButton>
			</Toolbar>
		</AppBar >
	)
}

export default Header