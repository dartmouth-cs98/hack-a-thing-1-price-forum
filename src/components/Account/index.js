import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

const style = {
            height:300,
            display:'flex',
            alignItems:'center'
        }

const AccountPage = () => (

  <div className={'container'}>
                <h5 className={'teal-text'}> Account </h5>
                <div className={'card-pannel z-depth-2 teal'}>
                    <div className={'container white-text'} style={style}>
                    <AuthUserContext.Consumer>
                    {authUser =>
                      authUser ? <h1>Account: {authUser.email}</h1> : <h1>Account: User</h1>  }
                    </AuthUserContext.Consumer>

                    </div>
                </div>
                <div>
                  <PasswordForgetForm />
                  <PasswordChangeForm />
                </div>
  </div>


);



const Landing = () => (
  <div className={'container'}>
                <h5 className={'teal-text'}> Landing </h5>
                <div className={'card-pannel z-depth-5 teal'}>
                    <div className={'container white-text'} style={style}>
                      <p>
                          Faraj App Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                      </p>
                    </div>
                </div>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
