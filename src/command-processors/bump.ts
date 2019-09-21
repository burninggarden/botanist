import ChildProcess     from 'child_process';
import CommandProcessor from 'command-processor';

class BumpCommandProcessor extends CommandProcessor {

	protected run(): Promise<any> {
		ChildProcess.execSync('npm version patch', {
			stdio: 'inherit'
		});

		ChildProcess.execSync('git push origin master', {
			stdio: 'inherit'
		});

		ChildProcess.execSync('npm publish', {
			stdio: 'inherit'
		});

		return Promise.resolve();
	}

}

export default BumpCommandProcessor;
