import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import categories from '../../constants/categories';
import map from 'lodash/map';

class EditPage extends Component {
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
          title: productObject.title,
          descri: productObject.descri,
          price: productObject.price,
          price2: productObject.price2,

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
    const {title, descri, price, price2, categ, key } = this.state;

    const authUser= this.props.firebase.auth.currentUser;
    if (authUser){
      //var newProductKey = this.props.firebase.database().ref().child(`products/${authUser.uid}/${categ}`).push().key
      this.props.firebase.productWithID(authUser.uid, categ, key).update({
        title,
        descri,
        price
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
    const {
      title,
      descri,
      price,
      price2,
      categ,
      loading,
      error,
    } = this.state;

    const isInvalid =
     title === '' ||
     descri === '' ||
     price === '' ||
     categ === '' ;


     const options = map(categories, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );

    return (
      <div class="container">
      {loading && <div>Loading ...</div>}
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Edit Product: {title}
            </h3>
          </div>
          <div class="panel-body">
          <h4><Link to={`/show/${this.state.categ}+${this.state.key}`} class="btn btn-primary">Product View</Link></h4>
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="title">Product Name:</label>
              <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Name" />
            </div>

            <div className="form-group">
              <label className="control-label">Product Category</label>
              <select
                disabled
                className="form-control"
                name="categ"
                onChange={this.onChange}
                value={categ}
              >
              <option value="" disabled>Choose Product's Category</option>
              {options}
              </select>
            </div>

            <div class="form-group">
              <label for="description">Description:</label>
              <textArea class="form-control" name="descri" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{descri}</textArea>
            </div>
            <div class="form-group">
              <label for="author">Price:</label>
              <input type="number" class="form-control" name="price" value={price} onChange={this.onChange} placeholder="Price" />
            </div>
            <div class="form-group">
              <label for="author">Price Variation:</label>
              <input disabled type="number" class="form-control" name="price" value={price2} onChange={this.onChange} placeholder="Price" />
            </div>


            <button disabled={isInvalid} type="submit" class="btn btn-success">Save</button>
             {error && <p>{error.message}</p>}
          </form>
          </div>
        </div>
      </div>

    );
  }
}




const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditPage);
