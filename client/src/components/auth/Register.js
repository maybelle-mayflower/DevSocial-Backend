import React , { useState } from 'react'
import { Link }  from 'react-router-dom';

const Register = () => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const {name, email, password, password2} = formData;
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if(password !== password2){
            console.log('Passwords do not match');
        }
        else
        {
            console.log('Success');
            // const newUser = {
            //     name, email, password
            // }
            // try {
            //     const config = {
            //         headers:{
            //             'Content-Type' :'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);

            // } catch (err) {
            //     console.error(err.response.data);
            // }
        }
    }

    return (
        <React.Fragment>
            <div className="card" >
                <div className="card-header">
                <p className="lead"><i className="fas fa-user"></i> Create Account</p>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input className="form-control" name="name" required  type="text" placeholder="Name"
                            value={name}
                            onChange={e=>onChange(e)}
                             />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" placeholder="Email Address" name="email" 
                            value={email}
                            onChange={e=>onChange(e)}/>
                            <small className="form-text">Your email will never be displayed on this platform</small>
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
                        <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                            value={password2}
                            onChange={e=>onChange(e)}
                        />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1">
                        Already have an account? <Link to="/login">Log In</Link>
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register;