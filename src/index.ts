import { measureRequest } from "./helpers/measureRequest";
import { parseURL } from "./helpers/parseURL";

const REQUEST_COUNT = 10;

async function main() {
  const url = process.argv[2];
  const parsedURL = parseURL(url);

  const measurement = [];

  for (let i = 1; i <= REQUEST_COUNT; i++) {
    const measure = await measureRequest(parsedURL);
    measurement.push(measure);

    const durartion = measure.durationMs.toFixed(2);

    console.log(`${i}. ${measure.bytes} байт, ${durartion} мс`)
  }
}

main().catch((err) => {
  console.error("Ошибка:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
})