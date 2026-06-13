import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Choice } from "@/types/game";
import { getImageUrl } from "@/lib/imageAssets";

interface ChoiceResultProps {
  choice: Choice;
  onContinue: () => void;
}

export function ChoiceResult({ choice, onContinue }: ChoiceResultProps) {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // 画像表示後に結果を表示
    const timer = setTimeout(() => setShowResult(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* 正解/不正解バナー（最優先で表示） */}
        <div
          className={`text-center py-3 font-bold text-xl ${
            choice.isCorrect
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {choice.isCorrect ? "✓ 正解！" : "✗ 不正解"}
          <span className="ml-3 text-base font-normal">
            スコア {choice.scoreChange > 0 ? "+" : ""}
            {choice.scoreChange}
          </span>
        </div>

        {/* 結果画像 */}
        <div className="relative w-full aspect-video">
          <img
            src={getImageUrl(choice.resultImage as any)}
            alt="Result"
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              choice.isCorrect ? "ring-4 ring-green-500" : "ring-4 ring-red-500"
            } ring-inset pointer-events-none`}
          ></div>
        </div>

        {/* 結果テキスト */}
        {showResult && (
          <div className="p-6 md:p-8 animate-in fade-in duration-500">
            {/* 結果ナレーション */}
            <Card className="bg-slate-800 border-blue-500 border-2 p-4 md:p-6 mb-4">
              <p className="text-lg leading-relaxed text-gray-100 whitespace-pre-wrap">
                {choice.resultNarrative}
              </p>
            </Card>

            {/* 解説 */}
            <Card className="bg-slate-800 border-amber-500 border-2 p-4 md:p-6 mb-6">
              <h4 className="text-lg font-bold text-amber-300 mb-2">解説</h4>
              <p className="text-gray-100">{choice.explanation}</p>
            </Card>

            {/* 続行ボタン */}
            <Button
              onClick={onContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-4 rounded-lg font-bold"
            >
              次へ進む
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
