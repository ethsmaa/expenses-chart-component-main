async function fetchJson() {
    let response = await fetch("data.json");
    let data = await response.json();
    console.log(data);
    return data;
}

function createChart(data) {
    const maxAmount = Math.max(...data.map(chart => chart.amount));
    const maxIndex = data.findIndex(chart => chart.amount === maxAmount);

    let totalSum = data.reduce((sum, chart) => sum + chart.amount, 0);
    const totalAmountElement = document.getElementById("totalAmount");
    totalAmountElement.textContent = `$${totalSum.toFixed(2)}`;


    const info = {
        labels: data.map(chart => chart.day),
        datasets: [
            {
                labels: data.map(chart => chart.day),
                data: data.map(chart => chart.amount),
                backgroundColor: data.map((chart, index) => {
                    return (index === maxIndex) ? "hsl(186, 34%, 60%)" : "hsl(10, 79%, 65%)";
                }), // en fazla miktar mavi ile gözüksün
                hoverBackgroundColor: data.map((chart, index) => {
                    return (index === maxIndex) ? "hsl(186, 34%, 70%)" : "hsl(10, 79%, 75%)";
                }),
                borderRadius: 5,
            }
        ]

    }

    const config = {
        type: 'bar',
        data: info,
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: 'hsl(25, 47%, 15%)',
                    },
                },
                y: {
                    display: false,
                },
            },


            plugins: {
                legend: {
                    display: false,
                },

                tooltip: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItems,) {
                            return `$${tooltipItems[0].formattedValue}`;
                        },
                        label: function () {
                            return "";
                        }
                    }

                }

            }
        }
    }

    let myChart = document.getElementById("myChart").getContext('2d');
    let expensesChart = new Chart('myChart', config)

}

async function startApp() {
    try {
        const data = await fetchJson();
        createChart(data);
    } catch (error) {
        console.error("bir hata oluştu ", error);
    }
}

startApp();




