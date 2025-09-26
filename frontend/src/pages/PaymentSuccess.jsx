import { useLocation } from "react-router-dom";

function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const status = query.get("status");
  const orderId = query.get("order_id");

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        Payment {status === "success" ? "Successful 🎉" : "Failed ❌"}
      </h1>
      {orderId && <p>Order ID: {orderId}</p>}
    </div>
  );
}

export default PaymentSuccess;
