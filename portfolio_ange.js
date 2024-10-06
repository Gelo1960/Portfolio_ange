// Enregistrement de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Three.js setup pour un arrière-plan 3D immersif
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.setZ(30);

// Ajouter un nuage de particules
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.2,
  color: 0xffffff
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Modifier la fonction animate
function animate() {
  requestAnimationFrame(animate);

  // Rotation du nuage de particules
  particlesMesh.rotation.y += 0.0005;

  // Ajuster la position des particules en fonction du scroll
  const scrollY = window.scrollY;
  particlesMesh.position.y = -scrollY * 0.0005;

  renderer.render(scene, camera);
}

animate();

// Interactivité avec la souris
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX / window.innerWidth - 0.5;
  mouseY = event.clientY / window.innerHeight - 0.5;

  particlesMesh.rotation.y = mouseX * 2;
  particlesMesh.rotation.x = mouseY * 2;
});

// Ajouter un écouteur d'événement pour le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animations GSAP
gsap.from('.header-content h1', { opacity: 0, y: -50, duration: 1 });
gsap.from('.header-content .subheader', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from('.header-content .btn', { opacity: 0, scale: 0.5, duration: 1, delay: 1 });

// Transition entre Header et Présentation
gsap.to('.header-content', {
  scrollTrigger: {
    trigger: '#presentation',
    start: 'top 80%',
    end: 'top 20%',
    scrub: true,
  },
  y: -100,
  opacity: 0,
});

gsap.from('.presentation-content', {
  scrollTrigger: {
    trigger: '#presentation',
    start: 'top 80%',
    end: 'top 20%',
    scrub: true,
  },
  y: 100,
  opacity: 0,
});

// Transition entre Présentation et Expérience
gsap.to('.presentation-content', {
  scrollTrigger: {
    trigger: '#experience',
    start: 'top 80%',
    end: 'top 20%',
    scrub: true,
  },
  y: -100,
  opacity: 0,
});

gsap.from('#experience .section-title', {
  scrollTrigger: {
    trigger: '#experience',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 1
});

// Animation des éléments d'expérience
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
    },
    x: i % 2 === 0 ? -100 : 100,
    opacity: 0,
    duration: 1
  });
});

// Transition entre Expérience et Compétences
gsap.to('#experience', {
  scrollTrigger: {
    trigger: '#skills',
    start: 'top 80%',
    end: 'top 20%',
    scrub: true,
  },
  y: -100,
  opacity: 0,
});

gsap.from('#skills .section-title', {
  scrollTrigger: {
    trigger: '#skills',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 1
});

// Animation des barres de compétences
gsap.utils.toArray('.skill').forEach(skill => {
  const progress = skill.querySelector('.progress');
  const width = progress.dataset.width;
  
  gsap.from(progress, {
    scrollTrigger: {
      trigger: skill,
      start: 'top 85%',
    },
    width: 0,
    duration: 1.5,
    ease: 'power2.out'
  });
});

// Validation du formulaire de contact
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  // Ici, vous pouvez ajouter le code pour envoyer le formulaire
  alert('Merci pour votre message ! Je vous répondrai dès que possible.');
  form.reset();
});

// Animation pour la section de présentation
gsap.from('.presentation-text', {
  scrollTrigger: {
    trigger: '.presentation-section',
    start: 'top 80%',
  },
  x: -50,
  opacity: 0,
  duration: 1
});

gsap.from('.presentation-skills', {
  scrollTrigger: {
    trigger: '.presentation-section',
    start: 'top 80%',
  },
  x: 50,
  opacity: 0,
  duration: 1
});


// GSAP Animation pour les éléments de la présentation
gsap.utils.toArray('.story-part').forEach((part, i) => {
  gsap.fromTo(part, {
    opacity: 0,
    y: 50,
  }, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: part,
      start: "top 80%",
      end: "bottom 60%",
      scrub: true,
      markers: false,
    },
    delay: i * 0.5,  // Ajout d'un délai pour que chaque partie apparaisse de manière séquentielle
    duration: 1
  });
});
