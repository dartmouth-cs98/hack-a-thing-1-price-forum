import React, {Component}  from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';



const LandingPage = () => (
  <div>
    <LandingForm />
  </div>
);


class LandingBase extends Component {
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
    const authUserUid= "nJcGUEzbLYYyh9xNLiuL4cuWWP93";

    this.props.firebase.products(authUserUid).on('value', snapshot => {
      const productsObject = snapshot.val();
      console.log("productsObject", productsObject);


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




  render() {
    const { products, loading } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              PRICE TABLE
            </h3>
          </div>
          <div class="panel-body">
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
                        <td>{product.title}</td>
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

// const Landing = compose(
//   withFirebase,
//   withRouter,
// )(LandingPage);

export default LandingPage;

const LandingForm = withFirebase(LandingBase);

export  { LandingForm };
