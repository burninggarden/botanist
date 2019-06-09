import CommandProcessor from 'command-processor';

class VersionCommandProcessor extends CommandProcessor {

	protected run(): Promise<any> {
		const path = this.getBotanistPath();
		const manifest = require(path + '/package.json');

		this.printMessage(manifest.version);

		return Promise.resolve();
	}

}

export default VersionCommandProcessor;
