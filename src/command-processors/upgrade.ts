import ChildProcess     from 'child_process';
import CommandProcessor from 'command-processor';

class UpgradeCommandProcessor extends CommandProcessor {

	protected run(): Promise<any> {
		ChildProcess.execSync('npm update -g @burninggarden/botanist');
		return Promise.resolve();
	}

}

export default UpgradeCommandProcessor;
