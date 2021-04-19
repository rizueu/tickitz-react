import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import http from "../helpers/http";

export default class ViewAll extends Component {
  state = {
    loading: false,
    isRefresh: false,
    message: "",
    movies: [],
    orderBy: "title",
    isAsc: true,
    keyword: "",
    prevLink: null,
    nextLink: null,
    page: 1,
    totalPage: 1,
  };

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.isAsc !== this.state.isAsc ||
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      this.getMovies();
    }
  }

  getMovies = async () => {
    try {
      this.setState({
        loading: true,
      });
      const { data } = await http().get(
        `api/v1/movies?limit=4&order=${this.state.orderBy}&sort=${
          this.state.isAsc ? "ASC" : "DESC"
        }&page=${this.state.page}&search=${this.state.keyword}`
      );
      const modifiedMovies = data.results.map((item, index) => ({
        ...item,
        picture: `${process.env.REACT_APP_API_URL}movies/${item.picture}`,
      }));
      this.setState((current) => ({
        ...current,
        isRefresh: current.isRefresh,
        loading: !current.loading,
        message: data.message,
        movies: modifiedMovies,
        prevLink: data.pageInfo.previousPageLink,
        nextLink: data.pageInfo.nextPageLink,
        page: Number(data.pageInfo.currentPage),
        totalPage: Number(data.pageInfo.totalPage),
      }));
    } catch (error) {
      console.log(error);
      this.setState((current) => ({
        ...current,
        isRefresh: current.isRefresh,
        loading: !current.loading,
        prevLink: null,
        nextLink: null,
      }));
    }
  };

  render() {
    return (
      <div className="py-5" style={{ backgroundColor: "#F6F6F8" }}>
        <div className="container">
          <div className="d-flex justify-content-between">
            <h3 className="font-weight-bold">Movies</h3>
            <div className="d-flex align-items-center">
              <form>
                <div className="search-input">
                  <svg
                    width="24"
                    fill="none"
                    stroke="#6589ED"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span
                    style={{
                      marginTop: "-0.2rem",
                      marginLeft: "0.4rem",
                      fontSize: "24px",
                      color: "#6589ED",
                    }}
                  >
                    |
                  </span>
                  <input
                    type="text"
                    placeholder="Search Movie.."
                    onChange={(e) => {
                      this.setState({
                        keyword: e.target.value,
                      });
                    }}
                  />
                </div>
              </form>
              <button
                onClick={() =>
                  this.setState((current) => ({
                    isAsc: !current.isAsc,
                  }))
                }
                style={{ width: "50px", height: "50px", outline: "none" }}
                className="d-flex justify-content-center align-items-center border-0 bg-white rounded-circle ml-2"
              >
                {this.state.isAsc ? (
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#6589ED"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    viewBox="0 0 20 20"
                    fill="#6589ED"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="my-4 upcoming-movies__home d-flex">
            {this.state.loading ? (
              <div>Loading...</div>
            ) : this.state.movies.length > 0 ? (
              this.state.movies.map((element, index) => {
                return (
                  <Card
                    key={index.toString()}
                    className="border p-2 text-center mr-3"
                  >
                    <Card.Body>
                      <img
                        width="180"
                        src={element.picture}
                        alt={element.title}
                        className="img-fluid"
                      />
                      <h5 className="font-weight-bold mt-3">{element.title}</h5>
                      <small className="text-muted">{element.genres}</small>
                      <br />
                      <Link
                        to={`/movies/${element.id}`}
                        className="btn btn-outline-primary w-100 mt-5"
                      >
                        Details
                      </Link>
                    </Card.Body>
                  </Card>
                );
              })
            ) : (
              <div>There is no films.</div>
            )}
          </div>
          <div className="d-flex justify-content-center w-100">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  onClick={() => {
                    this.setState((current) => ({
                      ...current,
                      page: current.page - 1,
                    }));
                  }}
                  className="page-item"
                >
                  <p className="page-link">Previous</p>
                </li>
                {[...Array(this.state.totalPage)].map((element, i) => {
                  return (
                    <li
                      onClick={() => this.setState({ page: i + 1 })}
                      className={
                        i + 1 === this.state.page
                          ? `page-item active`
                          : `page-item`
                      }
                    >
                      <p className="page-link">{i + 1}</p>
                    </li>
                  );
                })}
                <li
                  onClick={() => {
                    this.setState((current) => ({
                      ...current,
                      page: current.page + 1,
                    }));
                  }}
                  className="page-item"
                >
                  <p className="page-link">Next</p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
