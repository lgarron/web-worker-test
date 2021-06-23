import { expose } from "comlink";

const useNodeWorkarounds = typeof globalThis.Worker === "undefined";

const api = {
  comlinkTest: () => {
    return "result";
  },
};

export async function exposeAPI() {
  console.log("useNodeWorkarounds", useNodeWorkarounds);
  if (useNodeWorkarounds) {
    const parentPort = (await import("worker_threads")).parentPort;
    const nodeEndpoint = (await import("comlink/dist/esm/node-adapter.mjs"))
      .default;
    expose(api, nodeEndpoint(parentPort));
  } else {
    expose(api);
  }
}

exposeAPI();
