import React, { useState, useMemo, useEffect } from "react";
import { GameScreen } from "@/components/GameScreen";
import { ChoiceResult } from "@/components/ChoiceResult";
import { useGameLogic } from "@/hooks/useGameLogic";
import { Choice, GameCase } from "@/types/game";
import scenariosData from "@/data/scenarios.json";

export default function Game() {
  const [showResult, setShowResult] = useState(false);
  const [lastChoice, setLastChoice] = useState<Choice | null>(null);

  // シナリオデータを取得
  const gameCase: GameCase = useMemo(() => {
    return scenariosData.cases[0]; // Case001を使用
  }, []);

  const { gameState, startGame, selectChoice, resetGame } = useGameLogic(gameCase);

  // ページ遷移時に必ず最上部へスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [gameState.currentStep, gameState.isGameComplete, showResult]);

  const handleSelectChoice = (choice: Choice) => {
    setLastChoice(choice);
    setShowResult(true);
  };

  const handleContinueFromResult = () => {
    selectChoice(lastChoice!);
    setShowResult(false);
    setLastChoice(null);
  };

  const handleReset = () => {
    resetGame();
    setShowResult(false);
    setLastChoice(null);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <GameScreen
        gameCase={gameCase}
        gameState={gameState}
        onSelectChoice={handleSelectChoice}
        onReset={handleReset}
        onStart={startGame}
      />

      {showResult && lastChoice && (
        <ChoiceResult choice={lastChoice} onContinue={handleContinueFromResult} />
      )}
    </div>
  );
}
