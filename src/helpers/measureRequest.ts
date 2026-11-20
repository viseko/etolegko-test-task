export type Measurement = {
  durationMs: number;
  bytes: number;
}

export async function measureRequest(url: URL):Promise<Measurement> {
  const startTime = performance.now();
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP: ${response.status} ${response.statusText}`);
  }

  const data = await response.arrayBuffer();
  const endTime = performance.now();

  const durationMs = endTime - startTime;
  const bytes = data.byteLength;

  return { durationMs, bytes };
}