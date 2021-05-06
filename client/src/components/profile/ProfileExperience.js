import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
 
const ProfileExperience = ({profile:{experience, education}}) => {
    return (
        <Fragment>
            <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {
                    experience.length <= 0 ? <span>No experience added</span> :
                    experience.map((exp, index) => (
                        <div key={index}>
                            <h3 className="text-dark">{exp.company}</h3>
                            <p>  
                                <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                                - {' '} {exp.to === null ? (' Now ') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)}
                            </p>
                            <p><strong>Position: </strong>{exp.title}</p>
                            <p>
                                {exp.description ? 
                                <span><strong>Description: </strong> {exp.description}</span> : ''}
                                
                            </p>
                        </div>
                    ))
                    
                }
        </div>
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {
                    education.length <= 0 ? <span>No experience added</span> :
                    education.map((edu, index) => (
                        <div key={index}>
                            <h3>{edu.school}</h3>
                            <p>  
                                <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
                                - {' '} {edu.to === null ? (' Now ') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)}
                            </p>
                            <p><strong>Degree: </strong>{edu.degree}</p>
                            <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                            {
                                edu.description && (<p><strong>Description: </strong>{edu.description}</p>)
                            }
                                
                        </div>
                    )
                    )
            }
       
        </div>
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileExperience
