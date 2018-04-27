import React from 'react';
import PropTypes from 'prop-types';

import Catcher from 'containers/Catcher';
import Spammer from 'containers/Spammer';

import Field from 'components/Bulma/Field';

export default class Container extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  authDiscord = (event) => {
    event.preventDefault();
    if (this.state.isLoggedIn && this.props.isLoggedIn) {
      this.props.logoutDiscord();
      this.setState({ isLoggedIn: false });
    } else {
      this.props.loginDiscord({ token: this.props.token });
      this.setState({ isLoggedIn: true });
    }
  }
  updateToken = (event) => {
    event.preventDefault();
    this.props.updateToken({ token: event.target.value });
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn && this.props.isLoggedIn;
    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div>
        <Field>
          <label className="label">Discord Token</label>
          <div className="control">
            <input
              className="input"
              disabled={isLoggedIn}
              onChange={this.updateToken}
              placeholder="Discord Token"
              type={isLoggedIn ? 'password' : 'text'}
              value={this.props.token}
            />
          </div>
        </Field>
        <button className={`button is-fullwidth ${isLoggedIn ? 'is-danger' : 'is-info'}`} onClick={this.authDiscord}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
        {isLoggedIn && (
          <div>
            <br />
            <Spammer />
            <br />
            <Catcher />
          </div>
        )}
      </div>
    );
    /* eslint-enable jsx-a11y/label-has-for */
  }
}

Container.propTypes = {
  token: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  loginDiscord: PropTypes.func.isRequired,
  logoutDiscord: PropTypes.func.isRequired,
  updateToken: PropTypes.func.isRequired,
};
