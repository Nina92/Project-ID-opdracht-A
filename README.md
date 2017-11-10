# Opdracht A - Project Information Design
**Naam:** Nina van den Berg  
**Studentnummer:** 500646576  
**Klas:** ID-3  
**Coach:** Maaike van Cruchten

## Pages
https://nina92.github.io/Project-ID-opdracht-A/

## Concept
Mijn datavisualisatie gaat over burn-out bij Nederlandse werknemers. De visualisatie geeft inzicht in het aantal werknemers met burn-out klachten in 2014, 2015 en 2016.

Ik heb drie verschillende soorten grafieken gebruikt. Door middel van knoppen rechtsbovenin de pagina kun je navigeren tussen de verschillende grafieken.

Als eerste zie je een lijngrafiek waarbij je ziet hoeveel procent van de werknemers in 2014, 2015 en 2016 last heeft gehad van burn-out klachten.

De tweede grafiek laat drie cirkeldiagrammen (1 per jaar) zien waarbij de verdeling te zien is tussen mannen en vrouwen met burn-out klachten.

Bij de derde grafiek maak ik gebruik van een gegroepeerde staafdiagram waarbij je kunt zien hoe de verhouding is tussen verschillende leeftijdsgroepen.

## Code
Mijn code bestaat uit de volgende files:

* index.html
* graph1.js
* graph2.html
* graph2.js
* graph3.html
* graph3.js
* style.css
* burn-out-cijfers.csv
* burn-out-cijfers-leeftijd.csv

Ik heb één javascript bestand gebruikt per HTML pagina. Ik vond dit overzichtelijker werken dan alles in één javascript bestand te zetten (dan wordt de code zo lang en kun je moeilijker dingen terug vinden). De code is gebaseerd op voorbeelden van Mike Bostock (zie [Bronnen](#bronnen)). Ik heb de code zo aangepast zodat het werkt met mijn datasets. Bij de cirkeldiagrammen maak ik gebruik van een `for` loop om drie losse diagrammen te tekenen waaraan de juiste data wordt gekoppeld. Bij de lijngrafiek heb ik ervoor gezorgd dat de x-as alleen de 3 jaartallen laat zien door eerst `d3.timeParse("%Y")` te gebruiken om de data om te zetten naar jaren (jjjj) en vervolgens het aantal ticks van de x-as op 3 te zetten met `.call(d3.axisBottom(x).ticks(3))`.

Verder heb ik wat lay-out aanpassingen gedaan zoals:

* De labels van de y-assen een kwartslag gedraaid zodat de tekst gewoon horizontaal loopt
* De volgorde van de legenda van de staafdiagram omgedraaid
* De hoeveelheid `ticks` en de `domain` van de assen aangepast (de y-as van de lijndiagram loopt nu bijvoorbeeld van 12 tot 15 met stapjes van 0,5)
* Een kleurenpalet gekozen zodat het een consistent geheel wordt

De grafieken zijn statisch. Ik had nog interactie toe willen voegen in de vorm van tooltips, zodat je de exacte waarden kunt zien als je bijvoorbeeld over de lijn of een staaf hovert. Hier ben ik helaas niet aan toegekomen.

## Data
De data die ik heb gebruikt, komt van het Centraal Bureau voor de Statistiek (zie [Bronnen](#bronnen)). In mijn code heb ik een dataset gebruikt over de psychosociale arbeidsbelasting bij werknemers. Hierin staan gegevens over werknemers met burn-out klachten in 2014, 2015 en 2016. Vanwege de beperkte tijd die voor dit project stond en omdat de dataset vrij klein is, heb ik er voor gekozen om de data over te typen in CSV format i.p.v. met code op te schonen. Voor de grouped bar chart heb ik een aangepaste versie van deze dataset gebruikt waarin ik de 2e, 3e en 4e kolom weg heb gehaald.

Dit is de gebruikte data:

```
jaar,totaal,mannen,vrouwen,15 tot 25 jaar,25 tot 35 jaar,35 tot 45 jaar,45 tot 55 jaar,55 tot 65 jaar,65 tot 75 jaar
2014,14.4,14.4,14.3,8.7,16.6,15.0,15.0,16.1,2.4
2015,13.4,13.0,13.9,7.7,15.0,14.0,13.9,16.4,2.2
2016,14.6,14.0,15.3,10.5,17.1,14.8,15.1,15.7,3.4
``` 

Tevens heb ik een andere dataset van het CBS gebruikt om te berekenen hoeveel werknemers last hebben van burn-out klachten. Dit heb ik verwerkt in de tekst die bij de eerste grafiek hoort.

## Bronnen
* [Psychosociale arbeidsbelasting (PSA) werknemers (CBS)](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=83049NED&D1=20&D2=a&D3=a&D4=a&HDR=G3,G1,G2&STB=T&VW=T)
* [Arbeidsvolume en werkzame personen (CBS)](http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=82575ned&D1=0&D2=0&D3=0&D4=99,104,109&HDR=G2,T&STB=G1,G3&VW=T)
* [Mike Bostock's Line Chart](https://bl.ocks.org/mbostock/3883245)
* [Mike Bostock's Pie Chart](https://bl.ocks.org/mbostock/3887235)
* [Mike Bostock's Grouped Bar Chart](https://bl.ocks.org/mbostock/3887051)
