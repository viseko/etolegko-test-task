import { type Measurement, measureRequest } from "./helpers/measureRequest";
import { parseURL } from "./helpers/parseURL";

const REQUEST_COUNT = 10;

async function main() {
  const url = process.argv[2];
  const parsedURL = parseURL(url);

  const measurements: Measurement[] = [];

  for (let i = 1; i <= REQUEST_COUNT; i++) {
    const measure = await measureRequest(parsedURL);
    measurements.push(measure);

    const duration = measure.durationMs.toFixed(2);

    console.log(`${i}. ${measure.bytes} байт, ${duration} мс`)
  }

  const totalBytes = measurements.reduce((sum, m) => sum + m.bytes, 0);
  const totalMBytes = (totalBytes / 1e6).toFixed(2);
  const totalMs = measurements.reduce((sum, m) => sum + m.durationMs, 0);
  const avgMs = (totalMs / measurements.length).toFixed(2);
  const speedMbps = ((totalBytes * 8) / 1e6 / (totalMs / 1000)).toFixed(2);

  console.log("=========");
  console.log(`Объем данных: ${totalMBytes} МБ.`);
  console.log(`Среднее время запроса: ${avgMs} мс.`);
  console.log(`Скорость: ${speedMbps} Мбит/сек.`);
}

main().catch((err) => {
  console.error("Ошибка:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
})