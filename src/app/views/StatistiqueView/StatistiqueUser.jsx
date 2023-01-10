import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from "chart.js";
import {Chart as ChartJS} from "chart.js/auto";
import apiBackend from "@/app/api/backend/api.Backend";
import {URL_USER_STATS_REGISTER} from "@/app/constants/urls/urlBackEnd";
import {Helmet} from "react-helmet-async";
import arrowLeft from "../../assets/images/arrow-left.png"
import {URL_ADMIN_STATS, URL_STATISTIQUE_USER} from "@/app/constants/urls/urlFrontEnd";
import {Link} from "react-router-dom";


const StatisqueUser = () => {

    let yearNow = new Date().getFullYear();
    const [data, setData] = useState([]);
    const [year, setYear] = useState(yearNow);

    useEffect(() => {
        apiBackend.post(URL_USER_STATS_REGISTER + `${year}`).then(res => {
            setData(res.data)
        })
    }, [year])

    function handleChange(e) {
        setYear(e.target.value);
    }

    return (
        <div className={'w-1/2 ml-12 sm:ml-64'}>
            <Helmet>
                <title>Bish - Admin Statistiques User</title>
            </Helmet>
            <Link to={URL_ADMIN_STATS}>
                <img src={arrowLeft}/>
            </Link>
            <div className={"flex-col my-5"}>
                <select className={'h-10'} value={year} onChange={handleChange}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
                <span className={"text-2xl mx-5 "}>Utilisateurs inscrits sur le site</span>
                <Bar
                    datasetIdKey='id'
                    data={{
                        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                        datasets: [
                            {
                                id: 1,
                                label: 'Utilisateurs Inscrits',
                                data: [data["Janvier"], data["Février"], data["Mars"], data["Avril"], data["Mai"], data["Juin"], data["Juillet"], data["Août"], data["Septembre"], data["Octobre"], data['Novembre'], data["Décembre"]],
                            },
                        ],
                    }}
                /></div>

        </div>

    )
}

export default StatisqueUser;