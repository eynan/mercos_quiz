import React, {useState} from 'react'
import styles from './Cadastro.module.css'

const Cadastro = (props) => {

    const [cadastro, setCadastro] = useState({
        nome: '',
        email: '',
        telefone: '',
        trabalhaComOque: '',
        trabalhandoAtualmente: '',
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
                    placeholder='FullStack, FrontEnd, Mobile, DevOps...'
                    className={styles.inputCadastro}
                    value={cadastro.trabalhaComOque}
                    onChange={event => setCadastro({...cadastro, trabalhaComOque: event.target.value})}
                />
                <label className={styles.labelCadastro}>Onde você trabalha hoje?</label>
                <input
                    type='text'
                    className={styles.inputCadastro}
                    value={cadastro.trabalhandoAtualmente}
                    onChange={event => setCadastro({...cadastro, trabalhandoAtualmente: event.target.value})}
                />
                <button className={styles.botaoAcao} onClick={() => enviarCadastro()}> Cadastrar!</button>
            </div>
        </div>
    )
}

export default Cadastro
