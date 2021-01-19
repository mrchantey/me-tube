const fs = require('fs-extra');
const getSizeCallback = require('get-folder-size');

const src = 'foo'
const dest = 'bar'

fs.copy(src, dest)
	.then(() => {
		console.log('\ncomplete!')
		process.exit()
	})

copyProgress(src, dest)


async function getSize(dir) {
	return new Promise((resolve, reject) => {
		getSizeCallback(dir, (err, size) => {
			if (err)
				reject(err)
			resolve(size)
		});
	})
}

const bToMB = val => (val / 1024 / 1024)
const bToGB = val => (val / 1024 / 1024) * 0.001


async function copyProgress(src, dest, interval = 500) {
	const sizeSrc = await getSize(src)

	setInterval(async () => {
		const sizeDest = await getSize(dest)
		const progress = (sizeDest - initialSizeDest) / sizeSrc

		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(`${(progress * 100).toFixed(2)}%`)
	}, interval)
};



