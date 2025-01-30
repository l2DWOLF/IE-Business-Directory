import './css/cards.css';
import { useState, useEffect, useTransition, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserCards } from "../services/cardServices";
import { successMsg, warningMsg } from "../services/feedbackService";
import { Phone, Heart, Edit3, Trash2 } from "lucide-react";
import { useSelector } from 'react-redux';
import { isCardOwnedByUser } from "./utilities/userTilities";
import CardEditModal from "./CardEditModal";

function CardsByUser() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [pending, startTransition] = useTransition();
    const [loading, setLoading] = useState(true);
    const [serverCards, setServerCards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

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

    return (
        <>
            <header className="header-container">
                <h2>My Business Cards</h2>
            </header>


            <div className="my-cards" style={{width: "100%", gap: "2em", display:"flex", flexDirection:"column"}}>
                <button title="Create Business Card" onClick={() => navigate("/Business/Add-Business")}>Add New Business</button>

                {loading ? (
                    <h2 className="loading-text">Loading...</h2>
                ) : serverCards.length ? (
                    <div className="cards-container">
                        {serverCards.slice(0, 25).map((card) => (
                            <div className="card" key={card._id}>
                                <img className="bus-image" src={card.image.url} alt={card.image.alt} />
                                <h3>{card.title}</h3>
                                <h4>{card.subtitle}</h4>
                                <hr />
                                <div className="business-des">{card.description}</div>
                                <hr />
                                <div className="business-info">
                                    <p>Phone: {card.phone}</p>
                                    <p>Address: {card.address.houseNumber} {card.address.street}, {card.address.city}.</p>
                                    <p>Card Number: {card.bizNumber}.</p>
                                    <p>Likes: {card.likes.length}.</p>
                                </div>
                                <div className="card-ctrls">
                                    <Link to={`/business/${card._id}`} >View Business</Link>
                                    <div className="card-btns">
                                        <button title={"Call Business: " + card.phone}><Phone className="card-icons" /></button>
                                        {user.user._id && <button title="Like this card"><Heart className="card-icons" /></button>}
                                        {isCardOwnedByUser(card._id, user.myCardIds) && (
                                            <>
                                                <button title="Edit this card" onClick={() => openEditModal(card)}>
                                                    <Edit3 className="card-icons" />
                                                </button>
                                                <button title="Delete this card"><Trash2 className="card-icons" /></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No Data Retrieved..</p>
                )}
            </div>
            <CardEditModal isOpen={isEditing} onClose={closeEditModal} cardData={selectedCard} token={user.token} />
        </>
    );
}

export default CardsByUser;
