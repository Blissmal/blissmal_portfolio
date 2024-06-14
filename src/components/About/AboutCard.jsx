import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

const AboutCard = () => {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Bethuel Maluti </span>
            from <span className="purple"> Nairobi, Kenya.</span>
            🌱 I’m currently pursuing <b className="purple">Barchelor of Science in Software Engineerig, Kirinyaga University, Kenya</b>
              <br />
              <br />⚡ I strongly have a strong foundation in solving problems pertaining <b className="purple">mathematics</b> in any related field
              <br />
              <br />
              💡 I'm interested in : <b className="purple">Big Data, Cloud computing, Machine Learning, ethical hacking and Data Science</b>
              <br />
              <br />
              💬 Talk to me about Memes, Football, Movies 🎥, Gaming 🎮,Forex trading, Amateur Photography 📸
              <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js</b>
              </i>
              </p>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Soumyajit</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
