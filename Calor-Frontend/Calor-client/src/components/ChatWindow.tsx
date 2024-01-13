import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import AudioRecorder from './AudioRecorder';
import axios from 'axios';
import sendIcon from '../assets/icons8-paper-plane-64.png'



const ChatWindow = ({ index, chat }: any) => {

  const chatWindowScrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([])
  const [showSendIcon, setShowSendIcon] = useState<boolean>(false)
  const [showInputBar, setShowInputBar] = useState<boolean>(true)
  const [inputMessage, setInputMessage] = useState<string>("")
  const [newMessage,setNewMessage] = useState<number>(0)


  function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };

    const formattedTimestamp = date.toLocaleTimeString(undefined, options);
    return <p>{formattedTimestamp}</p>;
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>)=>{
    if (e.key === 'Enter' && inputMessage && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage();
    }
    else if (e.key === 'Enter' && inputMessage && e.shiftKey) {
      setInputMessage((prevMessage) => prevMessage + '\n');
    }
  }

  const handleInputMessage = (e: any) => {
    if (e.target.value !== "") {
      setShowSendIcon(true);
    } else {
      setShowSendIcon(false);
    }
    setInputMessage(e.target.value);
  };


  const handleSubmitMessage = async () => {
    console.log("Sending message")
    setShowSendIcon(false)
    setInputMessage("")
    const chatId = chat?.chat_id; // Assuming chat object has chat_id property
    if (!chatId) {
      console.error("No chat_id provided.");
      return;
    }
    const response = await axios.post(`${process.env.REACT_APP_FLASK_URL}/new_message/${chatId}`, { inputMessage })
    console.log("response is  : ",response)
    setNewMessage((messages:any)=>messages+1)
  }

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
  }, [index, chat,newMessage])

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
                      <h4>User</h4>
                      {message?.user_message}
                      <p style={{ float: 'right' }}>{formatTimestamp(message?.timestamp)}</p>
                    </div>
                  </div>
                  <div className="message my-message ">
                    <h4>Calor</h4>
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
        {
          showInputBar && <div className="chatInputTextContainer">
            <input type="text" 
            className='inputText' 
            placeholder='Type a message' 
            value={inputMessage} 
            onChange={(e) => handleInputMessage(e)} 
            onKeyDown={(e)=>handleEnterKey(e)}
            />
          </div>
        }
        {
          showSendIcon ? <div className="chatWindowAudioContainer">
            <button className='sendIconBtn' style={{all:"unset"}}>
              <img src={sendIcon} alt="" className="sendIcon" onClick={handleSubmitMessage} />
            </button>
          </div> :
            <div className="chatWindowAudioContainer">
              <AudioRecorder onSuccess={fetchChatMessages} onRecording={() => setShowInputBar(false)} onStopping={() => setShowInputBar(true)} />
            </div>
        }

      </div>
    </div>
  )
}

export default ChatWindow