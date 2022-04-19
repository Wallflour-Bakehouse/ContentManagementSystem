import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './message_detail.css'

export default function MessageDetail() {
    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('4').classList.add('active')
    }, [])
    return (
        <div className="msg_detail_cont container">
            <div className="heading">Message Details</div>
            <div className="delete"><FontAwesomeIcon icon={faTrash}/></div>
            <div className="row msg_detail">
                <div className="col-6">
                    <div className="opt name"><span>Name:</span> Full Name</div>
                    <div className="opt u_name"><span>Username:</span> User Name</div>
                    <div className="opt email"><span>Email:</span>email@email.com</div>
                    <div className="opt phn"><span>Phone Number:</span>+91 - 9999999999</div>
                    <div className="opt date"><span>Date:</span> 21/03/2022</div>
                </div>
                <div className="col-6">

                </div>
                <div className="col-12">
                    <div className="opt msg">
                        <span>Message:</span>
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quisquam obcaecati maxime ipsum sapiente itaque? Fugit perferendis modi magni, eos suscipit obcaecati nobis, beatae distinctio velit dolorem vel necessitatibus quo.
                            Voluptatibus quis cupiditate amet est architecto commodi voluptates cumque quae. Repudiandae voluptates neque ipsam nesciunt aut, quisquam molestiae corporis officiis sit aliquam, sunt a assumenda, facilis amet architecto maxime cupiditate.
                            Ipsum vero magni provident optio rerum deleniti vitae adipisci repellendus soluta voluptate nesciunt nobis quo eos veniam eum, ex non dolore animi ab quibusdam, distinctio dignissimos explicabo voluptatibus ad. In?
                            Blanditiis quod eaque atque laudantium saepe pariatur commodi harum eos iure quos facilis consectetur, est id! Sapiente veritatis quam quaerat aut iure animi quibusdam eos non nihil, incidunt quis mollitia.
                            Dolore provident ex ducimus voluptas excepturi explicabo ab a possimus incidunt praesentium aliquam illum minima aliquid esse culpa minus facere soluta quibusdam, sit, ut placeat modi reprehenderit ullam vel. Repudiandae.
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )
}
