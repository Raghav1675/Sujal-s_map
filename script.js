const map=L.map('map').setView([22.7,79],5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
const colors={};const palette=['red','blue','green','orange','purple','brown','black','magenta','teal','gold'];
let i=0;const markers=[];
cities.forEach(c=>{
 if(!colors[c.state]) colors[c.state]=palette[i++%palette.length];
 const icon=L.divIcon({className:'',html:`<div style="background:${colors[c.state]};width:12px;height:12px;border-radius:50%;border:2px solid white"></div>`,iconSize:[12,12]});
 const m=L.marker([c.lat,c.lng],{icon}).addTo(map).bindPopup(`<b>${c.city}</b><br>${c.state}<br>${c.lat}, ${c.lng}`);
 m.bindTooltip(c.city,{permanent:true,direction:'right',offset:[8,0]});
 markers.push({m,c});
});
const ul=document.getElementById('list');
function render(f=''){
 ul.innerHTML='';
 markers.filter(x=>x.c.city.toLowerCase().includes(f.toLowerCase())).forEach(x=>{
  const li=document.createElement('li');
  li.textContent=`${x.c.city} (${x.c.state})`;
  li.onclick=()=>{map.setView([x.c.lat,x.c.lng],9);x.m.openPopup();};
  ul.appendChild(li);
 });
}
render();
document.getElementById('search').oninput=e=>render(e.target.value);
