import { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Nav,
  InputGroup,
  Alert,
} from "react-bootstrap";

import { getUser } from "../redux/actions/user";
import { useSelector, useDispatch } from "react-redux";
import http from "../helpers/http";
import jwtdecode from "jwt-decode";
import Moment from "react-moment";

// Import Picture
import UserPic from "../images/user.png";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getUser(token));
  }, []);

  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [changed, setChanged] = useState(false);

  // const submitHandler = () => {
  //     setUser({
  //         firstName: firstName,
  //         lastName: lastName,
  //         fullName: firstName + ' ' + lastName,
  //         email: email,
  //         phoneNumber: phoneNumber
  //     });
  //     setUpdated(true);
  // }

  const updateProfileHandler = async () => {
    const { id } = jwtdecode(token);
    try {
      const credentials = new URLSearchParams();
      credentials.append("firstName", firstName);
      credentials.append("lastName", lastName);
      credentials.append("email", user.email);
      credentials.append("phone", phoneNumber);
      const response = http(token).patch(`auth/user/${id}`, credentials);
      if (response) {
        dispatch(getUser(token));
        setUpdated(true);
      }
    } catch (error) {
      setUpdated("error");
      console.log(error.response.data.message);
    }
  };

  const changePasswordHandler = async () => {
    const { id } = jwtdecode(token);
    if (password !== confirmPassword) {
      return setChanged("notmatch");
    }
    try {
      const credentials = new URLSearchParams();
      credentials.append("password", password);
      const response = http(token).patch(
        `auth/password/${id}/${user.email}`,
        credentials
      );
      if (response) {
        setChanged(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <Card style={{ borderRadius: "1rem" }} className="border-0 my-4">
        <Container>
          <Card.Header
            style={{
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
            className="bg-white pt-4"
          >
            <span>Details Information</span>
          </Card.Header>
          <Card.Body>
            {updated === true ? (
              <Alert
                variant="success"
                onClose={() => setUpdated(false)}
                dismissible
              >
                Your profile updated.
              </Alert>
            ) : updated === "error" ? (
              <Alert
                variant="danger"
                onClose={() => setUpdated(false)}
                dismissible
              >
                Something went wrong.
              </Alert>
            ) : (
              ""
            )}
            <Form className="mt-3">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      className="rounded p-4"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      className="rounded p-4"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={user.email}
                      className="rounded p-4"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="bg-white">
                        +62
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="tel"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                      className="rounded p-4"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Container>
      </Card>
      <div className="text-center">
        <button
          onClick={updateProfileHandler}
          className="btn btn-primary rounded-pill mt-2 py-3 w-50"
        >
          Update changes
        </button>
      </div>
      <Card style={{ borderRadius: "1rem" }} className="border-0 my-4">
        <Container>
          <Card.Header
            style={{
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
            className="bg-white pt-4"
          >
            <span>Account and Privacy</span>
          </Card.Header>
          <Card.Body>
            {changed === true ? (
              <Alert
                variant="success"
                onClose={() => setChanged(false)}
                dismissible
              >
                Successfuly Change You're Password.
              </Alert>
            ) : changed === "notmatch" ? (
              <Alert
                variant="danger"
                onClose={() => setChanged(false)}
                dismissible
              >
                New Password doesn't match.
              </Alert>
            ) : (
              ""
            )}
            <Form className="mt-3">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Write your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="rounded p-4"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      className="rounded p-4"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Container>
      </Card>
      <div className="text-center">
        <Button
          variant="primary"
          type="submit"
          className="rounded-pill mt-2 py-3 w-50"
          onClick={changePasswordHandler}
        >
          Change Password
        </Button>
      </div>
    </Fragment>
  );
};

const OrderHistory = () => {
  const token = useSelector((state) => state.auth.token);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getUserHistory = async () => {
      try {
        const response = http(token).get("api/v1/transaction/history");
        response.then((res) => setTransactions(res.data.results));
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getUserHistory();
  }, []);

  return (
    <Fragment>
      {transactions.length < 1 ? (
        <div className="text-center mt-4">
          <p>You don't have any history.</p>
        </div>
      ) : (
        transactions.map((item, index) => {
          return (
            <Card
              key={String(index)}
              style={{ borderRadius: "1rem" }}
              className="border-0 my-4"
            >
              <Card.Header
                style={{
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
                className="bg-white pt-4 px-5"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">
                      <Moment format="dddd, D MMMM YYYY">
                        {item.ticketDate}
                      </Moment>
                    </small>
                    <p
                      style={{ fontSize: "24px" }}
                      className="font-weight-bold"
                    >
                      {item.movieTitle}
                    </p>
                  </div>
                  <svg
                    width="85"
                    height="43"
                    viewBox="0 0 116 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.45166 42.7551C12.0706 42.7551 15.4872 40.9736 18.0721 39.1921C19.5557 38.1455 20.9493 36.9653 22.2755 35.607L19.3759 32.623C17.0382 34.8721 12.4078 38.0341 8.81131 38.0341C7.66493 38.0341 6.90069 37.6334 5.9791 36.0077C11.2164 34.5826 15.0826 30.6411 15.0826 26.9669C15.0826 23.6044 12.5202 21.3998 9.17095 21.3998C3.01203 21.3998 0 28.4366 0 33.4692C0 38.3904 2.80972 42.7551 8.45166 42.7551ZM5.46211 32.289C5.46211 30.3071 5.82175 25.653 9.66546 25.653C10.3847 25.653 10.9467 26.6106 10.9467 27.9467C10.9467 29.8172 7.5975 32.289 5.46211 32.289ZM25.9694 24.5842C30.1503 19.5515 34.8706 12.9601 34.8706 7.32626C34.8706 3.2957 34.1738 0 29.6108 0C23.5193 0 19.9453 16.0109 18.5067 24.7401C17.7874 29.1046 17.4053 32.6898 17.1581 35.2952C17.0232 36.8094 16.9333 38.1678 16.8884 39.3703C17.9673 40.0161 19.0911 40.5727 20.2825 41.0627C22.3279 41.9311 24.9354 42.7551 27.4754 42.7551H28.0374C28.5993 42.5324 29.1387 42.3096 29.6332 42.0647C30.5099 41.6416 31.4764 41.1295 31.9935 40.6173C36.2192 39.6598 39.3436 38.346 42.6479 35.3843L40.9171 31.71C38.5345 34.0705 36.3316 35.0725 34.1513 36.3418C35.927 33.625 36.3092 31.3092 36.3092 28.303C36.3092 24.6955 34.2188 21.3775 30.7122 21.3775C29.341 21.3775 28.0148 22.7581 26.329 24.8291L25.9694 24.5842ZM28.352 26.4547C30.7122 26.4547 31.2742 27.7686 31.2742 29.2382C31.2742 32.6453 29.9704 38.4796 26.8685 38.4796C25.9918 38.4796 25.0028 38.3014 24.1262 38.1233C23.6317 38.0119 23.1372 37.9006 22.6427 37.7447C22.6876 37.2325 22.7326 36.6759 22.8 36.0746C22.9124 35.028 23.0922 33.6696 23.362 32.0663C24.0138 28.1025 26.2616 26.4547 28.352 26.4547ZM30.5549 6.05697C30.1053 12.3811 25.812 18.1487 23.362 22.8249C24.0813 18.9057 26.9359 4.27551 29.4084 4.27551C30.4199 4.27551 30.5549 5.81202 30.5549 6.05697ZM40.9246 36.2527C41.1045 39.0808 41.1494 43 44.6334 43C46.7239 43 49.5336 38.7245 51.2868 35.1393C51.3543 37.3661 53.2874 39.5262 56.5017 39.5262C58.4123 39.5262 60.6152 38.7245 62.5932 37.4775V32.2444C61.9413 32.6675 61.312 33.0684 60.705 33.4023C59.6486 34.0037 58.3674 34.5381 57.4682 34.5381C55.0407 34.5381 54.4338 33.0906 54.4338 31.6654C54.4338 30.9752 54.5462 30.3294 54.7035 29.8172C54.771 29.5277 54.8608 29.2605 54.9732 28.9933C56.2994 26.0761 57.2435 24.8737 57.2435 23.2481C57.2435 22.1569 56.0972 21.3775 54.3664 21.3775C53.0626 21.3775 51.9387 22.1347 51.7589 22.9586L45.8473 36.9208L45.5325 36.943L46.4092 22.8473C46.3867 22.0679 45.8023 21.3775 44.7908 21.3775C44.6334 21.3775 44.521 21.3998 44.3637 21.4221L41.6664 21.8452C40.6998 22.001 40.52 23.7602 40.52 26.811C40.52 29.1714 40.6998 31.0865 40.8797 35.5401L40.9246 36.2527ZM73.9969 38.5018C73.9969 36.1859 72.6932 34.8944 70.1982 34.8944C67.2985 34.8944 66.0847 36.9876 66.0847 39.1476C66.0847 41.6862 67.5683 42.7551 69.7711 42.7551C73.9295 42.7551 73.9969 38.8804 73.9969 38.5018ZM91.7394 33.4915C89.7614 35.0948 86.3897 38.4796 84.2543 38.4796C83.3327 38.4796 83.1079 37.6334 83.1079 36.2972C83.1079 32.1776 86.1199 24.6287 86.1199 22.6468C86.1199 21.8674 85.7603 21.3775 84.5016 21.3775C83.1529 21.3775 80.8377 22.001 80.4106 23.5375C79.3317 27.9912 77.3536 34.5158 77.3536 38.2792C77.3536 40.9736 78.4101 42.7551 81.5345 42.7551C84.9961 42.7551 89.5815 39.9715 91.7394 38.0119V33.4915ZM81.6919 15.1202C81.6919 17.1688 82.9281 18.505 85.558 18.505C88.615 18.505 89.9187 16.523 89.9187 14.5189C89.9187 12.2921 88.1879 11.4014 86.0975 11.4014C82.7708 11.4014 81.6919 13.7618 81.6919 15.1202ZM100.536 25.9202C100.625 25.8312 100.603 32.2222 100.873 33.4247C100.536 34.2932 100.154 35.0502 99.7268 35.7406C99.0075 36.9208 97.9736 38.0565 96.8947 38.0565C94.8039 38.0565 94.3768 36.7427 94.3768 35.5624C94.3768 32.5785 96.5571 27.8354 100.536 25.9202ZM115.326 33.2465C114.427 34.0037 113.573 34.6717 112.741 35.2729C111.281 36.2972 109.617 37.2993 108.493 37.2993C107.301 37.2993 106.92 35.7406 106.92 34.0481C106.92 32.7121 107.301 30.9974 107.594 30.1957C110.718 22.7136 114.427 16.5676 115.214 8.15018C115.259 7.59348 115.281 7.05904 115.281 6.54686C115.281 3.13983 114.247 0 111.415 0C105.706 0 100.716 11.1786 100.446 22.6023C93.6126 23.2258 88.9821 29.7282 88.9821 35.4065C88.9821 39.1253 90.8253 42.7551 94.6916 42.7551C97.4337 42.7551 100.244 40.929 102.469 38.7913C103.907 42.2429 106.649 42.7328 107.482 42.7328C108.965 42.7328 111.1 41.6416 112.853 40.5727C113.887 39.927 114.944 39.2144 116 38.3904L115.326 33.2465ZM111.1 9.7758C110.808 12.9156 109.504 16.9239 108.29 20.2195C107.571 22.1347 106.784 24.0497 105.93 25.9871V25.7644C105.93 24.8737 105.93 22.3351 106.177 19.3957C106.358 17.2356 107.527 5.16624 110.404 5.16624C110.943 5.16624 111.235 5.70068 111.235 7.30399C111.235 7.90523 111.19 8.72916 111.1 9.7758Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </Card.Header>
              <Card.Body className="px-5">
                <div className="d-flex justify-content-between align-items-center ticket-history">
                  {item.ticketDate < Date.now() ? (
                    <Button variant="success rounded">Ticket in active</Button>
                  ) : (
                    <Button variant="success rounded" disabled>
                      Ticket used
                    </Button>
                  )}
                  <button className="btn text-muted position-relative">
                    Show Details
                  </button>
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </Fragment>
  );
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [selectedPage, setSelectedPage] = useState("account-settings");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  // const User = useRecoilValue(DataUser);

  const onImageChange = async (e) => {
    setError(null);
    setLoading(true);
    if (e.target.files.length > 0) {
      const picture = e.target.files[0];
      if (picture.size > 3000000) {
        setLoading(false);
        return setError("Image must be lower than 3mb");
      } else {
        const formData = new FormData();
        formData.append("picture", picture);
        try {
          const { data } = await http(token).patch(
            "auth/user/upload",
            formData
          );
          dispatch(getUser(token));
          setLoading(false);
        } catch (error) {
          console.log(error.response.data);
          setLoading(false);
          setError(error.response.data.message);
        }
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#F6F6F6" }} className="py-5">
      <Container>
        <Row>
          <Col md={4}>
            <Card
              style={{ borderRadius: "1rem", color: "#14142B" }}
              className="border-0"
            >
              <Card.Header
                style={{
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
                className="bg-white p-5"
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span>INFO</span>
                  <svg
                    width="35"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0013 16.3333C15.29 16.3333 16.3346 15.2887 16.3346 14C16.3346 12.7113 15.29 11.6667 14.0013 11.6667C12.7126 11.6667 11.668 12.7113 11.668 14C11.668 15.2887 12.7126 16.3333 14.0013 16.3333Z"
                      fill="#5F2EEA"
                    />
                    <path
                      d="M22.1654 16.3333C23.454 16.3333 24.4987 15.2887 24.4987 14C24.4987 12.7113 23.454 11.6667 22.1654 11.6667C20.8767 11.6667 19.832 12.7113 19.832 14C19.832 15.2887 20.8767 16.3333 22.1654 16.3333Z"
                      fill="#5F2EEA"
                    />
                    <path
                      d="M5.83333 16.3333C7.122 16.3333 8.16667 15.2887 8.16667 14C8.16667 12.7113 7.122 11.6667 5.83333 11.6667C4.54467 11.6667 3.5 12.7113 3.5 14C3.5 15.2887 4.54467 16.3333 5.83333 16.3333Z"
                      fill="#5F2EEA"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <Form>
                    <label htmlFor="picture">
                      <Form.Control
                        className="d-none"
                        type="file"
                        id="picture"
                        name="picture"
                        onChange={onImageChange}
                      />
                      <img
                        style={{ cursor: "pointer" }}
                        src={`${process.env.REACT_APP_API_URL}profile/${user.picture}`}
                        width="120"
                        alt="user"
                        className="img-fluid rounded-circle"
                      />
                    </label>
                  </Form>
                  {loading ? (
                    <div
                      style={{ width: "20px", height: "20px" }}
                      class="spinner-border"
                      role="status"
                    ></div>
                  ) : (
                    ""
                  )}
                  {error ? (
                    <div className="text-center">
                      <small className="text-danger">{error}</small>
                    </div>
                  ) : (
                    ""
                  )}
                  <h5 className="mt-2">
                    {user.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : "-"}
                  </h5>
                  <span className="text-muted">Moviegoers</span>
                </div>
              </Card.Header>
              <Card.Body className="p-5">
                <p className="mb-4">Loyalty Points</p>
                <Card className="loyalty-card bg-primary border-0 mb-5">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        style={{ fontSize: "18px" }}
                        className="text-white font-weight-bold"
                      >
                        Moviegoers
                      </p>
                      <svg
                        width="45"
                        viewBox="0 0 53 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.6929 47.7625C32.3642 47.6759 32.0612 47.5117 31.8092 47.2837L22.8094 38.9983L10.8727 41.6738C10.4849 41.7615 10.0803 41.7386 9.70482 41.6077C9.32937 41.4769 8.99816 41.2433 8.74885 40.9336C8.49954 40.6238 8.34213 40.2504 8.2945 39.8556C8.24688 39.4609 8.31096 39.0607 8.47945 38.7006L13.6285 27.6945L7.37177 17.2181C7.17847 16.8841 7.07978 16.5038 7.08627 16.118C7.09276 15.7321 7.20419 15.3553 7.40861 15.028C7.62533 14.6951 7.93102 14.4296 8.29101 14.2616C8.65099 14.0937 9.05085 14.03 9.44521 14.0778L21.6015 15.5091L29.5749 6.35975C29.836 6.05775 30.1768 5.83539 30.5584 5.71815C30.94 5.60091 31.3469 5.59353 31.7325 5.69685C32.1181 5.80017 32.4668 6.01001 32.7387 6.30234C33.0105 6.59467 33.1945 6.95766 33.2696 7.34973L35.6672 19.256L46.9105 24.0946C47.2759 24.2504 47.5904 24.5055 47.8181 24.8309C48.0459 25.1564 48.1779 25.5392 48.1991 25.9358C48.2125 26.3215 48.1206 26.7035 47.9333 27.0409C47.746 27.3783 47.4704 27.6583 47.136 27.8509L36.4793 33.7953L35.4355 45.9014C35.4057 46.3059 35.2607 46.6933 35.0178 47.0181C34.7748 47.3428 34.444 47.5912 34.0645 47.734C33.623 47.8949 33.1406 47.9049 32.6929 47.7625Z"
                          fill="url(#paint0_linear)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear"
                            x1="31.7633"
                            y1="5.7051"
                            x2="21.3085"
                            y2="44.7229"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FFF6DC" />
                            <stop offset="1" stopColor="#FFC107" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-white loyalty-points">
                      {user.loyaltyPoints}
                      <small>points</small>
                    </span>
                  </Card.Body>
                </Card>
                <p className="text-center">180 points become a master</p>
                <div className="points-progress rounded-pill mb-5">
                  <span className="rounded-pill"></span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} className="mt-4 mt-md-0">
            <Card
              style={{ borderRadius: "1rem", color: "#14142B" }}
              className="border-0"
            >
              <Card.Body>
                <Nav
                  defaultActiveKey="account-settings"
                  onSelect={(currentPage) => {
                    setSelectedPage(currentPage);
                  }}
                >
                  <Nav.Item className="navbar-item">
                    <Nav.Link
                      eventKey="account-settings"
                      className="text-muted"
                    >
                      Account Settings
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="navbar-item">
                    <Nav.Link eventKey="order-history" className="text-muted">
                      Order History
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
            {selectedPage === "account-settings" ? (
              <AccountSettings />
            ) : (
              <OrderHistory />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDashboard;
