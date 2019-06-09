import ChildProcess     from 'child_process';
import CommandProcessor from 'command-processor';

class BumpCommandProcessor extends CommandProcessor {

	protected run(): Promise<any> {
		ChildProcess.execSync('npm version patch');
		return Promise.resolve();
	}

}

export default BumpCommandProcessor;
