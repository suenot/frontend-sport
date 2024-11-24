exports.id=114,exports.ids=[114],exports.modules={1114:(t,e,o)=>{"use strict";o.a(t,async(t,n)=>{try{o.r(e),o.d(e,{Map:()=>f});var i=o(997),r=o(6689),a=o.n(r),l=o(4045);o(9637);var s=o(5194),c=o.n(s),p=o(2210),d=t([l,p]);[l,p]=d.then?(await d)():d;let m=`
  .leaflet-control-attribution .leaflet-attribution-flag {
    display: none !important;
  }
  .leaflet-container {
    height: 100% !important;
    width: 100% !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
  }
`,h=t=>new(c()).Icon({iconUrl:"/images/marker-icon.png",iconRetinaUrl:"/images/marker-icon-2x.png",shadowUrl:"/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41],className:`marker-${t}`}),g=h("blue"),u=h("red"),x=h("green"),f=({events:t,onEventClick:e,center:o=[55.7558,37.6173],zoom:n=10})=>{let s=(0,r.useRef)(null);return(0,r.useEffect)(()=>{delete c().Icon.Default.prototype._getIconUrl,c().Icon.Default.mergeOptions({iconUrl:"/images/marker-icon.png",iconRetinaUrl:"/images/marker-icon-2x.png",shadowUrl:"/images/marker-shadow.png"});let t=document.createElement("style");return t.textContent=m,document.head.appendChild(t),s.current&&setTimeout(()=>{s.current?.invalidateSize()},100),()=>{document.head.removeChild(t)}},[]),i.jsx(p.Box,{position:"relative",h:"100%",w:"100%",sx:{"& .leaflet-container":{height:"100% !important",width:"100% !important"}},children:(0,i.jsxs)(l.MapContainer,{ref:s,center:o,zoom:n,style:{height:"100%",width:"100%",position:"absolute",top:0,left:0,right:0,bottom:0},children:[i.jsx(l.TileLayer,{attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),t.map(t=>{let o=t.stages?.filter(t=>t.location?.coordinates)||[];return(0,i.jsxs)(a().Fragment,{children:[t.location?.coordinates&&i.jsx(l.Marker,{position:[t.location.coordinates.lat,t.location.coordinates.lng],icon:g,eventHandlers:{click:()=>e?.(t.id)}}),o.map(o=>o.location?.coordinates?(0,i.jsxs)(a().Fragment,{children:[i.jsx(l.Marker,{position:[o.location.coordinates.lat,o.location.coordinates.lng],icon:u,eventHandlers:{click:()=>e?.(t.id)}}),o.location.route?.map((n,r)=>i.jsx(l.Marker,{position:[n.lat,n.lng],icon:x,eventHandlers:{click:()=>e?.(t.id)}},`${o.id}-checkpoint-${r}`))]},o.id):null)]},t.id)})]})})};n()}catch(t){n(t)}})},9637:()=>{}};