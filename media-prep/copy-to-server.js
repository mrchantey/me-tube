const fs = require('fs-extra');

const dirMedia = "../site/dist/media"
if (fs.existsSync(dirMedia))
	fs.removeSync(dirMedia)
fs.mkdirSync(dirMedia)
fs.copy("./media-out", dirMedia)
	.then(() => {
		console.log('\ncomplete!')
		process.exit()
	})


process.stdout.write("copying...")

setInterval(() => {
	process.stdout.write(".")
}, 1000);