import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link, useParams} from 'react-router-dom'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {url} from '../../url'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './user_detail.css'

export default function UserDetail() {

    const [user, setUser] = useState()
    const [modal, setModal] = useState({open: false, header: "", body: ""})
    const [orders, setOrders] = useState()
    const [order, setOrder] = useState()
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
            setUser(res.data.oneUser)
            setOrders(res.data.activeOrders)
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [token, userId])

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

    function closeModal(){
        setModal({open: false})
    }

    function triggerModal(header, body, ordDele, order){
        if(ordDele){
            setOrder(order)
        }
        setModal({
            open: !modal.open,
            header: header,
            body: body, 
            orderDelete: ordDele
        })
    }

    function deleteUser(){
        axios
        .delete(url+`/admin/deleteUserData/${user._id}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(()=>{
            alert("User Deleted")
            window.location.replace('/users')
        })
        .catch((error)=>{
            alert(error.response.data.message)
        })
    }

    function deleteOrder(){
        axios
        .delete(url+`/admin/orderDelete/${order}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(()=>{
            alert("Order Deleted")
            window.location.reload()
        })
        .catch(()=>{
            alert("Error: Can not delete order")
        })
    }
    
    function DialogBox() {
        return (
            <Modal isOpen={modal.open} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>{modal.header}</ModalHeader>
                <ModalBody>{modal.body}</ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-danger" onClick={modal.orderDelete ? deleteOrder : deleteUser}>{modal.orderDelete ? "Delete Order" : "Delete User"}</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                </ModalFooter>
            </Modal>
        )
    }

    if(user&&orders){
        return (
            <div className="user_details_cont container">
                <div className="heading mb-5">User Details</div>
                {user.role!=='admin' ? (<div className="delete_user" onClick={()=>triggerModal("Delete User?", "Deletion of user will remove the user from the database. The user's data will be lost and the user can not login. The delivered orders of the user is retained and can be accessed. (DELETE ALL comments and active order of user before performing this process)", false)}><FontAwesomeIcon icon={faTrashCan} /></div>):(<></>)}
                <div className="img_cont">
                    <img src={user.dp} alt="" />
                </div>
                <DialogBox />
                <div className="user_details">
                    <div className="detail"><b>Id: </b> {user._id}</div>
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
                    <div className="detail container-fluid">
                        <b>Active Orders:</b>
                        <div className="row">
                            {orders.map(order=>
                                <div className="col-12 col-md-6 col-lg-4 mt-4" key={order._id}>
                                    <div className={"order_card m-1"+(order.orderCancel ? " delete":"")}>
                                        {order.orderCancel ? <div className="mb-2" style={{fontWeight: "500", fontSize: "18px", color: "red"}}>User Request for Order Cancelation</div>:<></>}
                                        <div className="row_ order_number"><b>Order Number:</b> {order._id}</div>
                                        <div className="row_ total"><b>Total:</b> ₹{order.grandTotal}</div>
                                        <div className="row_ dishes">
                                            <b>Dishes:</b>
                                            {order.orderItems.map(prod=>
                                            <div key={prod.productName}>
                                                {prod.quantity} x {prod.productName}: ₹{prod.total}
                                            </div>
                                            )}
                                        </div>
                                        <div className="row_ order_date"><b>Order Date:</b> {moment(order.createdAt).format("DD/MM/YYYY (hh:mm A)")}</div>
                                        {order.status!=="Delivered" ? (<div className="row_ order_date"><b>Expected Delivery Date:</b> {order.deliveryDate}</div>):(<div><div className="row_ order_date"><b>Delivered On:</b> {moment(order.updatedAt).format("DD/MM/YYYY")}</div></div>)}
                                        <Link to={'/orders/'+order._id} className="row_ ord_btn_cont">
                                            <div className="ord_btn">View Details</div>
                                        </Link>
                                        <div className="delete" onClick={()=>triggerModal("Delete Order?", "Deletion of order will remove the order from the database", true, order._id)}><FontAwesomeIcon icon={faTrashCan} /></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(<></>)
    }
}
