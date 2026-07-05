# public/images

サイトで表示する画像を配置するディレクトリです。ここに置いたファイルは `/images/<ファイル名>` で参照できます。

## 必要な画像（Projects で参照）

`src/data/projects.json` の `thumbnail` から参照されます。以下のファイル名で配置してください。

| ファイル名 | 用途 |
| --- | --- |
| `portfolio_web.png` | Portfolio Website のサムネイル |
| `IVRC.png` | Stealth Shield のサムネイル |
| `SIGGRAPH.png` | The Malleable-Self Experience のサムネイル |

画像が未配置の場合、該当箇所は表示が壊れる（alt テキストのみ）ので注意してください。
教育カードの画像が無い場合は、リポジトリ直下 `public/placeholder.svg` がフォールバックとして使われます。
