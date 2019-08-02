import React from 'react'
import styles from './Cadastro.module.css'

const Cadastro = () => (
    <div className={styles.container}>
            <div className={styles.cadastro}>
                <label>Nome</label>
                <input type='text'/>
                <label>E-mail</label>
                <input type='text'/>
                <label>Telefone</label>
                <input type='text'/>
                <label>Com o que você trabalha?</label>
                <input type='text'/>
                <label>Você está trabalhando atualmente?</label>
                <input type='text'/>
                <label>Aceito que a Mercos entre em contato comigo</label>
                <input type='checkbox'/>
                <button> Começar!</button>
            </div>
    </div>
)

export default Cadastro
