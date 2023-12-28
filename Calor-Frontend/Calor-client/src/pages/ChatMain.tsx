import React, { useState, useEffect, createContext } from 'react'
import './style.css'
import AudioRecorder from '../components/AudioRecorder'
import plusImage from '../assets/plus.png';
import ChatWindow from '../components/ChatWindow';
import chatIcon from '../assets/speech-bubble.png'
import CalorLogo from '../assets/pray.png'
import AddModal from '../components/AddModal';
import closeBtn from '../assets/close.png'
import { Button } from '@mui/material';
import axios from 'axios'
import { ActiveChatContext } from "../context/ChatContext";





const ChatMain = () => {

    const [activeChatIndex, setActiveChatIndex] = useState<any>(null);
    const [activeChat, setActiveChat] = useState<any>(null)
    const [newChat, setNewChat] = useState<string>("");
    const [chats, setChats] = useState<any[]>([])
    const [editElements,setEditElements] = useState<boolean>(false);


    const handleChatItemClick = (index: any) => {
        setActiveChatIndex((prevIndex: any) => (prevIndex === index ? null : index));
        setActiveChat(chats?.filter((chat: any) => chat?.chat_id === index))
        localStorage.setItem("chat_id",index)
    };

    const handleNewChat = (name: string) => {
        setNewChat(name)
    }

    const handleNewChatCreation = async () => {
        try {
            const currentTime = new Date().toISOString();
            const result = await axios.post(`${process.env.REACT_APP_FLASK_URL}/new_chat`, { chatName: newChat, createdAt: currentTime })
            console.log("The result : ", result)
            setActiveChatIndex(result.data.chat_id)
            const updatedChats = await axios.get(`${process.env.REACT_APP_FLASK_URL}/getChats`);
            setChats(updatedChats.data);
            handleClose()
        } catch (error) {
            console.log("Something went wrong", error)
        }
    }

    const handleEditChatName = async ()=> {

    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = axios.get(`${process.env.REACT_APP_FLASK_URL}/getChats`)
                    .then(res => {
                        setChats(res.data)
                    })
            } catch (error) {
                console.log("Something went wrong ", error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const activeChatItem = chats?.find((chat) => chat?.chat_id === activeChatIndex);
        setActiveChat(activeChatItem);
    }, [activeChatIndex, chats]);

    return (

        <ActiveChatContext.Provider value={{activeChat,setActiveChat}}>
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
                                    <img src={plusImage} alt="" className='plusImage' onClick={() => {
                                        handleOpen()
                                    }} />
                                    {
                                        open ? <>
                                            <AddModal show={open} onClose={handleClose}>
                                                <div className='modal'>
                                                    <div className="modalHeader">
                                                        <h1>New Chat</h1>
                                                        <div className="closeBtnContainer">
                                                            <img src={closeBtn} alt="" onClick={handleClose} className='closeBtn' />
                                                        </div>
                                                    </div>
                                                    <div className="modalMain">
                                                        <div className="form__group field">
                                                            <input type="input" className="form__field" placeholder="Name" name="name" id='name' required onChange={(e) => { handleNewChat(e.target.value) }} />
                                                            <label htmlFor="name" className="form__label">Enter the name of the chat</label>
                                                        </div>
                                                        <div className="modalBtns">
                                                            <button className='cancelBtn' onClick={handleClose}>Cancel</button>
                                                            <button className='createBtn' onClick={handleNewChatCreation}>Create</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AddModal>
                                        </>
                                            : <>
                                            </>

                                    }
                                </div>
                            </div>
                        </div>
                        <div className='chatSideBar-mainRightHeaderContainer2' id="style-3">
                            <div className="chatsContainer">
                                {chats?.map((chat, index) => (
                                    <div key={index} className={`chatItem ${activeChatIndex === chat.chat_id ? 'active' : ''}`} onClick={() => handleChatItemClick(chat?.chat_id)} >
                                        <div className="chatItemElements" >
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
                                            <p>{chat?.chatName}</p>
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
                                                onClick={()=>console.log("test")}
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
                        activeChatIndex !== null ? <ChatWindow index={activeChatIndex} chat={activeChat} /> :
                            <div className='chatWindow-container-centre'>
                                <img src={CalorLogo} alt="" className='Calor-Logo' />
                                <h2>Hey Buddy, Feel free to talk!</h2>
                            </div>


                    }
                </div>
            </div>
        </ActiveChatContext.Provider>
    )
}

export default ChatMain