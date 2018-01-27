// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// // import Counter from '../../components/Counter';
// // import * as CounterActions from '../../actions/counter';
// import Header from '../../components/Header'
// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CounterActions, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
import React,{Component} from 'react'
import { Link } from 'react-router-dom';
export default class Header extends Component{
  render(){
    return (
      <header>
        <Link to='/'>back to root</Link>
        3123123
      </header>

    )
  }
}
