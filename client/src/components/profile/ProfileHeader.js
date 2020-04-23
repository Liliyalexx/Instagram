import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{' '}
                
                {isEmpty(profile.website) ? null : (
                  <Link
                    className="text-white p-2"
                   to={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </Link>
                )}

                
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;