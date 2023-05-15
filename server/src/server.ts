import * as http from 'http';

import config from 'config';
import chalk from 'chalk';

import { app } from './app';
import { logger } from './utils';

let server: http.Server;
const PORT = config.get<number>('PORT');
const NODE_ENV = config.get<string>('NODE_ENV');

async function startServer(): Promise<void> {
    server = http.createServer(app);

    try {
        server.listen(PORT, () => {
            logger.info(
                chalk.magentaBright.bold.underline(
                    `⇨ 🚀 Server running in ${NODE_ENV} mode and listening on port ${PORT}`
                )
            );
        });
    } catch (err: any) {
        logger.error(chalk.redBright.bold.underline(`❌ Server error: ${err.message}`));
        process.exit(1);
    }
}

void startServer();
