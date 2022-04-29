import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {url} from '../../url'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faRetweet, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { Form, FormGroup, Col } from "reactstrap";
import './order_detail.css'

function UpdateForm(props){

    const [status, setStatus] = useState()
    const [payment, setPayment] = useState()
    const token = JSON.parse(localStorage.getItem("profile")).token

    function setStatusOption(e){
        setStatus(e.target.value)
    }

    function setPaymentOption(e){
        setPayment(e.target.value)
    }

    function updateStatus(){
        if(status){
            axios
            .put(url+'/admin/updateStatus/'+props.id,{
                status: status
            },{
                headers: {Authorization: `Bearer ${token}`}
            })
            .then((res)=>{
                alert(res.data.message)
                window.location.reload()
            })
            .catch((err)=>{
                alert(err.response.data.message)
            })
        }
        else{
            alert("Please Update Status")
        }
    }

    function updatePayment(){
        if(payment){
            axios
            .put(url+'/admin/updatePayment/'+props.id,{
                payment: payment
            },{
                headers: {Authorization: `Bearer ${token}`}
            })
            .then((res)=>{
                alert(res.data.message)
                window.location.reload()
            })
            .catch((err)=>{
                alert(err.response.data.message)
            })
        }
        else{
            alert("Please Update Payment")
        }
    }

    return(
        <Form className='mb-5'>
            <FormGroup row>
                <Col lg={1}>
                    <div className='label'>Status:</div>
                </Col>
                <Col lg={3} >
                    <select name="status" onChange={setStatusOption}>
                        <option>Current: {props.status}</option>
                        <option value="Order Not Accepted">Order Not Accepted</option>
                        <option value="Order Accepted">Order Approved</option>
                        <option value="Order Out For Delivery">Order Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </Col>
                <Col lg={4}>
                    <div><b className='me-2'>Current Order Status:</b> {props.status}</div>
                </Col>
                <Col lg={2}>
                    <div className="btn_cont" onClick={updateStatus}>
                        <div className="btn_ btn_small">Update</div>
                    </div>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col lg={1}>
                    <div className='label'>Payment:</div>
                </Col>
                <Col lg={3} >
                    <select name="status" onChange={setPaymentOption}>
                        <option>Current: {props.payment}</option>
                        <option value="Pending">Pending</option>
                        <option value="Recieved">Recieved</option>
                    </select>
                </Col>
                <Col lg={4}>
                    <div><b className='me-2'>Current Payment Status:</b> {props.payment}</div>
                </Col>
                <Col lg={2}>
                    <div className="btn_cont" onClick={updatePayment}>
                        <div className="btn_ btn_small">Update</div>
                    </div>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default function OrderDetail() {

    const ord = useParams()
    const [modal, setModal] = useState({open: false, header: "", body: ""})
    const [order, setOrder] = useState()
    const token = JSON.parse(localStorage.getItem("profile")).token

    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('2').classList.add('active')
        try{
            axios
            .get(url+`/admin/getOneOrder/${ord.orderId}`,{
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                if(res.status===200)
                    setOrder(res.data)
            })
            .catch(()=>{
                alert("Error")
            })
        } 
        catch(error){
            console.log(error)
        }
    }, [])

    function closeModal(){
        setModal({open: !modal.open})
    }

    function triggerModal(header, body, deleopt, footer){
        setModal({
            open: !modal.open,
            header: header,
            body: body, 
            delete: deleopt,
            footer: footer
        })
    }

    function orderDelete(){
        axios
        .delete(url+`/admin/orderDelete/${order._id}`,{
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
    function orderRestore(){
        axios
        .delete(url+`/admin/orderRestore/${order._id}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(()=>{
            alert("Order Restored")
            window.location.reload()
        })
        .catch(()=>{
            alert("Error: Can not restore order")
        })
    }

    function DialogBox() {
        return (
            <Modal isOpen={modal.open} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>{modal.header}</ModalHeader>
                <ModalBody>{modal.body}</ModalBody>
                {modal.footer ?
                    <ModalFooter>
                        <button type="button" className="btn btn-success" onClick={modal.delete ? orderDelete : orderRestore }>{modal.delete ? "Delete":"Restore"} Order</button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    </ModalFooter>:<></>
                }
            </Modal>
        )
    }

    if(order){
        return (
            <div className='order_detail container-fluid'>
                <div className="head">Order Number: {order._id}</div>
                {order.orderCancel ? <div className="mb-4" style={{fontWeight: "500", fontSize: "22px", color: "red"}}>User Request for Order Cancelation</div>:<></>}
                <UpdateForm id={order._id} payment={order.paymentStatus} status={order.status} />
                <DialogBox />
                <div className="delete" onClick={()=>triggerModal("Delete Order?", "Deletion of order will remove the order from the database.", true, true)}><FontAwesomeIcon icon={faTrashCan} /></div>
                {order.orderCancel ? <div className="delete restore" onClick={()=>triggerModal("Restore Order?", "Restoring the oroduct will remove the delete request.", false, true)}><FontAwesomeIcon icon={faRetweet} /></div>:<></>}
                <div className="ord_status" style={{fontSize: "18px"}}><b className='me-2'>{order.status!=="Delivered" ? ("Expected"):("")} Delivery Date:</b> {order.deliveryDate}</div>
                <div className="row heading">
                    <div className="col-4 col-md-4 col-lg-5">Product</div>
                    <div className="col-2 col-md-2 col-lg-2">Price</div>
                    <div className="col-3 col-md-2 col-lg-3">Quantity</div>
                    <div className="col-3 col-md-2 col-lg-2">Total</div>
                </div>
                {order.orderItems.map(item=>
                    <div className="row cart_item pt-3 pb-3" key={item._id}>
                        <div className="col-4 col-md-4 col-lg-5 img_cont">
                            {item.customisation ? (<div className="customisation" onClick={()=>triggerModal("Customisation", item.customisation, false)}><FontAwesomeIcon icon={faMessage} /> </div>):(<></>)}
                            <img src={item.productImage} alt="Reload"/>
                            <div style={{textAlign: "center"}}>
                                <div className="detail">{item.productName} </div>
                            </div>
                        </div>
                        <div className="col-2 col-lg-2 price_cont">
                            <div className="price">₹{item.productPrice-(item.productPrice*item.discount*0.01)}
                            {item.discount!==0 ? (
                                <div className="discount_price">₹{item.productPrice}</div>
                            ):(<></>)}
                            </div>
                        </div>
                        <div className="col-3 col-md-2 col-lg-3 quantity">{item.quantity}</div>
                        <div className="col-3 col-md-2 col-lg-2 total">₹ {item.total}</div>
                    </div>
                )}
                {order.couponCode!=="" ? (<div className="row">
                    <div className="coupon_cont">
                        <div><b>Coupon Code: </b></div>
                        <div className="coupon_code">{order.discount}</div>
                        <div className="subtotal">Subtotal: ₹ {order.grandTotal}</div>
                    </div>
                </div>):(<></>)}
                <div className="row">
                    <div className="total_cont">
                        <b>Total:</b>
                        <div className="total ms-3">₹ {order.grandTotal}</div>
                    </div>
                </div>
                <div className="row row3 mt-5">
                    <div className="col-12 col-md-6">
                        <div className="add bill_add p-3 p-md-4 mb-4">
                            <div className="heading">Billing Address</div>
                            <div className="name">Name: {order.user.firstname} {order.user.lastname}</div>
                            <div className="name">Phone: +{order.user.countryCode} - {order.user.phoneNumber}</div>
                            <div><b>Address:</b></div>
                            <p>{order.user.billingAddress.address}, {order.user.billingAddress.landmark}, {order.user.billingAddress.city} - {order.user.billingAddress.pincode}, {order.user.billingAddress.state}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="add ship_add p-3 p-md-4">
                            <div className="heading">Shipping Address</div>
                            <div className="name">Name: {order.shippingAddress.name}</div>
                            <div className="name">Phone: +{order.shippingAddress.countryCode} - {order.shippingAddress.phoneNumber}</div>
                            <div><b>Address:</b></div>
                            <p>{order.shippingAddress.address}, {order.shippingAddress.landmark}, {order.shippingAddress.city} - {order.shippingAddress.pincode}, {order.shippingAddress.state}</p>
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
