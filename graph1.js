/* Gebaseerd op Mike Bostock's Line Chart https://bl.ocks.org/mbostock/3883245 */

var svg = d3.select("svg");
var margin = {top: 20, right: 20, bottom: 30, left: 30};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
var group = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* Omzetten naar jaren (jjjj) */
var parseTime = d3.timeParse("%Y");

/* De x-as */
var x = d3.scaleTime()
    .rangeRound([10, width]);

/* De y-as */
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

/* De line */
var line = d3.line()
    .x(function(d) { return x(d.jaar); })
    .y(function(d) { return y(d.totaal); });

d3.csv("burn-out-cijfers.csv", convertRows, onLoad);

function onLoad(error, data) {
	if (error) throw error;

	x.domain(d3.extent(data, function(d) { return d.jaar; }));
	y.domain([12, 15]);

    /* Er wordt een group toegevoegd met de x-as */
	group.append("g")
    	.attr("transform", "translate(0," + height + ")")
    	.call(d3.axisBottom(x).ticks(3));

    /* Er wordt een group toegevoegd met de y-as */
	group.append("g")
    	.call(d3.axisLeft(y).ticks(7))
    .append("text")
    	.attr("fill", "#000")
    	.attr("x", 10)
    	.attr("dy", "0.71em")
    	.attr("text-anchor", "start")
    	.text("Aantal werknemers met burn-out klachten (%)");

    /* Er wordt een group toegevoegd met een path die de line weergeeft */
	group.append("path")
    	.datum(data)
    	.attr("fill", "none")
    	.attr("stroke", "#6b486b")
    	.attr("stroke-linejoin", "round")
    	.attr("stroke-linecap", "round")
    	.attr("stroke-width", 2.5)
    	.attr("d", line);
}

function convertRows(d) {
	d.jaar = parseTime(d.jaar);
	d.totaal = +d.totaal;

	return d;
}