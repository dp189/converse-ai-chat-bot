import { Link } from "react-router-dom";
import "./homePage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";


const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human");


  

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>ConverS AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Experience seamless conversations with our AI-powered assistant.
          Enhance your workflow, brainstorm ideas, and get instant
          support—anytime, anywhere.
        </h3>
        <Link to="/dashboard">Get Started</Link>

        
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human: Hi! How are you?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Good! What can I do for you today?",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2: Help me with a recipe!!",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Sure! share the ingredients.",
                2000,
                () => {
                  setTypingStatus("human");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
