export type Measurement = {
  durationMs: number;
  bytes: number;
}

export async function measureRequest(url: URL): Promise<Measurement> {
  const startTime = performance.now();
  const response = await fetch(url, {
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error(`В ответ ничего не пришло`);
  }

  let bytes = 0;

  for await (const chunk of response.body) {
    bytes += chunk.length;
  }

  const endTime = performance.now();
  const durationMs = endTime - startTime;

  return { durationMs, bytes }
}