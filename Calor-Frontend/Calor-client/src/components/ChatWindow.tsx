import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import AudioRecorder from './AudioRecorder';
import axios from 'axios';
import sendIcon from '../assets/icons8-paper-plane-64.png'



const ChatWindow = ({ index, chat }: any) => {

  const chatWindowScrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([])
  const [showSendIcon, setShowSendIcon] = useState<boolean>(false)

  const fetchChatMessages = async () => {
    try {
      console.log("The chat : ", chat)
      const chatId = chat?.chat_id; // Assuming chat object has chat_id property
      if (!chatId) {
        console.error("No chat_id provided.");
        return;
      }
      const response = await axios.get(`${process.env.REACT_APP_FLASK_URL}/fetch_chat/${chatId}`);
      const chatMessages = response.data;
      console.log("chat messages ", chatMessages);
      // Update the state with the fetched messages
      setMessages(chatMessages);

    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages()
  }, [index, chat])

  useEffect(() => {
    chatWindowScrollRef.current?.scrollTo(0, chatWindowScrollRef.current?.scrollHeight);
  }, [messages])


  return (
    <div className='chatWindowMainContainer' >
      <div className="chatWindowMainHeaderBar">
        <div className="chatWindowMainHeaderBarContent">
          <h2>{chat ? chat?.chatName : ""}</h2>
        </div>
      </div>
      <div className="chatWindowMainElements" ref={chatWindowScrollRef}>
        <div className="chat-history">
          <ul>

            {messages?.map((message: any) => {
              return (
                <>
                  <div className="messageContainer">
                    <div className="message other-message">
                      {message?.user_message}
                    </div>
                  </div>
                  <div className="message my-message ">
                    {message?.calor_message}
                  </div>

                </>
              );
            })}
          </ul>

        </div>
      </div>
      <div className="chatWindowMainChatElements">
        <div className="chatSVGContainer">
          <svg
            fill="#ffffff"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            transform="matrix(1, 0, 0, 1, 0, 0)"
            strokeWidth="0.00032"
            width={25}
          >
            <g strokeWidth="0">
            </g>
            <g stroke-linecap="round" strokeLinejoin="round">
            </g>
            <g id="SVGRepo_iconCarrier">
              <defs>
                <style>{`.cls-1{fill:none;}`}</style>
              </defs>
              <title>report--alt</title>
              <rect x="10" y="18" width="8" height="2"></rect>
              <rect x="10" y="13" width="12" height="2"></rect>
              <rect x="10" y="23" width="5" height="2"></rect>
              <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"></path>
              <rect id="_Transparent_Rectangle_" data-name="<Transparent Rectangle>" className="cls-1" width="30" height="30"></rect>
            </g>
          </svg>
        </div>
        <div className="chatInputTextContainer">
          <input type="text" className='inputText' placeholder='Type a message' onChange={(e) => { e.target.value.trim() !== "" ? setShowSendIcon(true) : setShowSendIcon(false) }} />
        </div>{
          showSendIcon ? <div className="chatWindowAudioContainer">
            <img src={sendIcon} alt="" className="sendIcon" />
          </div> :
            <div className="chatWindowAudioContainer">
              <AudioRecorder onSuccess={fetchChatMessages} onRecording={() => console.log("started recording")} />
            </div>
        }

      </div>
    </div>
  )
}

export default ChatWindow