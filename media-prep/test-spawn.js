const crossSpawn = require('cross-spawn');




function spawn(command, args = [], path = "./") {
	return new Promise((resolve, reject) => {
		const cmd = crossSpawn(command, args,
			{
				stdio: [process.stdin, process.stdout, process.stderr],
				cwd: path
			})
		// cmd.stdout.on('data', buff => console.log(buff.toString()))
		// cmd.stdio.on('data', buff => console.log(buff.toString()))
		// cmd.stderr.on('data', buff => console.error(buff.toString()))
		// cmd.on('message', buff => console.log(buff.toString()))
		cmd.on('error', reject)
		cmd.on('exit', resolve)
	});
}


const dirIn = './media-in/test1.mkv'
const dirOut = './media-out/test1.mp4'
// spawn("ffmpeg", ['-i', dirIn, '-hwaccel', dirOut]).then(() => console.log('success'))
const start = Date.now()

// const args1 = ['-y', '-i', dirIn, dirOut]
// const args1 = ['h264_cuvid', '-i', dirIn, '-c:v', 'h264_nvenc', dirOut]
const args = ["-y", "-vsync", "0", "-hwaccel", "cuvid", "-c:v", "h264_cuvid", "-i", dirIn, "-c:a", "copy", "-c:v", "h264_nvenc", dirOut]
// const args2 = ["-vsync", "0", "-hwaccel", "cuvid", "-c:v", "h264_cuvid", "-i", dirIn, "-c:a", "copy", "-c:v", "h264_nvenc", "-b:v", "5M", dirOut]
// 
spawn("ffmpeg", args).then(() => console.log(`success in ${((Date.now() - start) / 1000).toFixed(2)} seconds`))