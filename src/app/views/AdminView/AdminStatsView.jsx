import React, {useEffect, useState} from 'react'
import {Helmet} from "react-helmet-async";
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import apiBackend from "@/app/api/backend/api.Backend";
import {URL_USER_STATS_REGISTER} from "@/app/constants/urls/urlBackEnd";

const AdminStatsView = () => {

    let yearNow = new Date().getFullYear();

    const [data,setData] = useState([]);
    const [year,setYear] = useState(yearNow);

    useEffect(() => {
        apiBackend.post(URL_USER_STATS_REGISTER + `${year}`).then(res =>{
            setData(res.data)
        })
    },[year])

    function handleChange(e) {
        setYear(e.target.value);
    }

    return (
        <div className='w-full ml-12 sm:ml-64'>
            <Helmet>
                <title>Bish - Admin Statistiques</title>
            </Helmet>

            <div className={'w-1/2 flex-col justify-center'}>
                <select value={year} onChange={handleChange}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
                <span className={"text-2xl "}>Utilisateurs</span>
                <Bar
                    datasetIdKey='id'
                    data={{
                        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                        datasets: [
                            {
                                id: 1,
                                label: 'Utilisateurs Inscrits',
                                data: [data["Janvier"],data["Février"],data["Mars"],data["Avril"],data["Mai"],data["Juin"],data["Juillet"],data["Août"],data["Septembre"],data["Octobre"],data['Novembre'],data["Décembre"]],
                            },
                        ],
                    }}
                />
            </div>

        </div>


    )
}

export default AdminStatsView