import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap";
import './coupons.css'

export default function Coupons() {
    return (
        <div className='coupons_cont container'>
            <div className="heading">Coupons</div>
            <div className="box">
                <FontAwesomeIcon icon={faHandHoldingDollar} />
                <div className="text">Manage User Coupons</div>
            </div>
            <div className="search_cont mb-5">
                <input type="text" placeholder="Search for a coupon" name="search" />
                <div className="search_btn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />    
                </div>
            </div>
            <Form>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Coupon Code</Label>
                    <Col lg={5} >
                        <Input type="text" id="name" name="name" autoComplete="off" placeholder="Coupon Code" />
                        {/* <FormFeedback>{errors.name}</FormFeedback> */}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Coupon Heading</Label>
                    <Col lg={5} >
                        <Input type="text" id="name" name="name" autoComplete="off" placeholder="Coupon Heading" />
                        {/* <FormFeedback>{errors.name}</FormFeedback> */}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="name" lg={2}>Coupon Description</Label>
                    <Col lg={5} >
                        <Input type="text" id="name" name="name" autoComplete="off" placeholder="Coupon Description" />
                        {/* <FormFeedback>{errors.name}</FormFeedback> */}
                    </Col>
                    <Col lg={7} >
                        <div className="btn_cont mt-4">
                            <div className="btn_ btn_small">Add/Edit</div>
                        </div>
                    </Col>
                </FormGroup>
            </Form>
            <div className="row mt-5">
                <div className="col-4">
                    <div className="coupon">
                        <div className="inner_sec">
                            <div className="details coupon_code">Code: HBSKDFBKJB</div>
                            <div className="details coupon_heading">Coupon Heading</div>
                            <div className="coupon_desc">Small Explaination about coupon</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
