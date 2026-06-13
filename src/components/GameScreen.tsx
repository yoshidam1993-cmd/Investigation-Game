import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GameState, GameCase, Step, Choice, getRankingByScore } from "@/types/game";
import { getImageUrl } from "@/lib/imageAssets";

// 求人LPのURL（採用サイトのページURLに置き換えてください）
const JOB_LP_URL = "https://example.com/recruit/leak-investigation";

interface GameScreenProps {
  gameCase: GameCase;
  gameState: GameState;
  onSelectChoice: (choice: Choice) => void;
  onReset: () => void;
  onStart: () => void;
}

export function GameScreen({
  gameCase,
  gameState,
  onSelectChoice,
  onReset,
  onStart,
}: GameScreenProps) {
  // オープニング画面
  if (gameState.currentStep === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* タイトル */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">漏水探偵</h1>
            <p className="text-xl md:text-2xl text-blue-300">漏水事件簿</p>
          </div>

          {/* ケースタイトル */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-300 mb-4">
              {gameCase.opening.title}
            </h2>
            <p className="text-lg text-gray-300">{gameCase.description}</p>
          </div>

          {/* オープニング画像スライドショー */}
          <div className="mb-12">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
                src={getImageUrl(gameCase.opening.images[0] as any)}
                alt="Opening scene"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>

          {/* ナレーション */}
          <Card className="bg-slate-700 border-blue-500 border-2 p-6 md:p-8 mb-8">
            <p className="text-lg leading-relaxed whitespace-pre-line text-gray-100">
              {gameCase.opening.narrative}
            </p>
          </Card>

          {/* スタートボタン */}
          <div className="flex justify-center">
            <Button
              onClick={onStart}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-6 rounded-lg font-bold"
            >
              調査を開始する
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ゲーム完了画面
  if (gameState.isGameComplete) {
    const ranking = getRankingByScore(gameState.totalScore);
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* ランク演出（最初に達成感を伝える） */}
          <div className="text-center mb-6">
            <p className="text-amber-300 text-lg font-bold mb-2 animate-in fade-in duration-700">
              事件解決！
            </p>
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl mb-3 animate-in zoom-in duration-500">
              <span className="text-6xl font-extrabold text-slate-900">{ranking.rank}</span>
            </div>
            <p className="text-2xl font-bold text-amber-300">{ranking.message}</p>
            <p className="text-gray-400 mt-1">総合スコア {gameState.totalScore}点</p>
          </div>

          {/* エンディング画像 */}
          <div className="mb-6">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
              <img
              src={getImageUrl((["S","A","B","C"].includes(ranking.rank) ? gameCase.ending.successImage : gameCase.ending.image) as any)}
                alt="Success"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 結果ナレーション（Dランク以下は簡潔に、Cランク以上は会話を表示） */}
          <Card className="bg-slate-700 border-green-500 border-2 p-5 md:p-6 mb-6">
            <h2 className="text-xl font-bold text-green-400 mb-2">
              {gameCase.ending.title}
            </h2>
            <p className="text-base leading-relaxed text-gray-100 whitespace-pre-wrap mb-3">
              {gameCase.ending.narrative}
            </p>
            {["S", "A", "B", "C"].includes(ranking.rank) && (
              <p className="text-base leading-relaxed text-gray-100 whitespace-pre-wrap">
                {gameCase.ending.successNarrative}
              </p>
            )}
          </Card>

          {/* 適性メッセージ & 求人LPへの導線 & この仕事の魅力 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-amber-900 to-slate-700 border-amber-400 border-2 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-amber-300 mb-3">🎯 あなたの適性</h3>
                
                  <p className="text-sm text-gray-100 mb-4">
                {["S","A","B","C"].includes(ranking.rank)
                  ? "原因特定できたあなたは専門調査の適性があります。"
                  : "今回は正解にたどり着けませんでしたが、漏水調査は経験を積むことで身につく仕事です。先輩と一緒に学べる環境があります。"}
              </p>
             
              </div>
              <a
                href={JOB_LP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
                  仕事内容を詳しく見てみる
                </Button>
              </a>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900 to-purple-900 border-purple-500 border-2 p-5">
              <h3 className="text-lg font-bold text-purple-300 mb-3">✨ この仕事の魅力</h3>
              <ul className="space-y-2">
                {gameCase.ending.jobAttraction.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-100 flex items-start whitespace-pre-line">
                    <span className="text-purple-400 mr-2">✨</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* リセットボタン */}
          <div className="flex justify-center">
            <Button
              onClick={onReset}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-12 py-6 rounded-lg font-bold"
            >
              もう一度プレイ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ゲーム進行中
  const currentStep: Step = gameCase.steps[gameState.currentStep];
  if (!currentStep) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 調査メモ */}
        <div className="mb-6 bg-slate-700 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="text-sm font-bold text-yellow-400 mb-2">【調査メモ】</h3>
          {gameState.memo.length === 0 ? (
            <p className="text-gray-400">情報を集めましょう</p>
          ) : (
            <ul className="space-y-1">
              {gameState.memo.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-200 flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* スコア表示 */}
        <div className="mb-2 flex justify-between items-center bg-slate-700 p-4 rounded">
          <div>
            <p className="text-sm text-gray-400">STEP {gameState.currentStep + 1}/{gameCase.steps.length}</p>
            <p className="text-2xl font-bold text-blue-300">スコア: {gameState.totalScore}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">進捗</p>
            <p className="text-xl font-bold text-amber-300">
              {Math.round(((gameState.currentStep + 1) / gameCase.steps.length) * 100)}%
            </p>
          </div>
        </div>

        {/* 進捗バー */}
        <div className="mb-6 w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-amber-400 transition-all duration-500"
            style={{
              width: `${Math.round(((gameState.currentStep + 1) / gameCase.steps.length) * 100)}%`,
            }}
          ></div>
        </div>

        {/* ステップ画像 */}
        <div className="mb-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
            <img
              src={getImageUrl(currentStep.image as any)}
              alt={`Step ${gameState.currentStep + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ステップタイトル */}
        <h2 className="text-3xl font-bold text-amber-300 mb-4">{currentStep.title}</h2>

        {/* ナレーション */}
        <Card className="bg-slate-700 border-blue-500 border-2 p-6 md:p-8 mb-8">
          <p className="text-lg leading-relaxed text-gray-100">{currentStep.narrative}</p>
        </Card>

        {/* 選択肢 */}
        <div className="space-y-4">
          {currentStep.choices.map((choice) => (
            <Button
              key={choice.id}
              onClick={() => onSelectChoice(choice)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg p-6 rounded-lg font-bold text-left justify-start h-auto whitespace-normal"
            >
              <span className="text-2xl mr-4">→</span>
              <span>{choice.text}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
