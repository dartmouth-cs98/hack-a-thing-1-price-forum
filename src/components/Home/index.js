import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withAuthorization } from '../Session';


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      board: {},
      key: 'hh',
      products: [],

    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const authUserUid= this.props.firebase.auth.currentUser.uid;
    console.log(authUserUid);
    this.props.firebase.products(authUserUid).on('value', snapshot => {
      const productsObject = snapshot.val();


      if (productsObject!=null){
        let productList = [];
        let value;
        Object.keys(productsObject).forEach(function(key) {
            Object.keys(productsObject[key]).forEach(function(key1) {
              value = productsObject[key][key1];

              const { title, descri, price, price2, categ } = value;
              console.log(value);
              productList.push({
                key: key1,
                title,
                descri,
                price,
                price2,
                categ,

              });
            });

        });


        this.setState({
          products: productList,

          loading: false,
        });
      }else{
        let productList = [];
        this.setState({
          products: productList,
          loading: false,
        });
      }

    });
  }

  componentWillUnmount() {
    try {
      const authUserUid= this.props.firebase.auth.currentUser.uid;
      this.props.firebase.products(authUserUid).off();
    }catch(error){

    }

  }


  render() {
    const { products, loading } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              HOME
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create" class="btn btn-primary">Add Item</Link></h4>

            {loading && <div>Loading ...</div>}
            <table className="table table-stripe">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Price Variation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product =>
                      <tr>
                        <td><Link to={`/show/${product.categ}+${product.key}`}>{product.title}</Link></td>
                        <td>{product.descri}</td>
                        <td>{product.categ}</td>
                        <td>{product.price}</td>
                        <td>{product.price2}</td>
                      </tr>
                    )}
                  </tbody>
            </table>
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

export default withAuthorization(condition)(HomePage);
