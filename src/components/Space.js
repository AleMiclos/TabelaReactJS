import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Space extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alunos: []
    };

    this.buscarAlunos = this.buscarAlunos.bind(this);
  }

  componentDidMount() {
    this.buscarAlunos(); // Busca os alunos ao montar o componente
    this.interval = setInterval(this.buscarAlunos, 5000); // Atualiza a cada 5 segundos
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Limpa o intervalo ao desmontar o componente
  }

  // Função para buscar os alunos e seus scores
  buscarAlunos() {
    fetch('https://apimongodb-3dq1.onrender.com/scores/spaceship')  // Altere para a URL da sua API, se necessário
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

export default Space;
