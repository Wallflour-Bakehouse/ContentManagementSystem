import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import {url} from '../../url'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCartShopping, faComment, faMoneyBill1Wave, faTruckFast, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './home.css'

function OrderCard(props){
    return props.allOrders?.map(order=>
        <Link to={`/orders/${order._id}`}>
            <div className={"row data mb-1 "+(order.orderCancel ? " delete":"")} key={order._id}>
                <div className="col-3">{order.username}</div>
                <div className="col-5">
                    { order.orderItems.map(item=>
                        <div key={item._id}>{item.productName+" "}x{" "+item.quantity+" "}</div>
                    )}
                </div>
                <div className="col-2">{order.deliveryDate}</div>
                <div className="col-2">{order.grandTotal}</div>
            </div>
        </Link>
    )
}

export default function Home(props) {

    const [activeOrders, setActiveOrders] = useState()
    const [todayDelivery, setTodayDelivery] = useState()
    const [todayOrders, setTodayOrders] = useState()
    const [dashBoardBox, setDashBoardBox] = useState()
    const [newUser, setNewUser] = useState()
    const [orderControl, setOrderControl] = useState()
    const token = JSON.parse(localStorage.getItem("profile"))?.token

    useEffect(() => {
        props.setNavShow(false)
        document.title = `Wallflour Bakehouse | CMS`
        window.scrollTo(0, 0)
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('1').classList.add('active')
        try{
            axios
            .get(url+'/admin/home',{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                setActiveOrders(res.data.activeOrders)
                setTodayDelivery(res.data.todayDelivery)
                setTodayOrders(res.data.todayOrders)
                setDashBoardBox(res.data.dashBoard)
                setNewUser(res.data.newUsers)
                setOrderControl(res.data.orderControl.status)
            })
            .catch((error)=>{
                console.log(error)
            })
        } 
        catch(error){
            console.log(error)
        }
    }, [])

    function changeOrderControl(){
        axios
        .get(url+'/admin/changeOrderControl',{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(()=>{
            setOrderControl(!orderControl)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    return (
        <div className="home_dashboard container">
            <div className="row">
                <div className="section header col-12">
                    {orderControl ? (
                        <div className="box order_activate" onClick={changeOrderControl}>
                            <div className="content">
                                <div className="text">Orders</div>
                                <div className="subtext">Accepting Orders</div>
                            </div>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    ):(
                    <div className="box order_deactivate" onClick={changeOrderControl}>
                        <div className="content">
                            <div className="text">Orders</div>
                            <div className="subtext">Denying Orders</div>
                        </div>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>)}
                    <div className="box sales">
                        <div className="content">
                            <div className="text">{dashBoardBox ? dashBoardBox.monthSales : 0}</div>
                            <div className="subtext">Sales</div>
                        </div>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                    <div className="box views">
                        <div className="content">
                            <div className="text">{dashBoardBox ? dashBoardBox.monthComments : 0}</div>
                            <div className="subtext">Comments</div>
                        </div>
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    <div className="box views">
                        <div className="content">
                            <div className="text">₹ {dashBoardBox ? dashBoardBox.totalSales : 0}</div>
                            <div className="subtext">Earnings</div>
                        </div>
                        <FontAwesomeIcon icon={faMoneyBill1Wave} />
                    </div>
                    <div className="box views">
                        <div className="content">
                            <div className="text">{activeOrders ? activeOrders.length : 0}</div>
                            <div className="subtext">Active Orders</div>
                        </div>
                        <FontAwesomeIcon icon={faTruckFast} />
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <div className="active_orders">
                        <div className="heading_sec">
                            <div className="heading">Orders To Be Delivered Today</div>
                            <div className="btn_cont">
                                <Link to="/orders" className="btn_ btn_small">View all</Link>
                            </div>
                        </div>  
                        <div className="ord_list container-fluid">
                            <div className="row heading">
                                <div className="col-3">Username</div>
                                <div className="col-5">Products</div>
                                <div className="col-2">Delivery Date</div>
                                <div className="col-2">Total</div>
                            </div>
                            {todayDelivery ? 
                                <OrderCard allOrders={todayDelivery} />
                            :<></>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <div className="active_orders">
                        <div className="heading_sec">
                            <div className="heading">Today's Orders</div>
                            <div className="btn_cont">
                                <Link to="/orders" className="btn_ btn_small">View all</Link>
                            </div>
                        </div>  
                        <div className="ord_list container-fluid">
                            <div className="row heading">
                                <div className="col-3">Username</div>
                                <div className="col-5">Products</div>
                                <div className="col-2">Delivery Date</div>
                                <div className="col-2">Total</div>
                            </div>
                            {todayOrders ? 
                                <OrderCard allOrders={todayOrders} />
                            :(<></>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <div className="active_orders">
                        <div className="heading_sec">
                            <div className="heading">Active Orders</div>
                            <div className="btn_cont">
                                <Link to="/orders" className="btn_ btn_small">View all</Link>
                            </div>
                        </div>  
                        <div className="ord_list container-fluid">
                            <div className="row heading">
                                <div className="col-3">Username</div>
                                <div className="col-5">Products</div>
                                <div className="col-2">Delivery Date</div>
                                <div className="col-2">Total</div>
                            </div>
                            {activeOrders ? 
                                <OrderCard allOrders={activeOrders} />
                            :(<></>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="new_users_cont">
                        <div className="heading">New Customers </div>
                        {newUser?.length>0 ?
                            newUser.map(user=>
                                <div className="new_user_card">
                                    <div className="img" style={{backgroundImage: 'url('+user.dp+')'}}></div>
                                    <div className="details">
                                        <div className="name">{user.username+" "}({user.firstname+" "+user.lastname})</div>
                                        <div className="loc"><b>Phone:</b> +{user.countryCode} - {user.phoneNumber}</div>
                                        <div className="loc"><b>Email:</b> {user.email}</div>
                                    </div>
                                    <div className="date">{moment(user.createdAt).format('DD/MM/YYYY')}</div>
                                </div>
                            ):(<div style={{fontSize: "18px"}}>No New Customers This Week</div>)
                        }
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    )
}
