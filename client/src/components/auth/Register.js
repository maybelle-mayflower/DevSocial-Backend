import React from 'react'

const Register = () => {
    return (
        <React.Fragment>
            <div className="card" >
                <div className="card-header">
                <p className="lead"><i className="fas fa-user"></i> Create Account</p>
                </div>
                <div className="card-body">
                    <form className="form" action="create-profile.html">
                        <div className="form-group">
                        <input className="form-control" type="text" placeholder="Name" name="name" required />
                        </div>
                        <div className="form-group">
                        <input className="form-control" type="email" placeholder="Email Address" name="email" />
                        <small className="form-text"
                            >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                        </div>
                        <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                        />
                        </div>
                        <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            minLength="6"
                        />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <br/>
                    <p className="my-1">
                        Already have an account? <a href="login.html">Sign In</a>
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register;