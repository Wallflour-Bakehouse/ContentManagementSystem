import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './messages.css'

export default function Messages() {
    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('4').classList.add('active')
    }, [])
    return (
        <div className="message_cont container">
            <div className="search_cont mb-4">
                <input type="text" placeholder="Search for User" name="search" />
                <div className="search_btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />    
                </div>
            </div>
            <div className="msg_sec unread_msgs">
                <div className="heading">Unread Messages</div>
                <Link to="/messages/message_detail" className="msg">
                    <div className="name">Full Name</div>
                    <div className="user_name">User Name</div>
                    <div className="number">+91 - 9999999999</div>
                    <div className="email">email@email.com</div>
                    <div className="date">21/03/2022</div>
                </Link>
            </div>
            <div className="msg_sec read_msgs">
                <div className="heading">Read Messages</div>
                <Link to="/messages/message_detail" className="msg">
                    <div className="name">Full Name</div>
                    <div className="user_name">User Name</div>
                    <div className="number">+91 - 9999999999</div>
                    <div className="email">email@email.com</div>
                    <div className="date">21/03/2022</div>
                    <div className="delete"><FontAwesomeIcon icon={faMinus} /></div>
                </Link>
            </div>
        </div>
    )
}
