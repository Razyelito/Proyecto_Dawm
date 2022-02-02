import { Component, OnInit } from '@angular/core';
import {HistorialVisitasService} from '../../servicios/historial-visitas.service'
import * as d3 from 'd3';
import { tap } from 'rxjs/operators';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  private data=[]; 
  private titulo;
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
    
  private colors;

  constructor(private HistorialVisitasService: HistorialVisitasService) { 

  }

  ngOnInit(): void {
    this.cargarDatos();
    
  }

  cargarDatos(){
    this.HistorialVisitasService.getHistorialVisitas().pipe(
      tap({        
        next: (historial)=>this.data=historial, //vamos asignar a nuestro atributo noticias las noticias del servicio
        error: () => console.log("Error") ,
        complete: ()=> this.generarGrafico("BARRAS") //cuando complete llamamos al metodo para agregar una descripcion corta
      })
    ).subscribe(); 

  }

  generarGrafico(grafico){
    this.svg=  d3.select("figure#grafico").selectAll("*").remove();
    this.titulo=grafico;
    switch(grafico) { 
      case "PASTEL": {         
        this.graficoPastel();
         break; 
      } 
      case "DISPERSION": {         
        this.graficoDispersion();
        break; 
      } 
      default: {        
         this.graficoBarras();
         break; 
      } 
   } 
  }

  private graficoBarras(){
    this.margin = 50;
    this.width = 750 - (this.margin * 2);
    this.height = 400 - (this.margin * 2);
    this.createSvgBarras();
    this.drawBarras();
  }

  private createSvgBarras(): void {      
    this.svg = d3.select("figure#grafico")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBarras(): void {
    // Create the X-axis band scale  
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(this.data.map(d => d.tipo_articulo))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 2000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(this.data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.tipo_articulo))
    .attr("y", d => y(d.visitas))
    .attr("width", x.bandwidth())
    .attr("height", (d) => this.height - y(d.visitas))
    .attr("fill", "#d04a35");
  }

  private graficoPastel(){  
    this.margin = 50;
    this.width = 750;
    this.height = 600;
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
    this.createSvgPastel();
    this.createColors();
    this.drawPastel();
  }


  private createSvgPastel(): void {
    this.svg = d3.select("figure#grafico")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.visitas.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawPastel(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.visitas));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text(d => d.data.tipo_articulo)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }


  private graficoDispersion(){  
    this.margin = 50;
    this.width = 750 - (this.margin * 2);
    this.height = 400 - (this.margin * 2);
    this.createSvgDispersion();
    this.drawDispersion();    
  }

  private createSvgDispersion(): void {
    this.svg = d3.select("figure#grafico")    
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawDispersion(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([2015, 2025])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, 2000])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.anio))
    .attr("cy", d => y(d.visitas))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .text(d => d.tipo_articulo)
    .attr("x", d => x(d.anio))
    .attr("y", d => y(d.visitas))
  }
  


}
