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
  SiGit,
  SiJavascript,
  SiHtml5,
  SiCplusplus,
  SiRust,
  SiGo,
  SiKotlin,
  SiRuby,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiGooglecloud,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiSpringboot,
  SiLaravel,
  SiRubyonrails,
  SiGraphql,
  SiWebpack,
  SiBabel,
  SiJest,
  SiCypress,
  SiGitlab,
  SiBitbucket,
  SiJira,
  SiConfluence,
  SiSlack,
  SiDiscord,
  SiTelegram,
  SiIntellijidea,
  SiPycharm,
  SiWebstorm,
  SiAndroidstudio,
  SiXcode,
  SiSublimetext,
  SiNotepadplusplus,
  SiEclipseide,
  SiNetbsd,
  SiPhpstorm,
  SiJetbrains,
  SiC,
  SiShell
} from 'react-icons/si'
import { FiMapPin, FiHome, FiMail, FiGithub } from "react-icons/fi";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stars: number;
  forks: number;
  languages: string[];
  languageBytes: number;
}

function App() {
  const [activePage, setActivePage] = useState('main')
  const [navbarPadding, setNavbarPadding] = useState('20px')
  const [blurValue, setBlurValue] = useState(25)
  const [underlineVisible, setUnderlineVisible] = useState(false)
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  const togglePage = (page: string) => {
    setActivePage(page)
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching projects...');
        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
        };
        
        const response = await fetch('https://api.github.com/users/Ondraaasek/repos?sort=updated&per_page=6', {
          headers
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('GitHub API error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
          throw new Error(`GitHub API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        
        if (!Array.isArray(data) || data.length === 0) {
          console.log('No repositories found');
          setProjects([]);
          setLoading(false);
          return;
        }
        
        const projectsWithDetails = await Promise.all(data.map(async (repo: any) => {
          try {
            console.log(`Fetching languages for ${repo.name}...`);
            const languagesResponse = await fetch(repo.languages_url, {
              headers
            });
            
            if (!languagesResponse.ok) {
              console.error(`Failed to fetch languages for ${repo.name}:`, {
                status: languagesResponse.status,
                statusText: languagesResponse.statusText
              });
              return {
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                languages: [repo.language || 'Unknown'],
                languageBytes: 0
              };
            }
            
            const languagesData = await languagesResponse.json();
            console.log(`Languages for ${repo.name}:`, languagesData);
            
            const languages = Object.entries(languagesData)
              .map(([name, bytes]) => ({ name, bytes }))
              .sort((a, b) => (b.bytes as number) - (a.bytes as number))
              .slice(0, 3);

            return {
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              languages: languages.map(lang => lang.name),
              languageBytes: languages.reduce((acc, lang) => acc + (lang.bytes as number), 0)
            };
          } catch (error) {
            console.error(`Error processing repository ${repo.name}:`, error);
            return {
              name: repo.name,
              description: repo.description,
              html_url: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              languages: [repo.language || 'Unknown'],
              languageBytes: 0
            };
          }
        }));

        console.log('Processed projects:', projectsWithDetails);
        setProjects(projectsWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
        setLoading(false);
      }
    };

    if (activePage === 'projects') {
      fetchProjects();
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

  const getLanguageIcon = (language: string) => {
    const languageMap: { [key: string]: any } = {
      'JavaScript': SiJavascript,
      'TypeScript': SiTypescript,
      'Python': SiPython,
      'C++': SiCplusplus,
      'C': SiC,
      'Shell': SiShell,
      'Rust': SiRust,
      'Go': SiGo,
      'Kotlin': SiKotlin,
      'Ruby': SiRuby,
      'PHP': SiPhp,
      'HTML': SiHtml5,
      'CSS': SiCss3,
      'React': SiReact,
      'Vue': SiVuedotjs,
      'Angular': SiAngular,
      'Next.js': SiNextdotjs,
      'Node.js': SiNodedotjs,
      'Express': SiExpress,
      'Django': SiDjango,
      'Flask': SiFlask,
      'Spring': SiSpringboot,
      'Laravel': SiLaravel,
      'Rails': SiRubyonrails,
      'GraphQL': SiGraphql,
      'Webpack': SiWebpack,
      'Babel': SiBabel,
      'Jest': SiJest,
      'Cypress': SiCypress,
      'GitLab': SiGitlab,
      'Bitbucket': SiBitbucket,
      'Jira': SiJira,
      'Confluence': SiConfluence,
      'Slack': SiSlack,
      'Discord': SiDiscord,
      'Telegram': SiTelegram,
      'IntelliJ IDEA': SiIntellijidea,
      'PyCharm': SiPycharm,
      'WebStorm': SiWebstorm,
      'Android Studio': SiAndroidstudio,
      'Xcode': SiXcode,
      'Sublime Text': SiSublimetext,
      'Notepad++': SiNotepadplusplus,
      'Eclipse': SiEclipseide,
      'NetBeans': SiNetbsd,
      'PhpStorm': SiPhpstorm,
      'Rider': SiJetbrains,
      'MySQL': SiMysql,
      'PostgreSQL': SiPostgresql,
      'MongoDB': SiMongodb,
      'Redis': SiRedis,
      'Docker': SiDocker,
      'Kubernetes': SiKubernetes,
      'AWS': SiAmazon,
      'Google Cloud': SiGooglecloud,
      'Svelte': SiSvelte
    };

    const Icon = languageMap[language] || SiGit;
    // Map language names to their correct data-icon values
    const iconMap: { [key: string]: string } = {
      'HTML': 'html5',
      'CSS': 'css3',
      'Svelte': 'svelte',
      'C': 'c',
      'Shell': 'shell'
    };
    const dataIcon = iconMap[language] || language.toLowerCase().replace(/[^a-z0-9]/g, '');
    return <Icon className="language-icon-small" data-icon={dataIcon} />;
  };

  return (
    <div>
      <nav className="navbar" style={{ padding: navbarPadding }}>
        <button className="logo-button">
          <img src="/assets/topographic-textures.jpg" alt="Logo" className="logo" />
          <span className="logo-text">
            <span className="logo-prefix">yan5q</span>
            <span className="logo-slash">/</span>
            <span className="logo-suffix">{activePage}</span>
          </span>
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
            ) : projects.length === 0 ? (
              <div className="loading">No projects found. Please try again later.</div>
            ) : (
              <div className="projects-grid">
                {projects.map((repo) => (
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
                        <span className="project-language">
                          {repo.languages.map((lang, index) => (
                            <span key={lang} className="language-item">
                              {getLanguageIcon(lang)}
                              {lang}
                              {index < repo.languages.length - 1 && ', '}
                            </span>
                          ))}
                        </span>
                        <span className="project-stars">
                          <FiGithub className="star-icon" />
                          {repo.stars}
                        </span>
                        {repo.forks > 0 && <span className="project-fork">Forked</span>}
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
