import React, { useState, useEffect } from 'react';
import styles from './GameDashboard.module.css';

// URL do seu backend
const API_URL = 'https://winnersapi-1.onrender.com/api';

const GameDashboard = () => {
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const gameNames = ['Nave Espacial', 'Reflexo Neon', 'Teste de Reação'];

    // Função para formatar segundos em MM:SS
    const formatTime = (seconds) => {
        if (seconds === undefined || seconds === null) return '00:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    // Função de busca de dados, agora separada para poder ser chamada pelo intervalo
    const fetchAllData = async () => {
        try {
            const [statsRes, ...leaderboardResponses] = await Promise.all([
                fetch(`${API_URL}/stats`),
                ...gameNames.map(name => fetch(`${API_URL}/leaderboard/${name}`))
            ]);

            if (!statsRes.ok) throw new Error('Falha ao buscar estatísticas.');
            const stats = await statsRes.json();
            
            const leaderboards = await Promise.all(
                leaderboardResponses.map(res => {
                    if (!res.ok) throw new Error('Falha ao buscar um dos leaderboards.');
                    return res.json();
                })
            );

            const organizedData = gameNames.reduce((acc, name, index) => {
                const gameStats = stats.find(s => s.gameName === name);
                acc[name] = {
                    leaderboard: leaderboards[index],
                    avgRating: gameStats ? gameStats.averageRating : 0,
                    totalRatings: gameStats ? gameStats.totalRatings : 0,
                };
                return acc;
            }, {});

            setGameData(organizedData);
            setError(null); // Limpa erros anteriores se a busca for bem-sucedida
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Garante que a tela de loading suma
        }
    };

    useEffect(() => {
        // 1. Busca os dados imediatamente quando o componente monta
        fetchAllData();

        // 2. Cria um intervalo para atualizar os dados a cada 30 segundos
        const intervalId = setInterval(fetchAllData, 30000); // 30000 ms = 30 segundos

        // 3. Limpa o intervalo quando o componente é desmontado para evitar vazamentos de memória
        return () => clearInterval(intervalId);
    }, []); // O array vazio [] garante que o useEffect rode apenas uma vez

    if (loading) {
        return <div className={styles.loading}>Carregando placares...</div>;
    }

    if (error) {
        return <div className={styles.error}>Erro ao carregar dados: {error}</div>;
    }

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.mainTitle}>Painel de Jogos</h1>
            <div className={styles.grid}>
                {gameNames.map(name => (
                    <div key={name} className={styles.gameCard}>
                        <h2 className={styles.gameTitle}>{name}</h2>
                        
                        <div className={styles.statsContainer}>
                            <div className={styles.statsItem}>
                                <span>Avaliação Média</span>
                                <span className={styles.rating}>
                                    {gameData[name].avgRating.toFixed(1)} ★
                                </span>
                            </div>
                            <div className={styles.statsSeparator}></div>
                            <div className={styles.statsItem}>
                                <span>Total de Votos</span>
                                <span className={styles.totalVotes}>
                                    {gameData[name].totalRatings}
                                </span>
                            </div>
                        </div>
                        
                        <div className={styles.tableContainer}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Jogador</th>
                                        {/* Cabeçalho dinâmico */}
                                        <th>{name === 'Nave Espacial' ? 'Tempo' : (name === 'Teste de Reação' ? 'Tempo (ms)' : 'Pontos')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gameData[name].leaderboard.length > 0 ? (
                                        gameData[name].leaderboard.map((entry, index) => (
                                            <tr key={entry._id || index}>
                                                <td>{index + 1}</td>
                                                <td>{entry.playerName}</td>
                                                {/* Célula de dados dinâmica */}
                                                <td>{name === 'Nave Espacial' ? formatTime(entry.timePlayed) : entry.score}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">Nenhum placar registrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameDashboard;
