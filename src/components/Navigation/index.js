import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavItem} from  "react-bootstrap";

import SignOutButton from '../SignOut'
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

// class Navigation extends Component{
//   render(){
//     //const { authUser } = this.props;
//     return(
//
//
//       <Navbar>
//             <Navbar.Header>
//               <Navbar.Brand>
//                 <Link to="/" className="navbar-brand">Faraj App</Link>
//               </Navbar.Brand>
//             </Navbar.Header >
//
//
//             <AuthUserContext.Consumer>
//               {authUser =>
//                 authUser ? <NavigationAuth /> : <NavigationNonAuth />  }
//             </AuthUserContext.Consumer>
//
//
//
//
//
//       </Navbar>
//     );
//   }
// }
// const Navigation = ({ authUser }) => (
//   <nav className="navbar navbar-default">
//         <div className="container-fluid">
//           <div className="navbar-header">
//             <Link to="/" className="navbar-brand">Faraj App</Link>
//           </div>
//
//           <div className="collapse navbar-collapse">
//             { authUser ? <NavigationAuth /> : <NavigationNonAuth />  }
//           </div>
//         </div>
//   </nav>
//   //<div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
// );


const Navigation = ({ authUser }) => (
  <nav className={'deep-purple darken-1'}>
         <div className={"nav-wrapper"}>
           <div className="navbar-header">
             <Link to="/" className="navbar-brand">Price Board</Link>
           </div>
           <AuthUserContext.Consumer>
             {authUser =>
               authUser ? <NavigationAuth /> : <NavigationNonAuth />  }
           </AuthUserContext.Consumer>
         </div>




  </nav>
  //<div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);


const NavigationAuth = () => (
  <ul className={'right'}>
        <li>
          <Link to={ROUTES.LANDING}>
            <a className={'white-text'}>Landing</a>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>
            <a className={'white-text'}>Home</a>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>
            <a className={'white-text'}>Account</a>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>
            <a className={'white-text'}>Admin</a>
          </Link>
        </li>
        <li>
           <SignOutButton />
        </li>
  </ul>
);


const NavigationNonAuth = () => (
  <ul className={'right'}>
      
  </ul>

);

// const NavigationAuth = () => (
//    <Nav>
//     <NavItem>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </NavItem>
//     <NavItem>
//       <Link to={ROUTES.HOME}>Home</Link>
//     </NavItem>
//     <NavItem >
//       <Link to={ROUTES.ACCOUNT}>Account</Link>
//     </NavItem>
//     <NavItem>
//       <Link to={ROUTES.ADMIN}>Admin</Link>
//     </NavItem>
//     <NavItem >
//       <SignOutButton />
//     </NavItem>
//    </Nav>
// );
//
// const NavigationNonAuth = () => (
//   <Nav>
//     <NavItem>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </NavItem>
//     <NavItem>
//       <Link to={ROUTES.SIGN_IN}>Sign In</Link>
//     </NavItem>
//   </Nav>
// );


export default Navigation;
