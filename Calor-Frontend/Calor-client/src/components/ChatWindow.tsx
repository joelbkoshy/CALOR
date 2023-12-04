import React, { useEffect, useRef } from 'react'
import './style.css'
import AudioRecorder from './AudioRecorder';


const ChatWindow = ({ index, chat }: any) => {

  const chatWindowScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatWindowScrollRef.current?.scrollTo(0, chatWindowScrollRef.current?.scrollHeight);
  }, [index])

  return (
    <div className='chatWindowMainContainer' >
      <div className="chatWindowMainHeaderBar">
        <h2>{chat ? chat?.chatName : ""}</h2>
      </div>
      <div className="chatWindowMainElements" ref={chatWindowScrollRef}>
        <div className="chat-history">
          <ul>
            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>

              </div>
              <div className="message other-message float-right">
                Hi Vincent, how are you? How is the project coming along?
              </div>
            </li>

            <li>
              <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                <span className="message-data-time">10:12 AM, Today</span>
              </div>
              <div className="message my-message">
                Are we meeting today? Project has been already finished and I have results to show you.
              </div>
            </li>

            <li className="clearfix">
              <div className="message-data align-right">
                <span className="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>

              </div>
              <div className="message other-message float-right">
                Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
              </div>
            </li>

            <li>
              <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                <span className="message-data-time">10:20 AM, Today</span>
              </div>
              <div className="message my-message">
                Actually everything was fine. I'm very excited to show this to our team.
              </div>
            </li>

            <li>
              <div className="message-data">
                <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                <span className="message-data-time">10:31 AM, Today</span>
              </div>
              <i className="fa fa-circle online"></i>
              <i className="fa fa-circle online" ></i>
              <i className="fa fa-circle online"></i>
            </li>

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
            <g stroke-linecap="round" stroke-linejoin="round">
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
          <input type="text" className='inputText' placeholder='Type a message' />
        </div>
        <div className="chatWindowAudioContainer">
          <AudioRecorder />
        </div>

      </div>
    </div>
  )
}

export default ChatWindow