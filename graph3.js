/* Gebaseerd op Mike Bostock's Grouped Bar Chart https://bl.ocks.org/mbostock/3887051 */

var svg = d3.select("svg");
var margin = {top: 20, right: 20, bottom: 30, left: 22};
var width = +svg.attr("width") - margin.left - margin.right;
var height = +svg.attr("height") - margin.top - margin.bottom;
var group = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/* De x-as */
var x0 = d3.scaleBand()
    .rangeRound([10, 550])
    .paddingInner(0.1);

/* De padding tussen de bars toevoegen */
var bar = d3.scaleBand()
    .padding(0.15);

/* De y-as */
var y = d3.scaleLinear()
    .rangeRound([height, 0]);

/* De kleuren van de bars */
var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);

d3.csv("burn-out-cijfers-leeftijd.csv", convertRows, onLoad);

function onLoad(error, data) {
  if (error) throw error;

  /* Haalt 1 item uit de array data */
  var keys = data.columns.slice(1);

  x0.domain(data.map(function(d) {return d.jaar; }));
  bar.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, 20]).nice();

  /* Data wordt gekoppeld aan de groups met de bars */
  group.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.jaar) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return bar(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", bar.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });

  /* Er wordt een group toegevoegd met de x-as */
  group.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0));

  /* Er wordt een group toegevoegd met de y-as */
  group.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 10)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .text("Aantal werknemers met burn-out klachten (%)");

  /* Er wordt een group toegevoegd voor de legenda */
  var legend = group.append("g")
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 22 + ")"; });

  /* Eerste kolom: vierkant met kleur van de bars */
  legend.append("rect")
      .attr("x", width - 92)
      .attr("width", 16)
      .attr("height", 16)
      .attr("fill", color);

  /* Tweede kolom: leeftijdsgroep */
  legend.append("text")
      .attr("x", width)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
}

function convertRows(d, i, columns) {
  for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];

  return d;
}