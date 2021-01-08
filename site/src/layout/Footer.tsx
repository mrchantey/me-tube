import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalStyles } from '../common/AppTheme';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	footer: {
		textAlign: 'center',
		width: '100%',
		color: theme.palette.text.disabled,
		// backgroundColor: theme.palette.background.paper
		backgroundColor: theme.palette.action.disabledBackground
	}
}))


export const Footer = () => {

	const classes = useStyles()

	return (<Paper>
		<Typography className={classes.footer} variant="body2">&copy; chantey {new Date().getFullYear()}<br /> This site is protected by reCAPTCHA. The Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.</Typography>
	</Paper>)
}