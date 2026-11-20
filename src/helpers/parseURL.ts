export function parseURL(raw: string | undefined):URL {
  if (!raw) {
    throw new Error("URL не передан. Использование: npm run dev -- <url>");
  }

  try {
    return new URL(raw);
  } catch {
    throw new Error(`Некорректный URL: ${raw}`);
  }
}