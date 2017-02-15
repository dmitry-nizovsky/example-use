import Header from '../../components/header/index.jsx';
import './index.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  counterHandler() {
    if (this.state.count - 1 >= 0) {
      this.setState({count: this.state.count - 1});
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Header clickHandler={this.counterHandler} count="10"/>
      </div>
    );
  }
}

export default Layout;
