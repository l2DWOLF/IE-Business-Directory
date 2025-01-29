import { useEffect } from "react";
import { warningMsg } from "../../services/feedbackService";
import { useNavigate } from "react-router-dom";


export function isCardOwnedByUser(cardId, myCardIds) {
    // Check if the given card ID is in the user's card IDs
    return myCardIds.includes(cardId);
};


