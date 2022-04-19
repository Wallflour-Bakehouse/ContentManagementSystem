import React, { useEffect } from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './recent_commets.css'

function CommentCard() {
    return (
        <div className="comment_cont" key='ki'>
            <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt="pic" />
            <div className="comment">
                <div className="top_line">
                    <div className="name">comment.author</div>
                    <div className="date_">16/03/2022</div>
                    <div className="rating">Rating: 3/5</div>
                    <div className="dish">Dish: Dish Name</div>
                    <div className="delete"><FontAwesomeIcon icon={faTrashCan} /></div>
                </div>
                <div className="bottom_line">
                    <div className="cmt">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores nemo eveniet itaque eius? Id non unde enim necessitatibus nesciunt eveniet quis. Velit rerum eveniet eaque, illo dolore soluta perspiciatis voluptates?
                    </div>
                </div>
            </div>
        </div>
    )
}


export default function RecentComments() {
    useEffect(() => {
        document.querySelectorAll('.nav_ele').forEach((ele)=>{
            if(!ele.classList.contains('active')) return
            ele.classList.remove('active')
        })
        document.getElementById('5').classList.add('active')
    }, [])
    return (
        <div className='recent_comments container'>
            <div className="heading">Recent Comments</div>
            <div className="row comment">
                <div className="col-12">
                    <div className="date">Date: 20/03/2022</div>
                </div>
                <div className="col-12">
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                </div>
            </div>
            <div className="row comment">
                <div className="col-12">
                    <div className="date">Date: 19/03/2022</div>
                </div>
                <div className="col-12">
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                </div>
            </div>
            <div className="row comment">
                <div className="col-12">
                    <div className="date">Date: 18/03/2022</div>
                </div>
                <div className="col-12">
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                    <CommentCard commentReview={true} />
                </div>
            </div>
        </div>
    )
}
