import { Component } from 'react';
import styles from './Header.module.css';
import SearchInput from './SearchInput';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header_bordered}>
        {/* Header */}
        {/* <Container className="flex items-center justify-between py-8"> */}
        {/* левая часть */}
        <div className={styles.search_container}>
          <SearchInput />
        </div>
        <button
        //  onClickSignIn={() => setOpenAuthModal(true)}
        >
          Search Button
        </button>
        {/* правая часть */}
        {/* <div className="flex items-center gap-3">
            <AuthModal
              open={openAuthModal}
              onClose={() => {
                setOpenAuthModal(false);
              }}
            />

            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            {hasCart && <CartButton />}
          </div> */}
        {/* </Container> */}
      </header>
    );
  }
}
