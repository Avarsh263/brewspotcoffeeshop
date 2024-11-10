let cart = [];

// Function to add items to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let total = 0;

    // Clear current cart display
    cartItemsContainer.innerHTML = '';

    // Display each item in the cart
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price.toFixed(2)}</span>
            <div class="quantity-control">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
            <span>₹${itemTotal.toFixed(2)}</span>
            <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total cost (Ensuring only ₹ symbol here)
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

// Function to adjust item quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Mock checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    
    // Clear the cart after checkout
    cart = [];
    updateCart(); // Update the cart display
    
    // Redirect to the thanks page
    window.location.href = 'thanks.html';
}
