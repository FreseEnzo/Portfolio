import React from 'react';
import Layout from '@theme/Layout';
import ParticlesBackground from '../components/ParticlesBackground';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <ParticlesBackground />
      <div className={styles.overlay}>
        <img src="img/perfil.jpg" alt="Minha Foto" className={styles.profileImage} />
        <h1 className={styles.heroTitle}>Meu Portfólio</h1>
        <p className={styles.heroSubtitle}>Engenheiro de Firmware</p>
        <a className={styles.button} href="#projetos">Ver Meus Projetos</a>
      </div>
    </header>
  );
}

function Projeto({ image, title, description, link }) {
  return (
    <div className={styles.projeto}>
      <img src={image} alt={title} className={styles.projetoImage} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} className={styles.projetoLink}>Ver Projeto</a>
    </div>
  );
}

function Projetos() {
  const projetos = [
    {
      image: 'img/projeto1.jpg',
      title: 'Projeto de Firmware 1',
      description: 'Descrição do Projeto de Firmware 1',
      link: '/projetos/projeto1',
    },
    {
      image: 'img/projeto2.jpg',
      title: 'Projeto de Firmware 2',
      description: 'Descrição do Projeto de Firmware 2',
      link: '/projetos/projeto2',
    },
    {
      image: 'img/projeto3.jpg',
      title: 'Projeto de Firmware 3',
      description: 'Descrição do Projeto de Firmware 3',
      link: '/projetos/projeto3',
    },
  ];

  return (
    <section id="projetos" className={styles.projetosSection}>
      <div className="container">
        <h2>Meus Projetos</h2>
        <div className={styles.projetosGrid}>
          {projetos.map((projeto, idx) => (
            <Projeto key={idx} {...projeto} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Meu Portfólio" description="Portfólio de um engenheiro de firmware">
      <HomepageHeader />
      <main>
        <Projetos />
      </main>
    </Layout>
  );
}
