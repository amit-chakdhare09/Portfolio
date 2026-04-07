import { useEffect } from "react";
import heroImage1 from "../assets/hero-image-1.jpeg";
import heroImage2 from "../assets/hero-image-2.jpeg";
import section2Image from "../assets/section2-image.jpeg";
import section3Image from "../assets/section3-image.jpeg";
import contactImage from "../assets/contact-image.jpeg";
import cornerMascot from "../assets/corner-mascot.gif";
import helloSakhiImage from "../assets/hello-sakhi.png";
import photoBoothImage from "../assets/photo-booth.png";

function App() {
  useEffect(() => {
    let cancelled = false;
    // @ts-expect-error runtime JS module initialized after mount
    void import("../script.js").then((module) => {
      if (!cancelled && typeof module.initPortfolioEffects === "function") {
        module.initPortfolioEffects();
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="parallax-scene" aria-hidden="true">
        <div className="orb orb-1" data-parallax-layer="0.08"></div>
        <div className="orb orb-2" data-parallax-layer="0.14"></div>
        <div className="orb orb-3" data-parallax-layer="0.2"></div>
      </div>

      <header className="site-header">
        <a className="brand" href="#home">
          Amit Chakdhare
        </a>
        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Toggle navigation"
          aria-expanded="false"
          aria-controls="mainNav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="main-nav" id="mainNav" aria-label="Primary">
          <span className="nav-slider" aria-hidden="true"></span>
          <a href="#home" className="active" aria-current="page">
            Home
          </a>
          <a href="#about">About</a>
          <a href="#toolkit">Skills</a>
          <a href="#sectionPin">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="container" id="home" data-scroll-container>
        <main className="portfolio">
          <section className="hero card">
            <div className="hero-layout">
              <div className="hero-text">
                <p className="eyebrow">Machine Learning Engineer</p>
                <h1>Amit Omprakash Chakdhare</h1>
                <p className="lead">
                  Artificial Intelligence Developer passionate about building intelligent systems. I
                  specialize in OpenCV, Python, and machine learning to solve real-world problems.
                </p>
                <div className="hero-actions">
                  <a className="btn" href="#sectionPin">
                    View Projects
                  </a>
                  <a className="btn ghost" href="#contact">
                    Contact Me
                  </a>
                  <a
                    className="btn ghost"
                    id="resumeButton"
                    href="/assets/Amit_Chakdhare_Resume.pdf"
                    download
                  >
                    Download Resume
                  </a>
                </div>
              </div>
              <div className="hero-images">
                <img src={heroImage1} alt="Blossoming tree under a blue sky" decoding="async" />
                <img
                  src={heroImage2}
                  alt="Soft floral image with blue and pink tones"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>

          <section className="card" id="about">
            <div className="about-layout">
              <div className="about-image-wrap">
                <img
                  src={section2Image}
                  alt="Soft floral blur artwork for about section"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="about-text">
                <h2>About</h2>
                <p>
                  I&apos;m Amit Chakdhare, a B.Tech AI student (Class of 2027) passionate about building
                  intelligent systems at the intersection of Machine Learning, Computer Vision, and Software
                  Development.
                </p>
                <p>
                  I enjoy turning ideas into real-world applications whether it&apos;s training deep learning
                  models, working with data pipelines, or building interactive web interfaces using React and
                  TypeScript. My work spans across Python-based ML ecosystems (PyTorch, TensorFlow,
                  Scikit-learn) and full-stack fundamentals.
                </p>
                <p>
                  I&apos;m especially interested in solving complex problems using AI, with a growing focus on
                  computer vision and real-time systems. I also explore cloud technologies like AWS and
                  Google Cloud to understand how scalable AI systems are built and deployed.
                </p>
                <p>
                  Beyond coding, I&apos;m driven by curiosity about space and emerging technologies, and I&apos;m
                  always looking to push my limits through projects, internships, and collaborations.
                </p>
              </div>
            </div>
          </section>

          <section className="card" id="toolkit">
            <div className="toolkit-layout">
              <div className="toolkit-text">
                <h2>Skills</h2>
                <div className="skills-groups">
                  <div className="skills-group">
                    <h3>Frontend Development</h3>
                    <div className="chip-grid">
                      <span>HTML</span>
                      <span>CSS</span>
                      <span>JavaScript</span>
                      <span>TypeScript</span>
                      <span>React</span>
                    </div>
                  </div>

                  <div className="skills-group">
                    <h3>Backend &amp; Programming Languages</h3>
                    <div className="chip-grid">
                      <span>Python</span>
                      <span>C++</span>
                    </div>
                  </div>

                  <div className="skills-group">
                    <h3>Databases</h3>
                    <div className="chip-grid">
                      <span>MySQL</span>
                      <span>PostgreSQL</span>
                      <span>MongoDB</span>
                    </div>
                  </div>

                  <div className="skills-group">
                    <h3>Machine Learning &amp; Data Science</h3>
                    <div className="chip-grid">
                      <span>PyTorch</span>
                      <span>TensorFlow</span>
                      <span>Keras</span>
                      <span>Scikit-learn</span>
                      <span>NumPy</span>
                      <span>Pandas</span>
                      <span>Matplotlib</span>
                      <span>Seaborn</span>
                      <span>OpenCV</span>
                      <span>MediaPipe</span>
                      <span>SciPy</span>
                      <span>XGBoost</span>
                      <span>LightGBM</span>
                      <span>Data Preprocessing</span>
                      <span>Feature Engineering</span>
                      <span>Deep Learning</span>
                      <span>Computer Vision</span>
                      <span>Natural Language Processing</span>
                    </div>
                  </div>

                  <div className="skills-group">
                    <h3>Cloud Platforms</h3>
                    <div className="chip-grid">
                      <span>AWS (Amazon Web Services)</span>
                      <span>Google Cloud Platform</span>
                    </div>
                  </div>

                  <div className="skills-group">
                    <h3>Tools &amp; Development Environment</h3>
                    <div className="chip-grid">
                      <span>Jupyter Notebook</span>
                      <span>Git</span>
                      <span>GitHub</span>
                      <span>VS Code</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="toolkit-image-wrap">
                <img
                  src={section3Image}
                  alt="Textured floral image for skills section"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>
        </main>

        <section id="sectionPin" className="horizontal-section">
          <div className="pin-wrap">
            <article className="project-panel project-intro">
              <h2>
                Projects <span className="project-arrow">&rarr;</span>
              </h2>
              <p>Scroll down to move sideways through selected work.</p>
              <div className="project-links">
                <a
                  className="repo-link"
                  href="https://github.com/amit-chakdhare09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              </div>
            </article>

            <article className="project-panel">
              <div className="project-split">
                <div className="project-summary">
                  <h3>Integrated-Object-Pose-Detection-Pipeline</h3>
                  <p>
                    A computer vision pipeline that performs object detection and pose estimation on images
                    and videos using a modular, real-time processing approach.
                  </p>
                  <div className="project-links">
                    <a
                      className="repo-link"
                      href="https://github.com/amit-chakdhare09/Integrated-Object-Pose-Detection-Pipeline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub Repo
                    </a>
                  </div>
                </div>
                <div className="project-output">
                  <div className="project-video-shell">
                    <iframe
                      src="https://www.youtube.com/embed/FrsEe6ilK90?si=T8ZMi7tC3-SNyBge"
                      title="Integrated Object Pose Detection Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      loading="lazy"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              <span>Python</span>
            </article>

            <article className="project-panel">
              <div className="project-split">
                <div className="project-summary">
                  <h3>Lane-Detection-Object-Hazard-System</h3>
                  <p>
                    A vision-based system that detects road lanes and identifies potential hazards from video
                    input through multi-stage real-time processing.
                  </p>
                  <div className="project-links">
                    <a
                      className="repo-link"
                      href="https://github.com/amit-chakdhare09/Lane-Detection-Object-Hazard-System"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub Repo
                    </a>
                  </div>
                </div>
                <div className="project-output">
                  <div className="project-video-shell">
                    <iframe
                      src="https://www.youtube.com/embed/yDZqH25VjeI?si=QwPeKPTxIvAdgv0N"
                      title="Lane Detection Project Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      loading="lazy"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              <span>Jupyter Notebook</span>
            </article>

            <article className="project-panel">
              <div className="project-split">
                <div className="project-summary">
                  <h3>Enhanced-MediaPipe-Pose-Estimation</h3>
                  <p>
                    A real-time pose estimation system that detects and tracks human body keypoints with
                    continuous tracking and visualization.
                  </p>
                  <div className="project-links">
                    <a
                      className="repo-link"
                      href="https://github.com/amit-chakdhare09/Enhanced-MediaPipe-Pose-Estimation"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub Repo
                    </a>
                  </div>
                </div>
                <div className="project-output">
                  <div className="project-video-shell">
                    <iframe
                      src="https://www.youtube.com/embed/tH-Nks6i70g?si=0Nres3w7WmNNziHF"
                      title="Enhanced MediaPipe Pose Detection Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      loading="lazy"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
              <span>Python</span>
            </article>

            <article className="project-panel">
              <div className="project-split">
                <div className="project-summary">
                  <h3>Hello-Sakhi</h3>
                  <p>
                    An HTML-based website designed to help users report cases related to women&apos;s safety,
                    focusing on accessibility and user-friendly reporting.
                  </p>
                  <div className="project-links">
                    <a
                      className="repo-link"
                      href="https://github.com/amit-chakdhare09/Hello-Sakhi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub Repo
                    </a>
                    <a
                      className="repo-link live-link"
                      href="https://main--hellosakhi.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live Demo
                    </a>
                  </div>
                </div>
                <div className="project-output">
                  <div className="project-media-shell">
                    <img
                      src={helloSakhiImage}
                      alt="Hello Sakhi live deployment preview"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              <span>HTML</span>
            </article>

            <article className="project-panel">
              <div className="project-split">
                <div className="project-summary">
                  <h3>Photo_Studio</h3>
                  <p>
                    A simple camera application that allows users to capture photos with different layouts,
                    providing an enhanced photo-taking experience.
                  </p>
                  <div className="project-links">
                    <a
                      className="repo-link"
                      href="https://github.com/amit-chakdhare09/Photo_Studio"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View GitHub Repo
                    </a>
                    <a
                      className="repo-link live-link"
                      href="https://amit-chakdhare09.github.io/Photo_Studio/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live Demo
                    </a>
                  </div>
                </div>
                <div className="project-output">
                  <div className="project-media-shell">
                    <img
                      src={photoBoothImage}
                      alt="Photo Studio app live deployment preview"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
              <span>JavaScript</span>
            </article>
          </div>
        </section>

        <main className="portfolio portfolio-bottom">
          <section className="card" id="contact">
            <div className="contact-layout">
              <div className="contact-content">
                <h2>Contact</h2>
                <p>Let&apos;s collaborate on intelligent systems, computer vision, or AI-driven products.</p>
                <div className="links">
                  <a href="https://github.com/amit-chakdhare09" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/amit-chakdhare-320150339"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a href="https://www.kaggle.com/amitchakdhare" target="_blank" rel="noopener noreferrer">
                    Kaggle
                  </a>
                </div>
              </div>
              <div className="contact-image-wrap">
                <img
                  src={contactImage}
                  alt="Blue floral tree artwork for contact section"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">Built by Amit Omprakash Chakdhare</footer>
      </div>

      <div className="corner-gif-wrap">
        <div className="meow-popup" id="meowPopup">
          meow
        </div>
        <img
          className="corner-gif"
          src={cornerMascot}
          alt="Pixel mascot animation"
          tabIndex={0}
          role="button"
          aria-label="Mascot says meow"
        />
      </div>
      <div className="custom-cursor" id="customCursor"></div>
    </>
  );
}

export default App;
