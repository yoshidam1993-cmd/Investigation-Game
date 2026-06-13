import { useState, useCallback } from "react";
import { GameState, GameCase, Choice } from "@/types/game";

export function useGameLogic(gameCase: GameCase) {
  const [gameState, setGameState] = useState<GameState>({
    caseId: gameCase.id,
    currentStep: -1, // -1 = opening, 0+ = steps, steps.length = ending
    totalScore: 0,
    memo: [],
    isGameComplete: false,
    selectedChoices: [],
  });

  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentStep: 0,
    }));
  }, []);

  const selectChoice = useCallback(
    (choice: Choice) => {
      setGameState((prev) => {
        const newScore = prev.totalScore + choice.scoreChange;
        const newMemo = [...prev.memo, ...(choice.memoItems || [])];
        const newSelectedChoices = [...prev.selectedChoices, choice.id];
        const isLastStep = prev.currentStep === gameCase.steps.length - 1;

        return {
          ...prev,
          totalScore: newScore,
          memo: newMemo,
          selectedChoices: newSelectedChoices,
          currentStep: isLastStep ? gameCase.steps.length : prev.currentStep + 1,
          isGameComplete: isLastStep,
        };
      });
    },
    [gameCase.steps.length]
  );

  const resetGame = useCallback(() => {
    setGameState({
      caseId: gameCase.id,
      currentStep: -1,
      totalScore: 0,
      memo: [],
      isGameComplete: false,
      selectedChoices: [],
    });
  }, [gameCase.id]);

  return {
    gameState,
    startGame,
    selectChoice,
    resetGame,
  };
}
