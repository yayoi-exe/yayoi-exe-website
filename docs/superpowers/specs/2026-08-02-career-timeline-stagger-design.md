# Career Timeline Stagger Entrance — Design

## Goal

Career ページで、ページ縦スライド遷移が完了したあと、タイムライン項目を上から順に「少し下から浮かび上がる」（translateY + fade）で表示する。

## Decisions (locked)

| Topic | Choice |
| --- | --- |
| Motion | 各 item: `opacity` 0→1 + `y` ~24px→0 |
| Start trigger | ページスライド完了後（イベント駆動。固定 `setTimeout` は使わない） |
| Re-entry | Career に入るたびに毎回再生 |
| PhotoFrame | 個別スタッガーしない（ページスライドに乗るだけ） |
| Wiring | React Context で `isPageReady` を配信 |

## Architecture

```
AnimatedRoutes (App.js)
  ├─ commitRoute → isPageReady = false
  ├─ onAnimationComplete('center') → isPageReady = true
  └─ PageTransitionProvider({ isPageReady })
       └─ Routes → Career → Timeline
            └─ usePageTransition() → stagger when ready
```

### PageTransitionContext

- 新規ファイル例: `src/context/PageTransitionContext.js`
- 値: `{ isPageReady: boolean }`
- Provider は `AnimatedRoutes` 内で `Routes` を包む
- `commitRoute` 開始時に `false`、入場アニメ完了時に `true`
- 初回マウント（`AnimatePresence initial={false}` で入場なし）では、表示中ページをすぐ使えるよう `isPageReady` の初期値を `true` にする。遷移が始まった時点で `false` に戻す

### Timeline

- `framer-motion` の `motion.ol` / `motion.li`
- `animate={isPageReady ? 'visible' : 'hidden'}`
- 親: `staggerChildren`（目安 80–120ms）
- 子: duration 目安 300–400ms、ease は既存ページ遷移に近いカーブで統一可
- 既存コメント（「遷移中に個別 opacity を動かさない」）は、**ready 前は hidden のまま**にすることで満たす

### PhotoFrame / Career layout

- 変更なし（レイアウト・見た目の個別アニメ追加なし）

## Edge cases

1. **高速ナビ連打** — `commitRoute` のたびに `isPageReady=false`。完了コールバックは既存どおり `transitionId` で現行以外を無視
2. **途中離脱** — Career アンマウントでスタッガー中断。再入場で最初から
3. **直アクセス / 初回** — Provider 初期 `true` なので、リロードで Career にいる場合も項目が見える（必要なら即表示。スタッガーは「遷移してきたとき」が主対象）
4. **`prefers-reduced-motion`** — `useReducedMotion()` が true なら stagger / y 移動なし。`isPageReady` 後に一括表示（または常時 visible）

## Out of scope

- PhotoFrame の連動アニメ
- Projects / Main の同様スタッガー
- タイムラインのスクロール連動（IntersectionObserver）入場

## Verification

- Home → Career: スライド完了後、項目が上から順に浮かぶ
- Career → Home → Career: 毎回再生
- 遷移中に別タブへ連打: チラつき・「描画だけ先」がない
- reduced-motion: 即時表示
- PhotoFrame の見た目・位置が変わっていない
