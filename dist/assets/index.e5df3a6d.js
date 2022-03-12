var A=Object.defineProperty,O=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var N=(e,t,o)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,x=(e,t)=>{for(var o in t||(t={}))C.call(t,o)&&N(e,o,t[o]);if(v)for(var o of v(t))E.call(t,o)&&N(e,o,t[o]);return e},S=(e,t)=>O(e,k(t));import{j as w,a as m,r as a,R as L}from"./vendor.407e451b.js";const I=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}};I();const s=w.exports.jsx,u=w.exports.jsxs,M=({note:e,toggleImportance:t})=>{const o=e.important?"make not important":"make important";return u("li",{className:"note",children:[e.content,s("button",{onClick:t,children:o})]})},h="/api/notes",R=()=>{const e=m.get(h),t={id:1e4,content:"This note is not saved to server",date:"2019-05-30T17:30:31.098Z",important:!0};return e.then(o=>o.data.concat(t))},T=e=>m.post(h,e).then(o=>o.data),$=(e,t)=>m.put(`${h}/${e}`,t).then(c=>c.data);var b={getAll:R,create:T,update:$};const D=({message:e})=>e===null?null:s("div",{className:"error",children:e}),F=()=>u("div",{style:{color:"green",fontStyle:"italic",fontsize:"16"},children:[s("br",{}),s("em",{children:"Note app, Department of Computer Science, University of Helsinki 2022"})]});function P(){const[e,t]=a.exports.useState([]),[o,c]=a.exports.useState(""),[r,n]=a.exports.useState(!0),[l,g]=a.exports.useState("some error happened...");a.exports.useEffect(()=>{b.getAll().then(i=>{t(i)})},[]);const j=i=>{const f=e.find(d=>d.id===i),q=S(x({},f),{important:!f.important});b.update(q).then(d=>{t(e.map(p=>p.id!==i?p:d))}).catch(d=>{g(`Note: ${f.content} was already removed from server`),setTimeout(()=>{g(null)},5e3),t(e.filter(p=>p.id!==i))})},y=i=>{console.log(i.target.value),c(i.target.value)};return u("div",{children:[s("h1",{children:"Notes"}),s(D,{message:l}),s("div",{children:u("button",{onClick:()=>n(!r),children:["show ",r?"import":"all"]})}),s("ul",{children:e.map(i=>s(M,{note:i,toggleImportance:()=>j(i.id)},i.id))}),u("form",{onSubmit:y,children:[s("input",{value:o,onChange:y}),s("button",{type:"submit",children:"save"})]}),s(F,{})]})}L.render(s(P,{}),document.getElementById("root"));