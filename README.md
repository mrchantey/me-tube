


## Dependencies
- node `choco install nodejs`
- ffmpeg `choco install ffmpeg`

Once node is installed, reope a terminal and install live server
- live server `npm i -g live-server`

## Usage
Before running the app the media must be prepared, and then copied to the app media folder

### Media Preparation

1. place all video files in `media-preparation/media-in`
2. open a terminal in media-preparation and run	`npx run prepare-media`
	```
	- the media-out directory should look like this
		```
		media-out
		|__metadata.json
		|__0.mp4
		|__1.mp4
		|__2.mp4
		...
		```
3. now run `npx run copy-to-server`