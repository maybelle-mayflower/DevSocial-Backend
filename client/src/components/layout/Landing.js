import React from 'react';
import { Link }  from 'react-router-dom';

const Landing = () => {
    return (
        <section className="landing">
            <div className="light-overlay">
                <div className="landing-inner">
                <h1 className="x-large">iCode Like A Girl</h1>
                <p className="lead">
                    Build your network, expand your reach, impact a generation of female developers!
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;

