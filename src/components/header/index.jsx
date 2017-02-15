import './index.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: parseInt(this.props.count, 10) || 0};
  }

  render(){
    return (
      <header
        className="header"
        onClick={this.props.clickHandler.bind(this)}>
        <h1>Hello, world! {this.state.count}</h1>
      </header>
    );
  }
}

export default Header;
