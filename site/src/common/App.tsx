import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppTheme, appThemeState } from './AppTheme';
import { Layout } from '../layout/Layout';
import { atom, useRecoilValue } from 'recoil';
import AppRouter from '../router/AppRouter';



const App = (props: any) => {
	return (
		<AppTheme>
			<CssBaseline />
			<Router>
				<Layout>
					<AppRouter />
				</Layout>
			</Router>
		</AppTheme>
	)
}

export default App