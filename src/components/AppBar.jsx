import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLogOutUserMutation } from 'redux/auth/userApi';
import Badge from 'react-bootstrap/Badge';
import { FaRegUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function AppBar() {
  const { name } = useSelector(state => state.user);
  const [logout] = useLogOutUserMutation();
  const { token } = useSelector(state => state.user);
  const handleLogoutClick = () => {
    logout();
  };

  return (
    <>
      <Navbar bg="dark" variant={'dark'} expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <NavLink to="/">PhoneBook</NavLink>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">
                <NavLink to="/">Home</NavLink>
              </Nav.Link>

              {token ? (
                <Nav.Link href="contacts">
                  <NavLink to="/contacts">Contacts</NavLink>
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="register">
                    <NavLink to="/register">Register</NavLink>
                  </Nav.Link>
                  <Nav.Link href="login">
                    <NavLink to="/login">Login</NavLink>
                  </Nav.Link>
                </>
              )}
            </Nav>
            {name && (
              <>
                <Badge bg="dark">
                  <FaRegUser /> Welcome, {name}
                </Badge>
                <Button variant="outline-success" onClick={handleLogoutClick}>
                  Exit
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default AppBar;
