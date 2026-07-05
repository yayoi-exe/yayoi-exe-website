# yayoi-exe-website

React (Create React App) で構築した個人ポートフォリオサイトです。

## 動作環境

- Node.js: `18` 〜 `22`（`.nvmrc` に記載の `20` を推奨）
- npm: `9` 以上

`nvm` を利用している場合は、推奨バージョンに揃えられます。

``` bash
nvm use    # .nvmrc のバージョンを使用
```

## 事前準備

1. Homebrew のインストールおよび確認

    ``` bash
    brew -v      # Homebrew のバージョン確認
    brew update  # Homebrew の更新
    ```

2. Node.js のインストール（推奨バージョンに合わせる）

    ``` bash
    brew install node@20
    node -v      # Node.js のバージョン確認
    ```

3. npm の確認

    ``` bash
    npm -v       # npm のバージョン確認
    ```

## プロジェクトのセットアップ

1. リポジトリのクローン

    ``` bash
    git clone https://github.com/yayoi-exe/yayoi-exe-website.git
    ```

2. ディレクトリの移動

    ``` bash
    cd yayoi-exe-website/yayoi_exe
    ```

3. 依存パッケージのインストール

    ``` bash
    npm ci       # package-lock.json に厳密に従う（推奨・再現性が高い）
    # 依存を更新したい場合のみ npm install を使用する
    ```

## プロジェクトの起動

- 開発サーバーの起動

    ``` bash
    npm start
    ```

- 本番用ビルド

    ``` bash
    npm run build
    ```

- テストの実行

    ``` bash
    npm test
    ```

## ディレクトリ構成

``` text
yayoi_exe/
├── public/            # 静的アセット（index.html, fonts, images）
│   ├── fonts/
│   └── images/        # サイトで表示する画像
├── src/
│   ├── assets/styles/ # 機能ごとの CSS
│   ├── components/    # 再利用コンポーネント（career/ 配下に経歴系）
│   ├── data/          # 表示データ（projects / education）
│   ├── pages/         # 各ページ（Main, About, Career, Contact, Projects）
│   ├── App.js         # ルーティング定義
│   └── index.js       # エントリポイント
└── package.json
```

## npm スクリプト

| コマンド | 説明 |
| --- | --- |
| `npm start` | 開発サーバーを起動 |
| `npm run build` | 本番用の最適化ビルドを生成 |
| `npm test` | テストを実行 |
| `npm run lint` | ESLint によるコードチェック |
| `npm run format` | Prettier による自動整形 |
| `npm run format:check` | 整形済みかを確認（変更なし） |

## コードスタイルと Git フック

- 整形設定は `.prettierrc` / `.editorconfig`、ESLint は `package.json` の `eslintConfig` で管理しています。
- `npm install` 時に `prepare` スクリプトが実行され、husky による pre-commit フックが有効化されます。
  コミット時に `lint-staged` がステージ済みの変更に対して ESLint 修正と Prettier 整形を自動適用します。
- 手元でフックを有効化できない場合は、コミット前に `npm run lint` と `npm run format` を実行してください。

## 環境変数

- `.env.example` をコピーして `.env.local` を作成し、必要な値を設定します（`.env.local` は Git 管理外）。
- Create React App の仕様上、ブラウザに公開される変数は `REACT_APP_` 接頭辞が必要です。

## データ管理と CMS 化（将来の拡張）

Projects / Career のコンテンツは `src/data/projects.json` と `src/data/education.json` に分離済みです。
更新頻度が上がり、再デプロイなしで編集したくなった場合は、ヘッドレス CMS（microCMS など）への移行を検討できます。

移行手順の概要:

1. CMS 側でスキーマを作成（`projects.json` / `education.json` のフィールドに合わせる）。
2. `.env.local` に接続情報を設定（`.env.example` の `REACT_APP_CMS_API_BASE` / `REACT_APP_CMS_API_KEY`）。
3. ページ側で JSON import を `fetch` に置き換える。例（`Projects.js`）:

``` jsx
import { useEffect, useState } from 'react';

const [projects, setProjects] = useState([]);

useEffect(() => {
    fetch(`${process.env.REACT_APP_CMS_API_BASE}/projects`, {
        headers: { 'X-API-KEY': process.env.REACT_APP_CMS_API_KEY },
    })
        .then((res) => res.json())
        .then((data) => setProjects(data.contents))
        .catch(() => setProjects([])); // 失敗時は空配列でフォールバック
}, []);
```

JSON とスキーマ（`id` / 任意項目は空配列で統一）を揃えてあるため、表示コンポーネントの変更を最小限に移行できます。

## Docker での本番配信（任意）

ローカル開発だけであれば不要ですが、本番デプロイ向けにマルチステージビルド（build → Nginx 配信）を用意しています。

``` bash
# イメージのビルドと起動
docker compose up --build

# ブラウザで http://localhost:8080 を開く
```

- `Dockerfile`: `node:20-alpine` でビルドし、`nginx:alpine` で静的配信する2ステージ構成。
- `nginx.conf`: react-router 対応のため未知パスを `index.html` にフォールバック。
- `docker-compose.yml`: ホストの `8080` をコンテナの `80` に割り当て。
