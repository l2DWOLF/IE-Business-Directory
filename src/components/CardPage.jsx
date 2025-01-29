import { Link, useParams } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { useState } from "react";
import { getOneCard } from "../services/cardServices";
import { Phone, Heart, Edit3, Trash2 } from "lucide-react";
import { isCardOwnedByUser } from "./utilities/checkOwnership";
import { useSelector } from "react-redux";

function CardPage() {
    const user = useSelector((state) => state.user);
    let urlParams = useParams();
    let [card, setCard] = useState({});
    
    getOneCard(urlParams.id).then((res) => {setCard(res)}).catch((e) => console.log(e));

    return ( <>
        <h2>Business Name: {card.title}</h2>

        {card._id ? (
                <div className="card" style={{ width: "50%" }}>
                    <img className="bus-image" src={card.image.url} alt={card.image.alt} style={{width:"50%", alignSelf:"center", marginTop:"2em"} } />
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
        ) : (
            <p> no info available.. </p>
        )}
        
    </> );
}

export default CardPage;