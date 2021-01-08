import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './common/App';

ReactDOM.render(
	//react-dom.development.js:67 Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using
	// < React.StrictMode >
	<RecoilRoot>
		<App />
	</RecoilRoot>
	// </React.StrictMode >
	, document.getElementById('root')
);
