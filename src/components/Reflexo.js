import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Reflexo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alunos: []
    };

    this.buscarAlunos = this.buscarAlunos.bind(this);
  }

  componentDidMount() {
    this.buscarAlunos(); 
    this.interval = setInterval(this.buscarAlunos, 5000); 
  }

  componentWillUnmount() {
    clearInterval(this.interval); 
  }

  // Função para buscar os alunos e seus scores
  buscarAlunos() {
    fetch('https://reflexo-game.onrender.com/api/results')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => this.setState({ alunos: data, error: null })) // Reseta o erro
      .catch(error => this.setState({ error: error.message })); // Armazena o erro
  }

  renderTabela() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Posição</th> {/* Nova coluna para a posição */}
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {this.state.alunos.map((aluno, index) => (
            <tr key={aluno._id}>
              <td>{index + 1}</td> {/* Exibe a posição com base no índice */}
              <td>{aluno.username}</td>
              <td>{aluno.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <div>
        <br />
        {this.renderTabela()}
      </div>
    );
  }
}

export default Reflexo;
