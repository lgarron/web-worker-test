export function instantiateWorker() {
  const worker = new Worker("./worker.js", { type: "classic" });
  return worker;
}
