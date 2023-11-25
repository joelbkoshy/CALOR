import React , {useEffect,useRef}from 'react'
import './style.css'


const ChatWindow = ({ index }: any) => {

const chatWindowScrollRef = useRef<HTMLDivElement>(null);

 useEffect(()=>{
    chatWindowScrollRef.current?.scrollTo(0, chatWindowScrollRef.current?.scrollHeight);
 },[index])

    return (
        <div className='chatWindowMainContainer' >
            <div className="chatWindowMainHeaderBar">
                <h1>chumma</h1>
            </div>
            <div className="chatWindowMainElements" ref={chatWindowScrollRef}>
            <div className="message other-message float-right">
              Hi Vincent, how are you? How is the project coming along?
            </div>
            </div>
            <div className="chatWindowMainChatElements">
            <h1>chumma</h1>

            </div>
        </div>
    )
}

export default ChatWindow