

//inspired by https://github.com/Jephuff/simple-cast/blob/master/src/index.ts

import React, { useEffect, useRef } from "react";
import { createEvent } from "../utility/event";
import { loadCast } from "./loadCast";







export const HTMLContainer = ({ element }: { element: HTMLElement }) => {
	const ref = useRef()
	useEffect(() => {
		((ref.current) as HTMLDivElement).appendChild(element);
		return () => { }
	}, [])
	return <div ref={ref} />
}


export async function createCastInstance() {
	await loadCast()

	const onConnected = createEvent()

	cast.framework.CastContext.getInstance().setOptions({
		receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
		autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
	});

	const player = new cast.framework.RemotePlayer();
	const playerController = new cast.framework.RemotePlayerController(player);

	// let media: chrome.cast.media.Media | null | void;
	// let subtitlesOn = false;

	playerController.addEventListener(cast.framework.RemotePlayerEventType.IS_CONNECTED_CHANGED,
		({ value }) => onConnected.invoke(value));

	playerController.addEventListener(
		cast.framework.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED,
		({ value }) => {
			console.log('loaded changed');
			console.dir(value);



			// if (
			// 	!value &&
			// 	media &&
			// 	media.idleReason === chrome.cast.media.IdleReason.FINISHED
			// ) {
			// 	emitter.emit(CastEvent.Finished, media.media.contentId);
			// 	media = null;
			// }
		}
	);


	const setMedia = async (file: string) => {
		// await cast.framework.CastContext.getInstance().requestSession();
		const castSession = cast.framework.CastContext.getInstance().getCurrentSession()

		const url = `http://127.0.0.1:3000/${file}`
		// const url = `http://127.0.0.1:3000/${file}`
		console.dir(url);
		// const mediaInfo = new chrome.cast.media.MediaInfo("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4", "video/mp4");
		const mediaInfo = new chrome.cast.media.MediaInfo(url, "video/mp4");
		// mediaInfo.
		const request = new chrome.cast.media.LoadRequest(mediaInfo);
		console.log('loading media..');
		// console.dir(castSession.);
		await castSession.loadMedia(request).catch(console.error)
		console.log('BANG');

		// function (errorCode) { console.log('Error code: ' + errorCode); });
	}


	const btn = document.createElement("google-cast-launcher")
	const castButton = <HTMLContainer element={btn} />



	return {
		castButton,
		onConnected,
		setMedia
	}
}



