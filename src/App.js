import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tarefas: [],
      nova_tarefa: "",
      newDate: new Date(),
      estado_tarefa: "",
      tarefas_completas: []
    }
    this.handleNovaTarefa = this.handleNovaTarefa.bind(this)
    this.inserirNovaTarefa = this.inserirNovaTarefa.bind(this)
    this.removerTarefa = this.removerTarefa.bind(this)
    this.estadoToggle = this.estadoToggle.bind(this)
  }

  handleNovaTarefa(e){
    e.preventDefault()
    if(this.state.nova_tarefa !== ""){
      this.state.tarefas.unshift({
        text: this.state.nova_tarefa,
        date: this.state.tarefa_data,
        done: this.state.estado_tarefa === "porFazer" ? true : false
      })
      this.setState({
        tarefas: this.state.tarefas,
        nova_tarefa: "",
        //tarefa_data: ""
      })
      this.setLocalTarefas(this.state.tarefas)
      //this.nova_tarefa.focus()
    } else{}
  }

  inserirNovaTarefa(e){
    this.setState({
      [e.target.name]: e.target.value
    })
    //console.log(this.state)
  }

  mudarTarefa(tarefaIndex, e){
    this.state.tarefas[tarefaIndex].text = e.target.value
    this.setState({
      tarefas: this.state.tarefas
    })
    this.setLocalTarefas(this.state.tarefas)
  }

  /*estadoToggle(tarefaIndex, e){
    this.state.tarefas[tarefaIndex].done = !this.state.tarefas[tarefaIndex].done
    this.setState({
      tarefas: this.state.tarefas
    })
    this.setLocalTarefas(this.state.tarefas)
  }*/
  estadoToggle(tarefaIndex, e){
    this.state.tarefas_completas.unshift({
      text: this.state.tarefas[tarefaIndex].text,
      date: this.state.tarefas[tarefaIndex].date,
    })
    this.setState({
      tarefas_completas: this.state.tarefas_completas,
      nova_tarefa: "",
      //tarefa_data: ""
    })
    this.setLocalTarefas(this.state.tarefas)
    //this.nova_tarefa.focus()
  }

  removerTarefa(tarefaIndex, e){
    this.state.tarefas.splice(tarefaIndex, 1)
    this.setState({tarefas: this.state.tarefas})
    this.setLocalTarefas(this.state.tarefas)
  }

  removerTarefaCompletada(tarefaIndex, e){
    this.state.tarefas_completas.splice(tarefaIndex, 1)
    this.setState({tarefas_completas: this.state.tarefas_completas})
    this.setLocalTarefas(this.state.tarefas_completas)
  }

  editarTarefa(tarefaIndex, e){
    this.setState({
      editandoTarefa: this.state.editandoTarefa === tarefaIndex ? null : tarefaIndex,
      tarefa_data: this.state.tarefa_data === tarefaIndex ? null : tarefaIndex
    })
  }

  setLocalTarefas(tarefas){
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
  }

  render() {
    return (
      <div className="App">
        <div>{/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        </div>

        <div>
          <p className="title">TO DO LIST</p>
        </div>

        <div>
          <form className="tarefa_form" onSubmit={this.handleNovaTarefa}>
            <input className="tarefa_input" placeholder="Escreva aqui a sua nova tarefa" type="text" name="nova_tarefa" 
            value={this.state.nova_tarefa} 
            onChange={this.inserirNovaTarefa}
            ref={(el) => {this.nova_tarefa = el}}/>

            <input className="data_input" type="date" name="tarefa_data" 
            value={this.state.tarefa_data}
            onChange={this.inserirNovaTarefa}
            ref={(el) => {this.tarefa_data = el}}/>

            <button className="botao_adicionar">
              Adicionar
            </button>

            {/*<select className="estado_input" name="estado_tarefa" value={this.state.estado_tarefa} 
            onChange={this.inserirNovaTarefa}>
                  <option value="done">Done</option>
                  <option value="not_done">Not Done</option>
      </select>*/}
          </form>
        </div>

        <div>
          <ul className="lista_tarefas_incompletas">
            {this.state.tarefas.map((item, index) => {
              return <li className="lista_tarefa" key={"tarefa" + index}>
              {
                (this.state.editandoTarefa === index) ?
                <input onChange={this.mudarTarefa.bind(this, index)} value={item.text}/> : <p className="lista_item">{item.text}</p>
              }

              {
                (this.state.editandoTarefa === index) ? 
                <input className="data_input" type="date" name="" value={this.state.tarefa_data} onChange={this.handleNovaTarefa}/>
                : <span>{item.date}</span>
              }

              {/* <input className="data_input" type="date" name="" value={item.date} onChange={this.handleNovaTarefa}/> */}
              
               <button className="botao_editar" onClick={this.editarTarefa.bind(this, index)}>
                {(this.state.editandoTarefa === index) ? "Editado" : "Editar"}
              </button>

              {/*<select className="botao_completar" name="estado_tarefa" value={this.state.estado_tarefa} onClick={this.estadoToggle.bind(this, index)}>
                <option value="porFazer">Completar</option>
                <option vlaue="feito">Descompletar</option>
            </select>*/}

              <button value="porFazer" name="estado_tarefa" className="botao_completar" onClick={this.estadoToggle.bind(this, index)}>
              Completar
            </button>

              <button className="botao_remover" onClick={this.removerTarefa.bind(this, index)} 
              disabled={(!isNaN (this.state.editandoTarefa) && this.state.editandoTarefa !== null) ? "disabled" : ""}>
              Remover
              </button>
            

              </li>
            })}
          </ul>
          </div>

          <div>
            <ul className="lista_tarefas_completas">
              {this.state.tarefas_completas.map((item, index) =>{
                return <li className="lista-item" key={"tarefa_completa" + index}>
                {
                (this.state.editandoTarefa === index) ?
                <input onChange={this.mudarTarefa.bind(this, index)} value={item.text}/> : 
                <p className="lista_item">{item.text}</p>
                }
                
              {
                (this.state.editandoTarefa === index) ? 
                <input className="data_input" type="date" name="" value={this.state.tarefa_data} onChange={this.handleNovaTarefa}/>
                : <span>{item.date}</span>
              }
              
              <button className="botao_editar" onClick={this.editarTarefa.bind(this, index)}>
                {(this.state.editandoTarefa === index) ? "Editado" : "Editar"}
              </button>

              <button value="feito" className="botao_descompletar" onClick={this.estadoToggle.bind(this, index)}>
              Descompletar
              </button>

              <button className="botao_remover" onClick={this.removerTarefaCompletada.bind(this, index)} 
              disabled={(!isNaN (this.state.editandoTarefa) && this.state.editandoTarefa !== null) ? "disabled" : ""}>
              Remover
              </button>

              </li>
              })}
            </ul>
          </div>


        <div>

        </div>

        
        
      </div>
    );
  }
}

export default App;
