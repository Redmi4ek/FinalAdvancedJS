const sendMoneyBtn = document.querySelector('.continue_btn'),
getAmount = document.getElementById('get_amount'),
transactionName = document.querySelector('.transaction-name'),
sendTo = document.getElementById('send_to'),
sendAmount = document.getElementById('send_amount'),
recentActionsDiv = document.querySelector('.transactions');

// console.log(sendMoneyBtn)

function depositMoney() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Счет месяцев начинается с 0
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const currentBalanceSpan = document.getElementById('current_balance');
    let currentBalance = parseFloat(currentBalanceSpan.textContent.replace('$', ''));

    const amountToAdd = parseFloat(getAmount.value);

    currentBalance += amountToAdd;

    if (currentBalance > 0) {
        currentBalanceSpan.style.color = 'green';
    }

    currentBalanceSpan.textContent = `$${currentBalance.toFixed(2)}`;

    let transaction = `
    <div class="transaction">
        <div class="transaction-info">
            <p class="transaction-name" style="color: green">Money Deposited</p>
        </div>
        <div class="transaction-info">
            <p>${formattedDate}</p>
        </div>

        <div class="transaction-info">
            <p>From: BANK</p>
        </div>

        <div class="transaction-info">
            <p class="transaction-amount">$${getAmount.value}</p>
        </div>
    </div>
    `;

    recentActionsDiv.insertAdjacentHTML('beforeend', transaction);
}

function transferMoney() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Счет месяцев начинается с 0
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const currentBalanceSpan = document.getElementById('current_balance');
    let currentBalance = parseFloat(currentBalanceSpan.textContent.replace('$', ''));

    const amountToAdd = parseFloat(sendAmount.value);

    currentBalance -= amountToAdd;

    if (currentBalance < 0) {
        currentBalanceSpan.style.color = 'red';
    }

    currentBalanceSpan.textContent = `$${currentBalance.toFixed(2)}`;

    let transaction = `
    <div class="transaction">
        <div class="transaction-info">
            <p class="transaction-name" style="color: red">Money Transferred</p>
        </div>
        <div class="transaction-info">
            <p>${formattedDate}</p>
        </div>

        <div class="transaction-info">
            <p>To: ${(sendTo.value).toUpperCase()}</p>
        </div>

        <div class="transaction-info">
            <p class="transaction-amount">$${sendAmount.value}</p>
        </div>
    </div>
    `;

    recentActionsDiv.insertAdjacentHTML('beforeend', transaction);
}