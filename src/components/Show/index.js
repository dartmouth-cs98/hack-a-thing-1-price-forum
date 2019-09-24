import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ShowPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      product: {},
      key: '',
      categ: '',
      error: null


    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const authUserUid= this.props.firebase.auth.currentUser.uid;
    const params = this.props.match.params.id.split('+');
    console.log('params entire', this.props.match.params.id);
    console.log('params ', params[0], params[1]);

    console.log(authUserUid);
    this.props.firebase.productWithID(authUserUid, params[0].trim(), params[1].trim()).on('value', snapshot => {
      const productObject = snapshot.val();
      if (productObject) {
        this.setState({
          product: productObject,
          key: snapshot.key,
          categ: params[0].trim(),

          loading: false,
        });
      }else {
        console.log("No such product!");
      }


    });
  }

  componentWillUnmount() {
    try{
      const authUserUid= this.props.firebase.auth.currentUser.uid;
      const params = this.props.match.params.id.split('+');
      if (authUserUid && params ){
        this.props.firebase.productWithID(authUserUid, params[0], params[1]).off();

      }
    }catch(err){
      console.log(err.message);

    }



  }

  delete(categ, id){
    const authUserUid= this.props.firebase.auth.currentUser.uid;
    this.props.firebase.productWithID(authUserUid, categ, id).remove().then(() => {
      this.props.history.push(`/home`);
    }).catch(error => {
      this.setState({ error });
    });

  }


  render() {
    const { product, loading, error } = this.state;
    const UpdateLink = <Link to={`/price/${this.state.categ}+${this.state.key}`}/>;

    return (
      <div class="container">

      {loading && <div>Loading ...</div>}
      <h3><Link to="/home" class="btn btn-primary">Go Back</Link></h3>

        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              {product.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{product.descri}</dd>

              <dt>Category:</dt>
              <dd>{product.categ}</dd>

              <dt>Price:</dt>
              <dd>{product.price}</dd>

              <dt>Price Variation:</dt>
              <dd>{product.price2}</dd>
            </dl>

            <Link to={`/price/${this.state.categ}+${this.state.key}`} >
              <Button variant="contained" color="secondary" >Update Price</Button>
            </Link>&nbsp;
            <Link to={`/edit/${this.state.categ}+${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.categ, this.state.key)} class="btn btn-danger">Delete</button>
            {error && <p>{error.message}</p>}
          </div>
        </div>
      </div>

    );
  }
}


// const HomePage = () => (
//   <div>
//     <h1>Home Page</h1>
//     <p>The Home Page is accessible by every signed in user.</p>
//   </div>
// );

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowPage);
