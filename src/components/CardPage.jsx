import { Link, useParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useEffect, useState } from "react";
import { deleteCard, getOneCard } from "../services/cardServices";
import { Phone, Heart, Edit3, Trash2 } from "lucide-react";
import { isCardOwnedByUser } from "./utilities/userTilities";
import { useSelector } from "react-redux";
import CardEditModal from "./CardEditModal";
import BusinessCard from "./BusinessCard";

function CardPage() {
    const user = useSelector((state) => state.user);
    let urlParams = useParams();
    let [card, setCard] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
 
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
            const fetchCard = async () => {
                try {
                    const res = await getOneCard(urlParams.id);
                    if (res) {
                        setCard(res);
                    } else {
                        setIsDeleted(true);  
                    }
                } catch (e) {
                    console.log("Error fetching card:", e);
                    setIsDeleted(true);  
                }
            };
            fetchCard();
    }, [urlParams.id, isEditing]);

    const openEditModal = (card) => {
        setSelectedCard(card);
        setIsEditing(true);
    };
    const closeEditModal = () => {
        setIsEditing(false);
    };

    return (<>

        <h2>Business Name:</h2>

        {card ? (
            <div style={{width:"50%"}}>
                <BusinessCard
                    key={card._id}
                    card={card}
                    user={user}
                    onEdit={openEditModal}
                />
            </div>
        
        ) : (
            <p> no info available.. </p>
        )
        }
        <CardEditModal isOpen={isEditing} onClose={closeEditModal} cardData={selectedCard} token={user.token} />
    </>);
}

export default CardPage;