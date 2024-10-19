import React, { useEffect, useState, useRef } from 'react';
import tmi from 'tmi.js';
import BarChart from './BarChart';

const TwitchChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageCount, setMessageCount] = useState({});
  const clientRef = useRef(null);
  let streamers = ['arcadebulls', 'andullie', 'carzzy', 'spajkk', 'conducteir77', 'bladeito'];

  useEffect(() => {
    if (clientRef.current) return; 

    clientRef.current = new tmi.Client({
      options: { debug: true },
      channels: streamers,
    });

    clientRef.current.connect();

    clientRef.current.on('message', (channel, tags, message, self) => {
      if (self) return;

      const newMessage = { 
        username: tags.username, 
        message, 
        time: new Date().toLocaleTimeString(),
        color: tags.color
      };

      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg.message === message && msg.username === tags.username
        );
        return messageExists ? prevMessages : [...prevMessages, newMessage];
      });

      setMessageCount((prevCount) => ({
        ...prevCount,
        [channel]: (prevCount[channel] || 0) + 1,
      }));
    });

    return () => {
      clientRef.current.disconnect();
      clientRef.current = null;
    };
  }, []);

  return (
    <div>
     <h1>Twitch Chat: {streamers.map((channel, index) => (<span style={{ display: 'inline' }} key={index}> {channel}{index < streamers.length - 1 ? ', ' : ''} </span>))} </h1>
     <BarChart streamers={streamers} messages={messageCount} />
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{background: msg.color}}>
            <strong>{msg.username} [{msg.time}]: </strong>
            {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TwitchChat;
