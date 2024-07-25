// Lista com as ariáveis de preços dos produtos
let prices = {
    matematica: 1033.43,
    portugues: 260.40,
    historia: 150.00,
    sociologia: 173.10
};

let notificationBadge = document.getElementById('price-notification');
let notificationBox = document.getElementById('notification-box');
let notificationContent = document.getElementById('notification-content');

let notificationCount = 0;

// Função para atualizar os preços na página
function atualizarPrecos() {
    // document.getElementById("matematica").innerText = `R$${matematica.toFixed(2)}`;
    // document.getElementById("portugues").innerText = `R$${precoProduto2.toFixed(2)}`;
    // document.getElementById("historia").innerText = `R$${precoProduto2.toFixed(2)}`;
    // document.getElementById("sociologia").innerText = `R$${precoProduto2.toFixed(2)}`;

    // document.querySelector("#matematica .valor").innerText = `${matematica.toFixed(2)}`;
    // document.querySelector("#portugues .valor").innerText = `${portugues.toFixed(2)}`;
    // document.querySelector("#historia .valor").innerText = `${historia.toFixed(2)}`;
    // document.querySelector("#sociologia .valor").innerText = `${sociologia.toFixed(2)}`;

    // document.querySelector("#matematica .inteiro").innerText = Math.floor(prices.matematica).toLocaleString('pt-BR');
    // document.querySelector("#matematica .decimal").innerText = (prices.matematica % 1).toFixed(2).substring(2);
    // document.querySelector("#portugues .inteiro").innerText = Math.floor(prices.portugues).toLocaleString('pt-BR');
    // document.querySelector("#portugues .decimal").innerText = (prices.portugues % 1).toFixed(2).substring(2);
    // document.querySelector("#historia .inteiro").innerText = Math.floor(prices.historia).toLocaleString('pt-BR');
    // document.querySelector("#historia .decimal").innerText = (prices.historia % 1).toFixed(2).substring(2);
    // document.querySelector("#sociologia .inteiro").innerText = Math.floor(prices.sociologia).toLocaleString('pt-BR');
    // document.querySelector("#sociologia .decimal").innerText = (prices.sociologia % 1).toFixed(2).substring(2);

    Object.keys(prices).forEach(subject => {
        const price = prices[subject];
        const inteiro = Math.floor(price).toLocaleString('pt-BR');
        const decimal = (price % 1).toFixed(2).substring(2);
        document.querySelector(`#${subject} .inteiro`).innerText = inteiro;
        document.querySelector(`#${subject} .decimal`).innerText = decimal;
    });
}

function changePrice(subject, newPrice) {
    if (prices[subject] !== newPrice) {
        prices[subject] = newPrice;
        notificationCount++;
        notificationBadge.textContent = notificationCount;
        notificationBadge.style.display = 'inline'; // Mostra o badge
        notificationContent.innerHTML += `<p>O preço de <strong>${subject}</strong> foi alterado para <strong>R$${newPrice.toFixed(2)}</strong></p>`;
        // atualizarPrecos();
        saveNotifications();
    }
}

function toggleNotificationBox(event) {
    event.preventDefault();
    if (notificationBox.style.display === 'none' || notificationBox.style.display === '') {
        notificationBox.style.display = 'block';
        resetNotifications();
    } else {
        notificationBox.style.display = 'none';
    }
}

// document.getElementById("login-page").addEventListener("click", function() {
//     this.style.color = "#333";
//     this.style.backgroundColor = "cyan"; // Muda a cor do botão ao clicar
//     setTimeout(() => {
//         this.style.color = "#333";
//         this.style.backgroundColor = "#fff"; // Volta à cor original após 300ms
//     }, 400);
// });

function shakeIcon(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500); // Duração da animação
}

function saveNotifications() {
    localStorage.setItem('notificationCount', notificationCount);
    localStorage.setItem('notificationContent', notificationContent.innerHTML);
}

function loadNotifications() {
    notificationCount = parseInt(localStorage.getItem('notificationCount')) || 0;
    notificationContent.innerHTML = localStorage.getItem('notificationContent') || '';
    if (notificationCount > 0) {
        notificationBadge.textContent = notificationCount;
        notificationBadge.style.display = 'inline';
    } else {
        notificationContent.innerHTML = '<p>Você não tem mais notificações!</p>'
    }
}

function resetNotifications() {
    notificationCount = 0;
    notificationBadge.textContent = notificationCount;
    notificationBadge.style.display = 'none';
    // notificationContent.innerHTML = 'Você não tem notificações!';
    localStorage.removeItem('notificationCount');
    localStorage.removeItem('notificationContent');
}

function updatePrices(newPrices) {
    for (let subject in newPrices) {
        if (newPrices.hasOwnProperty(subject)) {
            pricesProxy[subject] = newPrices[subject];
        }
    }
}

const pricesProxy = new Proxy(prices, {
    set(target, property, value) {
        if (target[property] !== value) {
            changePrice(property, value);
        }
        return true;
    }
});

window.onload = () => {
    loadNotifications();
    atualizarPrecos();
};
// Atualiza os preços quando a página é carregada

updatePrices({
    // matematica: 19.45,
    // historia: 47.39,
    // portugues: 23.99,
    // sociologia: 87.99
});

// Altere direto pelo proxy o preço dos produtos
// pricesProxy.portugues = 1649.45;
