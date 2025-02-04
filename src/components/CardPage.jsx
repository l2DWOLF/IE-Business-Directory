import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getOneCard } from "../services/cardServices";
import { useSelector } from "react-redux";
import CardEditModal from "./CardEditModal";
import BusinessCard from "./BusinessCard";
import { siteTheme } from "../App";

function CardPage() {
    const theme = useContext(siteTheme);
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

    return (<div className="card-page-div" style={{ width: "100%", padding: "1em", display: "flex", flexDirection: "column", alignItems: "center", background: theme.background, color: theme.color }}>

        <h2>Business Page</h2>

        {card ? (
            <div className="biz-page">
                <h3>{card.title}</h3>
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
    </div>);
}
export default CardPage;