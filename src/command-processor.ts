import Path         from 'path';
import ResultType   from 'enums/result-type';
import ChildProcess from 'child_process';

abstract class CommandProcessor {

	private resultType: ResultType = ResultType.SUCCESS;

	public setResultType(resultType: ResultType): this {
		this.resultType = resultType;
		return this;
	}

	public processCommand(): void {
		this.run().then(() => {
			this.exit();
		}).catch(error => {
			this.printError(error);
			this.setResultType(ResultType.FAILURE);
			this.exit();
		});
	}

	protected printMessage(message: string): void {
		// eslint-disable-next-line no-console
		console.log(message);
	}

	protected printError(error: Error): void {
		// eslint-disable-next-line no-console
		console.error(error);
	}

	protected getNodeModulesPath(): string {
		const output = ChildProcess.execSync('npm root -g');

		return output.toString('utf8').replace(/\s/g, '');
	}

	protected getBotanistPath(): string {
		const basePath = this.getNodeModulesPath();

		return basePath + '/@burninggarden/botanist';
	}

	protected getProjectName(): string {
		return Path.basename(this.getCurrentPath());
	}

	protected getCurrentPath(): string {
		return process.cwd();
	}

	private exit(): void {
		switch (this.getResultType()) {
			case ResultType.FAILURE:
				return void process.exit(1);
			case ResultType.SUCCESS:
			default:
				return void process.exit(0);
		}
	}

	private getResultType(): ResultType {
		return this.resultType;
	}

	protected abstract run(): Promise<any>;

}

export default CommandProcessor;
