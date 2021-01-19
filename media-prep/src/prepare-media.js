const fs = require('fs-extra');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const convertSpawn = require('./convert-spawn');
const convertFluent = require('./convert-fluent');
const { spawn } = require('child_process');

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


const deltaSecs = (startTime) => ((Date.now() - startTime) / 1000).toFixed(2)


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
	const hwacc = process.argv.includes('-hwacc')
	console.log(`converting files - hardware accelerated:${hwacc}`);
	const startTime = Date.now()
	for (let i = 0; i < files.length; i++) {
		await convertFile(files[i], i, files.length, dirIn, dirOut, hwacc)
	}
	console.log(`\n${files.length} files converted in ${deltaSecs(startTime)} seconds\n`);
}

async function convertFile(pathIn, index, length, dirIn, dirOut, hardwareAcc = false) {
	const fileName = path.basename(pathIn)
	// const newFileName = fileName.replace(path.extname(fileName), '.mp4')

	const pathOut = `${dirOut}/${index}.mp4`


	const name = path.basename(pathIn).replace(path.extname(pathIn), "")

	function onProgress(val) {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(`converting file ${index + 1}/${length} - ${name} - ${(val * 100).toFixed(2)}%`);
	}

	const startTime = Date.now()

	const spawnFunc = hardwareAcc ? convertSpawn : convertFluent

	onProgress(0)
	await spawnFunc(pathIn, pathOut, onProgress)
		.catch(console.error)
	process.stdout.write(`\t\tsuccess in ${(deltaSecs(startTime))} seconds\n`)

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

// movieFiles.slice(10)

const metadataDir = `${dirOut}/metadata.json`
getMetadata(movieFiles)
	.then(files => {
		fs.writeJSONSync(metadataDir, files, { spaces: 2 });
		console.log(`metadata extracted to ${metadataDir}`);
		convertFiles(movieFiles, dirIn, dirOut)
			.catch(console.error)
	})
	.catch(console.error)
