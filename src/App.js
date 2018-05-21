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
    }
    this.handleNovaTarefa = this.handleNovaTarefa.bind(this)
    this.inserirNovaTarefa = this.inserirNovaTarefa.bind(this)
  }

  handleNovaTarefa(e){
    e.preventDefault()
    if(this.state.nova_tarefa !== ""){
      this.state.tarefas.push({
        text: this.state.nova_tarefa,
        date: this.state.tarefa_data,
        done: this.state.estado_tarefa === "not_done" ? false : true, //isto e para o estilo
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

  estadoToggle(tarefaIndex, e){
    this.state.tarefas[tarefaIndex].done = !this.state.tarefas[tarefaIndex].done
    this.setState({
      tarefas: this.state.tarefas
    })
    this.setLocalTarefas(this.state.tarefas)
  }

  removerTarefa(tarefaIndex, e){
    this.state.tarefas.splice(tarefaIndex, 1)
    this.setState({tarefas: this.state.tarefas})
    this.setLocalTarefas(this.state.tarefas)
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <p className="title">TO DO LIST</p>
        </div>

        <div>
          <form onSubmit={this.handleNovaTarefa}>
            <input className="tarefa_input" placeholder="Escreva aqui a sua nova tarefa" type="text" name="nova_tarefa" 
            value={this.state.nova_tarefa} 
            onChange={this.inserirNovaTarefa}
            ref={(el) => {this.nova_tarefa = el}}/>

            <input className="data_input" type="date" name="tarefa_data" 
            value={this.state.tarefa_data}
            onChange={this.inserirNovaTarefa}
            ref={(el) => {this.tarefa_data = el}}/>

            <select className="estado_input" name="estado_tarefa" value={this.state.estado_tarefa} 
            onChange={this.inserirNovaTarefa}>
                  <option value="done">Done</option>
                  <option value="not_done">Not Done</option>
            </select>
          </form>
        </div>

        <div>
          <ul>
            {this.state.tarefas.map((item, index) => {
              return <li className="lista_item" key={"frase" + index}>
              {
                (this.state.editandoTarefa === index) ?
                <input onChange={this.mudarTarefa.bind(this, index)} value={item.text}/> : <p>{item.text}</p>
              }
               <input type="date" name="" value={this.state.tarefa_data} onChange={this.handleNovaTarefa}/>
              

              <button onClick={this.estadoToggle.bind(this, index)}>
              Mudar Estado
              </button>
              <button onClick={this.removerTarefa.bind(this, index)} 
              disabled={(!isNaN (this.state.editandoTarefa) && this.state.editandoTarefa !== null) ? "disabled" : ""}>
              Remover Tarefa
              </button>
              <button onClick={this.editarTarefa.bind(this, index)}>
                {(this.state.editandoTarefa === index) ? "stop edit" : "edit"}
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
