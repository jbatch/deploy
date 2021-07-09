import express from 'express';
import crypto from 'crypto';
import pino from 'pino';
import { ServiceError } from '../error/service-error';
import { assertFound, wrapExpressPromise } from '../util';
import { loggedInMiddleware } from './middleware/logged-in-middleware';
import { App } from '../entity/App';
import { AppCommand } from '../entity/AppCommand';
import { CommandRun } from '../entity/CommandRun';

const logger = pino();

// Hosted at /api/apps
const appRoutes = express.Router();

/**
 * Apps
 */

appRoutes.get(
  '/',
  loggedInMiddleware,
  wrapExpressPromise<GetAppsRequest, GetAppsResponse>(async (req, res) => {
    const apps = await App.find({ relations: ['commands'] });

    return { apps: apps.map((a) => mapApp(a)) };
  })
);

appRoutes.get(
  '/:appId',
  loggedInMiddleware,
  wrapExpressPromise<GetAppRequest, GetAppResponse>(async (req, res) => {
    const { appId } = req.params;
    const app = await App.findOne({ where: { id: appId }, relations: ['commands'] });

    return { app: mapApp(app) };
  })
);

appRoutes.post(
  '/',
  loggedInMiddleware,
  wrapExpressPromise<CreateAppRequest, CreateAppResponse>(async (req, res) => {
    const { name } = req.body;

    const id = `A${crypto.randomBytes(12).toString('hex')}`.substr(0, 12);
    logger.info(`Creating app ${name} with id ${id}`);

    const app = App.create({ id, name });
    await App.save(app);
    return { app: mapApp(app) };
  })
);

/**
 * Commands
 */

appRoutes.post(
  '/:appId/commands',
  loggedInMiddleware,
  wrapExpressPromise<AddAppCommandRequest, AddAppCommandResponse>(async (req, res) => {
    const { appId } = req.params;
    const { name, command } = req.body;
    const app = await App.findOne({ where: { id: appId }, relations: ['commands'] });
    assertFound(app);

    const id = `C${crypto.randomBytes(12).toString('hex')}`.substr(0, 12);
    logger.info(`Creating command ${name}:${id} for app ${app.name}:${app.id}`);

    const appCommand = AppCommand.create({ id, app: app, name, command });
    await AppCommand.save(appCommand);
    return { app: await getApp(app.id) };
  })
);

appRoutes.post(
  '/:appId/commands/:commandId',
  loggedInMiddleware,
  wrapExpressPromise<UpdateAppCommandRequest, UpdateAppCommandResponse>(async (req, res) => {
    const { appId, commandId } = req.params;
    const { name, command } = req.body;
    const app = await App.findOne({ where: { id: appId } });
    assertFound(app);
    const appCommand = await AppCommand.findOne({ where: { id: commandId, app } });
    assertFound(appCommand);

    logger.info(`Updating command ${appCommand.name}:${appCommand.id} for app ${app.name}:${app.id}`);

    appCommand.name = name || appCommand.name;
    appCommand.command = command || appCommand.command;
    await AppCommand.save(appCommand);

    return { app: await getApp(app.id) };
  })
);

appRoutes.delete(
  '/:appId/commands/:commandId',
  loggedInMiddleware,
  wrapExpressPromise<DeleteAppCommandRequest, DeleteAppCommandResponse>(async (req, res) => {
    const { appId, commandId } = req.params;
    const app = await App.findOne({ where: { id: appId } });
    assertFound(app);
    const appCommand = await AppCommand.findOne({ where: { id: commandId, app } });
    assertFound(appCommand);

    logger.info(`Deleting command ${appCommand.name}:${appCommand.id} from app ${app.name}:${app.id}`);

    await AppCommand.remove(appCommand);

    return { app: await getApp(app.id) };
  })
);

/**
 * Runs
 */

appRoutes.post(
  '/:appId/commands/:commandId/runs',
  loggedInMiddleware,
  wrapExpressPromise<RunAppCommandRequest, RunAppCommandResponse>(async (req, res) => {
    const { appId, commandId } = req.params;
    const app = await App.findOne({ where: { id: appId } });
    assertFound(app);
    const appCommand = await AppCommand.findOne({ where: { id: commandId, app } });
    assertFound(appCommand);

    // Create pending command run
    const id = `R${crypto.randomBytes(12).toString('hex')}`.substr(0, 12);
    const commandRun = CommandRun.create({ id, command: appCommand, status: 'pending' });
    CommandRun.save(commandRun);

    return { runResult: mapCommandRun(commandRun) };
  })
);

appRoutes.get(
  '/:appId/commands/:commandId/runs/:runId',
  loggedInMiddleware,
  wrapExpressPromise<GetCommandRunRequest, GetCommandRunResponse>(async (req, res) => {
    const { appId, commandId, runId } = req.params;
    const app = await App.findOne({ where: { id: appId } });
    assertFound(app);
    const appCommand = await AppCommand.findOne({ where: { id: commandId, app } });
    assertFound(appCommand);
    const commandRun = await CommandRun.findOne({ where: { id: runId, command: appCommand } });
    assertFound(appCommand);

    return { runResult: mapCommandRun(commandRun) };
  })
);

/**
 * Helpers
 */

async function getApp(appId: string): Promise<IApp> {
  return mapApp(await App.findOne({ where: { id: appId }, relations: ['commands'] }));
}

function mapApp({ id, name, rootDir, commands }: App): IApp {
  return {
    id: id,
    name: name,
    commands: commands.map((c) => mapCommand(c)),
    rootDir: rootDir,
  };
}

function mapCommand({ id, name, command }: AppCommand): IAppCommand {
  return {
    id,
    name,
    command,
  };
}

function mapCommandRun({ id, status, success, output }: CommandRun): IRunResult {
  return {
    id,
    status: mapRunStatus(status),
    success,
    output,
  };
}

function mapRunStatus(status: string): RunStatus {
  switch (status) {
    case 'pending':
    case 'running':
    case 'complete':
      return status;
    default:
      'complete'; // Should never happen but makes function types work
  }
}

export default appRoutes;
