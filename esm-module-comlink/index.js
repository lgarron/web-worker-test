import { wrap } from "comlink";

const useNodeWorkarounds = typeof globalThis.Worker === "undefined";

export async function instantiateWorker() {
  let worker;
  if (useNodeWorkarounds) {
    const constructor = (await import("worker_threads")).Worker;
    const rawWorker = new constructor(new URL("./worker.js", import.meta.url));
    const nodeEndpoint = (await import("comlink/dist/esm/node-adapter.mjs"))
      .default;
    console.log(nodeEndpoint);
    worker = nodeEndpoint(rawWorker);
  } else {
    worker = new Worker(new URL("./worker.js", import.meta.url), {
      type: "module",
    });
  }
  console.log("worker", worker);
  const workerAPI = wrap(worker);
  console.log("workerAPI:", workerAPI);
  console.log("comlink test result:", await workerAPI.comlinkTest());
}

instantiateWorker();
