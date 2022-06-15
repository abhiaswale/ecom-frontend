export default async function displayRazorpay() {
  const data = await fetch("http://localhost:3000/payment/razorpay", {
    method: "POST",
  }).then((res) => res.json());

  console.log(data);
  const options = {
    key: "rzp_test_9ynKRozO1YO0Gq",
    currency: data.currency,
    amount: data.amount,
    description: "Wallet Transaction",
    logo: "https://ibb.co/4PbHWqt",
    order_id: data.id,
    handler: function (response) {
      alert("Payment ID : " + response.razorpay_payment_id);
      alert("Order ID : " + response.razorpay_order_id);
    },
    prefill: {
      name: "test",
      email: "t@t.com",
      contact: "1111111111",
    },
  };

  //display window
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
