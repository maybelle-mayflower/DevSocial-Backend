import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        company: '',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    }); 

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addExperience(formData, history);
    }
   
    
    return (
        <Fragment>
            <div className="card">
                <div className="card-header">
                <h1 className='text-primary'><i className="fas fa-code-branch"></i> Add An Experience </h1>
                </div>
                <div className="card-body">
                
                <small>* = required field</small>
                <form className="form" onSubmit={e=>onSubmit(e)}>
                    <div className="form-group">
                    <input type="text" placeholder="* Job Title" value={title} onChange={e=>onChange(e)} name="title" required />
                    </div>
                    <div className="form-group">
                    <input type="text" value={company} onChange={e=>onChange(e)} placeholder="* Company" name="company" required />
                    </div>
                    <div className="form-group">
                    <input type="text" value={location} onChange={e=>onChange(e)} placeholder="Location" name="location" />
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
                    name="current"/> {' '} Current Job</p>
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

AddExperience.propTypes = {
    addExperience : PropTypes.func.isRequired
}

export default connect(null, {addExperience})(AddExperience)
