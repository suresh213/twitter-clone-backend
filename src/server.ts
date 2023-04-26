// require('ts-node/register');
/* eslint-disable no-console */
import cluster, { Worker } from 'cluster';
import os from 'os';
import app from './app';
import dayjs from 'dayjs';

type WorkerMessage = {
  text: string;
};

const numCores: number = os?.cpus()?.length;

const workers: Worker[] = [];

const setupWorkerProcesses = (): void => {
  console.log(`Master cluster setting up ${numCores} workers`);

  for (let i = 0; i < numCores; i++) {
    workers?.push(cluster?.fork());

    workers[i]?.on('message', function (message: WorkerMessage) {
      console.log(message);
    });
  }
};

const setUpExpress = (): void => {
  const port: number = Number(process.env.APP_PORT) || 8002;

  app?.listen(port, () => {
    console.log(
      `Server running on port ${port} 🚀: time : ${dayjs()
        .tz('Asia/Kolkata')
        .format('Do MMM YYYY - hh:mm:ss a')} with process ID ${process.pid}`
    );
  });
};

const setupServer = (isClusterRequired: boolean): void => {
  if (isClusterRequired && cluster?.isMaster) {
    setupWorkerProcesses();
  } else {
    setUpExpress();
  }
};

if (process.env.NODE_ENV === 'production') {
  setupServer(true);
} else {
  setupServer(false);
}
