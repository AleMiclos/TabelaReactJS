import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Alunos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alunos: []
    };

    this.buscarAlunos = this.buscarAlunos.bind(this);
  }

  componentDidMount() {
    this.buscarAlunos();
  }

  // Função para buscar os alunos e seus scores
  buscarAlunos() {
    fetch('https://apimongodb-3dq1.onrender.com/scores')  // Substitua pela URL da sua API no Vercel
      .then(response => response.json())
      .then(data => this.setState({ alunos: data }))
      .catch(console.log);
  }

  // Função para renderizar a tabela com nome e score
  renderTabela() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {this.state.alunos.map((aluno) => (
            <tr key={aluno._id}>
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

export default Alunos;
