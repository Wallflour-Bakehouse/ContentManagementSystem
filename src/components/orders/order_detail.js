import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, FormGroup, Col } from "reactstrap";
import './order_detail.css'

function UpdateForm(){
    return(
        <Form>
            <FormGroup row>
                <Col lg={1}>
                    <div className='label'>Status:</div>
                </Col>
                <Col lg={3} >
                    <select name="status">
                        <option value="Order Pending Approval">Order Pending Approval</option>
                        <option value="Order Approved">Order Approved</option>
                        <option value="Order Out For Delivery">Order Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </Col>
                <Col lg={4}>
                    <div><b className='me-2'>Current Order Status:</b> Order Out For Delivery</div>
                </Col>
                <Col lg={2}>
                    <div className="btn_cont">
                        <div className="btn_">Update</div>
                    </div>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default function OrderDetail() {
    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('2').classList.add('active')
    }, [])
    return (
        <div className='order_detail container mb-5'>
            <div className="head">Your Order: order.id</div>
            <UpdateForm/>
            <div className="row heading">
                <div className="col-3 col-md-4 col-lg-5">Product</div>
                <div className="col-2 col-md-2 col-lg-2">Price</div>
                <div className="col-2 col-md-2 col-lg-3">Quantity</div>
                <div className="col-2 col-md-2 col-lg-2">Total</div>
            </div>
            <div className="row cart_item mt-3 mb-3" key={1}>
                <div className="col-4 col-md-4 col-lg-5 img_cont">
                    <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Reload"/>
                    <div className="detail">Product Name</div>
                </div>
                <div className="col-2 col-md-2 col-lg-2 price">₹ 1000</div>
                <div className="col-3 col-md-2 col-lg-3 quantity">
                    <div className="qnt">
                        <div className="minus">-</div>
                        <div className="value">1</div>
                        <div className="plus">+</div>
                    </div>
                </div>
                <div className="col-3 col-md-2 col-lg-2 total">₹ 1000</div>
            </div>
            <div className="row">
                <div className="total_cont">
                    <div>Total</div>
                    <div className="total">₹ 1000</div>
                </div>
            </div>
        </div>
    )
}
