import React, {useState} from 'react'
import styles from './Cadastro.module.css'
import Select from './Select'
import Toggle from 'react-toggle'
import "react-toggle/style.css"

const Cadastro = (props) => {

    const [cadastro, setCadastro] = useState({
        nome: '',
        email: '',
        telefone: '',
        trabalhaComOque: '',
        trabalhandoAtualmente: '',
        evento: 'code-con',
        conheceMercos: '',
        aceitaContato: true
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
                <label className={styles.labelCadastro}>Com o que você está trabalhando?</label>
                <input
                    type='text'
                    placeholder='FullStack, FrontEnd, Mobile, DevOps...'
                    className={styles.inputCadastro}
                    value={cadastro.trabalhaComOque}
                    onChange={event => setCadastro({...cadastro, trabalhaComOque: event.target.value})}
                />
                <label className={styles.labelCadastro}>Em qual empresa trabalha?</label>
                <input
                    type='text'
                    className={styles.inputCadastro}
                    value={cadastro.trabalhandoAtualmente}
                    onChange={event => setCadastro({...cadastro, trabalhandoAtualmente: event.target.value})}
                />
                <label className={styles.labelCadastro}>Já conhecia a Mercos?</label>
                <Select
                    items={[{data:{title: 'SIM'}}, {data:{title: 'Não'}}]}
                    doFilter={respostas => setCadastro({...cadastro, conheceMercos: respostas[0]})}
                >
                    <span className='real-placeholder'>Selecione...</span>
                </Select>
                <label className={styles.contatoMercos}>
                    <span className={styles.labelCadastro} style={{marginRight: '10px', marginTop: '5px'}}>Aceita que a Mercos entre em contato sobre carreira e vagas?</span>
                    <Toggle
                        defaultChecked={cadastro.aceitaContato}
                        icons={false}
                        onChange={() => setCadastro({...cadastro, aceitaContato: !cadastro.aceitaContato})} 
                    />
                </label>
                
                <button className={styles.botaoAcao} onClick={() => enviarCadastro()}> Cadastrar!</button>
            </div>
        </div>
    )
}

export default Cadastro
