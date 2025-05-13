import React from 'react';
import { useEffect } from 'react';
import {
  Container, Row, Col,
  Card, ProgressBar, Form, Button
} from 'react-bootstrap';
import { FaPython, FaJs, FaGitAlt, FaGithub, FaCogs, FaTools, FaWrench, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaDatabase, FaReact, FaBolt, FaCode } from 'react-icons/fa';
import { SiCypress, SiTypescript, SiJira, SiYaml, SiPytest, SiK6, SiTestrail, SiDjango } from 'react-icons/si';
import ProjectCard from '../components/ProjectCard';
import { ProjectCardProps } from '../components/ProjectCard';

const ResumePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="text-center py-5">
        <Container>
          <h1 className="display-4">Grant Ponting</h1>
          <p className="lead">Full-Stack Developer with an Emphasis in QA</p>
          <div>
            <a href="/grant_resume.pdf" className="btn btn-primary me-2">Download CV</a>
            <a href="#contact" className="btn btn-outline-primary">Contact Me</a>
          </div>
        </Container>
      </section>

      {/* About */}
      <section id="about" className="py-5">
        <Container>
          <h2>About Me</h2>
          <p>
            I'm a Full-Stack Developer with a strong emphasis in Quality Assurance. With experience in both manual and automated testing,
            I build robust testing infrastructures using tools like Playwright, Cypress, and Pytest. I'm passionate about creating reliable,
            maintainable, and scalable QA systems that integrate seamlessly with CI/CD pipelines.
          </p>
        </Container>
      </section>

      {/* Experience */}
      <section id="experience" className="py-5">
        <Container>
          <h2>Experience</h2>
          <Row>
            {[
              {
                role: 'QA Engineer',
                company: 'QualityLogic',
                period: 'Dec 2021 – Present',
                desc: 'Created and maintained UI, API, and mobile automation tests using Playwright, Cypress, Pytest, and Detox. Built and maintained CI/CD pipelines using GitHub Actions and Azure DevOps. Developed reusable Page Object Model codebases and performance/load tests with K6.'
              },
              {
                role: 'Test Technician',
                company: 'QualityLogic',
                period: 'Feb 2020 – Dec 2021',
                desc: 'Manually and exploratorily tested websites. Created and maintained test cases using Jira, Zephyr, and Testrail.'
              }
            ].map((job, i) => (
              <Col md={6} key={i} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{job.role} @ {job.company}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.period}</Card.Subtitle>
                    <Card.Text>{job.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Professional Accomplishments */}
      <section id="accomplishments" className="py-5">
        <Container>
          <h2>Professional Accomplishments</h2>
          <Row>
            {[
              {
                title: 'Modular QA Automation Framework',
                role: 'QA Engineer, QualityLogic',
                highlights: [
                  'Designed and implemented a modular Page Object Model framework using Playwright and Pytest.',
                  'Integrated the framework into CI/CD pipelines using GitHub Actions and Azure DevOps.',
                  'Reduced test runtime by 40% through test prioritization and parallelization.',
                  'Abstracted reusable components for ease of onboarding and cross-project reuse.'
                ]
              },
              {
                title: 'Mobile App Automation Suite',
                role: 'QA Engineer, QualityLogic',
                highlights: [
                  'Built and maintained mobile automation tests using Detox for React Native apps.',
                  'Collaborated with developers to identify flaky test patterns and refactor UI flow validation.'
                ]
              }
            ].map((item, idx) => (
              <Col md={6} key={idx} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{item.role}</Card.Subtitle>
                    <ul className="mt-3">
                      {item.highlights.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Projects */}
      <section id="projects" className="py-5">
        <Container>
          <h2>Projects</h2>
          <Row>
            {[
              {
                title: 'Microservice Architecture Proof-of-Concept',
                tryLink: '/test-service',
                codeLink: 'https://github.com/grantponting/grantponting-site/tree/master/cloudflare-frontend/services',
                desc: 'Designed and implemented a modular microservice-based architecture to showcase service isolation and scalability. Demonstrated CI/CD integration and service-to-service communication patterns.',
                details: 'The microservice is implemented as a standalone React application using Vite with module federation for dynamic code sharing. It is deployed and served via Cloudflare.',
              },
              {
                title: 'Basic Login',
                tryLink: '/login',
                codeLink: 'https://github.com/grantponting/grantponting-site/tree/master/backend',
                desc: 'Designed and set up a basic login. Demonstrated ability to set up and utilize backend architecture.',
                details: 'When a new user registers, their username and email are stored in a Cloudflare-hosted database, and their password is securely hashed before being saved. The backend is built with Hono, providing lightweight and fast routing. Once logged in, users are able to view a profile page where they can edit the usernames of other existing users. The users login is persisted using access and refresh tokens that the backend verifies and sends out using jwt tokens.'
              }
            ].map((proj, i) => (
              <Col md={6} key={i} className="mb-4">
                <ProjectCard {...proj} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Skills */}
      <section id="skills" className="py-5">
        <Container>
          <h2>Skills</h2>
          <Row>
            <Col md={6}>
              <h5>Languages</h5>
              <ul className="list-unstyled">
                <li><FaJs className="me-2" /> JavaScript</li>
                <li><SiTypescript className="me-2" /> TypeScript</li>
                <li><FaPython className="me-2" /> Python</li>
                <li><SiYaml className="me-2" /> YAML</li>
                <li><FaCogs className="me-2" /> C#</li>
                <li><FaDatabase className="me-2" /> SQL</li>
              </ul>

              <h5 className="mt-4">Frontend Tools</h5>
              <ul className="list-unstyled">
                <li><FaReact className="me-2" /> React</li>
                <li><FaBolt className="me-2" /> Vite</li>
              </ul>

              <h5 className="mt-4">Testing Frameworks</h5>
              <ul className="list-unstyled">
                <li><FaTools className="me-2" /> Playwright</li>
                <li><SiCypress className="me-2" /> Cypress</li>
                <li><SiPytest className="me-2" /> Pytest</li>
                <li><FaTools className="me-2" /> NUnit</li>
                <li><FaTools className="me-2" /> Detox</li>
                <li><SiK6 className="me-2" /> K6</li>
              </ul>
            </Col>
            <Col md={6}>
              <h5>Backend & Frameworks</h5>
              <ul className="list-unstyled">
                <li><FaCode className="me-2" /> Hono</li>
                <li><SiDjango className="me-2" /> Django</li>
              </ul>

              <h5>DevOps & Tools</h5>
              <ul className="list-unstyled">
                <li><FaGithub className="me-2" /> GitHub Actions</li>
                <li><FaWrench className="me-2" /> Azure DevOps</li>
                <li><FaGitAlt className="me-2" /> Git</li>
              </ul>

              <h5 className="mt-4">Test Management</h5>
              <ul className="list-unstyled">
                <li><SiJira className="me-2" /> Jira</li>
                <li><SiTestrail className="me-2" /> Testrail</li>
                <li><FaTools className="me-2" /> Allure</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Education */}
      <section id="education" className="py-5">
        <Container>
          <h2>Education</h2>
          <p>
            I am primarily self-taught, with a strong ability to independently learn and apply complex software development and QA concepts.
            Through hands-on experience, personal projects, and professional roles, I've mastered advanced tools, frameworks, and CI/CD practices.
            My education has come from real-world challenges — where execution matters most.
          </p>
          <ul>
            <li><strong>Utah State University</strong> – General Computer Science Coursework (2017–2019)</li>
            <li><strong>Murrieta Valley High School</strong> – High School Diploma (2013–2017)</li>
          </ul>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="py-5">
        <Container>
          <h2>Contact</h2>
          <p>If you'd like to connect, feel free to reach out via any of the methods below:</p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <FaEnvelope className="me-2" />
              <a href="mailto:grantponting@proton.me">grantponting@proton.me</a>
            </li>
            <li className="mb-2">
              <FaPhoneAlt className="me-2" />
              <a href="tel:9518138068">(951) 813-8068</a>
            </li>
          </ul>
        </Container>
      </section>
    </>

  )
};

export default ResumePage;
