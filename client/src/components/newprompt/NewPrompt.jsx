import React, { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import UploadImage from "../uploads/UploadImage";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import model from "../../lib/gemini";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  
  const chat = model.startChat({
    history: 
      data?.history.map(({ role, parts }) => ({
        role,
        parts: [{ text: parts[0].text }],
      })),
    
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  const [img, setImg] = useState({
    isLoading: false,
    err: "",
    dbData: {},
    aiData: {},
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/chats/${data._id}`,
          {
            question: question.length ? question : undefined,
            answer: answer,
            img: img.dbData?.filePath || undefined,
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
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            err: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const add = async (ques, isInitial) => {
    if (!isInitial) setQuestion(ques);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, ques] : [ques]
      );
      let streamingText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        streamingText += chunkText;
        setAnswer(streamingText);
      }
      console.log(streamingText);
      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ques = e.target.text.value;
    if (!ques) return;
    add(ques, false);
  };

  const willRun = useRef(false);
  useEffect(() => {
    if (!willRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    willRun.current = true;
  }, []);

  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_URL_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endchat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <UploadImage setImg={setImg} />

        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask me anything....." />
        <button type="submit">
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
