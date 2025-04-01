import { useState, useEffect } from 'react'
import './App.css'
// Import Simple Icons
import { 
  SiReact, 
  SiTailwindcss, 
  SiTypescript, 
  SiPython, 
  SiSwift, 
  SiSvelte, 
  SiCss3,
  SiGit 
} from 'react-icons/si'
import { FiMapPin, FiHome, FiMail, FiGithub } from "react-icons/fi";

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  fork: boolean;
}

function App() {
  const [activePage, setActivePage] = useState('main')
  const [navbarPadding, setNavbarPadding] = useState('20px')
  const [blurValue, setBlurValue] = useState(25)
  const [underlineVisible, setUnderlineVisible] = useState(false)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  const togglePage = (page: string) => {
    setActivePage(page)
  }

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.github.com/users/Ondraaasek/repos?sort=updated&per_page=6')
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json()
        setRepos(data)
      } catch (error) {
        console.error('Error fetching repos:', error)
        setRepos([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    if (activePage === 'projects') {
      fetchRepos()
    }
  }, [activePage])

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement
      const scrollY = window.scrollY
      const isMobile = window.innerWidth <= 768

      if (!isMobile) {
        if (scrollY > 50) {
          setNavbarPadding('0')
          setBlurValue(15)
          setUnderlineVisible(true)
          navbar.classList.add('underline-visible')
          navbar.classList.add('scrolled')
        } else {
          setNavbarPadding('20px')
          setBlurValue(25)
          setUnderlineVisible(false)
          navbar.classList.remove('underline-visible')
          navbar.classList.remove('scrolled')
        }
      }

      navbar.style.backdropFilter = `blur(${blurValue}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [blurValue])

  return (
    <div>
      <nav className="navbar" style={{ padding: navbarPadding }}>
        <button className="logo-button">
          <img src="/assets/topographic-textures.jpg" alt="Logo" className="logo" />
          <span className="logo-text">yan5q/{activePage}</span>
        </button>
        <div className="nav-buttons">
          <button className={`nav-button ${activePage === 'main' ? 'active' : ''}`} onClick={() => togglePage('main')}>
            <FiHome className="nav-icon" />
            <span>main</span>
          </button>
          <button className={`nav-button ${activePage === 'projects' ? 'active' : ''}`} onClick={() => togglePage('projects')}>
            <FiGithub className="nav-icon" />
            <span>projects</span>
          </button>
        </div>
        <button className="nav-button contact-button">
          <FiMail className="nav-icon" />
          <span>contact</span>
        </button>
        {underlineVisible && <div className="underline" />}
      </nav>
      <div id="content">
        {activePage === 'main' && (
          <>
            <div className="page main-page">
              <p className="location">
                <FiMapPin size={14} /> Prague, Czech Republic
              </p>
              <h1 className="main-heading">Hey, I'm yan5q</h1>
              <p>I'm a cybersecurity student from Czech Republic, who likes learning new stuff, 
              coding, traveling, I'm currently learning C#, developing stuff around AI, and my main focus is front-end development.</p>
            </div>
            
            <div className="tech-stuff-i-work-with">
              <h2 className="tech-header">
                  Tech stuff i work with
              </h2>
            </div>
            <p className="tech-description">
                Here are the main technologies I use daily to build projects. I'm always exploring new tools and frameworks to expand my skills.
            </p>
            <div className="programming-grid">
              <button className="language-button react-button">
                <SiReact className="language-icon" />
                <div className="language-info">
                  <span className="language-name">React</span>
                  <span className="language-description">UI library</span>
                </div>
              </button>
              <button className="language-button tailwindcss-button">
                <SiTailwindcss className="language-icon" />
                <div className="language-info">
                  <span className="language-name">Tailwind</span>
                  <span className="language-description">CSS framework</span>
                </div>
              </button>
              <button className="language-button cursor-button">
                <img src="/assets/cdnlogo.com_cursor.svg" alt="Cursor" className="language-icon" />
                <div className="language-info">
                  <span className="language-name">Cursor</span>
                  <span className="language-description">AI-first IDE</span>
                </div>
              </button>
              <button className="language-button typescript-button">
                <SiTypescript className="language-icon" />
                <div className="language-info">
                  <span className="language-name">TypeScript</span>
                  <span className="language-description">Typed JS</span>
                </div>
              </button>
              <button className="language-button python-button">
                <SiPython className="language-icon" />
                <div className="language-info">
                  <span className="language-name">Python</span>
                  <span className="language-description">General purpose</span>
                </div>
              </button>
              <button className="language-button svelte-button">
                <SiSvelte className="language-icon" />
                <div className="language-info">
                  <span className="language-name">Svelte</span>
                  <span className="language-description">UI compiler</span>
                </div>
              </button>
              <button className="language-button css-button">
                <SiCss3 className="language-icon" />
                <div className="language-info">
                  <span className="language-name">CSS</span>
                  <span className="language-description">Styling</span>
                </div>
              </button>
              <button className="language-button swift-button">
                <SiSwift className="language-icon" />
                <div className="language-info">
                  <span className="language-name">Swift</span>
                  <span className="language-description">Apple dev</span>
                </div>
              </button>
            </div>
          </>
        )}
        {activePage === 'projects' && (
          <div className="page projects-page">
            <h1>My Projects</h1>
            <p className="projects-description">
              Here are some of my recent projects from GitHub. Click on any project to view it on GitHub.
            </p>
            {loading ? (
              <div className="loading">Loading projects...</div>
            ) : repos.length === 0 ? (
              <div className="loading">No projects found. Please try again later.</div>
            ) : (
              <div className="projects-grid">
                {repos.map((repo) => (
                  <a 
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-button"
                  >
                    <div className="project-info">
                      <h3>{repo.name}</h3>
                      <p>{repo.description || 'No description available'}</p>
                      <div className="project-meta">
                        <span className="project-language">{repo.language || 'Unknown'}</span>
                        <span className="project-stars">
                          <FiGithub className="star-icon" />
                          {repo.stargazers_count}
                        </span>
                        {repo.fork && <span className="project-fork">Forked</span>}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <footer>
        <hr />
        <div className="footer-content">
          <h3>yan5q</h3>
          <p>Student and Developer • 2025 
            <span className="version-tag">
              <a href="https://github.com/Ondraaasek" target="_blank" rel="noopener noreferrer" className="github-link">
                <SiGit className="git-icon" />
              </a>
              <code>v3.1</code>
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
