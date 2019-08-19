import React, {useState} from 'react'
import Cadastro from "./Cadastro";
import Quiz from "./Quiz";


const Container = props => {
    const [etapa, setEtapa] = useState('quiz')
    const [pontuacao, setPontuacao] = useState(0)

    function finalizarCadastro() {
        setEtapa('quiz')
    }

    function finalizarQuiz(pontos) {
        setPontuacao(pontos)
        setEtapa('cadastro')
    }

    return(etapa === 'cadastro' ? <Cadastro db={props.db} pontos={pontuacao} finalizarCadastro={finalizarCadastro}/> : <Quiz finalizar={finalizarQuiz}/>)
}

export default Container
