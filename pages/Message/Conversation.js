import React from 'react'
import "./conversation.css"
import image from "./image.jpg" 

const Conversation = () => {
    return (
        <div className="conversation">
            <img className="conversationImg" src={image} alt=""/>
            <span className="conversationName">John Doe</span>

       
        </div>
        
    )
}

export default Conversation
