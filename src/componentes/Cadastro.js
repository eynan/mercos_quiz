import React, {useState} from 'react'
import styles from './Cadastro.module.css'
import Select from './Select'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import cx from 'classnames'

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

    const [cadastroErro, setCadastroErro] = useState({
        nome: false,
        email: false,
        telefone: false,
        trabalhaComOque: false,
        trabalhandoAtualmente: false,
        conheceMercos: false
    })

    const enviarCadastro = () => {
        const dbCon = props.db.firestore().collection('cadastros')
        const data = new Date()
        const dataFormatada = `${data.getDay()}/${data.getMonth()+1}/${data.getFullYear()} - ${data.getHours()} : ${data.getMinutes()} : ${data.getSeconds()}`
        const participante = {...cadastro, pontuacao: props.pontos, data: dataFormatada}
        dbCon.add(participante).then(retorno =>  props.finalizarCadastro())
    }

    const validarCadastro = () => {
        let cadastroErroAtual = {...cadastroErro}
        for (const key in cadastro) {
            let variavelDeCadastro = cadastro[key]
            variavelDeCadastro = typeof(variavelDeCadastro)  == 'string' ? variavelDeCadastro.trim() : variavelDeCadastro
            if(!variavelDeCadastro && typeof(variavelDeCadastro)  == 'string'){
                cadastroErroAtual[key] = true
            }
        }
        if (Object.values(cadastroErroAtual).indexOf(true) > -1) {
            setCadastroErro(cadastroErroAtual)
        }else {
             enviarCadastro()
        }
    }

    const atualizaCadastroELimpaInputComErro = (objeto, campo) => {
        setCadastro(objeto)
        setCadastroErro({...cadastroErro, [campo]: false})
    }

    return (
        <div className={styles.container}>
            <div className={styles.score}>{`Seu score foi: ${props.pontos}`}</div>
            <div className={styles.cadastro}>
                <label className={styles.paragrafo}>Cadastre-se para participar do sorteio do Kindle!</label>
                <label className={styles.labelCadastro}>Nome</label>
                <input
                    type='text'
                    className={cx(styles.inputCadastro, cadastroErro.nome ? styles.erro: '')}
                    value={cadastro.nome}
                    onChange={event => atualizaCadastroELimpaInputComErro({...cadastro, nome: event.target.value}, 'nome')}
                />
                <label className={styles.labelCadastro}>E-mail</label>
                <input
                    type='text'
                    className={cx(styles.inputCadastro, cadastroErro.email ? styles.erro: '')}
                    value={cadastro.email}
                    onChange={event => atualizaCadastroELimpaInputComErro({...cadastro, email: event.target.value}, 'email')}
                />
                <label className={styles.labelCadastro}>Telefone</label>
                <input
                    type='text'
                    className={cx(styles.inputCadastro, cadastroErro.telefone ? styles.erro: '')}
                    value={cadastro.telefone}
                    onChange={event => atualizaCadastroELimpaInputComErro({...cadastro, telefone: event.target.value}, 'telefone')}
                />
                <label className={styles.labelCadastro}>Com o que você está trabalhando?</label>
                <input
                    type='text'
                    placeholder='FullStack, FrontEnd, Mobile, DevOps...'
                    className={cx(styles.inputCadastro, cadastroErro.trabalhaComOque ? styles.erro: '')}
                    value={cadastro.trabalhaComOque}
                    onChange={event => atualizaCadastroELimpaInputComErro({...cadastro, trabalhaComOque: event.target.value}, 'trabalhaComOque')}
                />
                <label className={styles.labelCadastro}>Em qual empresa trabalha?</label>
                <input
                    type='text'
                    className={cx(styles.inputCadastro, cadastroErro.trabalhandoAtualmente ? styles.erro: '')}
                    value={cadastro.trabalhandoAtualmente}
                    onChange={event => atualizaCadastroELimpaInputComErro({...cadastro, trabalhandoAtualmente: event.target.value}, 'trabalhandoAtualmente')}
                />
                <label className={styles.labelCadastro}>Já conhecia a Mercos?</label>
                <Select
                    items={[{data:{title: 'SIM'}}, {data:{title: 'Não'}}]}
                    doFilter={respostas => atualizaCadastroELimpaInputComErro({...cadastro, conheceMercos: respostas[0]}, 'conheceMercos')}
                    erro={cadastroErro.conheceMercos}
                >
                    <span className='real-placeholder'>Selecione...</span>
                </Select>
                <label className={styles.contatoMercos}>
                    <span className={styles.labelCadastro} style={{marginRight: '10px', marginTop: '5px'}}>Aceita que a Mercos entre em contato sobre carreira e vagas?</span>
                    <Toggle
                        defaultChecked={cadastro.aceitaContato}
                        icons={false}
                        onChange={() => atualizaCadastroELimpaInputComErro({...cadastro, aceitaContato: !cadastro.aceitaContato}, 'aceitaContato')}
                    />
                </label>
                
                <button className={styles.botaoAcao} onClick={() => validarCadastro()}> Cadastrar!</button>
            </div>
        </div>
    )
}

export default Cadastro
