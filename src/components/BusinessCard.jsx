import { Link } from "react-router-dom";
import { Phone, Heart, Edit3, Trash2 } from "lucide-react";
import { isCardOwnedByUser } from "./utilities/userTilities";
import { deleteCard, likeCard } from "../services/cardServices";
import { useContext, useState } from "react";
import { siteTheme } from "../App";

function BusinessCard({ card, user, onEdit, onUnlike }) {
    const theme = useContext(siteTheme);
    const [isDeleted, setIsDeleted] = useState(false);
    const [likes, setLikes] = useState(card.likes.length);
    const [liked, setLiked] = useState(card.likes.includes(user?.user?._id));

    if (!card || isDeleted) return null;

    const handleDelete = async (cardId) => {
        let confirmed = confirm("Are you sure you want to delete this card? It will be permanently deleted.");
        if (confirmed) {
            try {
                const res = await deleteCard(cardId, user.token);
                if (res.status === 200) {
                    setIsDeleted(true);
                }
            } catch (error) {
                console.error("Error deleting the card:", error);
            }
        }
    };

    const handleLike = async () => {
        try {
            await likeCard(card._id, user.token);
            const updatedLiked = !liked;
            setLiked(updatedLiked);
            setLikes(updatedLiked ? likes + 1 : likes - 1);

            if (updatedLiked) {
                card.likes.push(user.user._id);
            } else {
                card.likes = card.likes.filter(id => id !== user.user._id);
                if (onUnlike) {onUnlike(card._id);}
            }
        } catch (error) {
            console.error("Error liking the card:", error);
        }
    };

    return (
        <div className="card" style={{ background: theme.background, color: theme.color }}>
            <img className="bus-image" src={card.image.url} alt={card.image.alt} />
            <h3>{card.title}</h3>
            <h4>{card.subtitle}</h4>
            <hr />
            <div className="business-des">{card.description}</div>
            <hr />
            <div className="business-info">
                <p>Phone: {card.phone}</p>
                <p>Address: {card.address.houseNumber} {card.address.street}, {card.address.city}.</p>
                <p style={{minHeight: "20px", maxHeight:"20px", overflowY:"scroll", scrollbarWidth:"none"}}>Website: {card.web}</p>
                <p>Card Number: {card.bizNumber}.</p>
                <p>Likes: {likes}.</p>
            </div>
            <div className="card-ctrls">
                <hr />
                <Link to={`/business/${card._id}`} >View Business Page</Link>
                <hr />
                <div className="card-btns">
                    <button title={"Call Business: " + card.phone}>
                        <Phone className="card-icons" />
                    </button>
                    {user?.user?._id && (
                        <button title="Like this card" onClick={handleLike}>
                            <Heart className={`card-icons ${liked ? 'liked' : ''}`} />
                        </button>
                    )}
                    {isCardOwnedByUser(card._id, user?.myCardIds) && (
                        <>
                            <button title="Edit this card" onClick={() => onEdit(card)}>
                                <Edit3 className="card-icons" />
                            </button>
                            <button title="Delete this card" onClick={() => handleDelete(card._id)}>
                                <Trash2 className="card-icons" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
export default BusinessCard;
