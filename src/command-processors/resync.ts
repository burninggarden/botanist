import ChildProcess     from 'child_process';
import CommandProcessor from 'command-processor';

class ResyncCommandProcessor extends CommandProcessor {

	protected run(): Promise<any> {
		const path = this.getBotanistPath();

		ChildProcess.execSync(
			`cp -r ${path}/templates/project/bin/. ./bin`
		);

		ChildProcess.execSync(
			`cp ${path}/templates/project/.eslintrc.json .eslintrc.json`
		);

		ChildProcess.execSync(
			`cp ${path}/templates/project/tsconfig.json tsconfig.json`
		);

		ChildProcess.execSync(
			`cp ${path}/templates/project/jest.config.js jest.config.js`
		);

		ChildProcess.execSync(
			`cp ${path}/templates/project/.prettierrc .prettierrc`
		);

		this.printMessage('Updated local bin scripts and config files!');

		return Promise.resolve();
	}

}

export default ResyncCommandProcessor;
