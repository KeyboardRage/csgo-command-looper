(function(){"use strict";var e={9766:function(e,t,n){var i=n(9242),l=n(2483),a=n(3396);const r=(0,a._)("h1",null,"Index",-1),o=[r];function u(e,t,n,i,l,r){return(0,a.wg)(),(0,a.iD)("div",null,o)}var s={name:"IndexView"},c=n(89);const d=(0,c.Z)(s,[["render",u]]);var p=d;const m=e=>((0,a.dD)("data-v-5c57f50b"),e=e(),(0,a.Cn)(),e),h={class:"container"},v={class:"row"},g={class:"box"},f=m((()=>(0,a._)("label",{for:"data-source"},"File Source",-1))),y=m((()=>(0,a._)("p",{style:{margin:".5rem"}},"Upload a file to use use as datasource for parsing.",-1))),_={key:0},b=m((()=>(0,a._)("h3",null,"Select parser",-1))),w={class:"row"},j={class:"row"},k={id:"commands-container"},S=m((()=>(0,a._)("div",{class:"row"},[(0,a._)("h3",null,"Console Command:"),(0,a._)("h3",null,"Optional: Custom Injection:"),(0,a._)("h3",null,"Optional: Comment:")],-1))),$={id:"commands",ref:"commands"},I={class:"new-line-container"},C=m((()=>(0,a._)("label",{for:"new-line",class:"hotkey-label"},"Shift+Enter",-1))),q={id:"output-container"},V=m((()=>(0,a._)("label",{for:"generate",class:"hotkey-label"},"CTRL+Enter",-1))),x=m((()=>(0,a._)("label",{for:"generate-mini",class:"hotkey-label"},"CTRL+SHIFT+Enter",-1))),O={id:"output",rows:"10",class:"new-line-container",ref:"output"};function H(e,t,n,l,r,o){const u=(0,a.up)("SelectCard"),s=(0,a.up)("MainInput"),c=(0,a.up)("SimpleRebindInput");return(0,a.wg)(),(0,a.iD)("main",h,[(0,a._)("section",v,[(0,a._)("div",g,[(0,a._)("div",null,[f,y,(0,a._)("input",{type:"file",name:"data-source",id:"data-source",onInput:t[0]||(t[0]=(...e)=>o.setFile&&o.setFile(...e)),accept:".log, .txt, .html"},null,32)]),r.file?((0,a.wg)(),(0,a.iD)("div",_,[b,(0,a._)("div",w,[(0,a.Wm)(u,{onClick:t[1]||(t[1]=(0,i.iM)((e=>o.parseFile("position")),["stop"])),label:"Position",id:"position",description:"Reads output of 'getpos' command + includes any team chatbox message if it's in the line below it."})])])):(0,a.kq)("",!0)])]),(0,a._)("section",j,[(0,a.Wm)(s,{value:r.values.keybind,onOnInput:o.setValue,id:"keybind",label:"Keybind",placeholder:"x",description:"The key to press to activate toggle",required:!0},null,8,["value","onOnInput"]),(0,a.Wm)(s,{value:r.values.alias,onOnInput:o.setValue,id:"alias",label:"Alias",placeholder:"do-thing",description:"The name you want to use on the aliases, which get an auto-number appended at the end.",required:!0},null,8,["value","onOnInput"]),(0,a.Wm)(s,{value:r.values.injection,onOnInput:o.setValue,id:"injection",label:"Optional: Global injection",placeholder:'say_team "next position!"',description:'An identical string to add after each command, like say_team "next position!"'},null,8,["value","onOnInput"])]),(0,a._)("section",k,[S,(0,a._)("div",$,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(r.entries,(([e,t])=>((0,a.wg)(),(0,a.j4)(c,{key:e,id:t.id,onRemove:o.removeEntry,"cmd-placeholder":t.command.placeholder,"cmd-value":t.command.value,"onUpdate:cmdValue":e=>t.command.value=e,"inject-placeholder":t.inject.placeholder,"inject-value":t.inject.value,"onUpdate:injectValue":e=>t.inject.value=e,"comment-placeholder":t.comment.placeholder,"comment-value":t.comment.value,"onUpdate:commentValue":e=>t.comment.value=e},null,8,["id","onRemove","cmd-placeholder","cmd-value","onUpdate:cmdValue","inject-placeholder","inject-value","onUpdate:injectValue","comment-placeholder","comment-value","onUpdate:commentValue"])))),128))],512),(0,a._)("div",I,[(0,a._)("button",{id:"new-line",onClick:t[2]||(t[2]=(...e)=>o.newLine&&o.newLine(...e))},"+ Add Command"),C])]),(0,a._)("section",q,[(0,a._)("div",null,[(0,a._)("div",null,[(0,a._)("button",{id:"generate",onClick:t[3]||(t[3]=e=>o.generate(!1))},"Generate Paste"),V]),(0,a._)("div",null,[(0,a._)("button",{id:"generate-mini",onClick:t[4]||(t[4]=e=>o.generate(!0))},"Minify"),x])]),(0,a._)("textarea",O,null,512)])])}var D=n(7139);const E={class:"input-main"},T=["for"],W=["name","id","placeholder","required","value"];function F(e,t,n,i,l,r){return(0,a.wg)(),(0,a.iD)("div",E,[(0,a._)("label",{for:n.id},(0,D.zw)(n.label),9,T),(0,a._)("p",null,(0,D.zw)(n.description),1),(0,a._)("input",{type:"text",name:n.id,id:n.id,placeholder:n.placeholder,required:n.required,value:l.currentValue,onInput:t[0]||(t[0]=(...e)=>r.input&&r.input(...e))},null,40,W)])}var L={name:"MainInput",props:{label:{type:String,required:!0},description:{type:String,required:!0},placeholder:{type:String,required:!0},id:{type:String,required:!0},required:{type:Boolean,default:!1},value:{type:[String,void 0]}},data(){return{currentValue:this.value}},methods:{input(e){this.$emit("onInput",{key:this.id,value:e.target.value}),this.currentValue=e.target.value}}};const M=(0,c.Z)(L,[["render",F],["__scopeId","data-v-0feab27d"]]);var P=M;const R=["id"],A=["placeholder","value"],U=["placeholder","value"],z=["placeholder","value"];function K(e,t,n,i,l,r){return(0,a.wg)(),(0,a.iD)("div",{class:(0,D.C_)(["command-line",{delete:l.deleteHighlight}]),id:n.id},[(0,a._)("div",{class:(0,D.C_)({deleteHighlight:l.deleteHighlight})},[(0,a._)("input",{type:"text",class:"cmd-input focus",placeholder:n.cmdPlaceholder,value:n.cmdValue,onInput:t[0]||(t[0]=t=>e.$emit("update:cmd-value",t.target.value)),required:""},null,40,A)],2),(0,a._)("div",{class:(0,D.C_)({deleteHighlight:l.deleteHighlight})},[(0,a._)("input",{type:"text",class:"inject-input focus",placeholder:n.injectPlaceholder,value:n.injectValue,onInput:t[1]||(t[1]=t=>e.$emit("update:inject-value",t.target.value)),required:""},null,40,U)],2),(0,a._)("div",{class:(0,D.C_)({deleteHighlight:l.deleteHighlight})},[(0,a._)("input",{type:"text",class:"comment-input",placeholder:n.commentPlaceholder,value:n.commentValue,onInput:t[2]||(t[2]=t=>e.$emit("update:comment-value",t.target.value))},null,40,z)],2),(0,a._)("button",{class:"delete-command",onClick:t[3]||(t[3]=(...e)=>r.remove&&r.remove(...e)),onMouseenter:t[4]||(t[4]=e=>l.deleteHighlight=!0),onMouseleave:t[5]||(t[5]=e=>l.deleteHighlight=!1)},"Delete",32)],10,R)}var Z={name:"SimpleRebindInput",props:{id:{type:[String,Number],required:!0},cmdPlaceholder:{type:String,required:!0},commentPlaceholder:{type:String,required:!0},injectPlaceholder:{type:String,required:!0},cmdValue:{type:String},commentValue:{type:String},injectValue:{type:String}},data(){return{deleteHighlight:!1}},methods:{remove(){return this.$emit("remove",this.id)}}};const X=(0,c.Z)(Z,[["render",K],["__scopeId","data-v-45523de3"]]);var G=X;const N=["id"],B={key:0};function Y(e,t,n,i,l,r){return(0,a.wg)(),(0,a.iD)("div",{class:"option",id:n.id},[(0,a._)("h4",null,(0,D.zw)(n.label),1),n.description?((0,a.wg)(),(0,a.iD)("p",B,(0,D.zw)(n.description),1)):(0,a.kq)("",!0)],8,N)}var J={name:"SelectCard",props:{id:{type:String,required:!0},label:{type:String,required:!0},description:{type:String}}};const Q=(0,c.Z)(J,[["render",Y],["__scopeId","data-v-0da95138"]]);var ee=Q;function te(e,t=Array()){const n=e.split(/\n/g);for(let i=0;i<n.length;i++){if(!n[i]?.startsWith("setpos "))continue;const e={id:i,command:{value:ie(n[i].replace(/\n|\r/g,"")),placeholder:"setpos 1 1 1;setang 1 1 1;"},comment:{value:void 0,placeholder:"Something at X position"},inject:{value:void 0,placeholder:'say_team "Doing X";'}};(n[i+1]?.startsWith("(Terrorist) ")||n[i+1]?.startsWith("(Counter-Terrorist) "))&&(e.inject.value=`say_team "${ne(n[i+1])}";`,i++),t.push(e)}return t}function ne(e){return e.split(" ").slice(7).join(" ").replace(/\n|\r/g,"")}function ie(e){const t=e.split(" ").map((e=>e.trim())),n=Number(t[3].replace(";setang",""))-64;return t[3]=n.toString()+";setang",t.join(" ")}var le={name:"RebinderView",components:{SimpleRebindInput:G,MainInput:P,SelectCard:ee},data(){return{values:{keybind:void 0,alias:void 0,injection:void 0,parser:void 0},counter:0,entries:new Map,file:void 0}},mounted(){this.newLine(),window.addEventListener("keydown",this.keyHandler)},unmounted(){window.removeEventListener("keydown",this.keyHandler)},methods:{setValue(e){this.values[e.key]=e.value},newLine(){const e=this.counter++;this.entries.set(e,{id:e,command:{placeholder:"cl_crosshair_drawoutline 1;",value:void 0},comment:{placeholder:"Do X thing",value:void 0},inject:{placeholder:"say_team 'Did X';",value:void 0}}),this.$nextTick((()=>{const e=this.$refs.commands.children;e[e.length-1].querySelector(".focus").focus()}))},removeEntry(e){if(this.entries.delete(e),!this.entries.size)return this.newLine()},lineEmpty(e){return!e?.command?.value&&!e?.inject?.value&&!e?.comment?.value},generate(e=!1){if(this.lineEmpty(this.entries.get(0)))return;const t=[`bind ${this.values.keybind} "${this.values.alias}0";${e?"":"\n"}`];let n=this.counter=0;for(const[,i]of this.entries){let l=i.command.value,a=i.inject.value;const r=i.comment.value;let o="";!e&&r&&(n&&(o="\n"),o+="// "+r.trim()+"\n"),l.endsWith('"')&&(l=l.slice(0,-1)),a&&!a.endsWith(";")&&(a+=";");let u=this.values.injection;u&&!u.endsWith(";")&&(u+=";"),n===this.entries.size-1?o+=`Alias "${this.values.alias}${n}" "${l};${a||""}${u||""}bind ${this.values.keybind} "${this.values.alias}0";${e?"":"\n"}`:o+=`Alias "${this.values.alias}${n}" "${l};${a||""}${u||""}bind ${this.values.keybind} "${this.values.alias}${n+1}";`,t.push(o),n++}this.$refs.output.textContent=t.join(e?"":"\n")},keyHandler(e){if("Enter"===e.code)return e.ctrlKey&&e.shiftKey?this.generate(!0):e.shiftKey?this.newLine():e.ctrlKey?this.generate():void 0},setFile(e){this.file=e.target.files[0]},parseFile(e){const t=new FileReader;let n=Array();t.readAsText(this.file,"UTF-8"),t.onload=t=>{switch(e){case"position":n.push(...te(t.target.result));break;default:return}this.lineEmpty(this.entries.get(0))&&(this.entries=new Map,this.counter=0),n.map((e=>{e.id=this.counter++,this.entries.set(e.id,e)}))}}}};const ae=(0,c.Z)(le,[["render",H],["__scopeId","data-v-5c57f50b"]]);var re=ae,oe=[{path:"/",component:p},{path:"/rebind",component:re}];function ue(e,t,n,i,l,r){const o=(0,a.up)("router-view");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(o)])}var se={name:"App",components:{}};const ce=(0,c.Z)(se,[["render",ue]]);var de=ce;const pe=(0,l.p7)({history:(0,l.r5)(),routes:oe});(0,i.ri)(de).use(pe).mount("#app")}},t={};function n(i){var l=t[i];if(void 0!==l)return l.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,i,l,a){if(!i){var r=1/0;for(c=0;c<e.length;c++){i=e[c][0],l=e[c][1],a=e[c][2];for(var o=!0,u=0;u<i.length;u++)(!1&a||r>=a)&&Object.keys(n.O).every((function(e){return n.O[e](i[u])}))?i.splice(u--,1):(o=!1,a<r&&(r=a));if(o){e.splice(c--,1);var s=l();void 0!==s&&(t=s)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[i,l,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,i){var l,a,r=i[0],o=i[1],u=i[2],s=0;if(r.some((function(t){return 0!==e[t]}))){for(l in o)n.o(o,l)&&(n.m[l]=o[l]);if(u)var c=u(n)}for(t&&t(i);s<r.length;s++)a=r[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},i=self["webpackChunkcsgo_tool"]=self["webpackChunkcsgo_tool"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=n.O(void 0,[998],(function(){return n(9766)}));i=n.O(i)})();
//# sourceMappingURL=app.23390db5.js.map