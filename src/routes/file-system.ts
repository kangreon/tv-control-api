import { Router } from "express";
import * as fileSystem from '../controllers/filesystem'

export const fileSystemRouter = Router({ mergeParams: true });

fileSystemRouter.get('/list', fileSystem.list);
fileSystemRouter.delete('/file/:fileId');
