(this["webpackJsonpshaping-your-path"]=this["webpackJsonpshaping-your-path"]||[]).push([[0],{10:function(e,t,a){},13:function(e,t,a){e.exports=a(32)},18:function(e,t,a){},22:function(e,t,a){},25:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(7),o=a.n(r),s=(a(18),a(2)),l=a(11),i=a(3),m=a(1),u="CLOSE_PATH",d="MOVE_TO",f="HORIZ_LINE_TO",b="VERT_LINE_TO",E="LINE_TO",h="CURVE_TO",p="SMOOTH_CURVE_TO",v="QUAD_TO",g="SMOOTH_QUAD_TO",O="ARC",y=function(e){return new m.a(e).toAbs().transform(m.b.ROUND(4)).commands},N=function(e){return new m.a(e).toAbs().transform(m.b.ROUND(4)).commands.map((function(e){return Object(m.c)(e)}))},C=function(e){return new m.a(e).transform(m.b.INFO((function(e,t,a){return e.prevX=t,e.prevY=a,e}))).commands},x=function(e){return new m.a(e).toAbs().transform(m.b.NORMALIZE_HVZ()).transform(m.b.INFO((function(e,t,a){return e.type&m.a.LINE_TO&&(e.type=m.a.CURVE_TO,e.x1=(Number(e.x)+Number(t))/2,e.y1=(e.y+a)/2,e.x2=(e.x+t)/2,e.y2=(e.y+a)/2),e}))).transform(m.b.NORMALIZE_ST()).transform(m.b.A_TO_C()).transform(m.b.QT_TO_C()).encode()},j=function(e){return new m.a(e).toAbs().transform(m.b.ROUND(4)).encode()},S=(a(22),a(6)),T=a.n(S),k=function(e){var t=e.pathCommands,a=e.selectedCommand,n=e.highlightedCommand,r=e.onMouseOver,o=e.onMouseOut,s=e.onClick;return t.map((function(e,t){var l=function(e){if(e.type&m.a.CURVE_TO){var t=e.prevX,a=e.prevY,n=e.x1,c=e.y1,r=e.x2,o=e.y2,s=e.x,l=e.y;return"M".concat(t," ").concat(a," C").concat(n," ").concat(c," ").concat(r," ").concat(o," ").concat(s," ").concat(l)}return Object(m.c)(e)}(e);return c.a.createElement("path",{onMouseOver:function(){return r(t)},onMouseOut:o,onClick:function(){return s(t)},id:t,className:"path-segment",d:l,stroke:t===a?"#e76f51":t===n?"#f4a261":"lightgrey",strokeWidth:"2px",fill:"none",key:t})}))},w=function(e,t){var a=function(e,t){return new m.a(e).toAbs().scale(t,t).encode()}(e,t),n=x(a);return C(n)},M=function(e){var t=e.data,a=e.scale,r=void 0===a?1:a,o=e.selectedCommand,l=e.highlightedCommand,u=e.onMouseOver,d=e.onMouseOut,f=e.onClick,b=e.onDragEnd,E=e.arePointsVisible,h=e.areControlPointsVisible,p=Object(n.useState)(w(t,r)),v=Object(s.a)(p,2),g=v[0],O=v[1];return Object(n.useEffect)((function(){O(w(t,r))}),[t,r]),c.a.createElement("svg",{width:"100%",height:"100%"},k({pathCommands:g,selectedCommand:o,highlightedCommand:l,onMouseOver:u,onMouseOut:d,onClick:f}),function(e){var t=e.pathCommands,a=e.onDrag,n=e.onStop,r=e.arePointsVisible,o=e.areControlPointsVisible;return t.map((function(e,s){var l=e.x,m=e.y,u=e.x1,d=e.y1,f=e.x2,b=e.y2;return c.a.createElement(c.a.Fragment,null,r&&c.a.createElement(T.a,{axis:"both",defaultClassNameDragging:"dragging",position:{x:l,y:m},positionOffset:{x:-l,y:-m},onStop:n,onDrag:function(e,n){var c=n.x,r=n.y,o=t.map((function(e,t){return s===t?Object(i.a)({},e,{x:c,y:r}):s===t-1?Object(i.a)({},e,{prevX:c,prevY:r}):e}));return a(o)},key:"".concat(s,"-xy")},c.a.createElement("circle",{fill:"green",opacity:"0.8",r:5,cx:l,cy:m})),o&&c.a.createElement(c.a.Fragment,null,c.a.createElement(T.a,{axis:"both",defaultClassNameDragging:"dragging",position:{x:u,y:d},positionOffset:{x:-u,y:-d},onStop:n,onDrag:function(e,n){var c=n.x,r=n.y,o=t.map((function(e,t){return s===t?Object(i.a)({},e,{x1:c,y1:r}):e}));return a(o)},key:"".concat(s,"-x1y1")},c.a.createElement("circle",{fill:"red",opacity:"0.8",r:3,cx:u,cy:d})),c.a.createElement(T.a,{axis:"both",defaultClassNameDragging:"dragging",position:{x:f,y:b},positionOffset:{x:-f,y:-b},onStop:n,onDrag:function(e,n){var c=n.x,r=n.y,o=t.map((function(e,t){return s===t?Object(i.a)({},e,{x2:c,y2:r}):e}));return a(o)},key:"".concat(s,"-x2y2")},c.a.createElement("circle",{fill:"red",opacity:"0.8",r:3,cx:f,cy:b}))))}))}({pathCommands:g,onDrag:function(e){return O(e)},onStop:function(){return b(new m.a(Object(m.c)(g)).scale(1/r,1/r).encode())},arePointsVisible:E,areControlPointsVisible:h}))},V=a(5),_=a(4),D=a.n(_),R=(a(25),a(10),function(e){var t=e.pathData,a=e.selectedCommand,r=e.highlightedCommand,o=e.onMouseOver,l=e.onMouseOut,C=e.onSave,x=e.isShowingEncodedPathCommands,j=Object(n.useState)(y(t)),S=Object(s.a)(j,2),T=S[0],k=S[1],w=Object(n.useState)(N(t)),M=Object(s.a)(w,2),R=M[0],P=M[1],A=T.reduce((function(e,t,a){return e[a]=c.a.createRef(),e}),{});Object(n.useEffect)((function(){r&&A[r].current&&A[r].current.scrollIntoViewIfNeeded({behavior:"smooth",block:"start",inline:"nearest"})}),[r,A]),Object(n.useEffect)((function(){k(y(t)),P(N(t))}),[t]);var L=function(e){var t,a=e.index,n=e.value,c=e.key;if(c){var r=T.map((function(e,t){return t===a?Object(i.a)({},e,Object(V.a)({},c,n)):e}));k(r),t=Object(m.c)(r)}else{var o=R.map((function(e,t){return t===a?n:e}));P(o),t=o.join("")}return C(t)};return c.a.createElement("div",null,x?R.map((function(e,t){return c.a.createElement("div",{key:t,className:"board-item",onMouseOver:function(){return o(t)},onMouseOut:l,ref:A[t]},c.a.createElement("div",{className:"board-item-content ".concat(t===a?"is-selected":t===r?"is-highlighted":"")},c.a.createElement(D.a,{type:_.Types.TEXT,onSave:function(e){return L({value:e,index:t})},saveButtonLabel:"Save",cancelButtonLabel:"Cancel",attributes:{id:t},value:e})))})):T.map((function(e,t){return c.a.createElement("div",{key:t,className:"board-item",onMouseOver:function(){return o(t)},onMouseOut:l,ref:A[t]},c.a.createElement("div",{className:"board-item-content ".concat(t===a?"is-selected":t===r?"is-highlighted":"")},c.a.createElement("p",{className:"has-text-left has-text-primary"},function(e){switch(e){case 1:return u;case 2:return d;case 4:return f;case 8:return b;case 16:return E;case 32:return h;case 64:return p;case 128:return v;case 256:return g;case 512:return O;default:throw console.log(e),new Error("the given path command type is not recognized")}}(e.type)),c.a.createElement("div",{className:"tile"},Object.entries(e).filter((function(e){return"type"!==e[0]&&"relative"!==e[0]})).map((function(e){return c.a.createElement("div",{className:"tile is-2"},c.a.createElement("p",{className:"has-text-primary",key:"".concat(e[0],"-").concat(e[1])},e[0],":\xa0"),c.a.createElement(D.a,{type:_.Types.TEXT,onSave:function(a){return L({key:e[0],value:a,index:t})},saveButtonLabel:"Save",cancelButtonLabel:"Cancel",attributes:{id:"input-".concat(e[0],"-").concat(e[1])},value:e[1]}))})))))})))}),P=a(12),A=a.n(P),L=function(e){var t=e.oldValue,a=e.newValue;return c.a.createElement(A.a,{oldValue:t,newValue:a,splitView:!0})},I="M4.317,16.411c-1.423-1.423-1.423-3.737,0-5.16l8.075-7.984c0.994-0.996,2.613-0.996,3.611,0.001C17,4.264,17,5.884,16.004,6.88l-8.075,7.984c-0.568,0.568-1.493,0.569-2.063-0.001c-0.569-0.569-0.569-1.495,0-2.064L9.93,8.828c0.145-0.141,0.376-0.139,0.517,0.005c0.141,0.144,0.139,0.375-0.006,0.516l-4.062,3.968c-0.282,0.282-0.282,0.745,0.003,1.03c0.285,0.284,0.747,0.284,1.032,0l8.074-7.985c0.711-0.71,0.711-1.868-0.002-2.579c-0.711-0.712-1.867-0.712-2.58,0l-8.074,7.984c-1.137,1.137-1.137,2.988,0.001,4.127c1.14,1.14,2.989,1.14,4.129,0l6.989-6.896c0.143-0.142,0.375-0.14,0.516,0.003c0.143,0.143,0.141,0.374-0.002,0.516l-6.988,6.895C8.054,17.836,5.743,17.836,4.317,16.411",U=function(){var e=Object(n.useRef)(null),t=Object(n.useState)(j(I)),a=Object(s.a)(t,2),r=a[0],o=a[1],i=Object(n.useState)(j(I)),m=Object(s.a)(i,2),u=m[0],d=m[1],f=Object(n.useState)(1),b=Object(s.a)(f,2),E=b[0],h=b[1],p=Object(n.useState)(null),v=Object(s.a)(p,2),g=v[0],O=v[1],y=Object(n.useState)(null),N=Object(s.a)(y,2),C=N[0],x=N[1],S=Object(n.useState)(!0),T=Object(s.a)(S,2),k=T[0],w=T[1],V=Object(n.useState)(!1),_=Object(s.a)(V,2),D=_[0],P=_[1],A=Object(n.useState)(!1),U=Object(s.a)(A,2),B=U[0],F=U[1],W=function(e){return x(e)},X=function(){return x(null)},H=function(){return w(!k)};return c.a.createElement(c.a.Fragment,null,c.a.createElement("section",{className:"hero is-primary"},c.a.createElement("div",{className:"hero-body columns"},c.a.createElement("h1",{className:"title level column"},"SVG Yoga"),c.a.createElement("div",{className:"column"},c.a.createElement("h3",{className:"subtitle"},"1. EXPLORE the path by hovering over its segments"),c.a.createElement("h3",{className:"subtitle"},"2. TWEAK path commands directly in the command list"),c.a.createElement("h3",{className:"subtitle"},"3. WARP the path by clicking and dragging control points")))),c.a.createElement("section",{className:"section"},c.a.createElement("div",{className:"columns is-centered"},c.a.createElement("div",{className:"column is-half"},c.a.createElement("article",{className:"message is-primary"},c.a.createElement("div",{className:"message-header"},c.a.createElement("p",null,"Original")),c.a.createElement("div",{className:"message-body box"},c.a.createElement("form",{onSubmit:function(e){return e.preventDefault(),d(r)}},c.a.createElement("textarea",{className:"textarea",placeholder:"paste path data here",value:r,onChange:function(e){return o(e.target.value)}}),c.a.createElement("button",{type:"submit",className:"button is-primary"},"Submit"))))),c.a.createElement("div",{className:"column is-half"},c.a.createElement("article",{className:"message is-secondary"},c.a.createElement("div",{className:"message-header"},c.a.createElement("p",null,"Modified")),c.a.createElement("div",{className:"message-body box"},c.a.createElement("textarea",{className:"textarea",value:j(u),readOnly:!0}),c.a.createElement(l.CopyToClipboard,{className:"button is-link",text:j(u)},c.a.createElement("span",null,"Copy to clipboard"))))))),u&&c.a.createElement(c.a.Fragment,null,c.a.createElement("section",{className:"section"},c.a.createElement("div",{className:"columns"},c.a.createElement("div",{className:"column is-half"},c.a.createElement("div",{className:"control subtitle"},c.a.createElement("div",null,c.a.createElement("input",{type:"radio",checked:k,name:"commandType",onChange:H,className:"radio"})," ","Encoded path commands (original)"),c.a.createElement("div",null,c.a.createElement("input",{type:"radio",checked:!k,name:"commandType",onChange:H,className:"radio"})," ","Parsed path commands (human-friendlier)"))),c.a.createElement("div",{className:"column flex-end"},c.a.createElement("p",{className:"heading"},"Note: if the path is not visible, try zooming in or out using the slider."))),c.a.createElement("div",{className:"columns is-centered vertical-container"},c.a.createElement("div",{className:"column box list"},c.a.createElement(R,{pathData:u,selectedCommand:g,highlightedCommand:C,onMouseOver:W,onMouseOut:X,onSave:function(e){return d(e)},isShowingEncodedPathCommands:k})),c.a.createElement("div",{className:"column box",ref:e},c.a.createElement("div",null,c.a.createElement("input",{className:"slider is-fullwidth is-small is-circle",step:"1",min:"-100",max:"100",value:function(e){return e>=1?e-1:-1/e+1}(E),type:"range",onChange:function(e){return h((t=e.target.value)<0?-1/(t-1):Number(t)+1);var t}}),c.a.createElement("div",{className:"buttons has-addons"},c.a.createElement("button",{className:"button ".concat(D?"is-selected":""),onClick:function(){return P(!D)}},"Points"),c.a.createElement("button",{className:"button ".concat(B?"is-selected":""),onClick:function(){return F(!B)}},"Control points"))),c.a.createElement(M,{data:u,selectedCommand:g,highlightedCommand:C,onMouseOver:W,onMouseOut:X,onDragEnd:d,onClick:function(e){return O(e)},scale:E,arePointsVisible:D,areControlPointsVisible:B})))),c.a.createElement("section",{className:"section"},c.a.createElement(L,{oldValue:j(r),newValue:j(u)}))),c.a.createElement("footer",{className:"section"},c.a.createElement("div",{className:"columns is-mobile is-centered"},c.a.createElement("div",{className:"field is-grouped is-grouped-multiline"},c.a.createElement("div",{className:"control"},"Monica Wojciechowska \xa9 2020")))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[13,1,2]]]);
//# sourceMappingURL=main.e81df3d9.chunk.js.map