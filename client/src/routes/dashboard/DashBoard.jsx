import React, {useRef, useState} from "react";
import "./dashBoard.css";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Tile = ({ icon, text, onClick }) => {
  return (
    <div className="option" onClick={onClick}>
      <img src={icon} alt="" />
      <span>{text}</span>
    </div>
  );
};

const DashBoard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const mutation = useMutation({
    mutationFn: async (text) => {
      return await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/chats`,
          {
            text,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data);
    },
    onSuccess: (id) => {
      console.log(id);
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chat/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text.trim()) return;
    
    mutation.mutate(text);
  };

  const handleTiles = async (e, type) => {
    let promptText = "";
    switch (type) {
      case 'plan':
        promptText =
          "I want to create a detailed plan for [your specific goal or objective]. Please assist in outlining the steps.";
        break;
      case 'image':
        promptText = "I have an image that I would like analyzed. Can you help me understand its key features?";
        break;

      case 'code':
        promptText = "I need help with coding. Can you assist me with debugging or optimizing the code?";
        break;

      default:
        prompText = "";
    }

    if (inputRef.current) {
      inputRef.current.value = promptText;
    }
  };

  return (
    <div className="dashboard">
      <div className="imgContainer">
        <div className="logo">
          <img src="./logo.png" alt="" />
          <h1>ConverS AI</h1>
        </div>
        <div className="options">
          <Tile
            icon="./chat.png"
            text="Create a new plan"
            onClick={(e) => handleTiles(e, "plan")}
          />
          <Tile
            icon="./image.png"
            text="Analyze an image"
            onClick={(e) => handleTiles(e, "image")}
          />
          <Tile
            icon="./code.png"
            text="Help me with code."
            onClick={(e) => handleTiles(e, "code")}
          />
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" ref={inputRef} placeholder="Ask me anything....." />
          <button type="submit">
            <img src="./arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;
