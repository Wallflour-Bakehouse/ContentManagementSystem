import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import {url} from '../../url'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faMagnifyingGlass, faUserSecret, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import './messages.css'

export default function Messages() {

    const [message, setMessage] = useState('')
    const [userBoard, setUserBoard] = useState('')
    const [changeUserBoard, setChangeUserBoard] = useState(false)
    const [knownUser, setKnownUser] = useState()
    const [anonymousUser, setAnonymousUser] = useState()
    const [userDetails, setUserDetails] = useState({
        id: "",
        name: "",
        username: "",
        phoneNumber: "",
        email: "",
        dp: ""
    })
    const [conversations, setConversations] = useState()
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const token = JSON.parse(localStorage.getItem("profile"))?.token

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('4').classList.add('active')
        try{
            axios
            .get(url+'/admin/allUserChats',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                setUserBoard(res.data.knownChat)
                setKnownUser(res.data.knownChat)
                setAnonymousUser(res.data.unknownChat)
            })
            .catch((error)=>{
                alert("Error: "+error.response.data.message)
            })
        } 
        catch(error){
            console.log(error)
        }
    }, [])

    function handleChange(e){
        setMessage(e.target.value)
    }

    function viewAnonymousUser(id, user){
        document.querySelectorAll('.user').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById(id).classList.add('active')
        setUserDetails({
            id: user._id,
            name: "",
            username: user.name,
            phoneNumber: "+"+user.countryCode+"-"+user.phoneNumber,
            email: user.email,
            dp: ""
        })
        setConversations(user.conversation)
    }

    function viewUser(id,pos){
        document.querySelectorAll('.user').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById(id).classList.add('active')
        axios
        .put(url+'/admin/viewUserMessages', {
            id: id
        },{
            headers: {'authorization': `Bearer ${token}`}
        })
        .then((res)=>{
            userBoard[pos].unread=0
            setConversations(res.data.conversation)
            setUserDetails({
                id: res.data._id,
                name: res.data.user.firstname+" "+res.data.user.lastname,
                username: res.data.user.username,
                dp: res.data.user.dp
            })
        })
        .catch((error)=>{
            alert("Error: "+error.response.data.message)
        })
    }

    function changeBoard(){
        if(changeUserBoard){
            setUserBoard(knownUser)
        }
        else{
            setUserBoard(anonymousUser)
        }
        setChangeUserBoard(!changeUserBoard)
    }
    
    function validateForm(){
        if(message.length===0){
            return false
        }
        return true;
    }

    function handleSubmit() {
        document.querySelector('.send_btn').classList.add('active')
        setTimeout(() => {
            document.querySelector('.send_btn').classList.remove('active')
        }, 501);
        try{
            let valid = validateForm()
            if(!valid) return
            axios
            .post(url+'/admin/adminSendMessage', {
                id: userDetails.id,
                message: message
            },{
                headers: {'authorization': `Bearer ${token}`}
            })
            .then((res)=>{
                document.querySelector('.error_message').classList.remove('active')
                setMessage('')
                setConversations(res.data.conversation)
            })
            .catch(()=>{
                document.querySelector('.error_message').classList.add('active')
            })
        }
        catch(error){
            console.log(error)
        }
    }

    if(userBoard){
        return (
            <div className="message_cont">
                {userDetails ? 
                    (<div className="chat_header">
                        {userDetails.dp!=="" ? (<div className="dp" style={{backgroundImage: "url("+userDetails.dp+")"}}></div>):(<></>)}
                        <div className="name">{userDetails.username} {userDetails.username!=="" ? ((<>{userDetails.name}</>)):(<></>)}</div>
                    </div>):(<></>)}
                <div className="user_board">
                    <div className="search_sec">
                        <div className="search_cont  mt-3 mb-4">
                            <input type="text" placeholder="Search for a user" name="search" />
                        </div>
                    </div>
                    <div className="unknown_user" onClick={changeBoard}>
                        {changeUserBoard ? (<><FontAwesomeIcon icon={faArrowLeftLong}/> Go Back</>):(<><FontAwesomeIcon icon={faUserSecret}/> Unknown User</>)}
                    </div>
                    {changeUserBoard ? ( 
                        userBoard.map((user)=>
                            <div className="user" id={user._id} onClick={()=>viewAnonymousUser(user._id,user)} key={user._id}>
                                <div className="chat_details">
                                    <div className="name">{user.name}</div>
                                    <div className="msg_preview">{user.conversation[0].messages.length < 38 ? (user.conversation[0].messages[0].message):(user.conversation[0].messages[0].message.substring(0, 38)+".....")}</div>
                                </div>
                                {user.unread>0 ? (<div className="unread_message_alert">{user.unread}</div>):(<></>)}
                            </div>
                        )
                    ):(
                        userBoard.map((user,i)=>
                            <div className="user" id={user._id} onClick={()=>viewUser(user._id,i)} key={user._id}>
                                <div className="dp" style={{backgroundImage: "url("+user.user.dp+")"}}></div>
                                <div className="chat_details">
                                    <div className="name">{user.user.username}</div>
                                    <div className="msg_preview">{user.conversation[user.conversation.length-1].messages.length < 38 ? (user.conversation[user.conversation.length-1].messages[user.conversation[user.conversation.length-1].messages.length-1].message):(user.conversation[user.conversation.length-1].messages[user.conversation[user.conversation.length-1].messages.length-1].message.substring(0, 38)+".....")}</div>
                                </div>
                                {user.unread>0 ? (<div className="unread_message_alert">{user.unread}</div>):(<></>)}
                            </div>
                        )
                    )}
                </div>
                <div className="chat_section">
                {conversations ?
                    (   <>
                            {changeUserBoard ? (
                                <div className={"message"} >
                                    Email: {userDetails.email}<br/>
                                    Phone: {userDetails.phoneNumber}
                                </div>
                            ):(<></>)}
                            {conversations.map((conversation)=>
                                <span className='conversation_sec' key={conversation._id}>
                                    <div className="date">{moment(conversation.conversationDate).format("DD/MM/YYYY")} {daysOfTheWeek[moment(conversation.conversationDate).day()]}</div>
                                    {conversation.messages.map(message=>
                                        <div className={"message"+(message.role==="admin" ? " active" : "")} key={message._id}>
                                            {message.message}
                                            <div className="time">{moment(message.time).format("hh:mm A")}</div>
                                        </div>
                                    )}
                                </span>
                            )}
                        </>
                        
                    ):(<></>)
                }
                </div>
                {userDetails?.dp ? 
                    (<div className="chat_footer">
                        <div className="input">
                            <textarea className="type_message" type="text" name="message" placeholder='Type A Message' onChange={handleChange} value={message} />
                            <div className="error_message">Chat Is Not Available Now. Please Try Again Later</div>
                        </div>
                        {message.length!==0 ? (
                            <div className="send_btn" onClick={handleSubmit}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            </div>
                        ):(<></>)}
                    </div>):(<></>)}
            </div>
        )
    }
    else{
        return (<></>)
    }
}
