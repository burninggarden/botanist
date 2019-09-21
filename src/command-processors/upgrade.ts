import ChildProcess     from 'child_process';
import CommandProcessor from 'command-processor';

class UpgradeCommandProcessor extends CommandProcessor {

	protected run(): Promise<any> {
		ChildProcess.execSync('npm install -g @burninggarden/botanist@latest',{
			stdio: 'inherit'
		});

		return Promise.resolve();
	}

}

export default UpgradeCommandProcessor;
