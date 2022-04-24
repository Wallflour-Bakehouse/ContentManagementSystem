import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../url'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import './users.css'

function UserCard({user}){
    return(
        <div className="col-3" key={user._id}>
            <div className="user_box">
                <div className="img_cont">
                    <img src={user.dp} alt="" />
                </div>
                <div className="opt"><b>Name:</b> {user.firstname+" "+user.lastname}</div>
                <div className="opt"><b>Username:</b> {user.username}</div>
                <div className="opt"><b>Phone:</b> +{user.countryCode} - {user.phoneNumber}</div>
                <div className="opt"><b>Email:</b> {user.email}</div>
                <Link to={`/user/${user._id}`} className="btn_cont mt-3">
                    <div className="btn_ btn_small">Show Details</div>
                </Link>
            </div>
        </div>
    )
}

export default function Users() {

    const [users, setUsers] = useState()
    const token = JSON.parse(localStorage.getItem("profile"))?.token

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('6').classList.add('active')
        axios
        .get(url+'/admin/allUserData',{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res)=>{
            setUsers(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    return (
        <div className="user_cont container">
            <div className="search_cont mb-4">
                <input type="text" placeholder="Search for a User" name="search" />
                <div className="search_btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />    
                </div>
            </div>
            <div className="row dp_box pt-4 pb-4">
            <div className="col-3">
                    <Link to='/dp_manager' className="box">
                        <FontAwesomeIcon icon={faCircleUser} />
                        <div className="text">Manage DP</div>
                    </Link>
                </div>
            </div>
            <div className="heading mb-4">Admin</div>
            <div className="row">
                {users?.allAdmin.length > 0 ? 
                    users.allAdmin.map(user=>
                        <UserCard user={user} key={user._id}/>
                    ):(
                        <></>
                    )}
            </div>
            <div className="heading mt-5 mb-4">Customers</div>
            <div className="row">
                {users?.allCustomer.length > 0 ? 
                    users.allCustomer.map(user=>
                        <UserCard user={user} key={user._id}/>
                    ):(
                        <></>
                    )}
            </div>
        </div>   
    )
}
