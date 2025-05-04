import './common/env';
import Server from './common/server';

const port = parseInt(process.env.PORT ?? '8080');
export default new Server().listen(port);
