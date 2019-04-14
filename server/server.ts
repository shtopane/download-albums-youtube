import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

export const app: express.Application = express();
const port = 4000;

app.use(express.static(__dirname + '/output'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server on port: ' + port);
});