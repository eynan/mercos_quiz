import React, {useState} from 'react'
import styles from './Cadastro.module.css'
import Select from "./Select";

const Cadastro = (props) => {

    const [cadastro, setCadastro] = useState({
        nome: '',
        email: '',
        telefone: '',
        trabalhaComOque: '',
        trabalhandoAtualmente: false,
        contatoMercos: false,
        evento: 'code-con'
    })

    const enviarCadastro = () => {
        const dbCon = props.db.firestore().collection('cadastros')
        const participante = {...cadastro, pontuacao: props.pontos}
        dbCon.add(participante).then(retorno =>  props.finalizarCadastro())
    }

    return (
        <div className={styles.container}>
            <div className={styles.score}>{`Seu score foi: ${props.pontos}`}</div>
            <div className={styles.cadastro}>
                <label className={styles.paragrafo}>Cadastre-se para participar do sorteio do Kindle!</label>
                <label className={styles.labelCadastro}>Nome</label>
                <input
                    type='text'
                    className={styles.inputCadastro}
                    value={cadastro.nome}
                    onChange={event => setCadastro({...cadastro, nome: event.target.value})}
                />
                <label className={styles.labelCadastro}>E-mail</label>
                <input
                    type='text'
                    className={styles.inputCadastro}
                    value={cadastro.email}
                    onChange={event => setCadastro({...cadastro, email: event.target.value})}
                />
                <label className={styles.labelCadastro}>Telefone</label>
                <input
                    type='text'
                    className={styles.inputCadastro}
                    value={cadastro.telefone}
                    onChange={event => setCadastro({...cadastro, telefone: event.target.value})}
                />
                <label className={styles.labelCadastro}>Com o que você trabalha?</label>
                <input
                    type='text'
                    placeholder='Ex dev full stack...'
                    className={styles.inputCadastro}
                    value={cadastro.trabalhaComOque}
                    onChange={event => setCadastro({...cadastro, trabalhaComOque: event.target.value})}
                />
                <label className={styles.labelCadastro}>Você está trabalhando atualmente?</label>
                <Select
                    items={[{data:{title: 'SIM'}}, {data:{title: 'Não'}}]}
                    doFilter={respostas => setCadastro({...cadastro, trabalhandoAtualmente: respostas[0]})}
                >
                    <span className='real-placeholder'>Selecione...</span>
                </Select>
                <button className={styles.botaoAcao} onClick={() => enviarCadastro()}> Cadastrar!</button>
            </div>
        </div>
    )
}

export default Cadastro
