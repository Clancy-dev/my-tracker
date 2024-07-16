/************************************************************
 * PART 1
 */
const balanceNumber = document.querySelector(".balance-number");
const incomeNumber = document.querySelector(".income-number");
const expenseNumber = document.querySelector(".expense-number");
const titleInputElement = document.querySelector("#title");
const amountInputElement = document.querySelector("#amount");
const incomeInputElement = document.querySelector("#income");
const descriptionInputElement = document.querySelector(".description");

//input compression
document.querySelectorAll('input, textarea').forEach((element) => {
    element.addEventListener('focus', () => {
        document.body.style.overflow = 'hidden';
    });
    element.addEventListener('blur', () => {
        document.body.style.overflow = 'auto';
    });
});



/**
 * STEP 1 Declaring the overlay and popup to Javascript
 */
//select the overlay
const overlay = document.querySelector(".overlay");
//select the formPopup
const formPopup = document.querySelector(".pop-up");


/*
STEP 2 The functionality for closing the popup and also hiding the overlay.
*/
function closeFormPopAndHidingOverlay(){
    //closing the popup
    formPopup.classList.add("close-popup");
    //hiding the overlay
    overlay.classList.add("hide-overlay");
}
//Callback the function
closeFormPopAndHidingOverlay()


/*
STEP 3 The functionality for opening the popup and also making the overlay to appear.
*/
function openingFormPopAndMakingOverlayAppear(){
    //opening the popup
    formPopup.classList.remove("close-popup");
    //making the overlay appear
    overlay.classList.remove("hide-overlay");
}

/*
STEP 4 Declaring the close buttons and button meant to showPopUp to javascript
*/
//select the close buttons ie we use queryselectorAll because they are many buttons being selected.
const closeBtns = document.querySelectorAll(".close-btn");
//Button meant to showPopUp
const btnShowingPopUp = document.querySelector("#white-circle");
//console.log(btnShowingPopUp);

/*
STEP 5 Integration with the click functionality ie to add the click functionality we add event listeners to the above buttons.
*/
//Since they are many buttons we target each single button and add an event listener to each.
//Adding an event listener to a single button(ForEach)
closeBtns.forEach((btn)=>{
    btn.addEventListener("click",closeFormPopAndHidingOverlay)
});
//Adding an event listener to button meant to show the pop-up
btnShowingPopUp.addEventListener("click",openingFormPopAndMakingOverlayAppear);


/*********************************************************
 * PART TWO
 */

/**
 * STEP ONE Declare the changing container 1st(Changing container is .middle-card)
 * NOTE: The transactions container must be before the function rendering or displaying the transactions
 */
const transactionsContainer = document.querySelector(".middle-card");
/**
 * STEP TWO Declare the transactions
 * NOTE: In JSON parse the local storage, get item called transactions or the empty array
 */
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
/**
 * STEP THREE After getting the item from the local storage show it(render it)
 */
renderTransactions(transactions);

/**
 * STEP FOUR Declare the form
 */
const form = document.querySelector("form");

form.addEventListener("submit",(e)=>{
    e.preventDefault(); 
    //The above helps us that when we create a new transaction the page doesn't reload and everything disappears without doing its intended function.
    //The form should simply keep creating transactions until we get tired of it and close it not to reload and refreash the enter page.
    
    //(A)
    /*We turn our attention to the inputs or the empty boxes.
    Notice one thing we don't have the actual value for these inputs or empty boxes.
    Declare the inputs in javascript.
    */
    //Note: All the input declarations are put inside the form event listener.
    //Title Input

    const titleValue = titleInputElement.value;
    //console.log(titleValue);
    //Amount Input

    const amountValue = amountInputElement.value;
    //console.log(amountValue);
    //Income Input

    const incomeValue = incomeInputElement.value;
    //This is a checkbox we want to make its type vary by using let.
    let type = "";
    if(incomeInputElement.checked === true){
        type = incomeValue; 
    }
    //Expense Input
    const expenseInputElement = document.querySelector("#expense");
    const expenseValue = expenseInputElement.value;
    //This is a checkbox we want to make its type vary by using let.
    //let type = ""; we already set it above
    if(expenseInputElement.checked === true){
        type = expenseValue;
    }

    //(B)
    //Stop the form from submitting empty inputs.(|| stands for OR)
    if(titleValue ==="" || amountValue ==="" || description ==="" || type ===""){
       return alert("All the fields are required!");
    
    }


    const date = new Date();
    const id = date.getTime();
    const createdAt = date.toDateString();

    //(C)
    //Creation of Transactions
    //At the start
    //const transactions = [];
    //const transactions = localStorage.getItem("transactions"); The problem with this is that the returned vale is in string format and we have to convert it back to its original form.

    const newTransaction ={
        titleValue,
        amountValue:Number(amountValue),//It was amount, why we added number(amount) is because we want to change it from a string to a plain number.
        description,
        type,
        createdAt,

    };
    //we add the new transaction into our array.
    transactions.push(newTransaction);
    //we save transactions array into the local storage.
    localStorage.setItem("transactions",JSON.stringify(transactions));
    console.log(transactions);


    //(D)After a transaction we have to clear the form to create space for another transaction.
    titleInputElement.value = "";
    amountInputElement.value = "";
    expenseInputElement.checked = false;
    incomeInputElement.checked = false;


    //Finally Render(display) the transactions also in the function and update UI
    renderTransactions(transactions);
    updateUi(transactions);
    
});



/*******************************************************
 * PART THREE
 */

//functionality to change the html(render/display transactions)
function renderTransactions(transactions){
    transactionsContainer.innerHTML = "";
    if(transactions.length > 0){
        transactions.forEach((transaction)=>{
            const transactionHtml = `

                <div class="recent-1">
                    <div class="recent-1-left">
                    <i class="bx ${transaction.type === "income" ? "bx-up-arrow-circle" : "bx-down-arrow-circle"}"></i>
                    </div>
                    <div class="recent-2-left">
                        <div class="cloths">
                            ${transaction.titleValue}
                        </div>  
                    </div>
                    <div class="recent-3-left">
                        <div class="fig-3">  
                        $${transaction.amountValue}      
                        </div>
                        <div class="under-btns">
                             <button class='btn1'>
                             <i class='bx bx-edit'></i>    
                             </button>
                             <button class='btn2'>
                             <i class='bx bxs-trash'></i>
                             </button>
                             <button class='btn3'>
                             <i class="fa-regular fa-eye"></i>
                             </button>
                        </div>    
                    </div>

            `;

         transactionsContainer.insertAdjacentHTML("beforeend",transactionHtml);
  
        });

    }else{
        transactionsContainer.innerHTML= "No Transactions";
    }

}

//NOTE:memory management; check application, circle crossed.


/****************************************
 * PART 4 updating the Ui
*/
//Declare the main buttons income number, balance number and expense number


//Functionality for Updating the Ui
function updateUi(){
    /***
     * 1.Separate the expense from all the transactions(use filter)
     */
    const expenses = transactions.filter((transaction)=>transaction.type === "expense");
    /***
     * 2. Now the overall total expenses
     */
    const totalExpenses = expenses.reduce((acc, item)=>{
        return acc + item.amountValue;
    },0);
    /***
     * 3.Separate the income from the all the transactions(use filter)
     */
    const incomes = transactions.filter((transaction)=>transaction.type === "income");
    /***
     * 4. Now the overall income
     */
    const totalIncome = incomes.reduce((acc, item)=>{
        return acc + item.amountValue;
    },0);
    /***
     * 5. Final balance
     */
    const finalBalance = totalIncome-totalExpenses;
    console.log(finalBalance);
    /***
     * Lastly, Inserting it into HTML
     */
    incomeNumber.innerHTML = `$${totalIncome}`;
    expenseNumber.innerHTML = `$${totalExpenses}`;
    balanceNumber.innerHTML = `$${finalBalance}`;
    
}
//callback the above function
updateUi(transactions);





















