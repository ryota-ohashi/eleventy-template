# プロジェクト名

11tyを用いた制作環境テンプレート

## 必要要件

- Node.js >= 16.0.0
- npm

## インストール

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

以下のURLで開発サーバーが起動します：
- https://localhost:8080

## ビルド

```bash
npm run build
```

## 使用している主な技術

- 11ty (静的サイトジェネレーター)
- Nunjucks (テンプレートエンジン)
- Sass (CSSプリプロセッサー)
- webpack (モジュールバンドラー)
- TailwindCSS (ユーティリティファーストCSSフレームワーク)
- p5.js (クリエイティブコーディングライブラリ)

## プロジェクト構造

```
src/
  ├── scripts/     # JavaScriptファイル
  ├── site/        # 11tyのソースファイル
  │   ├── data/    # グローバルデータ
  │   ├── includes/# 共通パーツ
  │   └── pages/   # 各ページのソース
  └── styles/      # Sassファイル
```

## スクリプト

- `npm run dev`: 開発サーバーの起動
- `npm run build`: 本番用ビルド
- `npm run prod-build`: 本番用ビルド（モジュールファイル削除）
- `npm run html:lint`: HTMLのリント