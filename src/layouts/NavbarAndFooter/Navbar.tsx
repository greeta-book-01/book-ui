import { NavLink } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web'
import { isAdminFunc, getUsernameFunc } from '../../components/misc/Helpers'
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {

  const { keycloak } = useKeycloak()
  localStorage.setItem('keycloak', JSON.stringify(keycloak))
  const navigate = useNavigate()
  const isAdmin = isAdminFunc(keycloak)

  const handleLogInOut = () => {
    if (keycloak.authenticated) {
      navigate('/')
      keycloak.logout()
    } else {
      keycloak.login()
    }
  }

  const getLogInOutText = () => {
    return keycloak.authenticated ? "Logout" : "Login"
  } 
  

  const getUsername = () => {
    return getUsernameFunc(keycloak)
  }    

  if (!keycloak) {
    return <SpinnerLoading />
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>Luv 2 Read</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/home'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/search'>Search Books</NavLink>
            </li>
            {keycloak.authenticated &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/shelf'>Shelf</NavLink>
              </li>
            }
            {keycloak.authenticated && isAdmin &&
              <li className='nav-item'>
                <NavLink className='nav-link' to='/admin'>Admin</NavLink>
              </li>
            }
          </ul>
          <ul className='navbar-nav ms-auto'>
              {keycloak.authenticated &&
                <span className='navbar-brand'>{`Hi ${getUsername()}`}</span>
              }            
              <li>
                <button className='btn btn-outline-light' onClick={handleLogInOut}>{getLogInOutText()}</button>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}