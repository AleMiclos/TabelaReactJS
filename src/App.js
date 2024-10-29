import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Genius } from './components/Genius';
import { Space } from './components/Space'
import logo  from './Logo-Santa-Lucia.png';

function App() {
  return (
    <Container className="Container">
      <BrowserRouter>
        <Navbar bg='light' expand='lg'>
        <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="Faculdade Santa Lucia"
              style={{ height: '40px' }} // Defina a altura conforme necessário
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title='Tabela' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/Genius'>Jogo Da Navinha</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/Space'>Jogo Do Genio</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Genius" element={<Genius />} />
          <Route path="/Space" element={<Space />} />

        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
