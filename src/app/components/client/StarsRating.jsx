import React, {useState} from "react";
import StarRatings from "react-star-ratings";
import apiBackEnd from "@/app/api/backend/api.Backend";
import {URL_BACK_NOTATION_UPDATE} from "@/app/constants/urls/urlBackEnd";
import {toast} from "react-toastify";


const StarsRating = (props) => {

    const [rating, setRating] = useState(props.noteUser);
    const [canUpdate, setCanUpdate] = useState(true);
    /*const [timeLeft, setTimeLeft] = useState(10)*/


    const setNewRating = (rating) => {
        if (canUpdate === true){
            apiBackEnd.post(URL_BACK_NOTATION_UPDATE + props.userId +'/'+ props.produitId +'/'+ rating)
                .then((res) => {
                    setRating(res.data[0].note)
                    toast.success(res.data[0].message,
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light"
                        })
                })
            setCanUpdate(false)

            {/*TODO: Mettre le toast warn en dynamique au click (10, 9, 8, 7, etc...)*/}
            /*
               setTimeLeft(10)
               let date = new Date().getTime()
               let endDate = new Date().getDate() + 1000;
               setTimeLeft((endDate - date) / 1000)
           */

            setTimeout(() => setCanUpdate(true), 10000)
        }else {
            toast.warn("Veuillez patienter 10 secondes avant de pouvoir modifier votre note !",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
        }
    }

    return (
        <div>
                <StarRatings
                    rating={rating}
                    numberOfStars={5}
                    name="rating"
                    changeRating={setNewRating}
                    starHoverColor="#2EB7EB"
                    starRatedColor="#2EB7EB"
                    starDimension="1vw"
                    starSpacing="1px"
                />
        </div>
    );

}

export default StarsRating;