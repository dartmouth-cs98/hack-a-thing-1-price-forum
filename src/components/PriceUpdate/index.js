import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';


class UpdatePricePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      product: {},
      key: '',
      categ: '',
      oprice2: '',
      price2: '',
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
          oprice2: productObject.price2,

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

  onSubmit = event => {
    const {oprice2, price2, categ, key } = this.state;

    const authUser= this.props.firebase.auth.currentUser;
    if (authUser){
      //var newProductKey = this.props.firebase.database().ref().child(`products/${authUser.uid}/${categ}`).push().key
      this.props.firebase.productWithID(authUser.uid, categ, key).update({
        oprice2,
        price2,
      })
      .then(() => {

        this.props.history.push(`/show/${this.state.categ}+${this.state.key}`);
      }).catch(error => {
        this.setState({ error });
      });
    }else{
      console.log('Auth user not found:', authUser);
    }



    event.preventDefault();
  }

  onChange = event => {
     this.setState({ [event.target.name]: event.target.value });
  };




  render() {
    const { product, loading, error, price2, oprice2 } = this.state;

    const isInvalid =
     price2 === '' ;

    return (
      <div class="container">
      {loading && <div>Loading ...</div>}
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Update Price For {product.title}
            </h3>
          </div>
          <div class="panel-body">
          <h4><Link to={`/show/${this.state.categ}+${this.state.key}`} class="btn btn-primary">Product View</Link></h4>
          <form onSubmit={this.onSubmit}>



            <div class="form-group">
              <label for="price">Old Price Variation:</label>
              <input disabled type="number" class="form-control" name="0price2" value={oprice2} onChange={this.onChange} placeholder="Price" />
            </div>
            <div class="form-group">
              <label for="priceNew">New Price Variation:</label>
              <input type="number" class="form-control" name="price2" value={price2} onChange={this.onChange} placeholder="Price" />
            </div>


            <button disabled={isInvalid} type="submit" class="btn btn-success">Submit</button>
             {error && <p>{error.message}</p>}
          </form>
          </div>
        </div>
      </div>

    );
  }
}




const condition = authUser => !!authUser;

export default withAuthorization(condition)(UpdatePricePage);
