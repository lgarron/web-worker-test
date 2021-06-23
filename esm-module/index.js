export async function instantiateWorker() {
  const worker = new Worker("./worker.js", { type: "module" });
  return worker;
}
