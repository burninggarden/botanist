import CommandType             from 'enums/command-type';
import ResultType              from 'enums/result-type';
import CommandProcessor        from 'command-processor';
import BumpCommandProcessor    from 'command-processors/bump';
import HelpCommandProcessor    from 'command-processors/help';
import InitCommandProcessor    from 'command-processors/init';
import ResyncCommandProcessor  from 'command-processors/resync';
import UpgradeCommandProcessor from 'command-processors/upgrade';
import VersionCommandProcessor from 'command-processors/version';

class Botanist {

	public static processCommand(): void {
		const commandProcessor = this.getApplicableCommandProcessor();

		commandProcessor.processCommand();
	}

	private static getApplicableCommandProcessor(): CommandProcessor {
		switch (this.getCommandType()) {
			case CommandType.BUMP:
				return new BumpCommandProcessor();
			case CommandType.HELP:
				return new HelpCommandProcessor();
			case CommandType.INIT:
				return new InitCommandProcessor();
			case CommandType.RESYNC:
				return new ResyncCommandProcessor();
			case CommandType.UPGRADE:
				return new UpgradeCommandProcessor();
			case CommandType.VERSION:
				return new VersionCommandProcessor();
			default:
				return (new HelpCommandProcessor())
					.setResultType(ResultType.FAILURE);
		}
	}

	private static getCommandType(): CommandType {
		return process.argv[2] as CommandType;
	}

}

export default Botanist;
