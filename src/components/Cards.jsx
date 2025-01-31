import { Link } from "react-router-dom";
import './css/cards.css';
import { useFetch } from "./hooks/useFetch";
import { getAllCards } from "../services/cardServices";
import { useEffect, useState, useTransition } from "react";
import { Phone, Heart, Edit3, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { warningMsg } from "../services/feedbackService";
import { isCardOwnedByUser } from "./utilities/userTilities";
import CardEditModal from "./CardEditModal";
import BusinessCard from "./BusinessCard";

function Cards() {
    const user = useSelector((state) => state.user);
    const [pending, startTransition] = useTransition();
    let [loading, setLoading] = useState(true);
    let [serverCards, setServerCards] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const cards = await getAllCards();
                startTransition(() => {
                    setServerCards(cards);
                    setLoading(false);
                });
            } catch (err) {
                console.log(err);
                warningMsg(`Error Occurred: ${err.response?.data || err.message}`);
            }
        };
        fetchCards();
    }, [isEditing]);

    const openEditModal = (card) => {
        setSelectedCard(card);
        setIsEditing(true);
    }; 
    const closeEditModal = () => {
        setIsEditing(false);
    };

    return (
        <div style={{ width: "95vw", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1.5em", boxShadow: "0px 1px 25px 4px #FFF5", borderRadius: "10px" }}>
            <h2> Explore Business Cards</h2>
            <p style={{ width: "65%" }}>Discover a wide range of business cards from professionals across different industries.
                <br />
                Browse through unique designs and connect with experts to find inspiration or make valuable business connections.</p>

            <div className="cards-container">
                {loading && (
                    <div style={{ gridColumn: "span 4" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center" }}>Loading...</h2>
                    </div>
                )}
                {
                serverCards.length ? (
                    serverCards.map((card, index) => (
                        index <= 2500 ? (
                            <BusinessCard
                                key={card._id}
                                card={card}
                                user={user}
                                onEdit={openEditModal}
                            />
                            
                            ) : null
                        ))
                    ) : (
                        !loading && (
                            <p>No Data Retrieved..</p>
                        )
                    )
                }
            </div>
            <CardEditModal isOpen={isEditing} onClose={closeEditModal} cardData={selectedCard} token={user.token} />

            {/* <h2>Cards CRM Table</h2>
        <div className="table-container">
            <table style={{ border: "2px solid purple" }}>
                <thead>
                    <tr>
                        <th>Card ID</th>
                        <th>Card Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        serverCards.length ? (
                            serverCards.map((card) => (

                                <tr key={card._id} >
                                    <td >{card._id}</td>
                                    <td>{card.title}</td>
                                    <td>{card.email}</td>
                                    <td>{card.phone}</td>
                                    <td>{card.createdAt}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>No Data..</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div> */}
        </div>);
}
export default Cards;