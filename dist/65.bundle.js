(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{"+38j":function(e,t,s){(e.exports=s("JPst")(!1)).push([e.i,"",""])},fpPZ:function(e,t,s){"use strict";var n=s("iBna");s.n(n).a},iBna:function(e,t,s){var n=s("+38j");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,s("SZ7m").default)("d179451c",n,!0,{})},rU3z:function(e,t,s){"use strict";s.r(t);var n=s("L2JU"),i=s("F+MN"),a=s("MPB0"),c=s("78si"),o=s.n(c),l=s("IMve"),r=s.n(l),u=s("B9Ha"),d=s.n(u),h=s("8s8y"),k=s("5lq1"),w=s.n(k),f=s("IfgB"),p=s("Gbp+"),g={components:{EditNetwork:h.a},data:()=>({expandedUnique:null,expanded:null,knownNetworks:[],test:!1,blockchains:i.BlockchainsArray.map(e=>e.value),selectedBlockchain:null,unreachable:{}}),computed:{...Object(n.c)(["networks","accounts"]),visibleNetworks(){return this.networksFor(this.selectedBlockchain).sort((e,t)=>{const s=r.a.plugin(this.selectedBlockchain).getEndorsedNetwork(),n=s.unique()===t.unique()?1:s.unique()===e.unique()?-1:0;let i=e.name<t.name?-1:e.name>t.name?1:0;return n||i})}},created(){this.init()},methods:{async init(){this.isMobile||(this.selectedBlockchain=this.blockchains[0]),this.setWorkingScreen(!0),this.knownNetworks=await Promise.race([new Promise(e=>setTimeout(()=>e([]),2e3)),Object(a.GET)("networks?flat=true").then(e=>e.map(e=>o.a.fromJson(e))).catch(()=>[])]),this.setWorkingScreen(!1),this.networks.map(async e=>{await this.checkReachable(e)})},cantReach(e){return this.unreachable[e.unique()]},isCustom(e){return!this.networksFor(e.blockchain,!1).find(t=>t.unique()===e.unique())},selectBlockchain(e){this.selectedBlockchain=e,this.expanded=null},isEnabled(e){return!!this.networks.find(t=>t.unique()===e.unique())},async toggleNetwork(e){this.setWorkingScreen(!0),this.isEnabled(e)?await d.a.removeNetwork(e):(await d.a.addNetwork(e),await w.a.importAllAccountsForNetwork(e)),this.setWorkingScreen(!1)},toggleExpansion(e){if(this.expanded&&this.expanded.unique()===e.unique())return this.expandedUnique=null,this.expanded=null;this.expandedUnique=e.unique(),this.expanded=e.clone()},networkJson(e){const t=e.clone();return delete t.id,delete t.createdAt,t.fromOrigin||delete t.fromOrigin,t.token?(delete t.token.id,delete t.token.amount,delete t.token.unusable,delete t.token.fromOrigin,delete t.token.createdAt):delete t.token,t},networksFor(e,t=!0){const s=(()=>{const t=r.a.plugin(e).getEndorsedNetwork();return this.networks.find(e=>e.unique()===t.unique())?[]:[t]})(),n=t?this.networks.filter(t=>t.blockchain===e):[],i=this.knownNetworks.filter(t=>t.blockchain===e);return s.concat(n).concat(i).reduce((e,t)=>(e.find(e=>e.unique()===t.unique())||e.push(t),e),[])},async saveNetwork(){await d.a.updateNetwork(this.expanded),this.expanded=null,this.expandedUnique=null},addCustomNetwork(){f.a.push(p.a.addCustomNetwork(this.selectedBlockchain,async e=>{e&&this.checkReachable(e)}))},async checkReachable(e){await r.a.plugin(e.blockchain).checkNetwork(e)||(this.unreachable[e.unique()]=!0,this.$forceUpdate())}}},b=(s("fpPZ"),s("KHd+")),_=Object(b.a)(g,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"blockchain-list-container"},[e.isMobile&&e.selectedBlockchain?e._e():s("section",{staticClass:"blockchains",class:{"full-width":e.isMobile}},[s("section",{staticClass:"head"},[e._v("\n\t\t\t"+e._s(e.$t("generic.selectBlockchain"))+"\n\t\t")]),e._v(" "),s("section",{staticClass:"scroller"},[s("section",{staticClass:"blockchain-list"},e._l(e.blockchains,(function(t){return s("section",{staticClass:"badge-item hoverable",class:{active:e.selectedBlockchain===t},on:{click:function(s){return e.selectBlockchain(t)}}},[s("figure",{staticClass:"badge iconed",class:"token-"+t+"-"+t}),e._v(" "),s("section",{staticClass:"details"},[s("figure",{staticClass:"title"},[e._v(e._s(e.blockchainName(t)))]),e._v(" "),s("figure",{staticClass:"row"},[s("figure",{staticClass:"secondary"},[e._v(e._s(e.networksFor(t).length)+" "+e._s(e.$tc("generic.networks",e.networksFor(t).length)))])])]),e._v(" "),s("i",{staticClass:"fal fa-chevron-right"})])})),0)])]),e._v(" "),!e.isMobile||e.selectedBlockchain?s("section",{staticClass:"list-container"},[s("section",{staticClass:"head"},[e.isMobile?s("figure",{staticClass:"back-button",on:{click:function(t){return e.selectBlockchain(null)}}},[s("i",{staticClass:"fal fa-arrow-left"})]):e._e(),e._v("\n\t\t\t"+e._s(e.$tc("generic.networks",2))+"\n\t\t")]),e._v(" "),s("section",{staticClass:"scroller with-tail"},[s("section",{staticClass:"item-list"},e._l(e.visibleNetworks,(function(t){return s("section",{staticClass:"item"},[s("section",{staticClass:"basics",class:{open:e.expanded&&e.expanded.unique()===t.unique()}},[s("figure",{staticClass:"chevron",on:{click:function(s){return e.toggleExpansion(t)}}},[s("i",{staticClass:"fas fa-caret-circle-up"})]),e._v(" "),s("section",{staticClass:"details",on:{click:function(s){return e.toggleExpansion(t)}}},[s("figure",{staticClass:"name"},[e._v(e._s(t.name))]),e._v(" "),s("figure",{staticClass:"text"},[e._v(e._s(t.host))]),e._v(" "),e.cantReach(t)?s("figure",{staticClass:"connection-error"},[s("i",{staticClass:"icon-attention"}),e._v(" "+e._s(e.$t("networks.connectionError"))+"\n\t\t\t\t\t\t\t")]):e._e()]),e._v(" "),s("section",{staticClass:"actions"},[s("figure",{staticClass:"system-token"},[e._v(e._s(t.systemToken().symbol))]),e._v(" "),e.isCustom(t)?e._e():s("Switcher",{staticClass:"switch",attrs:{state:e.isEnabled(t)},on:{switched:function(s){return e.toggleNetwork(t)}}}),e._v(" "),e.isCustom(t)?s("Button",{attrs:{blue:"1",text:e.$t("generic.remove")},nativeOn:{click:function(s){return e.toggleNetwork(t)}}}):e._e()],1)]),e._v(" "),e.expandedUnique===t.unique()?s("section",{staticClass:"expanded"},[e.isEnabled(t)?s("EditNetwork",{attrs:{original:e.expanded},on:{updated:function(t){return e.expanded=t},save:e.saveNetwork}}):s("pre",[e._v(e._s(e.networkJson(t)))])],1):e._e()])})),0)]),e._v(" "),s("section",{staticClass:"tail"},[s("Button",{attrs:{text:"Add custom network",blue:"1"},nativeOn:{click:function(t){return e.addCustomNetwork(t)}}})],1)]):e._e()])}),[],!1,null,"7fbd8541",null);t.default=_.exports}}]);