// Função auxiliar para converter valores corretamente
function parseCurrency(value) {
    return parseFloat(value) || 0;
}

// Calcula o lucro líquido (Total Income - Total Expenses)
function calculateProfit() {
    let income = parseCurrency(document.getElementById("totalIncomeDisplay").innerText.replace("$", ""));
    let expenses = parseCurrency(document.getElementById("totalExpensesDisplay").innerText.replace("$", ""));

    let netProfit = income - expenses;
    let resultElement = document.getElementById("netProfitLossDisplay");

    resultElement.innerText = `$ ${netProfit.toFixed(2)}`;
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

    document.getElementById("totalIncomeDisplay").innerText = `$ ${total.toFixed(2)}`;
    
    // Atualiza automaticamente o cálculo do lucro/prejuízo
    calculateProfit();
}

// Calcula automaticamente o total de despesas
function calculateTotalExpenses() {
    let totalExpenses = 0;

    document.querySelectorAll(".expense-value").forEach(expense => {
        totalExpenses += parseCurrency(expense.value);
    });

    document.getElementById("totalExpensesDisplay").innerText = `$ ${totalExpenses.toFixed(2)}`;

    // Atualiza automaticamente o cálculo do lucro/prejuízo
    calculateProfit();
}

// Calcula automaticamente os custos cobertos pela igreja e o saldo final
function calculateChurchFunds() {
    let totalChurchFunds = 0;

    document.querySelectorAll(".church-funds-value").forEach(churchFund => {
        totalChurchFunds += parseCurrency(churchFund.value);
    });

    document.getElementById("totalChurchFundsDisplay").innerText = `$ ${totalChurchFunds.toFixed(2)}`;

    let netProfitLoss = parseCurrency(document.getElementById("netProfitLossDisplay").innerText.replace("$", ""));

    let finalBalance = netProfitLoss + totalChurchFunds;
    let finalBalanceDisplay = document.getElementById("finalBalanceDisplay");

    finalBalanceDisplay.innerText = `$ ${finalBalance.toFixed(2)}`;
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

function saveFormAsPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let y = 20; // Posição inicial no PDF

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Joy Event Planner", 10, y);
    y += 6;

    doc.setFontSize(16);
    doc.text("Event Data", 10, y);
    y += 6;
    
    function addText(label, value, xOffset = 70) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(label, 10, y);
        doc.setFont("helvetica", "normal");
        doc.text(value || "N/A", xOffset, y);
        y += 6;
    }

    // Captura os valores do formulário
    addText("Event Title:", document.getElementById("eventTitle").value);
    addText("Event Organizer:", document.getElementById("organizer").value);
    addText("Start Date & Time:", document.getElementById("eventDate").value);

    // Seção: Purpose of Event
    y += 6;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Purpose of Event", 10, y);
    y += 6;
    doc.setFont("helvetica", "normal");

    document.querySelectorAll(".checkbox-group input[type=checkbox]").forEach((checkbox) => {
        if (checkbox.checked) {
            doc.text(`• ${checkbox.parentElement.innerText.trim()}`, 10, y);
            y += 6;
        }
    });

    let otherPurpose = document.querySelector(".checkbox-group input[type='text']").value;
    if (otherPurpose.trim() !== "") {
        doc.text(`• ${otherPurpose}`, 10, y);
        y += 6;
    }

    // Seção: Funds for Event
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14); // Reduzindo o tamanho do título
    doc.text("Funds for Event - Excluding JOY Financial Funds", 10, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12); // Reduzindo o tamanho do texto abaixo

    document.querySelectorAll(".fund-checkbox").forEach((checkbox, index) => {
        if (checkbox.checked) {
            let source = document.querySelectorAll("td:nth-child(2)")[index].innerText.trim();
            let amount = document.querySelectorAll(".fund-value")[index].value;
            doc.text(`• ${source} - R$ ${amount}`, 10, y);
            y += 6;
        }
    });

    y += 8;
    addText("Total Estimated Income for Event:", document.getElementById("totalIncomeDisplay").innerText, 80);

    // Seção: Expenses
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Expenses", 10, y);
    y += 6;
    doc.setFont("helvetica", "normal");

    document.querySelectorAll(".expense-value").forEach((expense, index) => {
        let desc = document.querySelectorAll(".expense-description")[index]?.value || `Expense ${index + 1}`;
        let value = expense.value;
        doc.text(`• ${desc} - R$ ${value}`, 10, y);
        y += 6;
    });

    y += 8;
    addText("Total Estimated Event Expenses:", document.getElementById("totalExpensesDisplay").innerText, 80);
    addText("Net Profit / (Loss):", document.getElementById("netProfitLossDisplay").innerText, 80);

    // Seção: Estimated Event Costs Covered by the Church
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Estimated Event Costs Covered by the Church", 10, y);
    y += 6;
    doc.setFont("helvetica", "normal");

    document.querySelectorAll(".church-funds-value").forEach((fund, index) => {
        let desc = document.querySelectorAll("td:nth-child(1)")[index]?.innerText.trim() || `Fund ${index + 1}`;
        let value = fund.value;
        doc.text(`• ${desc} - R$ ${value}`, 10, y);
        y += 6;
    });

    y += 6;
    addText("Total Estimated Amount - Church Financial Funds:", document.getElementById("totalChurchFundsDisplay").innerText, 80);
    addText("The balance MUST be ZERO or POSITIVE (No Deficit Allowed):", document.getElementById("finalBalanceDisplay").innerText, 80);
    y += 6;

    // Seção: Approvals
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Approvals", 10, y);
    y += 8;
    doc.setFont("helvetica", "normal");

    document.querySelectorAll(".approval-checkbox").forEach((checkbox, index) => {
        if (checkbox.checked) {
            let name = document.querySelectorAll(".approval-info")[index]?.value || "N/A";
            doc.text(`• ${checkbox.parentElement.innerText.trim()} - ${name}`, 10, y);
            y += 8;
        }
    });

    // Salvar o PDF
    doc.save("Event_Planner_Form.pdf");
}





