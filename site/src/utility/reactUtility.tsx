import React from 'react';

export interface iChildren {
	children?: React.ReactNode,
}


function GetLocalUrl() {
	return window.location.href
		.replace("http://localhost:3000/", '')
		.replace("https://localhost:3000/", '')
		.replace("http://192.168.86.117:3000/", '')
		.replace("https://192.168.86.117:3000/", '')
		.replace("http://www.chantey.org/", '')
		.replace("https://www.chantey.org/", '')
		.replace("http://chantey.org/", '')
		.replace("https://chantey.org/", '')
		.replace("https://chantey.web.app/", '')
		.replace("https://chantey.firebaseapp.com/", '')
		.replace("www.chantey.org/", '')
}

function copyToClipboard(str: string) {
	const el = document.createElement('textarea');
	el.value = str;
	el.setAttribute('readonly', '');
	el.style.display = 'hidden';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};
//https://ryankubik.com/blog/use-ref-state/
function useRefState(initialValue: any) {
	const [state, setState] = React.useState(initialValue)
	const stateRef = React.useRef(state)
	React.useEffect(() => { stateRef.current = state }, [state])
	return [state, stateRef, setState]
}

function useForceUpdate() {
	const [value, setValue] = React.useState(0); // integer state
	return () => setValue(v => ++v); // update the state to force render
}


let uid = 0;
function getUid() {
	return uid++
}


// const ChangeListener = ({ value, callback }) => {
// 	const [lastValue, set_lastValue] = React.useState(null)

// 	React.useEffect(_ => {
// 		let isMounted = { value: true }
// 		if (value !== lastValue) {
// 			set_lastValue(value)
// 			callback(isMounted)
// 		}
// 		return () => isMounted.value = false
// 	}, [value])

// 	return null
// }




export {
	GetLocalUrl,
	useRefState,
	useForceUpdate,
	getUid,
	copyToClipboard,
	// ChangeListener
}