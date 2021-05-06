import React, { useEffect} from 'react';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profile';

import { connect } from 'react-redux';

const GithubRepos = ({getGithubRepos, profile: {githubusername}, repos}) => {

    useEffect(() => getGithubRepos(githubusername), [githubusername, getGithubRepos]);

    return (
        <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {
              githubusername && repos.length > 0 ? 
            
              repos.map((repo) => (
                <div key={repo.id} className="repo bg-white p-1 my-1">
                    <div>
                    <h4><a href="#!" target="_blank"
                        rel="noopener noreferrer">{repo.name}</a></h4>
                    <p>
                        {repo.description}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                        <li className="badge badge-dark">Watchers: {repo.watchers}</li>
                        <li className="badge badge-light">Forks: {repo.forks}</li>
                    </ul>
                    </div>
                </div>
              ))     
            :
            <span>No repos found</span>
          }
        
    
        </div>
    )
}

GithubRepos.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos : PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    repos: state.profile.repos
});

export default connect(mapStateToProps, {getGithubRepos})(GithubRepos)
