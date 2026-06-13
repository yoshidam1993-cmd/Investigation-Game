# 漏水探偵 漏水事件簿 - 開発用プロジェクト

React + Vite + TypeScript + Tailwind CSS 構成。

## セットアップ
```bash
npm install
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド（dist/に出力）
```

## 構成
- `src/pages/Game.tsx` - ゲーム本体（画面遷移・状態管理の統合）
- `src/components/GameScreen.tsx` - オープニング/進行/エンディング画面UI
- `src/components/ChoiceResult.tsx` - 選択肢の結果モーダル
- `src/hooks/useGameLogic.ts` - スコア・進行状態などのゲームロジック
- `src/types/game.ts` - 型定義・ランク判定
- `src/data/scenarios.json` - シナリオ・選択肢・台詞データ
- `src/lib/imageAssets.ts` - 画像URL管理（CloudFront上の既存画像を参照）
- `src/components/ui/button.tsx`, `card.tsx` - 簡易UIコンポーネント
  （元プロジェクトはshadcn/uiを使用していたため、必要なら `npx shadcn-ui@latest add button card` 等で
  本来のshadcnコンポーネントに置き換えてください）

## 注意
- 画像は外部CloudFront URL（imageAssets.ts内）を参照しているため、自前のアセットに
  置き換える場合は `public/` フォルダ等に配置しURLを更新してください。
- 求人LPのURLは `src/components/GameScreen.tsx` 内の `JOB_LP_URL` を編集してください。
- 元プロジェクト（Manus生成）にはルーティング(wouter)・テーマ切替・Toast等の追加機能が
  ありましたが、本スカフォールドはゲーム単体で動作する最小構成にしています。
