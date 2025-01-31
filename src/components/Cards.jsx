import './css/cards.css';
import { useContext, useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { warningMsg } from "../services/feedbackService";
import CardEditModal from "./CardEditModal";
import BusinessCard from "./BusinessCard";
import { getAllCards } from "../services/cardServices";
import useFilteredCards from "./hooks/useFilteredCards";
import { searchContext } from "../App";

function Cards() {
    const user = useSelector((state) => state.user);
    const {searchQuery} = useContext(searchContext);
    const [pending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [serverCards, setServerCards] = useState([]);
    const [displayedCards, setDisplayedCards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cards = await getAllCards();
                const likedCardsfil = cards.slice(0, page * 15); 
                setDisplayedCards(likedCardsfil);
                setServerCards(cards);
                setLoading(false);
            } catch (err) {
                console.log(err);
                warningMsg(`Error Occurred: ${err.response?.data || err.message}`);
            }
        };
        fetchCards();
    }, [page, isEditing]);

    const openEditModal = (card) => {
        setSelectedCard(card);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
    };

    const loadMore = () => {
        setPage(page + 1);
    };

    const searchPage = useFilteredCards(displayedCards);
    const searchAll = useFilteredCards(serverCards);
    const filteredCards = searchQuery ? searchAll : searchPage;

    return (
        <div style={{ width: "95vw", display: "flex", flexDirection: "column", alignItems: "center", padding: "1.5em", boxShadow: "0px 1px 25px 4px #FFF5", borderRadius: "10px" }}>
            <h2>Explore Business Cards</h2>
            <p style={{ width: "65%" }}>
                Discover a wide range of business cards from professionals across different industries.
                <br />
                Browse through unique designs and connect with experts to find inspiration or make valuable business connections.
            </p>

            <div className="cards-container">
                {loading ? (
                    <div style={{ gridColumn: "span 4" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center" }}>Loading...</h2>
                    </div>
                ) : (
                    filteredCards.length ? (
                        filteredCards.map((card) => (
                            <BusinessCard
                                key={card._id}
                                card={card}
                                user={user}
                                onEdit={openEditModal}
                            />
                        ))
                    ) : (
                        !loading && <p>No Data Retrieved..</p>
                    )
                )}
            </div> 

            {filteredCards.length && (
                <button onClick={loadMore} className="load-more-btn">Load More</button>
            )}
            
            <CardEditModal isOpen={isEditing} onClose={closeEditModal} cardData={selectedCard} token={user.token} />
        </div>
    );
}
export default Cards;
