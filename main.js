// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });
}

// ===== Donation form with Paystack =====
document.getElementById('donation-form')?.addEventListener('submit', e => {
  e.preventDefault();

  let amount = document.getElementById('amount').value * 100; // Paystack uses pesewas
  let email = document.getElementById('donor-email').value || "donor@example.com";
  let name = document.getElementById('donor-name').value;
  let phone = document.getElementById('phone').value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }

  let handler = PaystackPop.setup({
    key: 'pk_test_8974f63f00bdcbbc8258ea91930c3a8138bdf0b4', // 🔑 Replace with your Paystack public key
    email: email,
    amount: amount,
    currency: "GHS",
    ref: '' + Math.floor((Math.random() * 1000000000) + 1), // unique reference
    metadata: {
      custom_fields: [
        {
          display_name: "Donor Name",
          variable_name: "donor_name",
          value: name
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: phone
        }
      ]
    },
    callback: function(response){
      alert('✅ Success! Payment reference: ' + response.reference);

      // 👉 Optional: send response.reference to your backend for verification
      // fetch('/verify-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ reference: response.reference })
      // })
      // .then(res => res.json())
      // .then(data => console.log(data));
    },
    onClose: function(){
      alert('⚠️ Transaction was not completed. You closed the payment window.');
    }
  });

  handler.openIframe();
});

// ===== Contact form =====
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('c-name').value;
  const email = document.getElementById('c-email').value;
  const message = document.getElementById('c-msg').value;

  if (name && email && message) {
    alert(`📩 Thank you ${name}, your message has been sent!`);
  } else {
    alert("⚠️ Please fill in all fields.");
  }
});