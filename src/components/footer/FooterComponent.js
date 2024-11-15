import React from "react";
import "./FooterComponent.css";

const FooterComponent = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="pixel-logo">FOOD ORDER</div>


                <div className="pixel-copyright">
                    © 2024 CUONGDAY.COM <br /> ALL RIGHTS RESERVED
                </div>

                <div className="pixel-social">
                    <a
                        href="https://www.facebook.com/phucuong25.0/"
                        className="pixel-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        href="https://www.facebook.com/phucpham1803"
                        className="pixel-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                    <a
                        href="https://www.facebook.com/baolong.pham.7921975"
                        className="pixel-icon"
                        target="_blank"
                        rel="noopener noreferrer"
                    ></a>
                </div>
                
            </div>
        </footer>
    );
};

export default FooterComponent;
