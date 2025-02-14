
# Data Visualization  
Visualization of suicide rates in the United States using D3.js on data generated via a GPT prompt.  

## **Prompt Used**  
Generate a random CSV with columns: `id`, `state`, `county`, `rate (suicide)`, containing U.S. states and counties, structured statewise (Alabama, Florida, etc.).  

## Output here [https://devtechster.github.io/dataViz/Sucide%20data%20vizualization%20project/index.html]

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
```

---

## **2️⃣ `counties-albers-10m.json` (TopoJSON File)**  
- Contains **geospatial data** for U.S. counties and states.  
- **Why TopoJSON?**  
  - **Smaller file size** than GeoJSON.  
  - **Encodes shared boundaries** efficiently.  
- `suicideViz.js` converts it into **GeoJSON** for rendering.  

---

## **3️⃣ `suicideViz.js` (Visualization Logic)**  
- **Loads** suicide data (`sucide-x.csv`).  
- **Processes** `counties-albers-10m.json` for U.S. map.  
- **Maps** suicide rates to counties.  
- **Uses D3.js** to render a **color-coded map**.

### **🔹 Loading Data**
```js
d3.csv("sucide-x.csv").then(data => {
  d3.json("counties-albers-10m.json").then(us => {
    createMap(data, us);
  });
});
```
- Loads **CSV** (suicide rates) and **TopoJSON** (geographical data).  

### **🔹 Drawing the Map**
```js
const counties = topojson.feature(us, us.objects.counties);
const states = topojson.feature(us, us.objects.states);
const color = d3.scaleQuantize([1, 10], d3.schemeRdBu[9]);

svg.append("g")
  .selectAll("path")
  .data(counties.features)
  .join("path")
  .attr("fill", d => color(valuemap.get(d.id)))
  .attr("d", path)
  .append("title")
  .text(d => `${d.properties.name}: ${valuemap.get(d.id)}%`);
```
- **Extracts GeoJSON features** for **counties and states**.  
- **Colors counties** based on suicide rates.  
- **Adds tooltips** with county names and rates.  

---

## **🔷 How The Files Work Together**
| **File**  | **Purpose** |
|-----------|------------|
| `index.html` | Loads scripts and displays the map. |
| `counties-albers-10m.json` | Contains the U.S. county/state geography data. |
| `suicideViz.js` | Loads data, processes it, and renders the D3.js visualization. |

---

## **Final Output**
✔ **Color-coded U.S. map** (suicide rates per county).  
✔ **Tooltip on hover** (county + rate).  
✔ **Legend** (rate scale from **1% (blue) → 10% (red)**).  
```  
