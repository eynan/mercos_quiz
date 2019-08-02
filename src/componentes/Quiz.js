import React, { useState, useEffect } from 'react';
import Dados from '../data/Dados'
import styles from './Quiz.module.css'


const pegarPerguntasRandonicamente = (quantidade) => {
    const listaDePerguntasGerada = []
    for (const x of Array(quantidade).keys()) {
        listaDePerguntasGerada.push(Dados[Math.floor(Math.random(10))])
    }
    return listaDePerguntasGerada
}

const getVisual = (perguntas, perguntaDaVez) => {
    const pergunta = perguntas[perguntaDaVez]
    if(pergunta){
        return(
            <div className={styles.container}>
                <div className={styles.perguntas}>
                    <label>{pergunta.pergunta}</label>
                    <button onClick={pergunta.respostas[0].correta}>{pergunta.respostas[0].resposta}</button>
                    <button onClick={}>{pergunta.respostas[1].resposta}</button>
                    <button onClick={}>{pergunta.respostas[2].resposta}</button>
                    <button onClick={}>{pergunta.respostas[3].resposta}</button>
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}

const Quiz = props => {

    const [pontos, setPontos] = useState(0);
    const [perguntas, setPerguntas] = useState([])
    const [perguntaDaVez, setPerguntaDaVez] = useState(0)

    useEffect(() => {
        setPerguntas(pegarPerguntasRandonicamente(5))
    }, [])

    function selecionarPergunta() {

    }

    return (getVisual(perguntas, perguntaDaVez))
}

export default Quiz

