import './css/cards.css';
import { useState, useEffect, useTransition, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCards } from "../services/cardServices";
import { warningMsg } from "../services/feedbackService";
import { useSelector } from 'react-redux';
import CardEditModal from "./CardEditModal";
import BusinessCard from './BusinessCard';
import { siteTheme } from '../App';
import useFilteredCards from './hooks/useFilteredCards';

function CardsByLiked() {
    const theme = useContext(siteTheme);
    const user = useSelector((state) => state.user);
    const [pending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);
    const [serverCards, setServerCards] = useState([]);
    const [likedCards, setLikedCards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cards = await getAllCards();
                startTransition(() => {
                    const likedCardsfil = cards.filter((card) => {
                        return card.likes.includes(user.user._id);  
                    });
                    setLikedCards(likedCardsfil);
                    setLoading(false);
                });
            } catch (err) {
                console.log(err);
                warningMsg(`Error Occurred: ${err.response?.data || err.message}`);
            }
        };
        fetchCards();
    }, [user.user._id, isEditing]);

    const handleUnlikeCard = (cardId) => {
        setLikedCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
    };

    const openEditModal = (card) => {
        setSelectedCard(card);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
    };
    
    const filteredCards = useFilteredCards(likedCards);

    return (
        <>
            <header className="header-container">
                <h2>My Liked Business Cards</h2>
            </header>

            <div className="my-cards" style={{ width: "100%", gap: "2em", display: "flex", flexDirection: "column", background: theme.background, color: theme.color }}>
                {loading ? (
                    <h2 className="loading-text">Loading...</h2>
                ) : filteredCards.length ? (
                    <div className="cards-container">
                        {filteredCards.slice(0, 25).map((card) => (
                            <BusinessCard
                                key={card._id}
                                card={card}
                                user={user}
                                onEdit={openEditModal}
                                onUnlike={handleUnlikeCard}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No Liked Cards Found...</p>
                )}
            </div>
            <CardEditModal isOpen={isEditing} onClose={closeEditModal} cardData={selectedCard} token={user.token} />
        </>
    );
}

export default CardsByLiked;
