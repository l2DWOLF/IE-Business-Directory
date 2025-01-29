import { useState, useEffect, useTransition } from "react";
import { Link } from "react-router-dom";
import { getUserCards } from "../services/cardServices";
import { successMsg, warningMsg } from "../services/feedbackService";
import { Phone, Heart, Edit3, Trash2 } from "lucide-react";
import { useSelector } from 'react-redux';
import { isCardOwnedByUser } from "./utilities/userTilities";

function CardsByUser() {
    const user = useSelector((state) => state.user);
    const [pending, startTransition] = useTransition();
    let [loading, setLoading] = useState(true);
    let [serverCards, setServerCards] = useState([]);

    useEffect(() => {
        const fetchUserCards = async () => {
            try {
                const cards = await getUserCards(user.token);
                startTransition(() => {
                    setServerCards(cards);
                    setLoading(false);
                });
            } catch (err) {
                console.log(err);
                warningMsg(`Error Occurred: ${err.response?.data || err.message}`);
            }
        };

        if (user.token) { // Ensure token is available before making the API call
            fetchUserCards();
        }
    }, [user.token]);

    return (<>

        <header style={{ boxShadow: " 0px 0px 25px 5px #ffffff10", borderRadius: "10px", padding: ".5em 1em" }}>
            <h2>My Business Cards</h2>
        </header>

        <div className="my-cards" style={{ width: "95vw", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "1.5em", boxShadow: "0px 1px 25px 4px #FFF5", borderRadius: "10px" }}>
            <div className="cards-container">
                {loading && (
                    <div style={{ gridColumn: "span 4" }}>
                        <h2 style={{ fontSize: "3rem", textAlign: "center" }}>Loading...</h2>
                    </div>
                )}
                {
                    serverCards.length ? (
                        serverCards.map((card, index) => (
                            index <= 25 ? (
                                <div className="card" key={card._id}>
                                    <img className="bus-image" src={card.image.url} alt={card.image.alt} />
                                    <h3>{card.title}</h3>
                                    <h4>{card.subtitle}</h4>
                                    <hr />

                                    <div className="business-des" style={{ overFlow: "hidden", overflowY: "auto", height: "50px", width: "80%", alignSelf: "center", padding: "10px" }}>
                                        Description: <br />
                                        {card.description}
                                    </div>
                                    <hr />

                                    <div className="business-info">
                                        <p>Phone: {card.phone}</p>
                                        <p>Address: {card.address.houseNumber} {card.address.street}, {card.address.city}.</p>
                                        <p>Card ID: {card.bizNumber}.</p>
                                        <p>Likes: {card.likes.length}.</p>
                                    </div>

                                    <div className="card-ctrls">
                                        <Link to={`/business/${card._id}`} >View Business</Link>

                                        <div className="card-btns">

                                            <button title={"Call Business: " + card.phone} /* onClick={() => handleLike(card._id)} */ >
                                                <Phone className="card-icons" />
                                            </button>

                                            {user.user._id !== "" &&
                                                <button title="Like this card" /* onClick={() => handleLike(card._id)} */ >
                                                    <Heart className="card-icons" />
                                                </button>
                                            }
                                            {isCardOwnedByUser(card._id, user.myCardIds) &&
                                                <button title="Edit this card" /* onClick={() => handleLike(card._id)} */ >
                                                    <Edit3 className="card-icons" />
                                                </button>
                                            }
                                            {isCardOwnedByUser(card._id, user.myCardIds) &&
                                                <button title="Delete this card" /* onClick={() => handleLike(card._id)} */ >
                                                    <Trash2 className="card-icons" />
                                                </button>
                                            }



                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))
                    ) : (
                        !loading && (
                            <p>No Data Retrieved..</p>
                        )
                    )
                }
            </div>
        </div>
    </>);
}

export default CardsByUser;