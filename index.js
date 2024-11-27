import {menuArray} from "/data.js"



document.addEventListener("click", function(e) {
    if(e.target.dataset.uid){
        addToOrderList(e.target.dataset.uid)
    }
})

function addToOrderList(orderId){
    const targetOrderObj = menuArray.filter(function(order) {
        return order.id === Number(orderId)
    })[0]

    if (targetOrderObj.isSelected){
        orderReceipt(targetOrderObj)
    } else {
        orderReceipt(targetOrderObj)
    }

    targetOrderObj.isSelected = !targetOrderObj.isSelected

}

function orderlist() {
    let htmlList = ""

    menuArray.forEach(function(food) {

    htmlList +=
   `<div id="container">
        <div class="cover-emoji">   
            <span class="cover-photo">${food.emoji}</span>
        </div>
        <div class="food-details">
            <h3>${food.name}</h3>
            <p>${food.ingredients.join(", ")}</p>
            <h4>$${food.price}</h4>
        </div>
        <button data-uid="${food.id}"> + </button>
    </div>
`})
 
return htmlList
}

let selectedFoods = []

function orderReceipt(selectedFood) {
    selectedFoods.push(selectedFood)
    renderSelectedFoods()
}


function renderSelectedFoods() {
    let foodList = ""
    selectedFoods.forEach((food, remove) => {
        foodList += `
        <li>${food.name}
        <button class="remove-btn" data-remove=${remove}>Remove</button>
        <span class="price">$${food.price}</span>
        </li>` 
        })
        
        document.getElementById("receipt-list").innerHTML = 
            `
            <div id="receipt">
            <h3>Your order</h3>
            <ul>
                ${foodList}
            </ul>
            <div class="total-price">
                <span>Total price:</span>
                <span>$${totalPrice()}</span>
            </div>
            <button id="submit-order">Complete Order</button>       
            `
    const submitBtn = document.getElementById("submit-order")
    if (submitBtn) {
        submitBtn.addEventListener("click", function() {
           renderAccountDetailsForm() 
     })
     }
}

function renderAccountDetailsForm() {
    document.getElementById("account-form").innerHTML = `
    <form class="bank-details" id="submit-form">
        <h3>Enter card details</h3>
        <input class="input-box" type="text" placeholder="Enter your Name" required>
        <input class="input-box" type="text" placeholder="Enter Card Number" required>
        <input class="input-box" type="text" placeholder="Enter CVV" required>
        <button type="submit" id="pay-btn">Pay</button>
    </form>`
    
    document.getElementById("submit-form").addEventListener("submit", function(e) {
        e.preventDefault()
        document.getElementById("account-form").innerHTML = ""
        document.getElementById("receipt-list").innerHTML = `
        <h3 id="submitted">Thanks! Your order is on your way!</h3>`
    })
}


function totalPrice() {
    return selectedFoods.reduce((total,current) => total + current.price
,0)}

function handleRemoveClick(remove) {
    selectedFoods.splice(remove, 1)
    renderSelectedFoods()
}

document.addEventListener("click", function(e) {
    if(e.target.classList.contains("remove-btn")) {
        const remove = e.target.dataset.remove
        handleRemoveClick(remove)
    }
})
    
function render(){
    document.getElementById("food-list").innerHTML = orderlist()
}

render()

