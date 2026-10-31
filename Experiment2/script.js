function calculateBill()
{
    // var, let, const
    var customerName = document.getElementById("name").value;

    let quantity = Number(document.getElementById("quantity").value);

    const price = Number(document.getElementById("price").value);

    let total = quantity * price;

    // Template Literal
    console.log(`Customer Name: ${customerName}`);
    console.log(`Quantity: ${quantity}`);
    console.log(`Price: ₹${price}`);
    console.log(`Total Bill: ₹${total}`);

    // Destructuring
    const customer = {
        name: customerName,
        qty: quantity,
        amount: total
    };

    const {name, qty, amount} = customer;

    console.table(customer);

    document.getElementById("result").innerHTML = `
        <h3>Billing Details</h3>
        <p><b>Customer Name:</b> ${name}</p>
        <p><b>Quantity:</b> ${qty}</p>
        <p><b>Price per Item:</b> ₹${price}</p>
        <hr>
        <h2>Total Bill: ₹${amount}</h2>
    `;
}