import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './order.css'

function OrderCard(props){
    if(props.activeOrder){
        return (
            <div className="col-12 col-md-4 col-ld-3">
                <div className="order_card">
                    <div className="row_ order_number"><b>Order Number:</b> 12345678987654311</div>
                    <div className="row_ total"><b>Total:</b> ₹500</div>
                    <div className="row_ dishes">
                        <b>Dishes:</b>
                        <div>1 x Dish1: ₹500</div>
                        <div>1 X Dish2: ₹500</div>
                        <div>1 X Dish3: ₹500</div>
                    </div>
                    <div className="row_ order_date"><b>Order Date:</b> 20/03/2022</div>
                    <Link to='/orders/order_detail' className="row_ ord_btn_cont">
                        <div className="ord_btn">View Details</div>
                    </Link>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="col-12 col-md-4 col-ld-3">
                <div className="order_card">
                    <div className="row_ order_number"><b>Order Number:</b> 12345678987654311</div>
                    <div className="row_ total"><b>Total:</b> ₹500</div>
                    <div className="row_ dishes">
                        <b>Dishes:</b>
                        <div>1 x Dish1: ₹500</div>
                        <div>1 X Dish2: ₹500</div>
                        <div>1 X Dish3: ₹500</div>
                    </div>
                    <div className="row_ order_date"><b>Order Date:</b> 17/03/2022</div>
                    <div className="row_ delivery_date"><b>Delivery Date:</b> 20/03/2022</div>
                    <Link to='/orders/order_detail' className="row_ ord_btn_cont">
                        <div className="ord_btn">View Details</div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default function Orders() {
    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('2').classList.add('active')
    }, [])
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
                <OrderCard activeOrder={true} />
            </div>
            <div className="heading mt-4">Completed Orders</div>
            <div className="row orders">
                <div className="col-12 date">Date: 20/03/2022</div>
                <OrderCard activeOrder={false} />
                <OrderCard activeOrder={false} />
                <OrderCard activeOrder={false} />
            </div>
            <div className="row orders">
                <div className="col-12 date">Date: 19/03/2022</div>
                <OrderCard activeOrder={false} />
                <OrderCard activeOrder={false} />
            </div>
            <div className="row orders">
                <div className="col-12 date">Date: 18/03/2022</div>
                <OrderCard activeOrder={false} />
            </div>
        </div>
    )
}
