export default async function displayRazorpay(address) {
  console.log(address);
  const data = await fetch("http://localhost:3000/payment/razorpay", {
    method: "POST",
    headers: { Authorization: localStorage.getItem("token") },
  }).then((res) => res.json());

  console.log(localStorage.getItem("token"));
  const userDetails = await fetch("http://localhost:3000/user/details", {
    method: "GET",
    headers: { Authorization: localStorage.getItem("token") },
  }).then((t) => t.json());

  let paymentId;
  const options = {
    key: "rzp_test_9ynKRozO1YO0Gq",
    currency: data.currency,
    amount: data.amount,
    description: "Wallet Transaction",
    logo: "https://ibb.co/4PbHWqt",
    order_id: data.id,

    handler: async function (response) {
      localStorage.setItem("paymentId", response.razorpay_payment_id);
      alert("Payment ID : " + response.razorpay_payment_id);
      alert("Order ID : " + response.razorpay_order_id);
      paymentId = response.razorpay_payment_id;
      return paymentId;
    },

    prefill: {
      name: address.Name,
      email: userDetails.user.email,
      contact: address.Mobile,
    },
  };

  //display window
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();

  // if (paymentId) {
  //   return paymentId;
  // }
}
