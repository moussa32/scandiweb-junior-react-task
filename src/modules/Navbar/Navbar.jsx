import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { BrandIcon } from "../../assets";
import { CATEGORIES_TITLE_QUERY } from "../../Graphql/queries";
import { queryFetch } from "../../Graphql/queryFetch";
import CurrencySwitcher from "./CurrencySwitcher";
import Minicart from "./Minicart";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  getCategories = async () => {
    const requestCategories = queryFetch(CATEGORIES_TITLE_QUERY);
    const { data } = await requestCategories;
    this.setState({
      ...this.state,
      categories: data.categories,
    });
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { categories } = this.state;

    return (
      <header className="navbar">
        <nav className="nav-items">
          <ul className="nav-list">
            {categories.length !== 0 &&
              categories.map((category) => (
                <li className="nav-item" key={category.name}>
                  <NavLink to={`/category/${category.name}`} className="nav-link" activeClassName="active-link">
                    {category.name}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
        <Link to="/">
          <img src={BrandIcon} className="logo" alt="" title="" />
        </Link>
        <div className="navbar-options">
          <CurrencySwitcher />
          <Minicart />
        </div>
      </header>
    );
  }
}
