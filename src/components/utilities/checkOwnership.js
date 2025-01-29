export function isCardOwnedByUser(cardId, myCardIds) {
    // Check if the given card ID is in the user's card IDs
    return myCardIds.includes(cardId);
}