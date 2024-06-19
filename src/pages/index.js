import React, { useEffect } from 'react';
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

    const colors = ['#070F2B', '#1B1A55', '#535C91', '#535C91', '#9290C3'];
    const circles = [];
    const gravityStrength = -0.03;
    const maxDistance = 200;
    const repulsionStrength = 0.03; // Adjust repulsion strength here

    // Circle constructor with electronics theme
    function Circle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 5 + 1;
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
        // Gravity effect towards profile image
        const dx = profileX - this.x;
        const dy = profileY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const accelerationX = (dx / distance) * gravityStrength;
          const accelerationY = (dy / distance) * gravityStrength;
          this.dx += accelerationX;
          this.dy += accelerationY;
        }

        // Mouse repulsion effect
        const mouseDistX = this.x - this.mouseX;
        const mouseDistY = this.y - this.mouseY;
        const mouseDistance = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY);

        if (mouseDistance < maxDistance) {
          const repulsionX = (mouseDistX / mouseDistance) * repulsionStrength;
          const repulsionY = (mouseDistY / mouseDistance) * repulsionStrength;
          this.dx += repulsionX;
          this.dy += repulsionY;
        }

        // Update position
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          // Adjust X position to prevent sticking to the border
          if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
          } else {
            this.x = this.radius;
          }
          this.dx *= -0.9; // Reverse direction with speed reduction
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          // Adjust Y position to prevent sticking to the border
          if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
          } else {
            this.y = this.radius;
          }
          this.dy *= -0.9; // Reverse direction with speed reduction
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      };

    }

    // Initialize animation
    function init() {
      for (let i = 0; i < 200; i++) {
        circles.push(new Circle());
      }
      animate();
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach(circle => circle.update());
    }

    // Event listeners
    init();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      circles.length = 0;
      init();
    });

    window.addEventListener('mousemove', (event) => {
      circles.forEach(circle => {
        circle.mouseX = event.clientX;
        circle.mouseY = event.clientY;
      });
    });

    // Cleanup function for useEffect
    return () => {
      window.removeEventListener('resize', () => {});
      window.removeEventListener('mousemove', () => {});
    };

  }, []); // useEffect runs only once with empty dependency array

  return (
    <header className={styles.heroBanner}>
      <canvas id="backgroundCanvas" className={styles.backgroundCanvas}></canvas>
      <div className={styles.overlay}>
        <img src="img/perfil.jpeg" alt="Minha Foto" className={styles.profileImage} />
        <h1 className={styles.heroTitle}>Enzo Frese</h1>
        <p className={styles.heroSubtitle}>Electronics Engineer</p>
        <a className={styles.button} href="#projetos">See my projects</a>
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
    <section id="Projects" className={styles.projetosSection}>
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
    <Layout title="My Portfolio" description="lalal">
      <HomepageHeader />
      <main>
        <Projetos />
      </main>
    </Layout>
  );
}
