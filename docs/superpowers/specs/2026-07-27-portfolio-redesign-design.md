# ポートフォリオサイト リニューアル設計

- 日付: 2026-07-27
- 対象: `yayoi_exe`(React / CRA)
- 参照: ユーザー共有のモックアップ画像2枚(Home / Career)

## 背景

現行サイトはダーク基調の「VSCodeウィンドウ」風UIで、5ページ(Home/About/Career/Projects/Contact)構成。
今回、明るい配色・幾何学的なフォントを使った新デザインへ全面的に作り直す。あわせて、レスポンシブ対応・不要なページ/コンポーネント/CSSを削ぎ落とし、PC専用のミニマムな構成にする。

`Contact.js` は現在未解決のGitマージコンフリクトが残っており(このプロジェクトと無関係なNext.js/Tailwindコードが混在)、構文として壊れている状態。本設計でページごと削除するため、コンフリクト解消は不要。

## スコープ

### ページ構成

- 維持: `/`(Home), `/career`(Career), `/projects`(Projects)
- 削除: `/about`, `/contact`(ルート・ページファイルごと削除)
- フッターは削除(条件文に「必要なのはheaderと各ページのボディ」とあり、フッターへの言及がないため)

### 削除ファイル一覧

- `src/pages/About.js`
- `src/pages/Contact.js`
- `src/components/IntroCodeFrame.js`
- `src/components/IntroCodeContent.js`
- `src/components/ContactForm.js`
- `src/components/CodeFrameWindow.js`
- `src/components/Footer.js`
- `src/components/career/EducationCard.js`
- `src/components/career/EducationCard.css`
- `src/assets/styles/contact.css`
- `src/assets/styles/contactForm.css`
- `src/assets/styles/codeContent.css`
- `src/assets/styles/codeFrameWindow.css`
- `src/assets/styles/footer.css`
- `public/fonts/KronaOne-Regular.ttf`(未参照)
- `public/fonts/helvetiker_regular.typeface.json`(未参照, three.js用の残骸)

### 維持・改修ファイル

- `src/App.js` — ルートを3つに整理、Footer参照を削除
- `src/components/Header.js` — タブを3つに整理
- `src/pages/Main.js`, `src/pages/Career.js`, `src/pages/Projects.js` — 本文を新デザインで再構築
- `src/components/PhotoFrame.js` — CodeFrameWindowのラップを外し、円形プレースホルダーに簡略化
- `src/components/AnimatedTitle.js` + `src/hooks/useTypewriterEffect.js` — 名前の切り替え用途からタグラインのデコード演出用途へ転用(gsap依存はそのまま維持。実際に使用されているため削除しない)
- `src/components/ProjectCard.js`, `src/components/career/Timeline.js` — 新配色・新フォントで再構築
- `src/data/education.json`, `src/data/projects.json` — そのまま利用
- `src/global.css` — トークンを全面置換
- `src/app.css` — レスポンシブ除去、背景を単色に簡略化

## グローバルトークン(`global.css`)

```css
:root {
  /* Colors */
  --color-accent: #F5B700;
  --color-accent-soft: rgba(245, 183, 0, 0.5); /* サブアクセント: accentの透過50% */
  --color-sub1: #1A1A1A;
  --color-sub2: #71717A;
  --color-main: #FAFAF7;

  /* Fonts */
  --font-en: 'Space Grotesk', sans-serif;
  --font-jp: 'M PLUS 1', sans-serif;
  --font-base: 'Space Grotesk', 'M PLUS 1', sans-serif;
  --font-weight-regular: 400;
  --font-weight-bold: 700;
}
```

- 既存の`--palette-*`, `--color-surface-*` など30以上のダーク系トークンは全て削除する。
- Space Grotesk・M PLUS 1 ともRegular(400)・Bold(700)の2ウェイトのみ読み込む(Google Fonts経由)。
- `--font-base`はラテン文字をSpace Grotesk、日本語をM PLUS 1にフォールバックさせるための組み合わせ指定。

## アイコン方針

- Google Fonts経由で **Material Symbols Outlined** を`public/index.html`に`<link>`追加。
- 共通CSSクラス`.material-symbols-outlined`(Google推奨のfont-feature-settings含む)を`global.css`に追加。
- 使用例: `<span className="material-symbols-outlined">open_in_new</span>`
- 例外: GitHub / LinkedIn のみブランドロゴが必要なため、`currentColor`で着色可能な最小インラインSVGコンポーネントを`src/components/icons/`配下に追加(`GithubIcon.js`, `LinkedinIcon.js`)。それ以外の矢印・外部リンクなどのアイコンは全てMaterial Symbolsで統一する。

## ページ別設計

### Header

- タブラベルを3つに整理: `Home.html` / `Career.js` / `Projects.js`(拡張子演出は維持)
- 現行のスライダー式アクティブインジケーターの実装(`nav-tab-slider`)はロジックごと維持し、配色のみ新トークンに置換
- `header.css`からメディアクエリを削除し、現行の`min-width: 767px`側のスタイルを唯一のベーススタイルとして残す

### Home(`Main.js`)

- 見出し「Taichi Shirakawa」は静的表示(切り替えなし)
- 見出し下に`useTypewriterEffect`を転用したデコード演出テキストを配置。サイクルする文言は既存コピーを2フレーズに分割:
  1. `Software Engineer & Master's Student`
  2. `Let's build something amazing together!`
- 右上に静的テキスト「Engineering What's Next.」を配置(画像通り)
- CTAボタン「View Projects →」。Aboutページ削除に伴い遷移先は`/about`から`/projects`に変更
- 写真は円形プレースホルダー(accent背景、`<img>`なし)。周囲に装飾用のドット&ラインSVG(accentカラー)を簡易的に再現し、実写真が用意され次第差し替え可能な構造にする
- 下部にGitHub/LinkedInアイコン + メールリンクを配置。値はダミーのプレースホルダーとして定数化し、後で実データに差し替えやすくする

### Career(`Career.js`)

- `education.json`の実データを使用し、**新しい順(直近が上)** に並べ替えて縦タイムライン表示
- 進行中の項目(`end: null`)のみaccentドット、それ以外はsub2ドットで表示
- 各行は「学校/会社名」「学位/役職」「年度」のみを表示するコンパクト仕様(research/skills/achievementsなどの詳細フィールドは今回表示しない)
- 現行の「学歴」カード一覧(`EducationCard`)セクションは削除し、タイムライン1本に統合(重複コンポーネントの排除)
- 右側に円形プレースホルダー写真を維持するが、画像モックアップにあった重複した「View Projects」ボタン2つはCareerページの内容(経歴)と論理的に無関係なワイヤーフレームの取り違えと判断し削除する
- `career.css`, `Timeline.css`からメディアクエリを削除

### Projects(`Projects.js`)

- 既存の`ProjectCard`グリッド構成は維持し、新配色・新フォントで再構築
- 「View Link」テキストリンクをMaterial Symbolsの`open_in_new`アイコン+ラベルに置換
- `projects.css`, `projectCard.css`からメディアクエリを削除

## レスポンシブ方針

- 全CSSファイル(`app.css`, `header.css`, `animatedTitle.css`, `main.css`, `career.css`, `Timeline.css`, `projects.css`, `projectCard.css`)から`@media`ブロックを削除する
- 現行の`min-width: 767px`(PC向け)スタイルを唯一のベーススタイルとして残す
- `vw`単位で指定されていたフォントサイズ(モバイル対応目的)は固定`rem`値に置き換える
- `app.css`の背景ドットグリッド(ダーク基調用)は削除し、`--color-main`の単色背景にする

## 非対象・据え置き

- ページ遷移アニメーション(`App.js`のframer-motionによるスライド演出)は既存ロジックをそのまま維持する(タブ切り替えの一貫性があり、削除要件に含まれていないため)
- `gsap`依存は`useTypewriterEffect`で実際に使用されているため削除しない
- 実際の写真ファイル(`public/images/`配下)はコードから参照を外すのみで、ファイル自体は削除しない
