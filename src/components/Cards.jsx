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
    let [serverCards, setServerCards] = useState([]);
    const [displayedCards, setDisplayedCards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [sortByLikes, setSortByLikes] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                let cards = await getAllCards();
                cards = [...cards].sort(() => Math.random() - 0.5);
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
    let filteredCards = searchQuery ? searchAll : searchPage;
    filteredCards = [...filteredCards].sort(() => Math.random() - 0.5);

    if (sortByLikes) {
        filteredCards = [...filteredCards].sort((a, b) => b.likes.length - a.likes.length);
    }

    return (
        <div className="cards-section">
            <h2>Explore Business Cards</h2>
            <p style={{ width: "65%" }}>
                Discover a wide range of business cards from professionals across different industries.
                <br />
                Browse through unique designs and connect with experts to find inspiration or make valuable business connections.
            </p>

            <button
                onClick={() => setSortByLikes(!sortByLikes)}
                className="sort-btn"
            >
                {sortByLikes ? "Random Sort" : "Sort by Likes"}
            </button>
            <div className="cards-container">
                {loading ? (
                    <div style={{ gridColumn: "span 4" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center" }}>Loading...</h2>
                        <p style={{fontSize: "1rem"}}>If you're using IE Backend, load times may be up to 90 seconds for the first load. <br/>Your patience is appreciated.</p>
                    </div>
                ) : (
                    filteredCards?.length ? (
                        filteredCards.map((card) => (
                            <BusinessCard
                                key={card._id}
                                card={card}
                                user={user}
                                onEdit={openEditModal}
                            />
                        ))
                    ) : (
                    <p>No Data Retrieved..</p>
                    )
                )}
            </div> 
            
            {displayedCards.length < serverCards.length && (
                <button onClick={loadMore} className="load-more-btn">
                    Load More
                </button>
            )}

            {displayedCards.length < serverCards.length && (
                <button
                    onClick={() => {
                        setDisplayedCards(serverCards);
                        setPage(Math.ceil(serverCards.length / 15)); // ensure pagination state is in sync
                    }}
                    className="load-more-btn"
                >
                    Load All
                </button>
            )}

            <CardEditModal isOpen={isEditing} onClose={closeEditModal} cardData={selectedCard} token={user.token} />
        </div>
    );
}
export default Cards;