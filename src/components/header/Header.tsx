import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNear } from '../../near/near-context';
import { Button, NavDropdown } from 'react-bootstrap';
import styles from './header.module.css';
import React from 'react';

const UserMenu = () => {
  const { wallet } = useNear();
  
  const handleSignOut = React.useCallback(async () => {
    wallet?.signOut();
    window.location.reload();
  }, [wallet]);

  return (
    <>
      <Navbar.Text className={styles.navbarText}>
        Signed in as:    
      </Navbar.Text>
      <NavDropdown title={wallet?.getAccountId()}>
        <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

interface IHeaderProps {
  className: string;
}

const Header = (props: IHeaderProps) => {
  const { wallet, contractId } = useNear();
  
  const handleSignIn = React.useCallback(async () => {
    wallet?.requestSignIn({ contractId });
  }, [wallet, contractId])

  return (
    <Navbar bg="light" expand="lg" className={props.className}>
      <Container>
        <Navbar.Brand href="#home">NEAR Wallet App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          { wallet?.isSignedIn() 
            ? <UserMenu />
            : <Button onClick={handleSignIn}>Sign In</Button> }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;