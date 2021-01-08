import React from 'react';
import { useHistory } from 'react-router';
import { useRefState, GetLocalUrl } from '../utility/reactUtility';


export const NotFound = () => {

	const [countdown, ref_countdown, set_countdown] = useRefState(4)

	const history = useHistory()

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (ref_countdown.current === 1)
				history.goBack()
			else
				set_countdown(ref_countdown.current - 1)
		}, 1000);
		return () => clearInterval(interval)
	}, [])
	const location = GetLocalUrl()
	return <div>
		<h1> page at "{location}" not found, redirecting in {countdown}</h1>
	</div>
}
