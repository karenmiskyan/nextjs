import React from 'react'
import { Col } from 'reactstrap'
import { FaqQuestionAnswer } from '../../../Data/FaqData'

const QuestionSection = ({arr}) => {

    const handleAnchorClick = (event, targetId) => {
        event.preventDefault();

        // Get the target element's top position
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - 200; // subtracting 200px
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth' // Optional: smooth scroll effect
            });
        }
    };
    return (
        <Col md="4">
            <div className="faq-link-box">
                <ul>
                    {
                        arr?.faqs_value?.map((elem) => {
                            return (
                                <li key={elem.id}>
                                    <a href={`#${elem.id}`} onClick={(e) => handleAnchorClick(e, elem.id)}>
                                        <h4>{elem.id}.</h4>
                                        <h5>{elem.title}</h5>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Col>
    )
}

export default QuestionSection