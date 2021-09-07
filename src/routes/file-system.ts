import { Router } from "express";

export const fileSystemRouter = Router({ mergeParams: true });

fileSystemRouter.get('/list');
fileSystemRouter.delete('/file/:fileId');
