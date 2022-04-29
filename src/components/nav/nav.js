import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faListUl, faUsers, faMessage, faTruckFast, faBell, faComments, faBars, faTicket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './nav.css'

export default function Nav(props) {
    const [navId, setNavId] = useState()

    function navMouseOver(){
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            setNavId(ele.id)
            ele.classList.remove('active');
        })
    }

    function navMouseOut(){
        document.getElementById(navId).classList.add('active')
        document.querySelector('.nav_bar').classList.add('active')
    }

    function activeNavEle(id){
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            ele.classList.remove('active');
        })
        setNavId(id)
        document.getElementById(id).classList.add('active')
    }

    function addActive(){
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            setNavId(ele.id)
        })
        document.querySelector('.nav_bar').classList.remove('active')
    }

    return (
        <>
            <div className={"nav_bar active"+ (props.navShow ? " hidden":"")} onMouseOver={()=>{addActive()}} onMouseOut={()=>navMouseOut()}>
                <div className="brand">
                    <div className="logo"></div>
                    <div className="text">Wallflour Bakehouse</div>
                </div>
                <Link to="/home">
                    <div className="nav_ele" id="1" onMouseOver={()=>navMouseOver()} onClick={()=>activeNavEle(1)}>
                        <FontAwesomeIcon icon={faHouseChimney} />
                        <div className="text">Home</div>
                    </div>
                </Link>
                <Link to="/orders">
                    <div className="nav_ele" id="2" onMouseOver={()=>navMouseOver()} onClick={()=>activeNavEle(2)}>
                        <FontAwesomeIcon icon={faTruckFast} />
                        <div className="text">Orders</div>
                    </div>
                </Link>
                <Link to="/menu_manager">
                    <div className="nav_ele" id="3" onMouseOver={()=>navMouseOver()} onClick={()=>activeNavEle(3)}>
                        <FontAwesomeIcon icon={faListUl} />
                        <div className="text">Products</div>
                    </div>
                </Link>
                <Link to="/messages">
                    <div className="nav_ele" id="4" onMouseOver={()=>navMouseOver()} onClick={()=>activeNavEle(4)}>
                        <FontAwesomeIcon icon={faMessage} />
                        <div className="text">Messages</div>
                    </div>
                </Link>
                <Link to="/recent_comments">
                    <div className="nav_ele" id="5" onMouseOver={()=>navMouseOver()} onClick={()=>activeNavEle(5)}>
                        <FontAwesomeIcon icon={faComments} />
                        <div className="text">Recent Comments</div>
                    </div>
                </Link>
                <Link to="/users">
                    <div className="nav_ele" id="6" onMouseOver={()=>navMouseOver()} onClick={()=>activeNavEle(6)}>
                        <FontAwesomeIcon icon={faUsers} />
                        <div className="text">Users</div>
                    </div>
                </Link>
                <Link to="/coupons">
                    <div className="nav_ele" id="7" onMouseOver={()=>navMouseOver()} onClick={()=>activeNavEle(7)}>
                        <FontAwesomeIcon icon={faTicket} />
                        <div className="text">Coupons</div>
                    </div>
                </Link>
            </div>
            <div className="notifications">
                <FontAwesomeIcon icon={faBell} />
            </div>
        </>
    )
}
