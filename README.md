# Data Visualization  
Visualization of suicide rates in the United States using D3.js on data generated via a GPT prompt.  

## **Prompt Used**  
Generate a random CSV with columns: `id`, `state`, `county`, `rate (suicide)`, containing U.S. states and counties, structured statewise (Alabama, Florida, etc.).  

## [Output here](https://devtechster.github.io/dataViz/Sucide%20data%20vizualization%20project/index.html)

---

## **Overview of Files**  

1. **`index.html`** → Main entry file that loads scripts and creates the map container.  
2. **`counties-albers-10m.json`** → **TopoJSON** file containing U.S. county and state boundaries.  
3. **`suicideViz.js`** → Loads data, processes it, and renders a D3.js visualization.  

---

## **1️⃣ `index.html` (Main Entry File)**  
- Loads **D3.js** and **TopoJSON**.  
- Includes **`suicideViz.js`** for map logic.  
- Creates a `<div>` (`#map-container`) for rendering the SVG map.  

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js"></script>
<script src="suicideViz.js"></script>
<div id="map-container"></div>
