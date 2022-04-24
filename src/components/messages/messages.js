import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './messages.css'

export default function Messages() {

    const [message, setMessage] = useState('')

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('4').classList.add('active')
    }, [])

    function handleChange(e){
        setMessage(e.target.value)
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
            // axios
            // .post(url+'/message/userSendMessage', {
            //     message: message
            // },{
            //     headers: {'authorization': `Bearer ${token}`}
            // })
            // .then((res)=>{
            //     document.querySelector('.error_message').classList.remove('active')
            //     setMessage('')
            //     setConversation(res.data)
            // })
            // .catch(()=>{
            //     document.querySelector('.error_message').classList.add('active')
            // })
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className="message_cont">
            <div className="chat_header">
                <div className="dp"></div>
                <div className="name">User Name (Full Name)</div>
            </div>
            <div className="user_board">
                <div className="search">
                    <div className="search_bar"></div>
                </div>
                <div className="user">
                    <div className="dp"></div>
                    <div className="name"></div>
                    <div className="unread_message_alert"></div>
                </div>
            </div>
            <div className="chat_section">
                
            </div>
            <div className="chat_footer">
                <div className="input">
                    <textarea className="type_message" type="text" name="message" placeholder='Type A Message' onChange={handleChange} value={message} />
                    <div className="error_message">Chat Is Not Available Now. Please Try Again Later</div>
                </div>
                {message.length!==0 ? (
                    <div className="send_btn" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                ):(<></>)}
        </div>
        </div>
    )
}
