import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
import categories from '../../constants/categories';
import timezones from '../../constants/timezones';
import map from 'lodash/map';

const INITIAL_STATE = {
  title: '',
  descri: '',
  price: '',
  price2: '0',
  categ: '',
  company: '',
  error: null,
};

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onChange = this.onChange.bind(this);
  }





  onSubmit = event => {
    const {title, descri, price, price2, categ } = this.state;

    const authUser= this.props.firebase.auth.currentUser;
    if (authUser){

      this.props.firebase.company(authUser.uid).on('value', snapshot => {
        const company = snapshot.val();
        if (company) {
            console.log("Company: ", company);
          //var newProductKey = this.props.firebase.database().ref().child(`products/${authUser.uid}/${categ}`).push().key
          this.props.firebase.product(authUser.uid, categ).push().set({
            title,
            descri,
            price,
            price2,
            categ,
            company,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          }).catch(error => {
            this.setState({ error });
          });

        }else {
          console.log("No such company!");
        }});

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

    return(
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD PRODUCT
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Product List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Product Name:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Name" />
              </div>

              <div className="form-group">
                <label className="control-label">Product Category</label>
                <select
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
                <label for="price">Price Variation:</label>
                <input type="number" class="form-control" name="price2" value={price2} onChange={this.onChange} placeholder="Price Variation" />
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


export default withAuthorization(condition)(Create);
