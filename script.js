// Função auxiliar para converter valores corretamente
function parseCurrency(value) {
    return parseFloat(value) || 0;
}

// Calcula o lucro líquido (Total Income - Total Expenses)
function calculateProfit() {
    let income = parseCurrency(document.getElementById("totalIncomeDisplay").innerText.replace("R$", ""));
    let expenses = parseCurrency(document.getElementById("totalExpensesDisplay").innerText.replace("R$", ""));

    let netProfit = income - expenses;
    let resultElement = document.getElementById("netProfitLossDisplay");

    resultElement.innerText = `R$ ${netProfit.toFixed(2)}`;
    resultElement.style.color = netProfit < 0 ? "red" : "green";
}

// Calcula automaticamente o total arrecadado (Funds for Event)
function calculateTotalIncome() {
    let total = 0;

    document.querySelectorAll(".fund-checkbox").forEach((checkbox, index) => {
        if (checkbox.checked) {
            let value = parseCurrency(document.querySelectorAll(".fund-value")[index].value);
            total += value;
        }
    });

    document.getElementById("totalIncomeDisplay").innerText = `R$ ${total.toFixed(2)}`;
    
    // Atualiza automaticamente o cálculo do lucro/prejuízo
    calculateProfit();
}

// Calcula automaticamente o total de despesas
function calculateTotalExpenses() {
    let totalExpenses = 0;

    document.querySelectorAll(".expense-value").forEach(expense => {
        totalExpenses += parseCurrency(expense.value);
    });

    document.getElementById("totalExpensesDisplay").innerText = `R$ ${totalExpenses.toFixed(2)}`;

    // Atualiza automaticamente o cálculo do lucro/prejuízo
    calculateProfit();
}

// Calcula automaticamente os custos cobertos pela igreja e o saldo final
function calculateChurchFunds() {
    let totalChurchFunds = 0;

    document.querySelectorAll(".church-funds-value").forEach(churchFund => {
        totalChurchFunds += parseCurrency(churchFund.value);
    });

    document.getElementById("totalChurchFundsDisplay").innerText = `R$ ${totalChurchFunds.toFixed(2)}`;

    let netProfitLoss = parseCurrency(document.getElementById("netProfitLossDisplay").innerText.replace("R$", ""));

    let finalBalance = netProfitLoss - totalChurchFunds;
    let finalBalanceDisplay = document.getElementById("finalBalanceDisplay");

    finalBalanceDisplay.innerText = `R$ ${finalBalance.toFixed(2)}`;
    finalBalanceDisplay.style.color = finalBalance < 0 ? "red" : "green";
}

// Adiciona eventos para atualizar automaticamente os cálculos quando o usuário digitar valores ou marcar checkboxes
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".fund-value, .expense-value, .church-funds-value").forEach(input => {
        input.addEventListener("input", function () {
            calculateTotalIncome();
            calculateTotalExpenses();
            calculateChurchFunds();
        });
    });

    // Adiciona evento para os checkboxes da seção "Funds for Event"
    document.querySelectorAll(".fund-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", calculateTotalIncome);
    });
});
