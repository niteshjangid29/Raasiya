import React, { Fragment, useState } from "react";
import "./Address.scss";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [editAddress, setEditAddress] = useState(0);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.length > 10 || phoneNumber.length < 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }

    setEditAddress(0);

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNumber })
    );
    // navigate("/order/confirm");
  };

  const completeAddress = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  return (
    <Fragment>
      <div className="cartAddress">
        <div className="cartAddressLeft">
          <h3>Delivery Address</h3>
          {shippingInfo.address === undefined || editAddress === 1 ? (
            <Fragment>
              <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Pin Code"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                {country && (
                  <div>
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <input
                  type="submit"
                  value="Add Address"
                  className="myBtn"
                  style={{ width: "100%" }}
                  disabled={state ? false : true}
                />
              </form>
            </Fragment>
          ) : (
            <div className="addressCard">
              <div>
                <p>
                  <strong>Name:</strong>
                </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>
                  <strong>Phone:</strong>
                </p>
                <span>{shippingInfo.phoneNumber}</span>
              </div>
              <div>
                <p>
                  <strong>Address:</strong>
                </p>
                <span>{completeAddress}</span>
              </div>
              <div>
                <button onClick={() => setEditAddress(1)}>Edit</button>
              </div>
            </div>
          )}
        </div>
        <div className="cartAddressRight">
          <div>
            <h3>
              Price Details{" "}
              <span>
                ({cartItems.length} {cartItems.length > 1 ? "Items" : "Item"})
              </span>
            </h3>
          </div>
          <div>
            <p>Subtotal:</p>
            <span>Rs. {orderInfo.subtotal}</span>
          </div>
          <div>
            <p>
              Shipping Charges
              <br />
              (free above 1000):
            </p>
            <span>Rs. {orderInfo.shippingCharges}</span>
          </div>
          <div>
            <p>GST:</p>
            <span>Rs. {orderInfo.tax}</span>
          </div>
          <hr />
          <div>
            <p>
              <strong>Total:</strong>
            </p>
            <span>
              <strong>Rs. {orderInfo.totalPrice}</strong>
            </span>
          </div>

          <button
            className="myBtn"
            onClick={() => navigate("/checkout/payment")}
            disabled={editAddress === 0 ? false : true}
          >
            Continue
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Address;
