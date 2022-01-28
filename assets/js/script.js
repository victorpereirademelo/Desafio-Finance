let dados = [];

fetch('./assets/json/data.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        dados = data;
        finance(data);
        renderTable(data);
    });

function finance(dados) {

    let totalOut = 0;
    let totalIn = 0;

    dados.forEach(value => {
        if (value.type === 'OUT') totalOut += value.amount * value.price;
        if (value.type === 'IN') totalIn += value.amount * value.price;
    });

    const total = totalIn - totalOut;

    const inHtml = document.getElementById('in');
    let htmlIn = `Total de Entradas: ${totalIn.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
    inHtml.innerHTML = htmlIn;

    const outHTML = document.getElementById('out');
    let htmlOut = `Total de Saídas: ${totalOut.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
    outHTML.innerHTML = htmlOut;

    const saldoHtml = document.getElementById('saldo');
    let htmlSaldo = `Saldo: ${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`;
    saldoHtml.innerHTML = htmlSaldo;
};

function renderTable(dados) {

    const tbody = document.getElementById('tbody');
    let html = '';

    dados.forEach(element => {

        let priceTotal = element.amount * element.price;

        html += `
            <tr>
                <td>${new Date(element.date).toLocaleDateString('pt-br')}</td>
                <td>${element.customer.first_name} ${element.customer.last_name}</td>
                <td>${element.customer.phone}</td>
                <td>${element.store.name}</td>
                <td>${element.store.phone}</td>
                <td>${element.type.includes('IN') ? 'Entrada' : 'Saída'}</td>
                <td>${element.amount}</td>
                <td>${element.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                <td>${priceTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
                `
    });

    tbody.innerHTML = html;
};

function renderSelect() {

    const select = document.getElementById('select');
    let option = `<option value="">Selecione</option>`;

    option += `<option value="OUT">Saída</option>`;
    option += `<option value="IN">Entrada</option>`;

    select.innerHTML = option;
};
renderSelect();

function filter() {
    const searchSelect = document.getElementById('select').value;

    if (!searchSelect) {
        finance(dados);
        renderTable(dados);
        return;
    }

    const filterTable = dados.filter(element => searchSelect === element.type);

    finance(filterTable);
    renderTable(filterTable);
};