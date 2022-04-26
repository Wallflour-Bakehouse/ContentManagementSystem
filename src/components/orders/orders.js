import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';
import {url} from '../../url'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './order.css'

function OrderCard(props){

    return props.orders.map(order=>
        <div className="col-12 col-md-6 col-lg-4 mt-4" key={order._id}>
            <div className="order_card m-1">
                <div className="row_ order_number"><b>Order Number:</b> {order._id}</div>
                <div className="row_ total"><b>Total:</b> ₹{order.grandTotal}</div>
                <div className="row_ dishes">
                    <b>Dishes:</b>
                    {order.orderItems.map(prod=>
                    <div key={prod.product._id}>
                        {prod.quantity} x {prod.product.productName}: ₹{(prod.product.price-(prod.product.price*prod.product.discount*0.01))*prod.quantity}
                    </div>
                    )}
                </div>
                <div className="row_ order_date"><b>Order Date:</b> {moment(order.createdAt).format("DD/MM/YYYY (hh:mm A)")}</div>
                {!props.active ? (<div className="row_ order_date"><b>Expeced Delivery Date:</b> {moment(order.updatedAt).format("DD/MM/YYYY")}</div>):(<div><div className="row_ order_date"><b>Delivered On:</b> {moment(order.updatedAt).format("DD/MM/YYYY")}</div></div>)}
                <Link to={'/orders/'+order._id} className="row_ ord_btn_cont">
                    <div className="ord_btn">View Details</div>
                </Link>
            </div>
        </div>
    )
}

export default function Orders() {

    const [activeOrders, setActiveOrders]=useState()
    const [completedOrders, setCompletedOrders]=useState()

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('2').classList.add('active')

        try{
            const token = JSON.parse(localStorage.getItem("profile")).token
            axios
            .get(url+'/order/',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                setActiveOrders(res.data.activeOrders)
                setCompletedOrders(res.data.completedOrders)
            })
            .catch((error)=>{
                alert(error)
            })
        } 
        catch(error){
            console.log(error)
        }
    }, [])

    if(activeOrders && completedOrders){
        return (
            <div className="orders_cont container">
                <div className="search_cont mb-4">
                    <input type="text" placeholder="Search for Order" name="search" />
                    <div className="search_btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />    
                    </div>
                </div>
                <div className="heading">Active Orders</div>
                <div className="row a orders">
                    <OrderCard activeOrder={true} orders={activeOrders} />
                </div>
                <div className="heading mt-4">Completed Orders</div>
                <div className="row orders">
                    <div className="col-12 date">Date: 20/03/2022</div>
                </div>
            </div>
        )
    }
    else{
        return(<></>)
    }
}
