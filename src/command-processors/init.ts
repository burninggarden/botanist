import ChildProcess     from 'child_process';
import CommandProcessor from 'command-processor';
import {PlatformType}   from '@burninggarden/enums';
import {Directory}      from '@burninggarden/filesystem';

const PROJECT_PLACEHOLDER = 'PROJECT_PLACEHOLDER';

class InitCommandProcessor extends CommandProcessor {

	protected async run(): Promise<any> {
		await this.copyTemplateFiles();
		await this.initializeGitRepo();
		await this.initializeNpmPackage();

		this.printMessage('Initialized new project in current directory');
	}

	private async copyTemplateFiles(): Promise<any> {
		const templateDirectory = this.getTemplateDirectory();

		await templateDirectory.copyToDirectory(this.getCurrentPath());

		this.renameGitignore();
		this.replacePlaceholders();

		return Promise.resolve();
	}

	private async initializeGitRepo(): Promise<any> {
		ChildProcess.execSync('git init');
		return Promise.resolve();
	}

	private async initializeNpmPackage(): Promise<any> {
		ChildProcess.execSync('npm install');
		return Promise.resolve();
	}

	private getTemplateDirectory(): Directory {
		const templatePath = this.getBotanistPath() + '/templates/project';

		return Directory.fromPath(templatePath);
	}

	private renameGitignore(): void {
		ChildProcess.execSync('mv .gitignore.disabled .gitignore');
	}

	private replacePlaceholders(): void {
		const projectName = this.getProjectName();

		let prefix: string;

		if (process.platform === PlatformType.DARWIN) {
			prefix = "sed -i '' --";
		} else {
			prefix = 'set -i --';
		}

		ChildProcess.execSync(
			`${prefix} 's/${PROJECT_PLACEHOLDER}/${projectName}/g' package.json`
		);

		ChildProcess.execSync(
			`${prefix} 's/${PROJECT_PLACEHOLDER}/${projectName}/g' README.md`
		);
	}

}

export default InitCommandProcessor;
