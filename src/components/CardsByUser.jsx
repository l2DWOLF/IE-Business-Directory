import './css/cards.css';
import { useState, useEffect, useTransition, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCards } from "../services/cardServices";
import { infoMsg, warningMsg } from "../services/feedbackService";
import { useSelector } from 'react-redux';
import CardEditModal from "./CardEditModal";
import BusinessCard from './BusinessCard';
import { siteTheme } from '../App';
import useFilteredCards from './hooks/useFilteredCards';

function CardsByUser() {
    const navigate = useNavigate();
    const theme = useContext(siteTheme); 
    const user = useSelector((state) => state.user);
    const [pending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);
    const [serverCards, setServerCards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
            if (!user.user._id) {
                infoMsg("Please login or create an account to view My Cards Page :)");
                navigate("/");
            }
        }, []);

    const fetchUserCards = useCallback(async () => {
        try {
            const cards = await getUserCards(user.token);
            startTransition(() => {
                setServerCards(cards);
                setLoading(false);
            });
        } catch (err) {
            console.error(err);
            warningMsg(`Error Occurred: ${err.response?.data || err.message}`);
        }
    }, [user.token, isEditing]);

    useEffect(() => {
        if (user.token) {
            fetchUserCards();
        }
    }, [user.token, fetchUserCards]);

    const openEditModal = (card) => {
        setSelectedCard(card);
        setIsEditing(true);
    };

    const closeEditModal = () => {
        setIsEditing(false);
    };
    
    const filteredCards = useFilteredCards(serverCards);

    return ( <>
            <header className="header-container" >
                <h1>My Business Cards</h1>
            </header>

            <div className="my-cards" style={{width: "100%", gap: "2em", display:"flex", flexDirection:"column", background: theme.background, color: theme.color}}>
                <button title="Create Business Card" onClick={() => navigate("/Business/Add-Business")} style={{width: "200px", alignSelf:"center"}}>Add New Business</button>

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
                            />
                        ))}
                    </div>
                ) : (
                    <p>No Data Retrieved..</p>
                )}
            </div>
            <CardEditModal isOpen={isEditing} onClose={closeEditModal} cardData={selectedCard} token={user.token} />
        </> );
}
export default CardsByUser;