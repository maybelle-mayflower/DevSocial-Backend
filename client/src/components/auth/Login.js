import React , { useState } from 'react';
import { Link, Redirect }  from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const {email, password} = formData;
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        login({email, password});
    }

    //Redirect if authenticated

    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }

    return (
        <React.Fragment>
            <div className="card" >
                <div className="card-header">
                <p className="lead"><i className="fas fa-user"></i> Login</p>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={e => onSubmit(e)}>
                       
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Email Address" name="email" 
                            value={email}
                            onChange={e=>onChange(e)}/>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={password}
                                onChange={e=>onChange(e)}
                            />
                        </div>
                        
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </form>
                    <p className="my-1">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);