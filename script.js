function formatInput() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from").value;

  const format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: fromCurrency,
  }).format(amount);

  document.getElementById("amount").textContent = `${format}`;
}

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from").value;
  const toCurrency = document.getElementById("to").value;

  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  function verification() {
    if (fromCurrency === toCurrency) {
      alert("As moedas não podem ser iguais.");
    }
  }

  function verificationValueCurrency() {
    if (amount === "") {
      amount.textContent = "";
      fromCurrency.textContent = "";
      toCurrency.textContent = "";
      alert("Insira valor para converter!");
    }
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = amount * exchangeRate;

      const convertedAmountFormatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: toCurrency,
      }).format(convertedAmount);

      verification();
      verificationValueCurrency();
      document.getElementById(
        "result"
      ).textContent = ` ${convertedAmountFormatted}`;
    })
    .catch((error) => {
      verificationValueCurrency();
      console.error("Erro:", error);
    });
}
