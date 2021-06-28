import React from 'react';
import Header from '../../Components/Navbar/Navbar';
import Chat from './Chat';
import ChatOnline from "./ChatOnline"
import Conversation from './Conversation';
// import {ChatEngine}  from 'react-chat-engine';
import "./messenger.css"; 

const Message = () => {
  return (
      <>
      <Header/>
        <div className="messeger">
    <div className="chatMenu">
      <div className="chatMenuWrapper">
        <input placeholder="search for friends" className="chatMenuInput"/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
        <Conversation/>
      
      </div>
    </div>
    <div className="chatBox">
    <div className="chatBoxWrapper">
        <div className="chatBoxTop">
          <Chat/>
          <Chat own={true}/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          <Chat/>
          
        </div>
      <div className="chatBoxBottom">
        <textarea className="chatMessageInput" placeholder="write some thing ..."></textarea>
        <button className="chatSubmitButton">Send</button>
      </div>
    </div>
    </div>
    <div className="chatOnline">
    <div className="chatOnlineWrapper">
      <ChatOnline/>
</div>
    </div>
  </div>
      </>
  )
}
export default Message;