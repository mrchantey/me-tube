const crossSpawn = require('cross-spawn');
const path = require('path');

function spawn({
	command,
	args = [],
	workingDirectory = "./",
	onData = val => process.stdout.write(val)
} = {}) {

	return new Promise((resolve, reject) => {
		const cmd = crossSpawn(command, args,
			{
				cwd: workingDirectory
			})
		cmd.stdout.on('data', buff => onData(buff.toString()))
		cmd.stderr.on('data', buff => onData(buff.toString()))
		// cmd.on('message', buff => onData(buff.toString()))
		cmd.on('error', reject)
		cmd.on('exit', resolve)
	});
}

const getFrame = val => parseInt(val
	.split("=")[1]
	.trim()
	.split(" ")[0])

function getFrameCount(file) {
	return new Promise((resolve, reject) => {
		const frameCountArgs = {
			command: "ffmpeg",
			args: ["-i", file, "-map", "0:v:0", "-c", "copy", "-f", "null", "-"],
			onData: val => {
				if (val.includes("frame="))
					resolve(getFrame(val))
			}
		}
		spawn(frameCountArgs)
	})
}

async function convertFile(pathIn, pathOut, onProgres = console.log, hardwareAcc = true) {

	const totalFrames = await getFrameCount(pathIn)

	const args = hardwareAcc ?
		[
			// "-progress", "-",
			"-y", "-vsync", "0", "-hwaccel",
			"cuvid", "-c:v", "h264_cuvid", "-i", pathIn,
			"-c:a", "copy", "-c:v", "h264_nvenc", pathOut
		] : ['-y', "-vsync", "0", '-i', pathIn, pathOut]

	const spawnArgs = {
		command: "ffmpeg",
		args,
		onData: val => {
			if (val.includes("frame=")) {
				// console.dir(val);
				const currentFrame = getFrame(val)
				onProgres(currentFrame / totalFrames)
			}
		}
	}
	await spawn(spawnArgs)
}




module.exports = convertFile



if (require.main == module) {
	const pathIn = './media-in/test1.mkv'
	const pathOut = './media-out/test1.mp4'
	convertFile(pathIn, pathOut)
}
