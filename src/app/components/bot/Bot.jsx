import React from 'react';
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from "styled-components";

const Bot = (props) => {

    const theme = {
        background: '#F5F8FBFF',
        fontFamily: 'Roboto',
        headerBgColor: '#2EB7EB',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#2EB7EB',
        botFontColor: '#fff',
        userBubbleColor: '#ececec',
        userFontColor: '#4a4a4a',
    };

    const steps = [
        {
            id: '1',
            message: "Avez-vous besoin d'aide ?",
            trigger: '2',
        },
        {
            id: '2',
            options: [
                {value: 1, label: 'Oui !', trigger: '4'},
                {value: 2, label: 'Non !', trigger: '3'},
            ],
        },
        {
            id: '3',
            message: 'Bonne navigation à vous !',
            trigger: "9"
        },
        {
            id: '4',
            message: 'Comment puis-je vous aider concernant ce produit ?',
            trigger: "5"
        },
        {
            id: "5",
            options: [
                {value: 1, label: 'les délais de livraison ?', trigger: "6"},
                {value: 2, label: 'Les stocks', trigger: "7"},
                {value: 3, label: 'Le paiements', trigger: "8"},
                {value: 4, label: 'Je n\'ai plus de question !', trigger: "10"},
            ]
        },
        {
            id: '6',
            message: 'Les délais de livraison son estimé à une semaine !',
            trigger: "5"
        },
        {
            id: '7',
            message: 'Les stocks sont vérifier toutes les semaines !',
            trigger: "5"
        },
        {
            id: '8',
            message: 'Les paiements sont sécurisé par Stripe !',
            trigger: "5"
        },
        {
            id: '9',
            options: [
                {value: 1, label: "j'ai besoin d'aide !", trigger: "4"},
            ]
        },
        {
            id: '10',
            message: 'A la prochaine amigos !',
            end: true
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <ChatBot
                enableSmoothScroll={true}
                steps={steps}
                floating={true}
                style={theme}
                opened={props.opened.opened}
                toggleFloating={props.toggleFloating}
            />
        </ThemeProvider>
    )
}

export default Bot;