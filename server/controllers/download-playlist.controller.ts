import * as ytpl from 'ytpl';

export class DownloadPlaylistController {
    protected req: Express.Request;
    protected res: Express.Response;

    public async handleDownloadPlaylistFromYoutube(req: Express.Response, res: Express.Response) {
        const result: ytpl.result = await ytpl('https://www.youtube.com/playlist?list=OLAK5uy_l9DKK1vNaReJBc4tDpJdYZvUTyy29zk2E');

        console.log('HANDLE')
        console.log(result)
    }
}