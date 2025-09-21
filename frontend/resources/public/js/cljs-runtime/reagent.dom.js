goog.provide('reagent.dom');
var module$node_modules$react_dom$index=shadow.js.require("module$node_modules$react_dom$index", {});
if((typeof reagent !== 'undefined') && (typeof reagent.dom !== 'undefined') && (typeof reagent.dom.roots !== 'undefined')){
} else {
reagent.dom.roots = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(reagent.dom.roots,cljs.core.dissoc,container);

return module$node_modules$react_dom$index.unmountComponentAtNode(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__10874 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__10875 = true;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__10875);

try{return module$node_modules$react_dom$index.render((comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)),container,(function (){
var _STAR_always_update_STAR__orig_val__10880 = reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__10881 = false;
(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__10881);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reagent.dom.roots,cljs.core.assoc,container,comp);

reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__10880);
}}));
}finally {(reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__10874);
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp(comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var G__10910 = arguments.length;
switch (G__10910) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3(comp,container,reagent.impl.template._STAR_current_default_compiler_STAR_);
}));

(reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback_or_compiler){
reagent.ratom.flush_BANG_();

var vec__10926 = ((cljs.core.map_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compiler","compiler",-267926731).cljs$core$IFn$_invoke$arity$1(callback_or_compiler),new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null):((cljs.core.fn_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent.impl.template._STAR_current_default_compiler_STAR_,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,null], null)
));
var compiler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10926,(0),null);
var callback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10926,(1),null);
var f = (function (){
return reagent.impl.protocols.as_element(compiler,((cljs.core.fn_QMARK_(comp))?(comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)):comp));
});
return reagent.dom.render_comp(f,container,callback);
}));

(reagent.dom.render.cljs$lang$maxFixedArity = 3);

/**
 * Remove a component from the given DOM node.
 */
reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp(container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return module$node_modules$react_dom$index.findDOMNode(this$);
});
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_();

var seq__10947_11035 = cljs.core.seq(cljs.core.deref(reagent.dom.roots));
var chunk__10948_11036 = null;
var count__10949_11037 = (0);
var i__10950_11038 = (0);
while(true){
if((i__10950_11038 < count__10949_11037)){
var vec__10969_11041 = chunk__10948_11036.cljs$core$IIndexed$_nth$arity$2(null,i__10950_11038);
var container_11042 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10969_11041,(0),null);
var comp_11043 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10969_11041,(1),null);
reagent.dom.re_render_component(comp_11043,container_11042);


var G__11045 = seq__10947_11035;
var G__11046 = chunk__10948_11036;
var G__11047 = count__10949_11037;
var G__11048 = (i__10950_11038 + (1));
seq__10947_11035 = G__11045;
chunk__10948_11036 = G__11046;
count__10949_11037 = G__11047;
i__10950_11038 = G__11048;
continue;
} else {
var temp__5804__auto___11052 = cljs.core.seq(seq__10947_11035);
if(temp__5804__auto___11052){
var seq__10947_11054__$1 = temp__5804__auto___11052;
if(cljs.core.chunked_seq_QMARK_(seq__10947_11054__$1)){
var c__5525__auto___11055 = cljs.core.chunk_first(seq__10947_11054__$1);
var G__11057 = cljs.core.chunk_rest(seq__10947_11054__$1);
var G__11058 = c__5525__auto___11055;
var G__11059 = cljs.core.count(c__5525__auto___11055);
var G__11060 = (0);
seq__10947_11035 = G__11057;
chunk__10948_11036 = G__11058;
count__10949_11037 = G__11059;
i__10950_11038 = G__11060;
continue;
} else {
var vec__10977_11062 = cljs.core.first(seq__10947_11054__$1);
var container_11063 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10977_11062,(0),null);
var comp_11064 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10977_11062,(1),null);
reagent.dom.re_render_component(comp_11064,container_11063);


var G__11066 = cljs.core.next(seq__10947_11054__$1);
var G__11067 = null;
var G__11068 = (0);
var G__11069 = (0);
seq__10947_11035 = G__11066;
chunk__10948_11036 = G__11067;
count__10949_11037 = G__11068;
i__10950_11038 = G__11069;
continue;
}
} else {
}
}
break;
}

return reagent.impl.batching.flush_after_render();
});

//# sourceMappingURL=reagent.dom.js.map
