import express from "express";
import {RutorInfo} from "../app/trackers/rutor-info";

export const find = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const query = req.query.q || '';
    if (query.length < 3) {
      res.json([]);
    }
    const info = new RutorInfo();
    const result = await info.find(req.query.q as string);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
