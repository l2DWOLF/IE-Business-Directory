import { useContext, useMemo } from "react";
import { searchContext } from "../../App";

const useFilteredCards = (cards = []) => {
    const { searchQuery } = useContext(searchContext);

    const filteredCards = useMemo(() => {
        if (!searchQuery) {
            return cards;
        }

        return cards.filter((card) => {
            return (
                card?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.web?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.address?.state?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.address?.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.address?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.address?.street?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card?.image?.alt?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
    }, [cards, searchQuery]);

    return filteredCards;
};

export default useFilteredCards;
