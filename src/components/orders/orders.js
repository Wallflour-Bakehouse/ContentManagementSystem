import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';
import {url} from '../../url'
import { Form, FormGroup, Col, Input } from "reactstrap";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './order.css'

function OrderCard(props){

    return props.orders.map(order=>
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
            </div>
        </div>
    )
}

export default function Orders() {

    const [activeOrders, setActiveOrders]=useState()
    const [dateWiseOrders, setDateWiseOrders]=useState({
        search: false,
        heading: "",
        orders: []
    })
    const [date, setDate]=useState({
        deliveredOrdersDate: "",
        ordersDate: ""
    })
    const token = JSON.parse(localStorage.getItem("profile")).token

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('2').classList.add('active')

        try{
            axios
            .get(url+'/admin/getActiveOrders',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                setActiveOrders(res.data.activeOrders.reverse())
                setDateWiseOrders({heading: "This Week's Orders", orders: res.data.dateWiseOrders})
            })
            .catch((error)=>{
                alert(error)
            })
        } 
        catch(error){
            console.log(error)
        }
    }, [])

    function setFormDate(e){
        setDate({...date, [e.target.name]: e.target.value})
    }

    function getDateOrders(){
        axios
        .get(url+'/admin/getDateOrders/'+date.ordersDate,{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res)=>{
            setDateWiseOrders({
                search: true,
                heading: "Orders On "+res.data.orderDate,
                orders: res.data.orderList
            })
        })
        .catch((error)=>{
            alert(error)
        })
    }

    function getDeliveredOrders(){
        axios
        .get(url+'/admin/getDeliveredOrders/'+date.deliveredOrdersDate,{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res)=>{
            const reqDate=moment(date.deliveredOrdersDate).format("DD/MM/YYYY")
            setDateWiseOrders({
                search: true,
                heading: "Orders Delivered On "+reqDate,
                orders: res.data
            })
        })
        .catch((error)=>{
            alert(error)
        })
    }

    if(activeOrders){
        return (
            <div className="orders_cont container">
                <div className="search_cont mb-4">
                    <input type="text" placeholder="Search for Order" name="search" />
                    <div className="search_btn">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />    
                    </div>
                </div>
                <div className="heading">Active Orders</div>
                <div className="row orders">
                    <OrderCard orders={activeOrders} />
                </div>
                <div className="heading mt-5">Search</div>
                <Form className='mb-5 mt-3'>
                    <FormGroup row>
                        <Col lg={3}>
                            <div className='label'>Search Deliverd Orders:</div>
                        </Col>
                        <Col lg={3}>
                            <Input type='date' name="deliveredOrdersDate" value={date.deliveredOrdersDate} onChange={setFormDate} />
                        </Col>
                        <Col lg={2}>
                            <div className="btn_cont" >
                                <div className="btn_ btn_small" onClick={getDeliveredOrders}>Get Data</div>
                            </div>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col lg={3}>
                            <div className='label'>Search All Orders By Date:</div>
                        </Col>
                        <Col lg={3} >
                            <Input type='date' name="ordersDate" value={date.ordersDate} onChange={setFormDate} />
                        </Col>
                        <Col lg={2}>
                            <div className="btn_cont" >
                                <div className="btn_ btn_small" onClick={getDateOrders}>Get Data</div>
                            </div>
                        </Col>
                    </FormGroup>
                </Form>
                <div className="heading mt-4">{dateWiseOrders.heading}</div>
                {!dateWiseOrders.search ? 
                    dateWiseOrders?.orders.map(dateOrder=>
                        <div className="row orders" key={dateOrder._id}>
                            <div className="col-12 date">Date: {dateOrder.orderDate}</div>
                            <OrderCard orders={dateOrder.orderList} />
                        </div>
                    ):(
                        <div className="row orders">
                            <OrderCard orders={dateWiseOrders.orders} />
                        </div>
                    )
                }
                
            </div>
        )
    }
    else{
        return(<></>)
    }
}
