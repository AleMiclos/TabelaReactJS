import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Alunos } from './components/Alunos';

function App() {
  return (
    <Container className="Container">
      <BrowserRouter>
        <Navbar bg='light' expand='lg'>
          <Navbar.Brand as={Link} to="/">Faculdade Santa Lucia</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title='Tabela' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/alunos'>Tabela</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alunos" element={<Alunos />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
