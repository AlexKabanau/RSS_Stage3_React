import { Component } from 'react';
import styles from './Header.module.css';
import SearchInput from './SearchInput';

type HeaderPropsType = {
  handleOnSubmit: (input: string) => void;
};
export default class Header extends Component<HeaderPropsType> {
  render() {
    return (
      <header className={styles.header_bordered}>
        {/* Header */}
        {/* <Container className="flex items-center justify-between py-8"> */}
        {/* левая часть */}
        <div className={styles.search_container}>
          <SearchInput />
        </div>
        <button onClick={() => this.props.handleOnSubmit('hello')}>
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
