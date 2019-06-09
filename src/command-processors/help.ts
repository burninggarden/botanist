import CommandProcessor from 'command-processor';

class HelpCommandProcessor extends CommandProcessor {

	protected run(): Promise<any> {
		this.printUsage();

		return Promise.resolve();
	}

	private printUsage(): void {
		const output = `

Usage: botanist <command>
Where <command> is one of:
	bump    - performs a patch-level version bump, pushes to Git, and publishes to NPM
	help    - show this menu
	init    - initialize a new Typescript project in the current directory
	resync  - updates this project's scripts and config files to the latest versions in Botanist
	upgrade - upgrades Botanist on your system to the latest version
	version - show the currently installed version of Botanist

		`;

		this.printMessage(output);
	}
}

export default HelpCommandProcessor;
