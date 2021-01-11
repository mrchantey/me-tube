
const fs = require('fs-extra');
const copyWithProgress = require('./copy-with-progress');


const src = "./media-out"
const dest = "../site/dist/media"


if (fs.existsSync(dest))
	fs.removeSync(dest)
fs.mkdirSync(dest)

copyWithProgress(src, dest)
	.then(e => process.exit())
	.catch(console.error)
