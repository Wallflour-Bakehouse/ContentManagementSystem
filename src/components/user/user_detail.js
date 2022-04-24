import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {url} from '../../url'
import './user_detail.css'

export default function UserDetail() {

    const [user, setUser] = useState()
    const token = JSON.parse(localStorage.getItem("profile"))?.token
    let { userId } = useParams()

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('6').classList.add('active')
        axios
        .get(url+`/admin/oneUserData/${userId}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res)=>{
            setUser(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    function deleteComment(id){
        try{
            axios
            .delete(url+'/admin/deleteComment/'+id,{
                headers: { "authorization": `Bearer ${token}` }
            })
            .then((res)=>{
                window.location.reload()
            })
            .catch((error)=>{
                alert("Error: "+error.response.data.message)
            })
        } catch(error){
            console.log(error)
        }
    }

    if(user){
        return (
            <div className="user_details_cont container">
                <div className="heading mb-5">User Details</div>
                {user.role!=='admin' ? (<div className="delete_user"><FontAwesomeIcon icon={faTrashCan} /></div>):(<></>)}
                <div className="img_cont">
                    <img src={user.dp} alt="" />
                </div>
                <div className="user_details">
                    <div className="detail"><b>Name: </b> {user.firstname+" "+user.lastname}</div>
                    <div className="detail"><b>Username: </b>{user.username}</div>
                    <div className="detail"><b>Joined: </b>{moment(user.createdAt).format("DD/MM/YYYY hh:mm A")}</div>
                    <div className="detail"><b>Age : </b>{moment(user.dob).format("DD/MM/YYYY")} ({moment().diff(moment(user.dob), 'years')} years)</div>
                    <div className="detail"><b>Gender : </b>{user.gender}</div>
                    <div className="detail"><b>Email: </b>{user.email}</div>
                    <div className="detail"><b>Phone Number: </b>+{user.countryCode} - {user.phoneNumber}</div>
                    <div className="detail"><b>Preference: </b> {user.preference.map(((pref,i)=><span key={i}>{pref+", "}</span>))}</div>
                    <div className="detail"><b>Favourite Dishes: </b> {user.favourites.map(((fav,i)=><span key={i}>{fav.productName+", "}</span>))}</div>
                    <div className="detail"><b>User Type: </b>{user.role}</div>
                    <div className="detail"><b>User Badges: </b> All badges</div>
                    <div className="detail">
                        <b>Billing Address:</b> {user.billingAddress.address}, {user.billingAddress.landmark}, {user.billingAddress.city} - {user.billingAddress.pincode}, {user.billingAddress.state}
                    </div>
                    <div className="detail">
                        <b>Shipping Address:</b>
                        {user.shippingAddress.map((address)=>
                            <div className="address_card" key={address._id}>
                                <div>Name: {address.name}</div>
                                <div>Phone: +{address.countryCode} - {address.phoneNumber}</div>
                                <div>{address.address}, {address.landmark}, {address.city} - {address.pincode}, {address.state}</div>
                            </div>
                        )}
                    </div>
                    <div className="detail">
                        <b>Comments:</b>
                        {user.comments.map((comment)=>
                            <div className="address_card" key={comment._id}>
                                <div className='d-flex'>
                                    <div className='pe-3'>Product Name: {comment.productName}</div>
                                    <div className='pe-3'>Rating: {comment.rating}/5</div>
                                    <div>Date: {moment(comment.createdAt).format("DD/MM/YYYY (hh:mm A)")}</div>
                                </div>
                                <div>Comment: {comment.comment}</div>
                                <div className="delete" onClick={()=>deleteComment(comment._id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(<></>)
    }
}
