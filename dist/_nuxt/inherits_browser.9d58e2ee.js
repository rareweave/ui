import{c as w}from"./index.084eb277.js";var T={},m={},k={};(function(n){Object.defineProperty(n,"__esModule",{value:!0}),n.log=n.Log=n.LOGS=void 0;var t;(function(s){s[s.NO=0]="NO",s[s.YES=1]="YES",s[s.ARWEAVE=2]="ARWEAVE"})(t=n.LOGS||(n.LOGS={}));class e{constructor(){this.logs=t.ARWEAVE}init(i=t.ARWEAVE,r){return this.logs=i,this.arweave=r,this}show(i,r="log"){(this.logs===t.YES||this.logs===t.ARWEAVE&&this.arweave.getConfig().api.logging)&&console[r](i)}}n.Log=e,n.log=new e})(k);Object.defineProperty(m,"__esModule",{value:!0});const p=k;class S{constructor(t){this._id=t.id,this._timestamp=t.timestamp,this._height=t.height,this._previous=t.previous}get id(){return this._id||p.log.show("ID wasn't defined, make sure you have selected to return it."),this._id}get timestamp(){return this._timestamp||p.log.show("Timestamp wasn't defined, make sure you have selected to return it."),this._timestamp}get height(){return this._height||p.log.show("Height wasn't defined, make sure you have selected to return it."),this._height}get previous(){return this._previous||p.log.show("Previous wasn't defined, make sure you have selected to return it."),this._previous}}m.default=S;var _={};Object.defineProperty(_,"__esModule",{value:!0});const o=k;class E{constructor(t,e){this._id=t.id,this._anchor=t.anchor,this._signature=t.signature,this._recipient=t.recipient,this._owner=t.owner,this._fee=t.fee,this._quantity=t.quantity,this._data=t.data,this._tags=t.tags,this._block=t.block,t.parent&&t.parent.id&&(this._parent=t.parent),this.arweave=e}get id(){return this._id||o.log.show("ID wasn't defined, make sure you have selected to return it."),this._id}get anchor(){return this._anchor||o.log.show("Anchor wasn't defined, make sure you have selected to return it."),this._anchor}get signature(){return this._signature||o.log.show("Signature wasn't defined, make sure you have selected to return it."),this._signature}get recipient(){return this._recipient||o.log.show("Recipient wasn't defined, make sure you have selected to return it."),this._recipient}get owner(){return this._owner||o.log.show("Owner wasn't defined, make sure you have selected to return it."),this._owner}get fee(){return this._fee||o.log.show("Fee wasn't defined, make sure you have selected to return it."),this._fee}get quantity(){return this._quantity||o.log.show("Quantity wasn't defined, make sure you have selected to return it."),this._quantity}get data(){return this._data||o.log.show("Data wasn't defined, make sure you have selected to return it."),this._data}get tags(){return this._tags||o.log.show("Tags wasn't defined, make sure you have selected to return it."),this._tags}get block(){return this._block||o.log.show("Block wasn't defined, make sure you have selected to return it."),this._block}get parent(){return(!this._parent||!this._parent.id)&&o.log.show("Parent wasn't defined, make sure you have selected to return it."),this._parent}}_.default=E;var d=w&&w.__awaiter||function(n,t,e,s){function i(r){return r instanceof e?r:new e(function(a){a(r)})}return new(e||(e=Promise))(function(r,a){function h(u){try{l(s.next(u))}catch(v){a(v)}}function f(u){try{l(s.throw(u))}catch(v){a(v)}}function l(u){u.done?r(u.value):i(u.value).then(h,f)}l((s=s.apply(n,t||[])).next())})},$=w&&w.__importDefault||function(n){return n&&n.__esModule?n:{default:n}};Object.defineProperty(T,"__esModule",{value:!0});const g=$(m),y=$(_),c=k;class A{constructor(t,e=c.LOGS.ARWEAVE){this.reqType="transactions",this.options={},this.after="",this.afterRegex=/after: *"([^"]*)"/gi,this.emptyLinesRegex=/^\s*[\r\n]/gm,this.fields=["id","anchor","signature","recipient","owner","owner.address","owner.key","fee","fee.winston","fee.ar","quantity","quantity.winston","quantity.ar","data","data.size","data.type","tags","tags.name","tags.value","block","block.id","block.timestamp","block.height","block.previous","parent","parent.id"],this.includes=new Set,this.arweave=t,c.log.init(e,t),this.includes=new Set(this.fields)}getCursor(){return this.after}search(t="transactions"){return this.reqType=t,this.options={},this.after="",this}id(t){return this.checkSearchType(),this.options.id=t,this.options.ids=[t],this}ids(t){return this.checkSearchType(),this.options.ids=t,this.options.id=t[0],this}appName(t){return this.checkSearchType(),this.tag("App-Name",[t]),this}type(t){return this.checkSearchType(),this.tag("Content-Type",[t]),this}tags(t){this.checkSearchType();const e=[];for(const i of t){const r=typeof i.values=="string"?[i.values]:i.values;e.push({name:i.name,values:r})}const s=this.options.tags&&this.options.tags.length?this.options.tags:[];return this.options.tags=[...e,...s],this}tag(t,e){return this.checkSearchType(),this.options.tags||(this.options.tags=[]),typeof e=="string"&&(e=[e]),this.options.tags.push({name:t,values:e}),this}from(t){return this.checkSearchType(),typeof t=="string"&&(t=[t]),this.options.owners=t,this}to(t){return this.checkSearchType(),typeof t=="string"&&(t=[t]),this.options.recipients=t,this}min(t){return this.checkSearchType(),this.options.block||(this.options.block={}),this.options.block.min=t,this}max(t){return this.checkSearchType(),this.options.block||(this.options.block={}),this.options.block.max=t,this}limit(t){return this.checkSearchType(),t<1?(console.warn("Limit cannot be less than 1, setting it to 1."),t=1):t>100&&console.warn("Arweave GQL won't return more than 100 entries at once."),this.options.first=t,this}sort(t){return this.options.sort=t,this}cursor(t){return this.checkSearchType(),this.options.after=t,this}only(t){if(this.includes=new Set,typeof t=="string"&&this.fields.indexOf(t)!==-1)return this.includes.add(t),this.validateIncludes(),this;const e=[];for(const s of t)this.fields.indexOf(s)!==-1&&e.push(s);return e.length&&(this.includes=new Set(e)),this.validateIncludes(),this}exclude(t){if(this.includes=new Set(this.fields),typeof t=="string")return this.includes.delete(t),this.validateIncludes(),this;for(const e of t)this.includes.delete(e);return this.validateIncludes(),this}find(t={}){return d(this,void 0,void 0,function*(){this.checkSearchType();for(const s of Object.keys(t))this.options[s]=t[s];this.options.first||(this.options.first=10);const e=this.construct();return this.run(e)})}findOne(t={}){return d(this,void 0,void 0,function*(){this.checkSearchType();for(const i of Object.keys(t))this.options[i]=t[i];this.options.first=1;const e=this.construct(),s=yield this.run(e);return s.length?s[0]:null})}findAll(t={}){return d(this,void 0,void 0,function*(){this.checkSearchType();for(const s of Object.keys(t))this.options[s]=t[s];this.options.first=100;const e=this.construct();return this.runAll(e)})}next(){return d(this,void 0,void 0,function*(){if(!this.after||!this.after.length){c.log.show("next(): Nothing more to search.");return}const t=this.construct().replace(this.afterRegex,`after: "${this.after}"`),e=yield this.run(t);return this.options.first===1?e.length?e[0]:null:e})}run(t){return d(this,void 0,void 0,function*(){c.log.show("Running query:"),c.log.show(t);const e=yield this.get(t);if(!e)return[];if(e.transaction)return[new y.default(e.transaction,this.arweave)];if(e.block)return[new g.default(e.block)];if(e.transactions){const s=e.transactions.edges;return s&&s.length?this.after=s[s.length-1].cursor:this.after="",s.map(i=>new y.default(i.node,this.arweave))}else if(e.blocks){const s=e.blocks.edges;return s&&s.length?this.after=s[s.length-1].cursor:this.after="",s.map(i=>new g.default(i.node))}})}runAll(t){return d(this,void 0,void 0,function*(){let e=!0,s=[],i=this.options.after||"",r=!0;for(;e;){c.log.show("Running query:"),c.log.show(t);const a=yield this.get(t);if(!a)return[];if(a.transaction)return[new y.default(a.transaction,this.arweave)];if(a.block)return[new g.default(a.block)];if(a.transactions){const h=a.transactions;h.edges&&h.edges.length&&(s=s.concat(h.edges),i=h.edges[h.edges.length-1].cursor,t=t.replace(this.afterRegex,`after: "${i}"`)),e=h.pageInfo.hasNextPage}else if(a.blocks){r=!1;const h=a.blocks;h.edges&&h.edges.length&&(s=s.concat(h.edges),i=h.edges[h.edges.length-1].cursor,t=t.replace(this.afterRegex,`after: "${i}"`)),e=h.pageInfo.hasNextPage}}return r?s.map(a=>new y.default(a.node,this.arweave)):s.map(a=>new g.default(a.node))})}checkSearchType(){if(!this.reqType||this.reqType!=="transaction"&&this.reqType!=="block"&&this.reqType!=="transactions"&&this.reqType!=="blocks")throw new Error('Invalid search type. Must provide one and it must be either "transaction", "transactions", "block" or "blocks"')}get(t){return d(this,void 0,void 0,function*(){const e=yield this.arweave.api.post("graphql",{query:t},{headers:{"content-type":"application/json"}});return c.log.show("Returned result: "),c.log.show(e.data.data),e.data.data})}construct(){this.reqType==="transactions"||this.reqType==="blocks"?(delete this.options.id,this.reqType==="transactions"?delete this.options.height:(delete this.options.owners,delete this.options.recipients,delete this.options.tags,delete this.options.block),this.options.after||(this.options.after="")):this.options={id:this.options.id};let t=JSON.stringify(this.options,null,2).replace(/"([^"]+)":/gm,"$1: ").replace('"HEIGHT_DESC"',"HEIGHT_DESC").replace('"HEIGHT_ASC"',"HEIGHT_ASC");t=t.substring(1,t.length-1);let e="";if(this.reqType==="transaction"||this.reqType==="transactions"){let s="";this.includes.has("owner")&&(s=`owner {
          ${this.includes.has("owner.address")?"address":""}
          ${this.includes.has("owner.key")?"key":""}
        }`);let i="";this.includes.has("fee")&&(i=`fee {
          ${this.includes.has("fee.winston")?"winston":""}
          ${this.includes.has("fee.ar")?"ar":""}
        }`);let r="";this.includes.has("quantity")&&(r=`quantity {
          ${this.includes.has("quantity.winston")?"winston":""}
          ${this.includes.has("quantity.ar")?"ar":""}
        }`);let a="";this.includes.has("data")&&(a=`data {
          ${this.includes.has("data.size")?"size":""}
          ${this.includes.has("data.type")?"type":""}
        }`);let h="";this.includes.has("tags")&&(h=`tags {
          ${this.includes.has("tags.name")?"name":""}
          ${this.includes.has("tags.value")?"value":""}
        }`);let f="";this.includes.has("block")&&(f=`block {
          ${this.includes.has("block.id")?"id":""}
          ${this.includes.has("block.timestamp")?"timestamp":""}
          ${this.includes.has("block.height")?"height":""}
          ${this.includes.has("block.previous")?"previous":""}
        }`);let l="";(this.includes.has("parent")||this.includes.has("parent.id"))&&(l=`parent {
          id
        }`),e=`
      ${this.includes.has("id")?"id":""}
      ${this.includes.has("anchor")?"anchor":""}
      ${this.includes.has("signature")?"signature":""}
      ${this.includes.has("recipient")?"recipient":""}
      ${s}
      ${i}
      ${r}
      ${a}
      ${h}
      ${f}
      ${l}
      `,e=e.replace(this.emptyLinesRegex,"").trim(),e.length||(e=`
        id
        anchor
        signature
        recipient
        owner {
          address
          key
        }
        fee {
          winston
          ar
        }
        quantity {
          winston
          ar
        }
        data {
          size
          type
        }
        tags {
          name
          value
        }
        block {
          id
          timestamp
          height
          previous
        }
        parent {
          id
        }`)}else e=`
      ${this.includes.has("block.id")?"id":""}
      ${this.includes.has("block.timestamp")?"timestamp":""}
      ${this.includes.has("block.height")?"height":""}
      ${this.includes.has("block.previous")?"previous":""}
      `,e=e.replace(this.emptyLinesRegex,"").trim(),e.length||(e=`
        id
        timestamp
        height
        previous`);if((this.reqType==="transactions"||this.reqType==="blocks")&&(e=`
      pageInfo {
        hasNextPage
      }
      edges { 
        cursor
        node { 
          ${e}
        } 
      }`),!this.reqType||!t)throw new Error("Invalid options. You need to first set your options!");return`query {
      ${this.reqType}(
        ${t}
      ){
        ${e}
      }
    }`.replace(/(\r\n|\n|\r)/gm,"")}validateIncludes(){this.includes.has("owner")&&!this.includes.has("owner.address")&&!this.includes.has("owner.key")&&(this.includes.add("owner.address"),this.includes.add("owner.key")),this.includes.has("fee")&&!this.includes.has("fee.winston")&&!this.includes.has("fee.ar")&&(this.includes.add("fee.winston"),this.includes.add("fee.ar")),this.includes.has("quantity")&&!this.includes.has("quantity.winston")&&!this.includes.has("quantity.ar")&&(this.includes.add("quantity.winston"),this.includes.add("quantity.ar")),this.includes.has("data")&&!this.includes.has("data.size")&&!this.includes.has("data.type")&&(this.includes.add("data.size"),this.includes.add("data.type")),this.includes.has("tags")&&!this.includes.has("tags.name")&&!this.includes.has("tags.value")&&(this.includes.add("tags.name"),this.includes.add("tags.value")),this.includes.has("block")&&!this.includes.has("block.timestamp")&&!this.includes.has("block.height")&&!this.includes.has("block.previous")&&(this.includes.add("block.id"),this.includes.add("block.timestamp"),this.includes.add("block.height"),this.includes.add("block.previous")),!this.includes.has("owner")&&(this.includes.has("owner.address")||this.includes.has("owner.key"))&&this.includes.add("owner"),!this.includes.has("fee")&&(this.includes.has("fee.winston")||this.includes.has("fee.ar"))&&this.includes.add("fee"),!this.includes.has("quantity")&&(this.includes.has("quantity.winston")||this.includes.has("quantity.ar"))&&this.includes.add("quantity"),!this.includes.has("data")&&(this.includes.has("data.size")||this.includes.has("data.type"))&&this.includes.add("data"),!this.includes.has("tags")&&(this.includes.has("tags.name")||this.includes.has("tags.value"))&&this.includes.add("tags"),!this.includes.has("block")&&(this.includes.has("block.timestamp")||this.includes.has("block.height")||this.includes.has("block.previous"))&&this.includes.add("block")}}var I=T.default=A,b={},q={get exports(){return b},set exports(n){b=n}};typeof Object.create=="function"?q.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:q.exports=function(t,e){if(e){t.super_=e;var s=function(){};s.prototype=e.prototype,t.prototype=new s,t.prototype.constructor=t}};export{I as _,b as i};
