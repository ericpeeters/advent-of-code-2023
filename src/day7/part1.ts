function sortCards(handsWithBids: string): string {
  const [cardsInHand] = handsWithBids.split(" ");

  return cardsInHand
    .split("")
    .sort((a, b) => cards[a] - cards[b])
    .join("");
}

/* ========================================================================== */

function getBids(handsWithBids: string): number {
  const [_, bid] = handsWithBids.split(" ");

  return parseInt(bid, 10);
}

/* ========================================================================== */

function createCardsIndex(cardsInHand: string): Record<string, number> {
  return cardsInHand.split("").reduce(
    (cardsIndex, card) => {
      cardsIndex[card]++;

      return cardsIndex;
    },
    Object.keys(cards).reduce(
      (baseIndex, card) => ({ ...baseIndex, [card]: 0 }),
      {}
    )
  );
}

/* ========================================================================== */

type CardsIndex = Record<string, number>;
type Combination =
  | "fiveOfAKind"
  | "fourOfAKind"
  | "fullHouse"
  | "threeOfAKind"
  | "twoPair"
  | "onePair"
  | "highCard";

const cardCombinationPoints: Record<Combination, number> = {
  fiveOfAKind: 21,
  fourOfAKind: 20,
  fullHouse: 19,
  threeOfAKind: 18,
  twoPair: 17,
  onePair: 16,
  highCard: 15,
} as const;

/* -------------------------------------------------------------------------- */

function hasThreeOfAKind(cardsIndex: CardsIndex): boolean {
  return Object.values(cardsIndex).some((c) => c === 3);
}

function hasPair(cardsIndex: CardsIndex): boolean {
  return Object.values(cardsIndex).some((c) => c === 2);
}

const cardCombinationPredicates: Record<
  Combination,
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

const cards = {
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

function calculateBaseScore(hand: string): number {
  return hand
    .split("")
    .reduce((score, currentCard) => score + cards[currentCard], 0);
}

function calculateCombinationsScore(hand: string): number {
  const foundCombination = Object.keys(cardCombinationPredicates).find(
    (combo) => cardCombinationPredicates[combo](hand)
  );

  return foundCombination ? cardCombinationPoints[foundCombination] : 0;
}

/* ========================================================================== */

export function rankAndSumHands(input: string): number {
  return (
    input
      .split("\n")
      .reduce(
        (allHands, hand) => [
          ...allHands,
          {
            cards: sortCards(hand),
            bids: getBids(hand),
          },
        ],
        []
      )
      // Create a simple index with all the cards and how they're represented
      .map((hand) => ({ ...hand, cardsIndex: createCardsIndex(hand.cards) }))
      // Calculate the score by adding combinations and base score
      .map((hand) => ({
        ...hand,
        score:
          calculateBaseScore(hand.cards) +
          calculateCombinationsScore(hand.cardsIndex),
      }))
      // Now that we know the score, we sort the items by their score DESC
      .sort((a, b) => a.score - b.score)
      // Now we update the scores to also incorporate the rank
      .map((hand, index) => ({ ...hand, score: hand.score * (index + 1) }))
      .reduce((sum, { score }) => sum + score, 0)
  );
}
