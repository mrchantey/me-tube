const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const dirIn = './media-in'
const dirOut = './media-out'
const extensions = [
	'.avi',
	'.flv',
	'.mkv',
	'.wmv',
	'.mov',
	'.mp4',
]



function getFilesRecursive(parentDir, depth = -1, arr = []) {
	fs.readdirSync(parentDir)
		.forEach(file => {
			const path = `${parentDir}/${file}`
			const stat = fs.statSync(path);
			// console.dir(stat);
			if (!stat.isDirectory())
				arr.push(path)
			else if (depth !== 0)
				arr = getFilesRecursive(path, depth - 1, arr)
		})
	return arr
}



function filterFiles(files, extensions = []) {
	return files.filter(f => extensions.some(ext => f.includes(ext)))
}


async function convertFiles(files, dirIn, dirOut) {
	for (let i = 0; i < files.length; i++) {
		await convertFile(files[i], i, files.length, dirIn, dirOut)
	}
}


function progressBar(prefix, progress) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(`${prefix}${progress.toFixed(1)}%`);
}

async function convertFile(file, index, length, dirIn, dirOut) {
	return new Promise((resolve, reject) => {
		const fileName = path.basename(file)
		// const newFileName = fileName.replace(path.extname(fileName), '.mp4')

		const savePath = `${dirOut}/${index}.mp4`

		const prefix = `converting file ${index + 1}/${length} - ${fileName} - `
		process.stdout.write(`${prefix}0.0%`);
		ffmpeg(file)
			// .withOptions(["-hwaccel"])
			// .outputOptions('-hwaccel')
			.on('error', reject)
			.on('progress', progress => progressBar(prefix, progress.percent))
			.on('end', _ => {
				console.log(`\t\tsuccess`)
				resolve()
			})
			.save(savePath)
	})
}



function extractFileMetadata(file, index) {
	return new Promise((resolve, reject) => {
		ffmpeg.ffprobe(file, function (err, metadata) {
			if (err !== null)
				reject(err)
			const filtered = {
				index,
				originalPath: file,
				originalFormat: path.extname(file),
				fileName: path.basename(file).replace(path.extname(file), ""),
				width: metadata.streams[0].width,
				height: metadata.streams[0].height,
				size: metadata.format.size,
				duration: metadata.format.duration
			}
			resolve(filtered)
		})
	})
}

async function getMetadata(files) {
	return await Promise.all(files.map(extractFileMetadata))
}



const allFiles = getFilesRecursive(dirIn)

const movieFiles = filterFiles(allFiles, extensions)


if (fs.existsSync(dirOut))
	fs.removeSync(dirOut)
fs.mkdirSync(dirOut)

movieFiles.slice(10)

const metadataDir = `${dirOut}/metadata.json`
getMetadata(movieFiles)
	.then(files => {
		fs.writeJSONSync(metadataDir, files, { spaces: 2 });
		console.log(`metadata extracted to ${metadataDir}`);
		convertFiles(movieFiles, dirIn, dirOut)
			.catch(console.error)
	})
	.catch(console.error)
