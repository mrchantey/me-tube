

## Dependencies
- node `choco install nodejs`
- ffmpeg `choco install ffmpeg`

## Setup

Both the `site` and `media-preparation` directories contain a node package. The dependancies can be installed by doing the following:
```
cd ./media-preparation
npm install
cd ../site
npm install
cd ..
```

## Usage
Before running the app the media must be prepared, and then copied to the app media folder.

### Media Preparation

1. place all video files in `media-preparation/media-in` (file names and subdirectories are unimportant)
2. `cd media-preparation`
2. `npm run prepare-media`
	- the media-out directory should look like this
		```
		media-out
		|__metadata.json
		|__0.mp4
		|__1.mp4
		|__2.mp4
		...
		```
3. now run `npm run copy-to-server`

### Running the server

1. cd to `site` and run `npm run serve`

#### Desktop Client
1. open Chrome and go to `http://localhost:8080`
2. to cast go to `settings > cast`
 
#### Android Client
1. find out your local ip address `ipconfig` or `ifconfig`
1. open Chrome on the device and go to `http://YOUR.LOCAL.IP:8080`
2. to cast select the options button on the video and press cast