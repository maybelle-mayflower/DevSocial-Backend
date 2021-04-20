import React from 'react';
import { Link, Redirect }  from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

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

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);

