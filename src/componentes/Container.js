import React, {useState} from 'react'
import Cadastro from "./Cadastro";
import Quiz from "./Quiz";


const Container = props => {
    const [etapa, setEtapa] = useState('cadastro')
    const [jogador, setJogador] = useState()

    function finalizarCadastro(idCadastro) {
        setEtapa('quiz')
        setJogador(idCadastro)
    }


    function finalizarQuiz(pontos) {
        setEtapa('cadastro')
        props.db.firestore().collection('cadastros').doc(jogador).set({pontuacao: pontos}, {merge: true});
    }

    return(etapa === 'cadastro' ? <Cadastro db={props.db} finalizarCadastro={finalizarCadastro}/> : <Quiz reiniciar={finalizarQuiz}/>)
}

export default Container
