import React from 'react'
import "./chat.css"
import image from "./image.jpg"
const Chat = ({own}) => {
    return (
        <div className={own ? "messege own" :"messege"}>
            <div className="messegeTop">
                <img className="messegeImg" src={image}/>
                <p className="messegeText">Hello this is messege Hello this is messege </p>
                
            </div>
            <div className="messegeBottom">
                1 hours ago
            </div>
        </div>
    )
}

export default Chat
