import express from "express";
import {Qbittorrent} from "../app/client/qbittorrent";

export const list = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const info = new Qbittorrent();
    const result = await info.list();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json([]);
  }
};
