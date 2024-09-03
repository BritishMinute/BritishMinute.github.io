// Particle background
particlesJS('particle-container', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00ffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('menu-active');
    nav.classList.toggle('menu-active');
});

// Typewriter effect for tagline
const taglines = [
    "Coding Virtuoso",
    "Problem Solver Extraordinaire",
    "Tech Innovation Catalyst",
    "Future Industry Disruptor"
];

let currentTaglineIndex = 0;
const taglineElement = document.querySelector("#tagline");

function typeWriter(text, i = 0) {
    if (i < text.length) {
        taglineElement.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    const text = taglineElement.innerHTML;
    if (text.length > 0) {
        taglineElement.innerHTML = text.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
        typeWriter(taglines[currentTaglineIndex]);
    }
}

typeWriter(taglines[currentTaglineIndex]);

// Skills graph
function createSkillsGraph() {
    const skills = [
        { name: 'JavaScript', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'React', level: 80 },
        { name: 'Node.js', level: 75 },
        { name: 'SQL', level: 70 }
    ];

    const graph = document.getElementById('skills-graph');
    skills.forEach(skill => {
        const bar = document.createElement('div');
        bar.className = 'skill-bar';
        bar.style.width = '0%';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'skill-name';
        nameSpan.textContent = skill.name;
        
        const levelSpan = document.createElement('span');
        levelSpan.className = 'skill-level';
        levelSpan.textContent = `${skill.level}%`;
        
        bar.appendChild(nameSpan);
        bar.appendChild(levelSpan);
        graph.appendChild(bar);

        gsap.to(bar, {
            width: `${skill.level}%`,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

createSkillsGraph();

// Network Visualization
function createNetworkVisualization() {
    const container = document.getElementById('network-visualization');
    const width = container.clientWidth;
    const height = container.clientHeight;

    const nodes = Array.from({ length: 20 }, (_, i) => ({ id: i }));
    const links = [];

    for (let i = 0; i < nodes.length; i++) {
        const numLinks = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numLinks; j++) {
            const target = Math.floor(Math.random() * nodes.length);
            if (target !== i) {
                links.push({ source: i, target });
            }
        }
    }

    const simulation = d3.forceSimulation(nodes)
        .force('charge', d3.forceManyBody().strength(-50))
        .force('link', d3.forceLink(links).distance(50))
        .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(container).append('svg')
        .attr('width', width)
        .attr('height', height);

    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke', '#00ffff')
        .attr('stroke-opacity', 0.6);

    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 5)
        .attr('fill', '#00ffff');

    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });
}

createNetworkVisualization();

// Animated section entries
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Glitch effect on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / maxScroll) * 100;

    document.getElementById('glitch-overlay').style.opacity = scrollPercentage / 1000;
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow-bg 5s linear infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}