import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  useEffect(() => {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');

    // Configure canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Position of the profile image
    const profileX = canvas.width / 2;
    const profileY = canvas.height / 2;

    const colors = ['#161A30', '#31304D', '#B6BBC4', '#F0ECE5'];
    const circles = [];
    const gravityStrength = -0.03;
    const maxDistance = 230;
    const repulsionStrength = 0.02;

    // Circle constructor with electronics theme
    function Circle(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.radius = Math.random() * 20 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.dx = Math.random() - 0.5;
      this.dy = Math.random() - 0.5;
      this.mouseX = 0;
      this.mouseY = 0;

      // Draw method for each circle
      this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      };

      // Update position and redraw
      this.update = function () {
        const dx = profileX - this.x;
        const dy = profileY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const accelerationX = (dx / distance) * gravityStrength;
          const accelerationY = (dy / distance) * gravityStrength;
          this.dx += accelerationX;
          this.dy += accelerationY;
        }

        const mouseDistX = this.x - this.mouseX;
        const mouseDistY = this.y - this.mouseY;
        const mouseDistance = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);

        if (mouseDistance < maxDistance) {
          const repulsionX = (mouseDistX / mouseDistance) * repulsionStrength;
          const repulsionY = (mouseDistY / mouseDistance) * repulsionStrength;
          this.dx += repulsionX;
          this.dy += repulsionY;
        }

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
          } else {
            this.x = this.radius;
          }
          this.dx *= -0.9;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
          } else {
            this.y = this.radius;
          }
          this.dy *= -0.9;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      };
    }

    function init() {
      for (let i = 0; i < 200; i++) {
        circles.push(new Circle());
      }
      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(circle => circle.update());
    }

    init();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      circles.length = 0;
      init();
    });

    canvas.addEventListener('mousemove', (event) => {
      circles.forEach(circle => {
        circle.mouseX = event.clientX;
        circle.mouseY = event.clientY;
      });
    });

    canvas.addEventListener('mousedown', (event) => {
      circles.push(new Circle(event.clientX, event.clientY));
    });

    return () => {
      window.removeEventListener('resize', () => {});
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mousedown', () => {});
    };

  }, []);

  const scrollToProjects = (event) => {
    event.preventDefault();
    scroll.scrollTo('project', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <header className={styles.heroBanner}>
      <canvas id="backgroundCanvas" className={styles.backgroundCanvas}></canvas>
      <div className={styles.overlay}>
        <img src="img/perfil.jpeg" alt="PerfilPic" className={styles.profileImage} />
        <h1 className={styles.heroTitle}>Enzo Frese</h1>
        <p className={styles.heroSubtitle}>Electronics Engineer</p>
        <a className={styles.button} href="#projetos" onClick={scrollToProjects}>See my projects</a>
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
      <a href={link} className={styles.projetoLink}>See Project</a>
    </div>
  );
}

function Projetos() {
  const projetos = [
    {
      image: 'img/Project_PID.jpeg',
      title: 'PID - DRL',
      description: 'Experiments on controlling robotic manipulators with the application of artificial intelligence techniques',
      link: '/projects/project_PID_DRL',
    },
    {
      image: 'img/projeto2.jpg',
      title: 'Projeto de  2',
      description: 'Descrição do Projeto de Firmware 2',
      link: '/projects/projeto2',
    },
    {
      image: 'img/projeto3.jpg',
      title: 'Projeto de Firmware 3',
      description: 'Descrição do Projeto de Firmware 3',
      link: '/projects/projeto3',
    },
  ];

  return (
    <section id="projetos" className={styles.projetosSection}>
      <div className="container">
        <h2>My Projects</h2>
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
    <Layout title="My Portfolio" description="lalal">
      <HomepageHeader />
      <main>
        <Projetos />
      </main>
    </Layout>
  );
}
