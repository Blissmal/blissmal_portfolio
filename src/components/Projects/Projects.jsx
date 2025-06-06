import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import blisSocial from '../../Assets/Projects/bliss-socially.png'
import fbLIke from '../../Assets/Projects/bliss-social.png'
import firebaseChat from "../../Assets/Projects/firebaseChat.png"

const Projects = () => {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={blisSocial}
              isBlog={false}
              title="Bliss simple socially"
              description="A Next.js-based social app with Clerk auth, post creation/deletion by owners, and profile customization (bio, website and name). Profile image can be customized on clerk's profile management. Includes a chat listing all users (excluding the auth user) with dynamic usernames for 1-on-1 and group chats available on the chat SideBar."
              ghLink="https://github.com/Blissmal/social-app"
              demoLink="https://bls-social-app.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fbLIke}
              isBlog={false}
              title="FB Like sociall app"
              description="A simple facebook lookalike with clerk authentication, social post creation with image upload using cloudinary, postgres database from neon to store user and other tables information and status creation but still one status at a time. The code also protects the main route and redirects unauthorized users to the login page if they are not authenticated"
              ghLink="https://github.com/Blissmal/next-social-media-app"
              demoLink="https://bliss-social.vercel.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={firebaseChat}
              isBlog={false}
              title="React firebase chat"
              description="A react firebase chat application with signup and login functionalities using firebaseAuth and images upload to firebase firestore. The app allows seamless chatting including emoji and images transfer for more interactivity. It has block functionality where blocked users are not able to view the chat component of the user"
              ghLink="https://github.com/Blissmal/react-firebaseChat"
              demoLink="https://bliss-firebase-chat.vercel.app"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
