import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNear } from '../../near/near-context';
import { Button, NavDropdown } from 'react-bootstrap';
import styles from './header.module.css';
import React from 'react';

const UserMenu = () => {
  const { walletConnection } = useNear();
  
  const handleSignOut = React.useCallback(async () => {
    walletConnection?.signOut();
    window.location.reload();
  }, [walletConnection]);

  return (
    <>
      <Navbar.Text className={styles.navbarText}>
        Signed in as:    
      </Navbar.Text>
      <NavDropdown title={walletConnection?.getAccountId()}>
        <NavDropdown.Item onClick={handleSignOut}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

interface IHeaderProps {
  className: string;
}

const Header = (props: IHeaderProps) => {
  const { walletConnection, contractId } = useNear();
  
  const handleSignIn = React.useCallback(async () => {
    walletConnection?.requestSignIn({ contractId });
  }, [walletConnection, contractId])

  return (
    <Navbar bg="light" expand="lg" className={props.className}>
      <Container>
        <Navbar.Brand href="#home">NEAR Wallet App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          { walletConnection?.isSignedIn() 
            ? <UserMenu />
            : <Button onClick={handleSignIn}>Sign In</Button> }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;