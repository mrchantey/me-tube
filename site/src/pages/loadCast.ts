const castSenderScriptSrc =
	"https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";


export async function loadCast() {
	const castId = "___castScript"
	if (document.getElementById(castId) !== null)
		throw new Error("Script already loaded!")
	const script = document.createElement("script");
	script.async = true;
	script.src = castSenderScriptSrc;
	script.id = castId

	script.onload = () => {
		script.onerror = script.onload = null;
	};

	script.onerror = () => {
		script.onerror = script.onload = null;
		throw new Error(`failed to load cast script`);
	};

	// const node = document.head || document.getElementsByTagName("head")[0];
	document.head.appendChild(script);

	await onAvailable()
}


function onAvailable() {
	return new Promise((resolve: any, reject) => {
		window.__onGCastApiAvailable = (isAvailable) => {
			if (isAvailable) {
				resolve();
			} else {
				reject(new Error("cast api not available"));
			}
		};
	});
}