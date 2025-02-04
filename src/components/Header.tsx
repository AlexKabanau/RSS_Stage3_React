import { Component } from 'react';
import styles from './Header.module.css';
import { getItems, ResponseType } from '../api/getItems';

type HeaderPropsType = {
  handleResponse: (data: ResponseType[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
};

type HeaderStateType = {
  inputValue: string;
};
export default class Header extends Component<
  HeaderPropsType,
  HeaderStateType
> {
  constructor(props: HeaderPropsType) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('searchValue') || '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  async handleOnSubmit() {
    localStorage.setItem('searchValue', this.state.inputValue);
    try {
      this.props.setIsLoading(true);
      const response = await getItems(this.state.inputValue);

      if (response) {
        this.props.setIsLoading(false);
        this.props.setIsError(false);
        this.props.handleResponse(response);
      }
    } catch (error) {
      console.error(error);
      this.props.setIsLoading(false);
      this.props.setIsError(true);
    }
  }
  handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.target.value });
    localStorage.setItem('searchValue', this.state.inputValue.trim());
  }
  componentDidMount(): void {
    this.handleOnSubmit();
  }
  render() {
    return (
      <header className={styles.header_bordered}>
        <h2>StarWars Starships</h2>
        <div className={styles.search_container}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={this.state.inputValue}
            onChange={this.handleOnChange}
          />
        </div>
        <button onClick={() => this.handleOnSubmit()}>Search</button>
      </header>
    );
  }
}
