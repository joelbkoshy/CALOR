import React, { useState } from 'react'
import './style.css'
import AudioRecorder from '../components/AudioRecorder'
import plusImage from '../assets/plus.png';
import ChatWindow from '../components/ChatWindow';
import chatIcon from '../assets/speech-bubble.png'
import CalorLogo from '../assets/pray.png'


const ChatMain = () => {

    const [activeChatIndex, setActiveChatIndex] = useState(null);

    const handleChatItemClick = (index: any) => {
        console.log("The chat index : ", index)
        setActiveChatIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const chats: any[] = [
        "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
        "Chat 5",
        "Chat 6",
        "Chat 7",
        "Chat 8",
        "Chat 9",
        "Chat 10",
        "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
        "Chat 5",
        "Chat 6",
        "Chat 7",
        "Chat 8",
        "Chat 9",
        "Chat 10", "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
        "Chat 5",
        "Chat 6",
        "Chat 7",
        "Chat 8",
        "Chat 9",
        "Chat 10", "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
        "Chat 5",
        "Chat 6",
        "Chat 7",
        "Chat 8",
        "Chat 9",
        "Chat 10",
        // Add more chat items as needed
    ];
    return (
        <div className='chatMain-container'>
            <div className='chatSideBar-container'>
                <div className='chatSideBar-mainLeft'>
                    <img src={chatIcon} alt="" className='chatIcon' />
                </div>
                <div className='chatSideBar-mainRight'>
                    <div className="chatSideBar-mainRightHeaderContainer">
                        <div className="chatSideBar-mainRightHeader">
                            <div className="chatSideBar-mainRightHeaderHeading">
                                <h1 className='Calor-text'>Calor</h1>
                            </div>
                            <div className="chatHeaderIcons">
                                <img src={plusImage} alt="" className='plusImage' />
                            </div>
                        </div>
                    </div>
                    <div className='chatSideBar-mainRightHeaderContainer2'>
                        <div className="chatsContainer">
                            {chats?.map((chat, index) => (
                                <div key={index} className={`chatItem ${activeChatIndex === index ? 'active' : ''}`} onClick={() => handleChatItemClick(index)}>
                                    <div className="chatItemElements">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon-sm"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                        </svg>
                                        <p>{chat}</p>
                                    </div>
                                    <div className="chatEditElements">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon-sm"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 20h9"></path>
                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                        </svg>
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="icon-sm"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='chatWindow-container'>
                {
                    activeChatIndex !== null ? <ChatWindow index={activeChatIndex} /> :
                    <div className='chatWindow-container-centre'>
                        <img src={CalorLogo} alt=""  className='Calor-Logo'/>
                        <h2>Hey Buddy, Feel free to talk!</h2>
                    </div>


                }
            </div>
        </div>
    )
}

export default ChatMain