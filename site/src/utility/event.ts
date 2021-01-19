
interface Action<T> {
	(item: T): void;
}

interface Func<T, TResult> {
	(item: T): TResult;
}

export interface iEvent {
	invoke: Action<void>,
	addListener: Action<Action<any>>,
	removeListener: Action<Action<any>>
}


export function createEvent() {

	const listeners = []

	function addListener(listener: Action<any>) {
		const index = listeners.indexOf(listener);
		if (index === -1) {
			listeners.push(listener);
			return true
		}
		return false
	}

	function removeListener(listener: Action<any>) {
		const index = listeners.indexOf(listener);
		if (index > -1) {
			listeners.splice(index, 1)
			return true
		}
		return false
	}



	function invoke(args?: any) {
		listeners.forEach(listener => listener(args))
	}

	return {
		invoke,
		addListener,
		removeListener
	}


}