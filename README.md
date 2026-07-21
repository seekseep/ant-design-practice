# ant-design-practice

Ant Design（antd v6）のコンポーネントの挙動を検証するための練習用リポジトリ。

React 19 + TypeScript + Vite + react-router で構成し、検証ごとに1ページを追加していく。

- 公開先: https://seekseep.github.io/ant-design-practice/

## セットアップ

```sh
npm install
npm run dev
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 型チェック（`tsc -b`）＋ 本番ビルド |
| `npm run preview` | ビルド結果をプレビュー |
| `npm run lint` | oxlint を実行 |

## 構成

```
src/
  App.tsx                 ルーター定義（検証ページをここに登録する）
  routes/
    RootLayout.tsx        共通レイアウト
    Menu.tsx              検証ページの一覧
    practices/            検証ページ本体
docs/                     検証結果のメモ
```

ルーティングは自動生成せず、`src/App.tsx` の配列に手動で登録する方針。

## 検証ページの追加手順

1. `src/routes/practices/` にコンポーネントを追加する
2. `src/App.tsx` に import と `children` のルートを1行ずつ足す
3. `src/routes/Menu.tsx` の `items` に1件足す
4. 必要なら `docs/` に検証メモを書く

## デプロイ

`main` への push で GitHub Actions（`.github/workflows/deploy.yml`）が GitHub Pages にデプロイする。
Pages 配下で配信するため、`vite.config.ts` の `base` と `createBrowserRouter` の `basename` に `/ant-design-practice/` を設定している。
