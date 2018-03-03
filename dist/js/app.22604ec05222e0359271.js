webpackJsonp([1],{"1/oy":function(t,e){},"9M+g":function(t,e){},DOFp:function(t,e){},Id91:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("7+uW"),a=n("5QVw"),i=n.n(a),l=n("u2KI"),c=n.n(l),u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-col",{staticClass:"p-1"},[n("b-button",{staticClass:"w-100",on:{click:function(e){t.$emit("click",e)}}},[n("h2",[t._t("default")],2)])],1)},staticRenderFns:[]},s=n("VU/8")({name:"CalculatorButton"},u,!1,null,null,null).exports,o={name:"CalculatorHistory",props:{items:{type:Array,required:!0}},computed:{history:function(){return this.items.join("\n")}}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("b-col",{staticClass:"pb-2"},[e("b-form-textarea",{staticClass:"text-right pr-3 bg-white small",attrs:{plaintext:"",value:this.history,"no-resize":!0,"max-rows":"3",rows:"3"}})],1)},staticRenderFns:[]},_=n("VU/8")(o,h,!1,null,null,null).exports,p={name:"CalculatorHistory",props:{input:{type:String,required:!0}}},f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("b-col",{staticClass:"pb-2"},[e("b-form-textarea",{staticClass:"text-right pr-3 bg-white h1",staticStyle:{"font-family":"monospace"},attrs:{plaintext:"",value:this.input,"no-resize":!0}})],1)},staticRenderFns:[]},v=n("VU/8")(p,f,!1,null,null,null).exports,T=c()({START_TYPING:i()("START_TYPING"),TYPING_INTEGER_PART:i()("TYPING_INTEGER_PART"),START_FRACTIONAL_PART:i()("START_FRACTIONAL_PART"),TYPING_FRACTIONAL_PART:i()("TYPING_FRACTIONAL_PART")}),d=c()({"-":function(t,e){return t-e},"+":function(t,e){return t+e},"*":function(t,e){return t*e},"/":function(t,e){if(0===e||isNaN(e))throw new Error("Division by zero");return t/e}}),A={name:"Calculator",components:{CalculatorButton:s,CalculatorHistory:_,CalculatorScreen:v},data:function(){return{history:[],operator:null,previousValue:null,currentValueString:"0",state:T.START_TYPING}},methods:{clearAll:function(){this.history=[],this.operator=null,this.previousValue=null,this.currentValueString="0",this.state=T.START_TYPING},negateInput:function(){switch(this.state){case T.START_TYPING:break;default:this.currentValueString="0"!==this.currentValueString?this.formatResult(-parseFloat(this.currentValueString)):this.currentValueString}},appendDigit:function(t){var e=this.currentValueString.length;switch(this.state){case T.START_TYPING:this.state=T.TYPING_INTEGER_PART,this.currentValueString=t,null==this.operator&&(this.previousValue=null);break;case T.START_FRACTIONAL_PART:e<14&&(this.currentValueString+="."+t,this.state=T.TYPING_FRACTIONAL_PART);break;case T.TYPING_INTEGER_PART:if("0"===this.currentValueString&&"0"===t)break;e<14&&(this.currentValueString+=t);break;case T.TYPING_FRACTIONAL_PART:e<14&&(this.currentValueString+=t)}},recordValueOrCalculate:function(t){null==this.previousValue?(this.previousValue=parseFloat(this.currentValueString),this.state=T.START_TYPING):this.calculate(),this.operator=t},calculate:function(){switch(this.state){case T.START_TYPING:break;default:if(null!=this.previousValue&&null!=this.operator){this.state=T.START_TYPING;var t=d[this.operator],e=parseFloat(this.currentValueString);try{var n=t(this.previousValue,e);this.history.unshift(this.formatResult(this.previousValue)+" "+this.operator+" "+this.currentValueString+" = "+this.formatResult(n)),this.currentValueString=this.formatResult(n),this.previousValue=n,this.operator=null}catch(t){this.currentValueString=t.message}}}},startFractionPart:function(){switch(this.state){case T.START_TYPING:this.currentValueString="0",this.state=T.START_FRACTIONAL_PART;break;case T.TYPING_INTEGER_PART:this.state=T.START_FRACTIONAL_PART}},formatResult:function(t){var e=t+"";if(e.length>14)for(var n=14;n>=0;n--){var r=t.toPrecision(n);if(r.length<=14)return r}return e}},computed:{historyScreen:function(){var t=null!=this.previousValue&&null!=this.operator?this.formatResult(this.previousValue)+this.operator:"";t+=null!=this.currentValueString&&this.state!==T.START_TYPING?this.currentValueString:"";var e=this.history.slice(0);return""!==t?e.unshift(t)&&e:e},valueScreen:function(){return this.currentValueString}}},R={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",[n("b-row",[n("b-col",{staticClass:"rounded p-3 mb-3 mt-3",staticStyle:{"background-color":"#ddd"},attrs:{cols:"10",offset:"1",sm:"8","offset-sm":"2",md:"6","offset-md":"3",lg:"4","offset-lg":"4"}},[n("b-row",[n("calculator-history",{attrs:{items:t.historyScreen}})],1),t._v(" "),n("b-row",[n("calculator-screen",{attrs:{input:t.valueScreen}})],1),t._v(" "),n("b-row",{staticClass:"no-gutters"},[n("calculator-button",{on:{click:t.clearAll}},[t._v("AC")]),t._v(" "),n("calculator-button",{on:{click:t.negateInput}},[t._v("+/-")]),t._v(" "),n("div",{staticClass:"col-6"}),t._v(" "),n("div",{staticClass:"w-100"}),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("7")}}},[t._v("7")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("8")}}},[t._v("8")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("9")}}},[t._v("9")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.recordValueOrCalculate("/")}}},[t._v("÷")]),t._v(" "),n("div",{staticClass:"w-100"}),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("4")}}},[t._v("4")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("5")}}},[t._v("5")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("6")}}},[t._v("6")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.recordValueOrCalculate("*")}}},[t._v("×")]),t._v(" "),n("div",{staticClass:"w-100"}),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("1")}}},[t._v("1")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("2")}}},[t._v("2")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("3")}}},[t._v("3")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.recordValueOrCalculate("-")}}},[t._v("–")]),t._v(" "),n("div",{staticClass:"w-100"}),t._v(" "),n("calculator-button",{on:{click:function(e){t.appendDigit("0")}}},[t._v("0")]),t._v(" "),n("calculator-button",{on:{click:t.startFractionPart}},[t._v(".")]),t._v(" "),n("calculator-button",{on:{click:t.calculate}},[t._v("=")]),t._v(" "),n("calculator-button",{on:{click:function(e){t.recordValueOrCalculate("+")}}},[t._v("+")])],1)],1)],1)],1)},staticRenderFns:[]};var b={name:"App",components:{Calculator:n("VU/8")(A,R,!1,function(t){n("DOFp")},"data-v-7f7fb1ce",null).exports}},g={render:function(){var t=this.$createElement,e=this._self._c||t;return e("b-container",{staticClass:"bg-info h-100",attrs:{fluid:""}},[e("h1",{staticClass:"text-center text-light display-4 pt-2"},[this._v("Simple Calculator")]),this._v(" "),e("Calculator")],1)},staticRenderFns:[]};var S=n("VU/8")(b,g,!1,function(t){n("tPGT")},null,null).exports,V=n("e6fC");n("qb6w"),n("9M+g"),n("e0XP");r.a.use(V.a),r.a.config.productionTip=!1,new r.a({el:"#app",components:{App:S},template:"<App/>"})},e0XP:function(t,e){},qb6w:function(t,e){},tPGT:function(t,e){},zj2Q:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.22604ec05222e0359271.js.map