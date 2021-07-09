import express from 'express';
import pino from 'pino';
import { ServiceError } from '../error/service-error';
import { assertFound, wrapExpressPromise } from '../util';
import { loggedInMiddleware } from './middleware/logged-in-middleware';
import fs from 'fs';
import path from 'path';

const logger = pino();

// Hosted at /api/dir
const dirRoutes = express.Router();

dirRoutes.get(
  '/',
  loggedInMiddleware,
  wrapExpressPromise<GetDirRequest, GetDirResponse>(async (req, res) => {
    const { dir } = req.query;
    const resolvedPath = path.resolve(dir);
    logger.info(`GET Dir ${resolvedPath}`);
    if (!resolvedPath.startsWith('/var/www')) {
      throw new ServiceError(`Cannot read paths outside /var/www - got ${resolvedPath}`, 400);
    }
    const exists = await dirExists(resolvedPath);
    if (!exists) {
      throw new ServiceError(`Directory not found - ${resolvedPath}`, 400);
    }
    const result = await fs.promises.readdir(dir);
    return { result };
  })
);

async function dirExists(path: string): Promise<boolean> {
  try {
    return await (await fs.promises.lstat(path)).isDirectory();
  } catch {
    return false;
  }
}

export default dirRoutes;
