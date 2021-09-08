import _ from 'lodash';
import axios from "axios";

export type FileInfo = {
  id: number;
  hash: string;
  name: string;
  progress: number;
  size: number;
  state: string;
  dlspeed: number;
};

const URL = 'http://127.0.0.1:8283/';

export class Qbittorrent {
  async list(): Promise<FileInfo[]> {
    try {
      const url = `${URL}api/v2/sync/maindata`;
      const result = await axios.get(url);
      const torrents = _.get(result.data, 'torrents', {}) || {};

      return Object.entries(torrents).map(([hash, values]) => {
        return {
          hash: hash as string,
          id: 0,
          name: _.get(values, 'name', '') as string,
          dlspeed: _.get(values, 'dlspeed', '') as number,
          progress: _.get(values, 'progress', '') as number,
          state: _.get(values, 'state', '') as string,
          size: _.get(values, 'size', '') as number,
        }
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
