import React, {useEffect, useState} from 'react';
import Dados from '../data/Dados'
import styles from './Quiz.module.css'


const QUANTIDADE_DE_PERGUNTAS = 4

const pegarPerguntasRandonicamente = (quantidade) => {
    const listaDePerguntasGerada = []
    for (const x of Array(quantidade).keys()) {
        const valorRandom = Math.random() * 10
        listaDePerguntasGerada.push(Dados[Math.floor(valorRandom)])
    }
    return listaDePerguntasGerada
}

const Quiz = props => {

    const [pontos, setPontos] = useState(0);
    const [perguntas, setPerguntas] = useState([])
    const [perguntaDaVez, setPerguntaDaVez] = useState(0)

    useEffect(() => {
        setPerguntas(pegarPerguntasRandonicamente(5))
    }, [])

    function selecionarPergunta(acerto) {
        if (acerto) {
            setPontos(pontos + 10)
        }
        setPerguntaDaVez(perguntaDaVez + 1)
    }

    function gerarPerguntas(perguntas, perguntaDaVez) {
        const pergunta = perguntas[perguntaDaVez]

        if(perguntaDaVez > QUANTIDADE_DE_PERGUNTAS) {
            return (
                <div className={styles.container}>
                    {`Seu score total foi: ${pontos}`}
                    <button onClick={() => props.reiniciar(pontos)}>Reinciar</button>
                </div>
            )
        }

        if (pergunta) {
            return (
                <div className={styles.container}>
                    <div className={styles.perguntas}>
                        <label>{pergunta.pergunta}</label>
                        <button onClick={() => selecionarPergunta(pergunta.respostas[0].correta)}>{pergunta.respostas[0].resposta}</button>
                        <button onClick={() => selecionarPergunta(pergunta.respostas[1].correta)}>{pergunta.respostas[1].resposta}</button>
                        <button onClick={() => selecionarPergunta(pergunta.respostas[2].correta)}>{pergunta.respostas[2].resposta}</button>
                        <button onClick={() => selecionarPergunta(pergunta.respostas[3].correta)}>{pergunta.respostas[3].resposta}</button>
                        <div style={{marginTop: '20px'}}>{`Total de pontos: ${pontos}`}</div>
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }
    }

    return (gerarPerguntas(perguntas, perguntaDaVez))
}

export default Quiz

