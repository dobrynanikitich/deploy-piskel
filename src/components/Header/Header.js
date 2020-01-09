import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Header.module.scss';

class Header extends Component {
    state = {
        userName: 'SIGN IN',
    }

    logInHandler = () => {
            const { changeState } = this.props;
            const auth2 = window.gapi.auth2.getAuthInstance();
            auth2.signIn().then((googleUser) => {
            const myProfile = googleUser.getBasicProfile();
            const userName = myProfile.getGivenName();
            this.setState({ userName: userName });
            changeState('isSignedIn', true)
        });
    }

    logOutHandler = () => {
        const { changeState } = this.props;
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut();
        this.setState({ userName: 'SIGN IN' });
        changeState('isSignedIn', false);
    }

    render() {
        const { isSignedIn } = this.props;
        const { userName } = this.state;
        return (
            <header className={classes.Header}>
                <div className={classes.HeaderName}>PISKEL CLONE</div>
                <div className={classes.BtnsWrapper}>
                    <a href='#/' className={classes.BackToLanding}>
                        BACK
                    </a>
                    <div 
                        className={classes.AuthWrapper}
                        onClick={isSignedIn ? this.logOutHandler : this.logInHandler}
                        data-testid="sign-in-test"
                        >
                        <FontAwesomeIcon icon={['fab', 'google']}/>
                        <div
                            className={classes.AuthSection} 
                            >{userName}
                        </div>
                        {isSignedIn ? <FontAwesomeIcon icon={'sign-out-alt'}/> : ''}
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;