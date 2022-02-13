import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time": "${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`,
});

export default log;
