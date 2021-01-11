const ffmpeg = require('fluent-ffmpeg');




async function convertFile(pathIn, pathOut, onProgress = console.log) {
	return new Promise((resolve, reject) => {
		ffmpeg(pathIn)
			.on('error', reject)
			.on('progress', progress => onProgress(progress.percent * 0.01))
			.on('end', _ => {
				console.log(`\t\tsuccess`)
				resolve()
			})
			.save(pathOut)
	})
}

module.exports = convertFile


