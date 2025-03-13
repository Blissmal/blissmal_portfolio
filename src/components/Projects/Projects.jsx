import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import blisSocial from '../../Assets/Projects/bliss-socially.png'
import fbLIke from '../../Assets/Projects/bliss-social.png'

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
              description="Personal social media like app with clerk auth, uploadthing, neon posgres db, shadcn library and prisma orm. All these allows users create their accounts using google and manage their posts with or without images. THe app has notification component which displays user interactivity e.g post like, new comment and new follower."
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
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
