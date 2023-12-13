import React, { useState } from 'react';
import Modal from './modal/Modal';

export default function Hero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
                <div className="row">
                    <div className="col-lg-8">
                        <h1><span>Easy Eat</span></h1>
                        <h2>Delivering great food for more than 18 years!</h2>
                    </div>
                    <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">
                        <button className="glightbox play-btn" onClick={openModal}></button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    {/* Add your video player or embed code here */}
                    <iframe
                        width="900"
                        height="600"
                        src="https://www.youtube.com/embed/u6BOC7CDUTQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Modal>
            )}
        </section>
    );
}
