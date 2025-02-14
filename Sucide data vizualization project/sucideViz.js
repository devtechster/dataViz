// Assuming you've already imported D3.js, TopoJSON, and other necessary dependencies

async function createMap() {
    const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);  // Color scale for sucide rates
    const path = d3.geoPath();  // Path generator for geographic shapes
  
    // Fetch and parse the data
    const data = (await FileAttachment("sucide-x.csv").csv()).map(d => (d.rate = +d.rate, d)); // sucide data
    const us = await FileAttachment("counties-albers-10m.json").json(); // TopoJSON data for U.S. map
    
    const valuemap = new Map(data.map(d => [d.id, d.rate])); // Mapping county IDs to their sucide rates
  
    // Create features from the TopoJSON objects
    const counties = topojson.feature(us, us.objects.counties);
    const states = topojson.feature(us, us.objects.states);
    
    // Map to get state names from state IDs
    const statemap = new Map(states.features.map(d => [d.id, d]));
    
    // Creating the mesh for state borders
    const statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
    
    // Create an SVG container for the map
    const svg = d3.create("svg")
        .attr("width", 975)
        .attr("height", 610)
        .attr("viewBox", [0, 0, 975, 610])
        .attr("style", "max-width: 100%; height: auto;");
  
    // Add a legend to the map
    svg.append("g")
        .attr("transform", "translate(610,20)")
        .append(() => Legend(color, {title: "sucide rate (%)", width: 260}));
  
    // Draw the counties on the map, colored by sucide rate
    svg.append("g")
      .selectAll("path")
      .data(counties.features)
      .join("path")
        .attr("fill", d => color(valuemap.get(d.id))) // Apply the color based on sucide rate
        .attr("d", path)
      .append("title")
        .text(d => `${d.properties.name}, ${statemap.get(d.id.slice(0, 2)).properties.name}\n${valuemap.get(d.id)}%`); // Display county name and sucide rate
  
    // Draw state borders
    svg.append("path")
        .datum(statemesh)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
  
    return svg.node();
  }
  
  // Call the function to generate the map
  createMap().then(svg => {
    document.body.appendChild(svg); // Append the SVG to the body of the page
  });
  