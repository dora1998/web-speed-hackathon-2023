import fs from 'node:fs';
import path from 'node:path';

import subsetFont from 'subset-font';

const fonts = [
  [
    'regular',
    fs.readFileSync(path.resolve(__dirname, '../public/fonts/NotoSerifJP-Regular.otf')),
    ['Not Found', 'このサイトは架空のサイトであり、商品が発送されることはありません'],
  ],
  ['bold', fs.readFileSync(path.resolve(__dirname, '../public/fonts/NotoSerifJP-Bold.otf')), ['ページが存在しません']],
] as const;

(async () => {
  for (const [name, font, chars] of fonts) {
    const buf = await subsetFont(font, chars.join(''), { targetFormat: 'woff2' });
    fs.createWriteStream(path.resolve(__dirname, `../public/fonts/${name}.woff2`)).write(buf);
  }
})();
