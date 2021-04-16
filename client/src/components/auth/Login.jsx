import React , { useState } from 'react';
import { Link }  from 'react-router-dom';


const Login = () => {

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
        console.log('Success');
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

export default Login;