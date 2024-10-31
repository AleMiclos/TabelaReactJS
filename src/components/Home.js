import React, { Component } from 'react';
import './Home.css'; // Importa o CSS

export class Home extends Component {
  render() {
    return (
      <div className="home-container"> {/* Adiciona a classe ao div */}
        <h1>Bem-vindo à tabela de Pontos</h1>
        <p>Esta é uma aplicação de testes desenvolvida durante a disciplina Mobile Web Development utilizando as seguintes tecnologias:</p>
        <ul>
          <li>MongoDB</li>
          <li>ReactJS</li>
        </ul>

        <h3>
          <a href="/Genius">Tabela de Pontos do jogo do Genius</a>
          <a href="/Space"> Tabela de Pontos do jogo da Navinha</a>
          <a href="/Reflexo">Tabela de Pontos do jogo do Reflexo</a>
        </h3>
      </div>
    );
  }
}
