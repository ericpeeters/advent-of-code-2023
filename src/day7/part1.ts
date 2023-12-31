import { benchmark } from "../utilities/benchmark";
import rawInput from "./input";

/* ========================================================================== */

function sortCards(handsWithBids: string): string {
  const [cardsInHand] = handsWithBids.split(" ");

  return cardsInHand
    .split("")
    .sort((a, b) => cardOptions[a] - cardOptions[b])
    .join("");
}

/* ========================================================================== */

type HandInfo = {
  sortedCards: string;
  handScore?: number;
  cardsIndex?: CardsIndex;
  cards: string;
  bid: number;
  baseScore?: number;
};

type CardsIndex = Record<string, number>;
type Combinations =
  | "fiveOfAKind"
  | "fourOfAKind"
  | "fullHouse"
  | "threeOfAKind"
  | "twoPair"
  | "onePair"
  | "highCard";

/* ========================================================================== */

const cardCombinationPoints: Record<Combinations, number> = {
  fiveOfAKind: 7,
  fourOfAKind: 6,
  fullHouse: 5,
  threeOfAKind: 4,
  twoPair: 3,
  onePair: 2,
  highCard: 1,
} as const;

/* ========================================================================== */

function hasThreeOfAKind(cardsIndex: CardsIndex): boolean {
  return Object.values(cardsIndex).some((c) => c === 3);
}

function hasPair(cardsIndex: CardsIndex): boolean {
  return Object.values(cardsIndex).some((c) => c === 2);
}

const cardCombinationPredicates: Record<
  Combinations,
  (cardsIndex: CardsIndex) => boolean
> = {
  fiveOfAKind: (cardsIndex: CardsIndex) =>
    Object.values(cardsIndex).some((c) => c === 5),
  fourOfAKind: (cardsIndex: CardsIndex) =>
    Object.values(cardsIndex).some((c) => c === 4),
  fullHouse: (cardsIndex: CardsIndex) =>
    hasThreeOfAKind(cardsIndex) && hasPair(cardsIndex),
  threeOfAKind: hasThreeOfAKind,
  twoPair: (cardsIndex: CardsIndex) =>
    Object.values(cardsIndex).filter((c) => c === 2).length === 2,
  onePair: hasPair,
  highCard: (cardsIndex: CardsIndex) =>
    Object.values(cardsIndex).every((c) => c === 0 || c === 1),
};

/* ========================================================================== */

const cardOptions = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
} as const;

/* ========================================================================== */

const baseIndex = Object.keys(cardOptions).reduce(
  (baseIndex, card) => ({ ...baseIndex, [card]: 0 }),
  {}
);

function getCardsIndex(cards: string): Record<string, number> {
  return cards
    .split("")
    .reduce(
      (cardsIndex, card) => ({ ...cardsIndex, [card]: cardsIndex[card] + 1 }),
      baseIndex
    );
}

/* ========================================================================== */

function getBid(cardsWithBids: string): number {
  const [_, bid] = cardsWithBids.split(" ");

  return parseInt(bid, 10);
}

function getCards(cardsWithBids: string): string {
  const [cards] = cardsWithBids.split(" ");

  return cards;
}

/* ========================================================================== */

/**
 * It calculates the base score by converting all characters in the string to
 * their respective numbers and parsing the entire string is a number
 */
function getCardsScores(cards: string): number[] {
  return cards.split("").map((card) => cardOptions[card]);
}

function getHandScore(cardsIndex: CardsIndex): number {
  const foundCombination = Object.keys(cardCombinationPredicates).find(
    (combo) => cardCombinationPredicates[combo](cardsIndex)
  );

  return foundCombination ? cardCombinationPoints[foundCombination] : 0;
}

/* ========================================================================== */

export function rankAndSumHands(input: string = rawInput): number {
  return (
    input
      .split("\n")
      .reduce(
        (allHands, cardsAndBids) => [
          ...allHands,
          {
            cards: getCards(cardsAndBids),
            sortedCards: sortCards(cardsAndBids),
            bid: getBid(cardsAndBids),
          },
        ],
        []
      )
      // Create a simple index with all the cards and how they're represented
      .map((handInfo: HandInfo) => ({
        ...handInfo,
        cardsIndex: getCardsIndex(handInfo.cards),
      }))
      // Calculate the score by adding combinations and base score
      .map((handInfo: HandInfo) => ({
        ...handInfo,
        cardScores: getCardsScores(handInfo.cards),
        combinationScore: getHandScore(handInfo.cardsIndex),
      }))
      // Now that we know the score, we sort the items by their score DESC
      .sort((a, b) => {
        // When the combinations are not the same, we can just sort by the
        // winning combination.
        // But when the combinations score are equal, we check the base score.
        if (a.combinationScore !== b.combinationScore)
          return a.combinationScore - b.combinationScore;

        const diffIndex = a.cardScores.findIndex((card, index) => {
          return card !== b.cardScores[index];
        });

        return a.cardScores[diffIndex] - b.cardScores[diffIndex];
      })
      // Now we update the scores to also incorporate the rank
      .map((handInfo: HandInfo, index) => ({
        ...handInfo,
        bid: handInfo.bid * (index + 1),
      }))
      .reduce((sum, handInfo: HandInfo) => sum + handInfo.bid, 0)
  );
}

/* ========================================================================== */

benchmark(rankAndSumHands);
