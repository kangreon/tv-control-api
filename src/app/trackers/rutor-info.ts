import axios from "axios";
import { JSDOM } from "jsdom";
import FormData from "form-data";

const URL = 'http://127.0.0.1:8283/';

export enum DataProvider {
  rutor = 'rutor',
}

export type TrackerResult = {
  name: string;
  id: number;
  provider: DataProvider;
  size: string;
  seeders: number;
};

export class RutorInfo {
  async find(query: string): Promise<TrackerResult[]> {
    return this.generateResult(query);
  }

  async top(): Promise<TrackerResult[]> {
    const fetchUrls = [
      `http://rutor.info/nashi_seriali`,
    ];

    const results = await Promise.all(fetchUrls.map(url => this.fetchResult(url)));

    const list: TrackerResult[] = [];
    results.forEach(result => {
      list.push(...this.parseSearchResult(result));
    });

    return list;
  }

  private async generateResult(query: string): Promise<TrackerResult[]> {
    const formatQuery = encodeURIComponent(query);
    const fetchUrls = [
      `http://rutor.info/search/0/0/100/0/${formatQuery}`,
      // `http://rutor.info/search/0/1/100/0/${formatQuery}`,
      // `http://rutor.info/search/0/5/100/0/${formatQuery}`,
      // `http://rutor.info/search/0/4/100/0/${formatQuery}`,
      // `http://rutor.info/search/0/16/100/0/${formatQuery}`,
    ];

    const results = await Promise.all(fetchUrls.map(url => this.fetchResult(url)));

    const list: TrackerResult[] = [];
    results.forEach(result => {
      list.push(...this.parseSearchResult(result));
    });

    return list;
  }

  private async fetchResult(url: string): Promise<string> {
    try {
      const result = await axios.get(url);
      return result.data;
    } catch (error) {
      console.error(error);
    }

    return '';
  }

  private parseSearchResult(source: string): TrackerResult[] {
    const document = new JSDOM(source).window.document;
    const results = document.querySelectorAll('div#content table > tbody > tr.gai, div#content table > tbody > tr.tum');
    const list: TrackerResult[] = [];
    for (const result of results) {
      const link = result.querySelectorAll('a')[2];
      if (!link) {
        continue;
      }

      const numberMatch = /\/(\d+)\//.exec(link.href);
      if (!numberMatch) {
        continue;
      }

      const size = result.querySelectorAll('td')[3];
      const seeders = result.querySelector('td span');

      list.push({
        id: Number(numberMatch[1]),
        provider: DataProvider.rutor,
        seeders: Number(seeders.textContent || '0'),
        size: '11.90 GB',//size.textContent,
        name: link.textContent,
      });
    }

    return list;
  }

  public async download(fileId: number, provider: DataProvider): Promise<any> {
    try {
      const magnet = await this.getMagnet(fileId);
      console.log(magnet);

      const bodyFormData = new FormData();
      bodyFormData.append('urls', magnet);
      bodyFormData.append('autoTMM', 'false');
      bodyFormData.append('savepath', '/home/user/Downloads/');
      bodyFormData.append('cookie', '');
      bodyFormData.append('rename', '');
      bodyFormData.append('category', '');
      bodyFormData.append('paused', 'false');
      bodyFormData.append('root_folder', 'true');
      bodyFormData.append('sequentialDownload', 'true');
      bodyFormData.append('firstLastPiecePrio', 'true');
      bodyFormData.append('dlLimit', 'NaN');
      bodyFormData.append('upLimit', 'NaN');

      const response = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8283/api/v2/torrents/add',
        headers: bodyFormData.getHeaders(),
        data: bodyFormData,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
      return {
        ok: true,
      }
    }
  }

  private async getMagnet(fileId: number): Promise<string> {
    try {
      const response = await axios.get(`http://rutor.info/torrent/${fileId}`);
      const source = response.data;

      const extractedData = /(magnet:[^"]+)/.exec(source);
      return extractedData[1] || '';
    } catch (error) {
      console.error(error);
      return '';
    }
  }
}
