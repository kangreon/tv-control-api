import { Router } from "express";
import {fileSystemRouter} from "./file-system";
import {trackerRouter} from "./tracker";

export const mainRouter = Router({ mergeParams: true });

mainRouter.use('/file-system/', fileSystemRouter);
mainRouter.use('/tracker/', trackerRouter);

