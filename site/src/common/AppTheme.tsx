import { createMuiTheme, Theme, makeStyles, ThemeProvider } from "@material-ui/core";
import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
/*
color tool:		https://material.io/resources/color/#!/?view.left=0&view.right=0
my theme:		https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=81C784&secondary.color=FFAB91

*/
const appThemeState = atom({
	key: "appThemeState",
	default: {
		darkMode: true,
		menuDrawerOpen: false,
		menuDrawerPermanent: true,
	}
})



interface ThemeProps {
	darkMode: boolean
}

// interface iAppTheme {
// 	theme: Theme,
// }

const primary = {
	main: `#3f51b5`,
	light: `#7986cb`,
	dark: `#303f9f`
}

const secondary = {
	main: `#f50057`,
	light: `#ff4081`,
	dark: `#c51162`
}

const textColor = {
	primary: `rgba(0, 0, 0, 0.87)`,
	secondary: `rgba(0, 0, 0, 0.54)`,
	tertiary: `rgba(0, 0, 0, 0.38)`
}

// type ThemeClasses = Record<
// 	"width100" |
// 	"body" |
// 	// "footerContainer" |
// 	"buffer" |
// 	"footer" |
// 	"horizontalCenter" |
// 	"textPrimary" |
// 	"textSecondary" |
// 	"textTertiary"
// 	, string>


const useGlobalStyles = makeStyles(theme => {

	return {
		title: {
			fontFamily: `"Trebuchet MS", Helvetica, sans-serif`,
			fontSize: '4rem',
			width: '100%',
			textAlign: 'center',

		},
		subTitle: {
			textAlign: 'center',
			fontSize: '1.5rem',
			fontStyle: "italic",
		},
		logo: {
			height: '10em',
		},
		hide: {
			display: 'none'
		},
		width100: {
			width: '100%'
		},
		body: {
			display: 'flex',
			flexFlow: "column",
			minHeight: '100vh'
		},
		horizontalBuffer: {
			flexGrow: 1
		},
		footer: {
			textAlign: 'center',
			width: '100%',
			backgroundColor: primary.light
		},
		horizontalCenter: {
			display: 'block',
			marginLeft: 'auto',
			marginRight: 'auto'
		},
		textPrimary: {
			color: textColor.primary
		},
		textSecondary: {
			color: textColor.secondary
		},
		textTertiary: {
			color: textColor.tertiary
		}
	}
})

const titlePadding = `0.1em 1em`


function useAppTheme(): Theme {

	const appTheme = useRecoilValue(appThemeState)

	return createMuiTheme({
		palette: {
			// type: props.globalState.providers.localStorage?.data.darkMode ? "dark" : "light",
			type: appTheme.darkMode ? "dark" : "light"
			// primary,
			// secondary
		},
		typography: {
			button: {
				textTransform: 'none'
			},
			h1: {
				padding: titlePadding
			},
			h2: {
				padding: titlePadding
			},
			h3: {
				padding: titlePadding,
			},
			h4: {
				padding: titlePadding,
			},
			h5: {
				padding: titlePadding
			},
			h6: {
				padding: titlePadding
			}
		},
		overrides: {
			// img
			MuiCssBaseline: {
				'@global': {
					'a': { color: 'inherit' }



				}
			}
		}
	})
}

const windowPersistentDrawerWidth = 800

const AppTheme = (props: any) => {

	const [appTheme, set_appTheme] = useRecoilState(appThemeState)

	React.useEffect(() => {
		function handleResize() {
			set_appTheme(state => ({
				...state,
				// menuDrawerOpen: window.innerWidth >= 800,
				menuDrawerPermanent: window.innerWidth >= windowPersistentDrawerWidth
			}))
		}
		window.addEventListener('resize', handleResize)
		//CALL ON INIT
		handleResize()
		if (window.innerWidth >= windowPersistentDrawerWidth)
			set_appTheme(state => ({ ...state, menuDrawerOpen: true }))

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<ThemeProvider theme={useAppTheme()}>
			{props.children}
		</ThemeProvider>
	)
}

export default AppTheme


export {
	AppTheme,
	appThemeState,
	// ThemeClasses,
	ThemeProps,
	useGlobalStyles
}