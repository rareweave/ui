import{w as k,a as V,r as _,K as ee,z as I,C as te,b as o,e as s,u as e,f,h as T,L as m,i as j,v as Y,F as J,c as K,q as H,k as ae,M as A,j as oe,_ as se,o as a}from"./entry.c6a35996.js";import{_ as ne}from"./nuxt-link.1b566c4c.js";import{A as le,_ as re}from"./index.24406a23.js";const ie=""+new URL("image.b95a6928.svg",import.meta.url).href,ce={class:"h-full-navbared w-full flex flex-col items-center justify-center"},de={class:"m-2 rounded mt-6"},ue=["src"],me={key:1,autoplay:"",muted:"",controls:""},pe=["src","type"],ve={class:"text-3xl text-center font-mono"},fe={key:0,class:"text-md text-center font-mono p-2 max-w-[32rem]"},_e={key:1,class:"text-md text-center font-mono text-zinc-500"},he={class:"my-2 w-max min-w-[14rem]"},ye={class:"rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"},be={key:0,class:"text-sm rounded-xl p-2 ml-2 bg-zinc-700 flex-row flex items-center"},xe=["src"],we={class:"rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"},ge={key:0,class:"text-sm rounded-xl p-2 ml-2 bg-zinc-700 flex-row flex items-center"},ke=["src"],Se={class:"rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"},Te={key:0,class:"p-2 bg-green-600 text-sm"},ze={key:1,class:"p-2 bg-red-600 text-sm"},Fe={class:"rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"},Ne={key:0,class:"p-1 pr-2 bg-zinc-700 text-sm"},Ce={key:1,class:"p-2 bg-zinc-700 text-sm"},Ie={class:"rounded-none w-full bg-zinc-900 border-b-2 border-black text-white p-2 flex flex-row items-center justify-between"},Ae={class:"p-2 bg-zinc-700 text-sm"},Oe=["disabled"],Re=s("input",{type:"checkbox",id:"buy-modal",class:"modal-toggle",checked:!1},null,-1),Be={class:"modal"},We={key:0,class:"modal-box relative flex flex-col"},Ve={key:0,for:"buy-modal",class:"btn btn-sm absolute right-2 top-2"},je={class:"font-bold text-lg text-center"},Je={class:"steps steps-vertical mt-4 ml-4"},Pe={class:"step step-primary"},De={key:1,class:"text-lg"},Ee={key:2,class:"text-lg"},Me=["disabled"],Ue={key:1,class:"text-lg"},qe={key:2,class:"btn btn-error btn-outline rounded-lg btn-sm"},Le={class:"modal-action"},Ye={key:0,for:"buy-modal",class:"btn"},Ke={key:1,class:"modal-box relative flex flex-col items-center"},He=s("label",{for:"buy-modal",class:"btn btn-sm absolute right-2 top-2"},"✕",-1),$e={class:"font-bold text-lg text-center"},Ge=s("img",{src:ie,class:"w-2/3 m-2"},null,-1),Qe={class:"text-md text-center"},Xe=s("div",{class:"modal-action"},[s("label",{for:"buy-modal",class:"btn"},"Close")],-1),lt={__name:"nft",async setup(Ze){let n,u;const{Warp:et,Contract:tt,WarpFactory:$}=([n,u]=k(()=>se(()=>import("./index.9452e3f6.js").then(c=>c.i),["./index.9452e3f6.js","./index.24406a23.js","./inherits_browser.13d20712.js"],import.meta.url)),n=await n,u(),n);let l=V("account",()=>null),G=V("accountTools",()=>new re({cacheIsActivated:!0,cacheSize:100,cacheTime:60}));V("wallet",()=>null).value;const r=le.init({host:"arweave.net",port:443,protocol:"https",timeout:6e4,logging:!1});let O=_(([n,u]=k(()=>$fetch("https://arweave.net/info")),n=await n,u(),n).height);const R=G.value,P=$.forMainnet({inMemory:!1},!1,r);let b=ee().hash.slice(1),z=l.value?P.contract(b).setEvaluationOptions({unsafeClient:"allow",waitForConfirmation:!1}).connect("use_wallet"):P.contract(b).setEvaluationOptions({unsafeClient:"allow",waitForConfirmation:!1}),p=_(([n,u]=k(()=>z.readState()),n=await n,u(),n).cachedValue.state),t=_(JSON.parse(JSON.stringify(p.value))),F=I(()=>{var c;return t.value.reservationTxId&&O.value-t.value.reservationBlockHeight<16&&t.value.reserver==((c=l.value)==null?void 0:c.addr)}),D=I(()=>{var c;return t.value.reservationTxId&&O.value-t.value.reservationBlockHeight<16&&t.value.reserver!=((c=l.value)==null?void 0:c.addr)}),E=_(!1),v=_(0),i=_(parseFloat(parseFloat(r.ar.winstonToAr(t.value.price)).toFixed(3))),M=_(parseFloat(t.value.royalty*100)),h=_(([n,u]=k(()=>R.get(t.value.owner)),n=await n,u(),n)),N=([n,u]=k(()=>R.get(t.value.minter)),n=await n,u(),n),B=I(()=>l.value&&l.value.addr&&l.value.addr==h.value.addr),W=I(()=>i.value!=parseFloat(parseFloat(r.ar.winstonToAr(p.value.price)).toFixed(3))||p.value.description!=t.value.description||p.value.forSale!=t.value.forSale),Q=setInterval(async()=>{O.value=(await $fetch("https://arweave.net/info")).height,W.value||(p.value=(await z.readState()).cachedValue.state,t.value=JSON.parse(JSON.stringify(p.value)),i.value=parseFloat(parseFloat(r.ar.winstonToAr(t.value.price)).toFixed(3)),h.value=await R.get(t.value.owner))},5e4);console.log(([n,u]=k(()=>z.readState()),n=await n,u(),n)),te(()=>clearInterval(Q));async function X(){await z.writeInteraction({function:"edit-nft",description:t.value.description,forSale:t.value.forSale,price:parseInt(r.ar.arToWinston(i.value))}),p.value=JSON.parse(JSON.stringify({...t.value,price:r.ar.arToWinston(i.value)})),console.log(i.value!=parseFloat(parseFloat(r.ar.winstonToAr(p.value.price)).toFixed(3)),p.value.description!=t.value.description,p.value.forSale!=t.value.forSale)}function U(c){return c.map(d=>({name:btoa(d.name),value:btoa(d.value)}))}async function q(){v.value=1,E.value=!0;let c=[{name:"Contract",value:b},{name:"Input",value:JSON.stringify({function:"reserve-buying-zone",price:parseInt(r.ar.arToWinston(i.value))})},{name:"App-Name",value:"SmartWeaveAction"},{name:"App-Version",value:"0.3.0"},{name:"Nonce",value:Date.now().toString()},{name:"SDK",value:"0.3.0"}];try{let d=await fetch("https://arweave.net/price/1000000").then(x=>x.text()),y=await r.createTransaction({tags:U(c),target:t.value.minter,quantity:(parseInt(r.ar.arToWinston(i.value))*t.value.royalty).toString(),reward:d});await r.transactions.sign(y),await r.transactions.post(y)}catch{q.value=!1}}async function Z(){v.value=2;let c=t.value.reservationTxId,d=[{name:"Contract",value:b},{name:"Input",value:JSON.stringify({function:"finalize-buy",price:parseInt(r.ar.arToWinston(i.value)),reservationTxId:c})},{name:"App-Name",value:"SmartWeaveAction"},{name:"App-Version",value:"0.3.0"},{name:"Nonce",value:Date.now().toString()},{name:"SDK",value:"0.3.0"}],y=(await fetch("https://arweave.net/graphql",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify({query:`query {
         transaction(id: "${c}") {
            id
            block {
            id
           }
         }
      }`})}).then(w=>w.json())).data.transaction.block.id,x=await fetch("https://arweave.net/price/1000000").then(w=>w.text()),S=await r.createTransaction({tags:U(d),target:t.value.owner,quantity:r.ar.arToWinston(i.value),reward:x,last_tx:y});await r.transactions.sign(S),await r.transactions.post(S);let C=setInterval(()=>{t.value.owner==l.value.addr&&(v.value=3,clearInterval(C))})}return(c,d)=>{var x,S,C,w,L;const y=ne;return a(),o("div",ce,[s("div",de,[(S=(x=e(t))==null?void 0:x.contentType)!=null&&S.startsWith("image")?(a(),o("img",{key:0,src:"https://arweave.net/"+e(b),class:"inline-flex max-h-[20rem] max-w-20rem"},null,8,ue)):(w=(C=e(t))==null?void 0:C.contentType)!=null&&w.startsWith("video")?(a(),o("video",me,[s("source",{src:"https://arweave.net/"+e(b),type:(L=e(t))==null?void 0:L.contentType},null,8,pe),f(" Your browser does not support the video tag. ")])):T("",!0)]),s("h1",ve,m(e(t).name),1),e(l)&&e(l).addr&&e(l).addr==e(h).addr?j((a(),o("textarea",{key:0,class:"text-md textarea font-mono m-2 max-w-[32rem] w-full overflow-auto transition-none textarea-bordered rounded-md","onUpdate:modelValue":d[0]||(d[0]=g=>e(t).description=g)},null,512)),[[Y,e(t).description]]):(a(),o(J,{key:1},[e(t).description?(a(),o("p",fe,m(e(t).description),1)):(a(),o("p",_e,"[This NFT has no description]"))],64)),s("div",he,[s("div",ye,[f(" Owner: "),e(l)&&e(l).addr&&e(l).addr==e(h).addr?(a(),o("div",be,"You")):(a(),K(y,{key:1,to:"/profile/#"+e(h).addr,class:"text-sm rounded-xl p-1 ml-2 bg-zinc-700 flex-row flex items-center"},{default:H(()=>[s("img",{src:e(h).profile.avatarURL,class:"w-8 rounded-xl mr-2"},null,8,xe),f(" "+m(e(h).handle),1)]),_:1},8,["to"]))]),s("div",we,[f(" Minter: "),e(l)&&e(l).addr&&e(l).addr==e(N).addr?(a(),o("div",ge,"You")):(a(),K(y,{key:1,to:"/profile/#"+e(N).addr,class:"text-sm rounded-xl p-1 ml-2 bg-zinc-700 flex-row flex items-center"},{default:H(()=>[s("img",{src:e(N).profile.avatarURL,class:"w-8 rounded-xl mr-2"},null,8,ke),f(" "+m(e(N).handle),1)]),_:1},8,["to"]))]),s("div",Se,[f(" For sale: "),e(B)?j((a(),o("input",{key:0,type:"checkbox",class:A(["toggle",e(t).forSale?"toggle-success":"toggle-error"]),"onUpdate:modelValue":d[1]||(d[1]=g=>e(t).forSale=g)},null,2)),[[ae,e(t).forSale]]):(a(),o(J,{key:1},[e(t).forSale?(a(),o("div",Te,"Yes")):(a(),o("div",ze,"No"))],64))]),e(t).forSale?(a(),o(J,{key:0},[s("div",Fe,[f(" Price: "),e(B)?(a(),o("div",Ne,[j(s("input",{"onUpdate:modelValue":d[2]||(d[2]=g=>oe(i)?i.value=g:i=g),type:"number",class:"input text-start appearance-[textfield] w-14 rounded-none px-1 input-sm bg-transparent",placeholder:"Price"},null,512),[[Y,e(i)]]),f(" AR ")])):(a(),o("div",Ce,m(e(i))+" AR",1))]),s("div",Ie,[f(" Royalty: "),s("div",Ae,m(e(M))+"%",1)])],64)):T("",!0),e(B)?(a(),o("button",{key:1,class:A(["btn","amazing-button2","rounded-md","w-full","my-2",,e(W)?"":"btn-disabled"]),disabled:!e(W),onClick:X},"Save changes",10,Oe)):e(l)&&e(l).addr&&e(t).forSale?(a(),o("label",{key:2,for:"buy-modal",class:A({btn:!0,"amazing-button":!0,"rounded-md":!0,"w-full":!0,"my-2":!0,"text-lg":!0,"btn-disabled":e(D)})},"Buy",2)):T("",!0)]),Re,s("div",Be,[e(v)!=3?(a(),o("div",We,[e(v)==0||e(v)==3?(a(),o("label",Ve,"✕")):T("",!0),s("h3",je,'Buy "'+m(e(t).name)+'"',1),s("ul",Je,[s("li",Pe,[!e(E)&&!e(F)?(a(),o("button",{key:0,onClick:q,class:"btn amazing-button2 rounded-lg btn-sm"},"Pay royalty ("+m(e(i)*(e(M)/100))+" AR)",1)):e(F)?(a(),o("span",De,"Paid royalty")):(a(),o("span",Ee,"Paying royalty... Don't close this tab"))]),s("li",{class:A({step:!0,"step-primary":e(F)})},[!e(D)&&e(v)!=2?(a(),o("button",{key:0,disabled:!e(F),class:"btn amazing-button rounded-lg btn-sm",onClick:Z},"Finalize buy ("+m(e(i))+" AR)",9,Me)):e(v)==2?(a(),o("span",Ue,"Finalizing buy... ")):(a(),o("button",qe,"Someone else did reserve this NFT before you"))],2)]),s("div",Le,[e(v)==0||e(v)==3?(a(),o("label",Ye,"Close")):T("",!0)])])):(a(),o("div",Ke,[He,s("h3",$e,'Successfully bought "'+m(e(t).name)+'"',1),Ge,s("span",Qe,"Now you own "+m(e(t).name)+"!",1),Xe]))])])}}};export{lt as default};
