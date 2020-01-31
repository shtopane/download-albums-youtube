import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';

export const app: express.Application = express();

let port = process.env.PORT;
if (port == null || port === '') {
  port = '4000';
}

app.use(express.static(path.join(__dirname, 'output')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server on port: ' + port);
});