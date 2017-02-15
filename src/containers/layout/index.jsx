import Header from '../../components/header/index.jsx';
import './index.scss';
import ff from 'ff-module';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  counterHandler() {
    let number = 1;

    if (ff.enabled('layout')) {
      number = 2;
    }

    if (this.state.count - number >= 0) {
      this.setState({count: this.state.count - number});
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
