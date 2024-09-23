import React, { useEffect, useRef } from "react";
import "./chatPage.css";
import NewPrompt from "../../components/newprompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import Loader from "../../components/spinner/Loader";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/chats/${chatId}`, {
          withCredentials: true,
        })
        .then((res) => res.data)  
  });

  return (
    <div className="chatpage">
      <div className="wrapper">
        <div className="chat">
          {isPending ? (
            <div style={{ margin: "20px" }}>
              <Loader />
            </div>
          ) : error ? (
            <p>{error.response.data}</p>
          ) : (
            data?.history?.map((chat, i) => {
              return (
                <div key={i} className="chat-container">
                  {chat?.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}
                      path={chat.img}
                      width="400"
                      height="300"
                      transformation={[{ height: 300, width: 300 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                      style={{ alignSelf: "flex-end", borderRadius: "10px" }}
                      key={i}
                    />
                  )}
                  <div
                    className={
                      chat.role === "user" ? "message user" : "message"
                    }
                    key={i}
                  >
                    <Markdown>{chat?.parts[0].text}</Markdown>
                  </div>
                </div>
              );
            })
          )}

          {data && <NewPrompt data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
