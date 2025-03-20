function calculateProfit() {
    let income = parseFloat(document.getElementById("totalIncome").value) || 0;
    let expenses = parseFloat(document.getElementById("totalExpenses").value) || 0;
    
    let netProfit = income - expenses;
    let resultText = `R$ ${netProfit.toFixed(2)}`;

    let resultElement = document.getElementById("netProfit");
    resultElement.innerHTML = resultText;

    if (netProfit < 0) {
        resultElement.style.color = "red";
    } else {
        resultElement.style.color = "green";
    }
}

function calculateTotalIncome() {
    let total = 0;
    
    // Percorrer todas as linhas da tabela
    let checkboxes = document.querySelectorAll(".fund-checkbox");
    let values = document.querySelectorAll(".fund-value");

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            total += parseFloat(values[i].value) || 0;
        }
    }

    // Atualizar a exibição do total
    document.getElementById("totalIncomeDisplay").innerHTML = `R$ ${total.toFixed(2)}`;
}

function calculateTotalExpenses() {
    let totalExpenses = 0;
    
    // Somar todas as despesas da tabela
    let expenseValues = document.querySelectorAll(".expense-value");

    for (let i = 0; i < expenseValues.length; i++) {
        totalExpenses += parseFloat(expenseValues[i].value) || 0;
    }

    // Atualizar o total de despesas na tela
    document.getElementById("totalExpensesDisplay").innerHTML = `R$ ${totalExpenses.toFixed(2)}`;

    // Recuperar o total arrecadado do evento
    let totalIncomeText = document.getElementById("totalIncomeDisplay").innerText;
    let totalIncome = parseFloat(totalIncomeText.replace("R$", "").trim()) || 0;

    // Calcular lucro/prejuízo
    let netProfitLoss = totalIncome - totalExpenses;
    let netProfitLossDisplay = document.getElementById("netProfitLossDisplay");
    netProfitLossDisplay.innerHTML = `R$ ${netProfitLoss.toFixed(2)}`;

    // Mudar cor dependendo se é lucro ou prejuízo
    if (netProfitLoss < 0) {
        netProfitLossDisplay.style.color = "red";
    } else {
        netProfitLossDisplay.style.color = "green";
    }
}

function calculateChurchFunds() {
    let totalChurchFunds = 0;
    
    // Somar todas as despesas cobertas pela igreja
    let churchFundValues = document.querySelectorAll(".church-funds-value");

    for (let i = 0; i < churchFundValues.length; i++) {
        totalChurchFunds += parseFloat(churchFundValues[i].value) || 0;
    }

    // Atualizar o total da igreja na tela
    document.getElementById("totalChurchFundsDisplay").innerHTML = `R$ ${totalChurchFunds.toFixed(2)}`;

    // Recuperar Net Profit / (Loss)
    let netProfitLossText = document.getElementById("netProfitLossDisplay").innerText;
    let netProfitLoss = parseFloat(netProfitLossText.replace("R$", "").trim()) || 0;

    // Calcular o saldo final
    let finalBalance = netProfitLoss - totalChurchFunds;
    let finalBalanceDisplay = document.getElementById("finalBalanceDisplay");
    finalBalanceDisplay.innerHTML = `R$ ${finalBalance.toFixed(2)}`;

    // Mudar cor dependendo se é positivo ou negativo
    if (finalBalance < 0) {
        finalBalanceDisplay.style.color = "red";
    } else {
        finalBalanceDisplay.style.color = "green";
    }
}
