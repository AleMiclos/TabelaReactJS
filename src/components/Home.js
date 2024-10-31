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

        <ul className="tabela">
         <li><a href="/Genius">Tabela de Pontos do jogo do Genius</a></li> 
         <li><a href="/Space"> Tabela de Pontos do jogo da Navinha</a></li> 
         <li><a href="/Reflexo">Tabela de Pontos do jogo do Reflexo</a></li> 
        </ul>
      </div>
    );
  }
}
