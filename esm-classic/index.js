export async function instantiateWorker() {
  const worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "classic",
  });
  return worker;
}
