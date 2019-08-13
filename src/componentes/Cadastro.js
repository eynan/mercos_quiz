import React, {useState} from 'react'
import styles from './Cadastro.module.css'

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
        dbCon.add(cadastro).then(retorno =>  props.finalizarCadastro(retorno.id))
    }

    return (
        <div className={styles.container}>
            <div className={styles.cadastro}>
                <label>Nome</label>
                <input type='text' value={cadastro.nome} onChange={event => setCadastro({...cadastro, nome:event.target.value})}/>
                <label>E-mail</label>
                <input type='text' value={cadastro.email} onChange={event => setCadastro({...cadastro, email:event.target.value})}/>
                <label>Telefone</label>
                <input type='text' value={cadastro.telefone} onChange={event => setCadastro({...cadastro, telefone:event.target.value})}/>
                <label>Com o que você trabalha?</label>
                <input type='text' value={cadastro.trabalhaComOque} onChange={event => setCadastro({...cadastro, trabalhaComOque:event.target.value})}/>
                <label>Você está trabalhando atualmente?</label>
                <input type='checkbox' value={cadastro.trabalhandoAtualmente} onClick={event => setCadastro({...cadastro, trabalhandoAtualmente: !cadastro.trabalhandoAtualmente})}/>
                <label>Aceito que a Mercos entre em contato comigo</label>
                <input type='checkbox' value={cadastro.contatoMercos} onClick={event => setCadastro({...cadastro, contatoMercos: !cadastro.contatoMercos})}/>
                <button onClick={() => enviarCadastro()}> Começar!</button>
            </div>
        </div>
    )
}

export default Cadastro
