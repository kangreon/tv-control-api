import { Router } from "express";
import * as tracker from "../controllers/tracker";

export const trackerRouter = Router({ mergeParams: true });

trackerRouter.get('/find', tracker.find);
trackerRouter.post('/download/:fileId');
