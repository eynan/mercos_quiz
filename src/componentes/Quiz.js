import React, {useEffect, useState} from 'react';
import Dados from '../data/Dados'
import cx from 'classnames'
import styles from './Quiz.module.css'


const QUANTIDADE_DE_PERGUNTAS = 9

const pegarPerguntasRandonicamente = quantidade => {
    const listaDePerguntasGerada = []
    let perguntas = [...Dados]
    Array.from({length: quantidade}, () => {
        const valorRandom = Math.floor(Math.random() * perguntas.length)
        listaDePerguntasGerada.push(perguntas[valorRandom])
        perguntas.splice(valorRandom, 1)
        return null
    })

    return listaDePerguntasGerada
}

const Quiz = props => {
    const [pontos, setPontos] = useState(0);
    const [perguntas, setPerguntas] = useState([])
    const [perguntaDaVez, setPerguntaDaVez] = useState(0)
    const [quizIniciado, setQuizIniciado] = useState(false)
    const [exibirResposta, setExibirResposta] = useState(false)

    useEffect(() => {
        setPerguntas(pegarPerguntasRandonicamente(QUANTIDADE_DE_PERGUNTAS + 1))
    }, [])

    function selecionarPergunta(acerto) {
        let pontuacaoTemporaria  = pontos
        if (acerto) {
            pontuacaoTemporaria += 10
            setPontos(pontuacaoTemporaria)
        }

        setExibirResposta(true)

        perguntaDaVez === QUANTIDADE_DE_PERGUNTAS ? setTimeout(() => props.finalizar(pontuacaoTemporaria), 1600) : setTimeout(() => selecionarPerguntas(), 1600)
    }

    function selecionarPerguntas() {
        setPerguntaDaVez(perguntaDaVez + 1)
        setExibirResposta(false)
    }

    const gerarTelaIncial = () => (
        <div className={styles.containerTelaInicial}>
            <img src='/images/MercosQuizBranca.png' className={styles.mercosLogoQuizInicial} alt='Mercos logo'/>
            <img src='/images/codecon.png' className={styles.imagemAstronauta} alt='Mercos Astronauta'/>
            <button className={styles.botaoAcao} onClick={() => setQuizIniciado(true)} >Iniciar o quiz</button>
        </div>
    )

    function mostrarResposta(resposta){
        if (exibirResposta){
            return resposta ? 'respostaCorreta': 'respostaInvalida'
        }
        return ''
    }

    function gerarPerguntas(perguntas, perguntaDaVez) {
        const pergunta = perguntas[perguntaDaVez]
        if (pergunta) {
            return (
                <div className={styles.container}>
                    <div className={styles.perguntas}>
                    <img src='/images/MercosQuizDefault.png' className={styles.mercosLogoQuiz} alt='Mercos logo'/>
                        <div className={styles.divPergunta}>{pergunta.pergunta}</div>
                        <div
                            className={cx(styles.divRespostas, styles[mostrarResposta(pergunta.respostas[0].correta)])}
                            onClick={() => selecionarPergunta(pergunta.respostas[0].correta)}
                        >
                            {pergunta.respostas[0].resposta}
                        </div>
                        <div
                            className={cx(styles.divRespostas,  styles[mostrarResposta(pergunta.respostas[1].correta)])}
                            onClick={() => selecionarPergunta(pergunta.respostas[1].correta)}
                        >
                            {pergunta.respostas[1].resposta}
                        </div>
                        <div
                            className={cx(styles.divRespostas, styles[mostrarResposta(pergunta.respostas[2].correta)])}
                            onClick={() => selecionarPergunta(pergunta.respostas[2].correta)}
                        >
                            {pergunta.respostas[2].resposta}
                        </div>
                        <div
                            className={cx(styles.divRespostas, styles[mostrarResposta(pergunta.respostas[3].correta)])}
                            onClick={() => selecionarPergunta(pergunta.respostas[3].correta)}
                        >
                            {pergunta.respostas[3].resposta}
                        </div>
                        <div className={styles.divQuantidadePergunta}>{`Pergunta ${perguntaDaVez+1} de ${QUANTIDADE_DE_PERGUNTAS+1}`}</div>
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }
    }

    function criarTela() {
        return quizIniciado ? gerarPerguntas(perguntas, perguntaDaVez) : gerarTelaIncial()
    }

    return criarTela()
}

export default Quiz

