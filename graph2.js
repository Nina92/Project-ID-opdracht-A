
/* Gebaseerd op Mike Bostock's Pie Chart https://bl.ocks.org/mbostock/3887235 */

/* Het selecteren van de juiste SVG elementen voor de pie charts */
var svg1 = d3.select("#piechart1");
var svg2 = d3.select("#piechart2");
var svg3 = d3.select("#piechart3");

var radius = 80;

/* De grootte van de SVG's is de radius * 2 (want dan heb je de diameter van de cirkel) */
svg1.attr("width", radius * 2)
	.attr("height", radius * 2);

svg2.attr("width", radius * 2)
	.attr("height", radius * 2);

svg3.attr("width", radius * 2)
	.attr("height", radius * 2);

var group1 = svg1.append("g").attr("transform", "translate(" + radius + "," + radius + ")");
var group2 = svg2.append("g").attr("transform", "translate(" + radius + "," + radius + ")");
var group3 = svg3.append("g").attr("transform", "translate(" + radius + "," + radius + ")");

/* Labels met het jaar voor onder de pie charts */
group1.append("text")
	.attr("fill", "#000")
	.attr("text-anchor", "middle")
	.attr("y", radius + 20)
	.text("2014");

group2.append("text")
	.attr("fill", "#000")
	.attr("text-anchor", "middle")
	.attr("y", radius + 20)
	.text("2015");

group3.append("text")
	.attr("fill", "#000")
	.attr("text-anchor", "middle")
	.attr("y", radius + 20)
	.text("2016");

/* De kleuren van de slices */
var color = d3.scaleOrdinal(["#98abc5", "#6b486b"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) {
    	return d.aantal;
    });

var path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

d3.csv("burn-out-cijfers.csv", onLoad);

function onLoad(error, data) {
	if (error) throw error;

	/* In de var `dataForYear` wordt een array opgeslagen met de data over het aantal mannen en vrouwen */
	/* In de for loop wordt de juiste group gekoppeld aan dataForYear zodat er drie verschillende pie charts worden getekend */
	/* i = 0: data van 2014 */
	/* i = 1: data van 2015 */
	/* i = 2: data van 2016 */
	for (var i = 0; i < data.length; i++) {
			var dataForYear = [];

			dataForYear.push({"geslacht": "Mannen", "aantal": data[i].mannen});
			dataForYear.push({"geslacht": "Vrouwen", "aantal": data[i].vrouwen});

			if (i == 0) {
				drawPieChart(group1, dataForYear);
			} else if (i == 1) {
				drawPieChart(group2, dataForYear);
			} else {
				drawPieChart(group3, dataForYear);
			}

			console.log(dataForYear);
	};

	/* Om de legenda te tekenen gebruik ik een table */
	var legend = d3.select("#legend")
		.append("table");

	/* Hier wordt de data gekoppeld aan de tablerows */
	var tr = legend.selectAll("tr")
		.data(pie(dataForYear))
		.enter()
		.append("tr");

	/* Eerste kolom: vierkant met kleur van de slices*/
	tr.append("td")
		.append("svg")
			.attr("width", '16')
			.attr("height", '16')
		.append("rect")
        	.attr("width", '16')
        	.attr("height", '16')
			.attr("fill", function(d) {
				return color(d.data.geslacht);
			});

	/* Tweede kolom: geslacht (Mannen, Vrouwen) */
	tr.append("td")
		.text(function(d) {
			return d.data.geslacht;
		});
}

/* In deze functie wordt de data gekoppeld aan de pie chart */
function drawPieChart(group, data) {
	var arc = group.selectAll(".arc")
		.data(pie(data))
		.enter()
		.append("g")
		.attr("class", "arc");

	arc.append("path")
		.attr("d", path)
		.attr("fill", function(d) {
			return color(d.data.geslacht);
		});
}