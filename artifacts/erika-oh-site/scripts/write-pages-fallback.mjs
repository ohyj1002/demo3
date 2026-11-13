import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rawBasePath = process.env.BASE_PATH;
if (!rawBasePath) {
  throw new Error('BASE_PATH is required to generate the GitHub Pages fallback.');
}

const leadingSlashPath = rawBasePath.startsWith('/')
  ? rawBasePath
  : `/${rawBasePath}`;
const basePath = leadingSlashPath.endsWith('/')
  ? leadingSlashPath
  : `${leadingSlashPath}/`;
const outputDirectory = path.resolve('dist/public');
const fallbackHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Page not found | Yoo Jung (Erika) Oh</title>
  </head>
  <body>
    <p>Returning to the requested page…</p>
    <noscript><p><a href="${basePath}">Return to the About page</a></p></noscript>
    <script>
      const basePath = ${JSON.stringify(basePath)};
      const pathname = window.location.pathname;
      const route = pathname.startsWith(basePath)
        ? '/' + pathname.slice(basePath.length)
        : pathname;
      const params = new URLSearchParams({ p: route });
      const query = window.location.search.slice(1);
      if (query) params.set('q', query);
      window.location.replace(basePath + '?' + params.toString() + window.location.hash);
    </script>
  </body>
</html>
`;

await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, '404.html'), fallbackHtml, 'utf8');
console.info(`Wrote GitHub Pages fallback for ${basePath}`);
