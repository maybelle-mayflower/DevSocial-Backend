import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    }); 

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, from, to, fieldofstudy, current, description } = formData;


    const onChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addEducation(formData, history);
    }
   
    
    return (
        <Fragment>
            <div className="card">
                <div className="card-header">
                <h1 className='text-primary'><i className="fas fa-code-branch"></i> Add Your Education </h1>
                </div>
                <div className="card-body">
                
                <small>* = required field</small>
                <form className="form" onSubmit={e=>onSubmit(e)}>
                    <div className="form-group">
                    <input type="text" placeholder="* School" value={school} onChange={e=>onChange(e)} name="school" required />
                    </div>
                    <div className="form-group">
                    <input type="text" value={degree} onChange={e=>onChange(e)} placeholder="* Degree" name="degree" required />
                    </div>
                    <div className="form-group">
                    <input type="text" value={fieldofstudy} onChange={e=>onChange(e)} placeholder="Field Of Study" name="fieldofstudy" />
                    </div>
                    <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" value={from} onChange={e=>onChange(e)} name="from" />
                    </div>
                    <div className="form-group">
                    <p><input type="checkbox" value={current} checked={current}
                        onChange={ e=>{
                            setFormData({...formData, current : !current});
                            toggleDisabled(!toDateDisabled);
                        }} 
                    name="current"/> {' '} Current School</p>
                    </div>
                    <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" value={to} onChange={e=>onChange(e)} name="to" 
                        disabled={toDateDisabled ? 'disabled' : '' }
                    />
                    </div>
                    <div className="form-group">
                    <textarea
                        value={description} 
                        onChange={e=>onChange(e)}
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                    ></textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                    <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
                </form>
                </div>
            </div>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation : PropTypes.func.isRequired
}

export default connect(null, {addEducation})(withRouter(AddEducation));
