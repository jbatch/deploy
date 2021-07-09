import pino from 'pino';
import utils from 'util';
import { exec } from 'child_process';
import { CommandRun } from '../entity/CommandRun';
import { assertFound } from '../util';

const logger = pino();

async function execute(command: string, cwd: string): Promise<{ stdout: string; stderr: string }> {
  return utils.promisify(exec)(command, { cwd });
}

async function runCommand(runId: string) {
  logger.info(`Starting command runId:${runId}`);
  const commandRun = await CommandRun.findOne({ where: { id: runId }, relations: ['command', 'command.app'] });
  assertFound(commandRun);

  const { name, command, app } = commandRun.command;
  logger.info(`${runId}: Starting command '${name}'. Running: \`${command}\``);
  const { stdout, stderr } = await execute(command, app.rootDir);
  commandRun.output = stdout;
  commandRun.status = 'complete';
  commandRun.success = true;
  await CommandRun.save(commandRun);
  logger.info('Run complete %o', { stdout, stderr });
}

export default { runCommand };
