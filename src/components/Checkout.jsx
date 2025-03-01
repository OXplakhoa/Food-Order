import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Loading from "./UI/Loading";
import Error from "./UI/Error";
import { useActionState } from "react";

const reqConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    reqConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  const handleCloseCheckout = () => {
    userProgressCtx.hideCheckout();
  };
  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearItem();
    clearData();
  };

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleCloseCheckout}
      >
        <h2>Success</h2>
        <p>Your order was submitted successfully</p>
        <p>We will contact you soon through email within next few minnutes</p>
        <p className="model-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
        <div className="success-circle">
          <div className="tick"></div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <span className="modal-actions">
          {isSending ? (
            <Loading />
          ) : (
            <>
              <Button onClick={handleCloseCheckout} type="button" textOnly>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </span>
      </form>
    </Modal>
  );
}
