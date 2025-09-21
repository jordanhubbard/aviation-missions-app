goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10360 = (function (f,blockable,meta10361){
this.f = f;
this.blockable = blockable;
this.meta10361 = meta10361;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async10360.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10362,meta10361__$1){
var self__ = this;
var _10362__$1 = this;
return (new cljs.core.async.t_cljs$core$async10360(self__.f,self__.blockable,meta10361__$1));
}));

(cljs.core.async.t_cljs$core$async10360.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10362){
var self__ = this;
var _10362__$1 = this;
return self__.meta10361;
}));

(cljs.core.async.t_cljs$core$async10360.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async10360.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async10360.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async10360.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async10360.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta10361","meta10361",-724690050,null)], null);
}));

(cljs.core.async.t_cljs$core$async10360.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async10360.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10360");

(cljs.core.async.t_cljs$core$async10360.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async10360");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async10360.
 */
cljs.core.async.__GT_t_cljs$core$async10360 = (function cljs$core$async$__GT_t_cljs$core$async10360(f,blockable,meta10361){
return (new cljs.core.async.t_cljs$core$async10360(f,blockable,meta10361));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__10353 = arguments.length;
switch (G__10353) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async10360(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__10379 = arguments.length;
switch (G__10379) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__10395 = arguments.length;
switch (G__10395) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__10419 = arguments.length;
switch (G__10419) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_12947 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_12947) : fn1.call(null,val_12947));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_12947) : fn1.call(null,val_12947));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__10428 = arguments.length;
switch (G__10428) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5593__auto___12956 = n;
var x_12957 = (0);
while(true){
if((x_12957 < n__5593__auto___12956)){
(a[x_12957] = x_12957);

var G__12959 = (x_12957 + (1));
x_12957 = G__12959;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10438 = (function (flag,meta10439){
this.flag = flag;
this.meta10439 = meta10439;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async10438.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10440,meta10439__$1){
var self__ = this;
var _10440__$1 = this;
return (new cljs.core.async.t_cljs$core$async10438(self__.flag,meta10439__$1));
}));

(cljs.core.async.t_cljs$core$async10438.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10440){
var self__ = this;
var _10440__$1 = this;
return self__.meta10439;
}));

(cljs.core.async.t_cljs$core$async10438.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async10438.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async10438.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async10438.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async10438.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta10439","meta10439",1747073468,null)], null);
}));

(cljs.core.async.t_cljs$core$async10438.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async10438.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10438");

(cljs.core.async.t_cljs$core$async10438.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async10438");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async10438.
 */
cljs.core.async.__GT_t_cljs$core$async10438 = (function cljs$core$async$__GT_t_cljs$core$async10438(flag,meta10439){
return (new cljs.core.async.t_cljs$core$async10438(flag,meta10439));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async10438(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10445 = (function (flag,cb,meta10446){
this.flag = flag;
this.cb = cb;
this.meta10446 = meta10446;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async10445.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10447,meta10446__$1){
var self__ = this;
var _10447__$1 = this;
return (new cljs.core.async.t_cljs$core$async10445(self__.flag,self__.cb,meta10446__$1));
}));

(cljs.core.async.t_cljs$core$async10445.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10447){
var self__ = this;
var _10447__$1 = this;
return self__.meta10446;
}));

(cljs.core.async.t_cljs$core$async10445.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async10445.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async10445.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async10445.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async10445.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta10446","meta10446",-557781071,null)], null);
}));

(cljs.core.async.t_cljs$core$async10445.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async10445.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10445");

(cljs.core.async.t_cljs$core$async10445.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async10445");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async10445.
 */
cljs.core.async.__GT_t_cljs$core$async10445 = (function cljs$core$async$__GT_t_cljs$core$async10445(flag,cb,meta10446){
return (new cljs.core.async.t_cljs$core$async10445(flag,cb,meta10446));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async10445(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10502_SHARP_){
var G__10533 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10502_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__10533) : fret.call(null,G__10533));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10508_SHARP_){
var G__10534 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10508_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__10534) : fret.call(null,G__10534));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5002__auto__ = wport;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return port;
}
})()], null));
} else {
var G__12964 = (i + (1));
i = G__12964;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5002__auto__ = ret;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5000__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5000__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___12966 = arguments.length;
var i__5727__auto___12967 = (0);
while(true){
if((i__5727__auto___12967 < len__5726__auto___12966)){
args__5732__auto__.push((arguments[i__5727__auto___12967]));

var G__12968 = (i__5727__auto___12967 + (1));
i__5727__auto___12967 = G__12968;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__10553){
var map__10554 = p__10553;
var map__10554__$1 = cljs.core.__destructure_map(map__10554);
var opts = map__10554__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq10542){
var G__10543 = cljs.core.first(seq10542);
var seq10542__$1 = cljs.core.next(seq10542);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__10543,seq10542__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__10572 = arguments.length;
switch (G__10572) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__10207__auto___12971 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_10630){
var state_val_10633 = (state_10630[(1)]);
if((state_val_10633 === (7))){
var inst_10618 = (state_10630[(2)]);
var state_10630__$1 = state_10630;
var statearr_10640_12972 = state_10630__$1;
(statearr_10640_12972[(2)] = inst_10618);

(statearr_10640_12972[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (1))){
var state_10630__$1 = state_10630;
var statearr_10641_12978 = state_10630__$1;
(statearr_10641_12978[(2)] = null);

(statearr_10641_12978[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (4))){
var inst_10598 = (state_10630[(7)]);
var inst_10598__$1 = (state_10630[(2)]);
var inst_10599 = (inst_10598__$1 == null);
var state_10630__$1 = (function (){var statearr_10643 = state_10630;
(statearr_10643[(7)] = inst_10598__$1);

return statearr_10643;
})();
if(cljs.core.truth_(inst_10599)){
var statearr_10644_12990 = state_10630__$1;
(statearr_10644_12990[(1)] = (5));

} else {
var statearr_10648_12992 = state_10630__$1;
(statearr_10648_12992[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (13))){
var state_10630__$1 = state_10630;
var statearr_10649_12997 = state_10630__$1;
(statearr_10649_12997[(2)] = null);

(statearr_10649_12997[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (6))){
var inst_10598 = (state_10630[(7)]);
var state_10630__$1 = state_10630;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_10630__$1,(11),to,inst_10598);
} else {
if((state_val_10633 === (3))){
var inst_10622 = (state_10630[(2)]);
var state_10630__$1 = state_10630;
return cljs.core.async.impl.ioc_helpers.return_chan(state_10630__$1,inst_10622);
} else {
if((state_val_10633 === (12))){
var state_10630__$1 = state_10630;
var statearr_10650_13009 = state_10630__$1;
(statearr_10650_13009[(2)] = null);

(statearr_10650_13009[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (2))){
var state_10630__$1 = state_10630;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_10630__$1,(4),from);
} else {
if((state_val_10633 === (11))){
var inst_10609 = (state_10630[(2)]);
var state_10630__$1 = state_10630;
if(cljs.core.truth_(inst_10609)){
var statearr_10651_13017 = state_10630__$1;
(statearr_10651_13017[(1)] = (12));

} else {
var statearr_10652_13018 = state_10630__$1;
(statearr_10652_13018[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (9))){
var state_10630__$1 = state_10630;
var statearr_10654_13022 = state_10630__$1;
(statearr_10654_13022[(2)] = null);

(statearr_10654_13022[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (5))){
var state_10630__$1 = state_10630;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10656_13027 = state_10630__$1;
(statearr_10656_13027[(1)] = (8));

} else {
var statearr_10657_13028 = state_10630__$1;
(statearr_10657_13028[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (14))){
var inst_10616 = (state_10630[(2)]);
var state_10630__$1 = state_10630;
var statearr_10658_13029 = state_10630__$1;
(statearr_10658_13029[(2)] = inst_10616);

(statearr_10658_13029[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (10))){
var inst_10606 = (state_10630[(2)]);
var state_10630__$1 = state_10630;
var statearr_10659_13030 = state_10630__$1;
(statearr_10659_13030[(2)] = inst_10606);

(statearr_10659_13030[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10633 === (8))){
var inst_10603 = cljs.core.async.close_BANG_(to);
var state_10630__$1 = state_10630;
var statearr_10661_13031 = state_10630__$1;
(statearr_10661_13031[(2)] = inst_10603);

(statearr_10661_13031[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_10662 = [null,null,null,null,null,null,null,null];
(statearr_10662[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_10662[(1)] = (1));

return statearr_10662;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_10630){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_10630);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e10663){var ex__9999__auto__ = e10663;
var statearr_10664_13032 = state_10630;
(statearr_10664_13032[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_10630[(4)]))){
var statearr_10665_13033 = state_10630;
(statearr_10665_13033[(1)] = cljs.core.first((state_10630[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13035 = state_10630;
state_10630 = G__13035;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_10630){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_10630);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_10666 = f__10208__auto__();
(statearr_10666[(6)] = c__10207__auto___12971);

return statearr_10666;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__10675){
var vec__10676 = p__10675;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10676,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10676,(1),null);
var job = vec__10676;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__10207__auto___13039 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_10683){
var state_val_10684 = (state_10683[(1)]);
if((state_val_10684 === (1))){
var state_10683__$1 = state_10683;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_10683__$1,(2),res,v);
} else {
if((state_val_10684 === (2))){
var inst_10680 = (state_10683[(2)]);
var inst_10681 = cljs.core.async.close_BANG_(res);
var state_10683__$1 = (function (){var statearr_10690 = state_10683;
(statearr_10690[(7)] = inst_10680);

return statearr_10690;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_10683__$1,inst_10681);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0 = (function (){
var statearr_10691 = [null,null,null,null,null,null,null,null];
(statearr_10691[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__);

(statearr_10691[(1)] = (1));

return statearr_10691;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1 = (function (state_10683){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_10683);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e10693){var ex__9999__auto__ = e10693;
var statearr_10694_13040 = state_10683;
(statearr_10694_13040[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_10683[(4)]))){
var statearr_10695_13041 = state_10683;
(statearr_10695_13041[(1)] = cljs.core.first((state_10683[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13042 = state_10683;
state_10683 = G__13042;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = function(state_10683){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1.call(this,state_10683);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_10699 = f__10208__auto__();
(statearr_10699[(6)] = c__10207__auto___13039);

return statearr_10699;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__10701){
var vec__10702 = p__10701;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10702,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__10702,(1),null);
var job = vec__10702;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5593__auto___13043 = n;
var __13046 = (0);
while(true){
if((__13046 < n__5593__auto___13043)){
var G__10708_13047 = type;
var G__10708_13048__$1 = (((G__10708_13047 instanceof cljs.core.Keyword))?G__10708_13047.fqn:null);
switch (G__10708_13048__$1) {
case "compute":
var c__10207__auto___13050 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__13046,c__10207__auto___13050,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async){
return (function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = ((function (__13046,c__10207__auto___13050,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async){
return (function (state_10721){
var state_val_10722 = (state_10721[(1)]);
if((state_val_10722 === (1))){
var state_10721__$1 = state_10721;
var statearr_10725_13051 = state_10721__$1;
(statearr_10725_13051[(2)] = null);

(statearr_10725_13051[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10722 === (2))){
var state_10721__$1 = state_10721;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_10721__$1,(4),jobs);
} else {
if((state_val_10722 === (3))){
var inst_10719 = (state_10721[(2)]);
var state_10721__$1 = state_10721;
return cljs.core.async.impl.ioc_helpers.return_chan(state_10721__$1,inst_10719);
} else {
if((state_val_10722 === (4))){
var inst_10711 = (state_10721[(2)]);
var inst_10712 = process__$1(inst_10711);
var state_10721__$1 = state_10721;
if(cljs.core.truth_(inst_10712)){
var statearr_10728_13053 = state_10721__$1;
(statearr_10728_13053[(1)] = (5));

} else {
var statearr_10731_13054 = state_10721__$1;
(statearr_10731_13054[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10722 === (5))){
var state_10721__$1 = state_10721;
var statearr_10732_13058 = state_10721__$1;
(statearr_10732_13058[(2)] = null);

(statearr_10732_13058[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10722 === (6))){
var state_10721__$1 = state_10721;
var statearr_10733_13059 = state_10721__$1;
(statearr_10733_13059[(2)] = null);

(statearr_10733_13059[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10722 === (7))){
var inst_10717 = (state_10721[(2)]);
var state_10721__$1 = state_10721;
var statearr_10734_13060 = state_10721__$1;
(statearr_10734_13060[(2)] = inst_10717);

(statearr_10734_13060[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__13046,c__10207__auto___13050,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async))
;
return ((function (__13046,switch__9995__auto__,c__10207__auto___13050,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0 = (function (){
var statearr_10737 = [null,null,null,null,null,null,null];
(statearr_10737[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__);

(statearr_10737[(1)] = (1));

return statearr_10737;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1 = (function (state_10721){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_10721);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e10738){var ex__9999__auto__ = e10738;
var statearr_10739_13063 = state_10721;
(statearr_10739_13063[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_10721[(4)]))){
var statearr_10740_13064 = state_10721;
(statearr_10740_13064[(1)] = cljs.core.first((state_10721[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13065 = state_10721;
state_10721 = G__13065;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = function(state_10721){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1.call(this,state_10721);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__;
})()
;})(__13046,switch__9995__auto__,c__10207__auto___13050,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async))
})();
var state__10209__auto__ = (function (){var statearr_10741 = f__10208__auto__();
(statearr_10741[(6)] = c__10207__auto___13050);

return statearr_10741;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
});})(__13046,c__10207__auto___13050,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async))
);


break;
case "async":
var c__10207__auto___13066 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__13046,c__10207__auto___13066,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async){
return (function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = ((function (__13046,c__10207__auto___13066,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async){
return (function (state_10754){
var state_val_10755 = (state_10754[(1)]);
if((state_val_10755 === (1))){
var state_10754__$1 = state_10754;
var statearr_10756_13069 = state_10754__$1;
(statearr_10756_13069[(2)] = null);

(statearr_10756_13069[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10755 === (2))){
var state_10754__$1 = state_10754;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_10754__$1,(4),jobs);
} else {
if((state_val_10755 === (3))){
var inst_10752 = (state_10754[(2)]);
var state_10754__$1 = state_10754;
return cljs.core.async.impl.ioc_helpers.return_chan(state_10754__$1,inst_10752);
} else {
if((state_val_10755 === (4))){
var inst_10744 = (state_10754[(2)]);
var inst_10745 = async(inst_10744);
var state_10754__$1 = state_10754;
if(cljs.core.truth_(inst_10745)){
var statearr_10757_13070 = state_10754__$1;
(statearr_10757_13070[(1)] = (5));

} else {
var statearr_10758_13071 = state_10754__$1;
(statearr_10758_13071[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10755 === (5))){
var state_10754__$1 = state_10754;
var statearr_10759_13072 = state_10754__$1;
(statearr_10759_13072[(2)] = null);

(statearr_10759_13072[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10755 === (6))){
var state_10754__$1 = state_10754;
var statearr_10760_13073 = state_10754__$1;
(statearr_10760_13073[(2)] = null);

(statearr_10760_13073[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10755 === (7))){
var inst_10750 = (state_10754[(2)]);
var state_10754__$1 = state_10754;
var statearr_10761_13076 = state_10754__$1;
(statearr_10761_13076[(2)] = inst_10750);

(statearr_10761_13076[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__13046,c__10207__auto___13066,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async))
;
return ((function (__13046,switch__9995__auto__,c__10207__auto___13066,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0 = (function (){
var statearr_10762 = [null,null,null,null,null,null,null];
(statearr_10762[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__);

(statearr_10762[(1)] = (1));

return statearr_10762;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1 = (function (state_10754){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_10754);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e10764){var ex__9999__auto__ = e10764;
var statearr_10765_13077 = state_10754;
(statearr_10765_13077[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_10754[(4)]))){
var statearr_10766_13078 = state_10754;
(statearr_10766_13078[(1)] = cljs.core.first((state_10754[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13079 = state_10754;
state_10754 = G__13079;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = function(state_10754){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1.call(this,state_10754);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__;
})()
;})(__13046,switch__9995__auto__,c__10207__auto___13066,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async))
})();
var state__10209__auto__ = (function (){var statearr_10768 = f__10208__auto__();
(statearr_10768[(6)] = c__10207__auto___13066);

return statearr_10768;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
});})(__13046,c__10207__auto___13066,G__10708_13047,G__10708_13048__$1,n__5593__auto___13043,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__10708_13048__$1)].join('')));

}

var G__13082 = (__13046 + (1));
__13046 = G__13082;
continue;
} else {
}
break;
}

var c__10207__auto___13083 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_10790){
var state_val_10791 = (state_10790[(1)]);
if((state_val_10791 === (7))){
var inst_10786 = (state_10790[(2)]);
var state_10790__$1 = state_10790;
var statearr_10792_13084 = state_10790__$1;
(statearr_10792_13084[(2)] = inst_10786);

(statearr_10792_13084[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10791 === (1))){
var state_10790__$1 = state_10790;
var statearr_10793_13085 = state_10790__$1;
(statearr_10793_13085[(2)] = null);

(statearr_10793_13085[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10791 === (4))){
var inst_10771 = (state_10790[(7)]);
var inst_10771__$1 = (state_10790[(2)]);
var inst_10772 = (inst_10771__$1 == null);
var state_10790__$1 = (function (){var statearr_10796 = state_10790;
(statearr_10796[(7)] = inst_10771__$1);

return statearr_10796;
})();
if(cljs.core.truth_(inst_10772)){
var statearr_10798_13086 = state_10790__$1;
(statearr_10798_13086[(1)] = (5));

} else {
var statearr_10799_13087 = state_10790__$1;
(statearr_10799_13087[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10791 === (6))){
var inst_10776 = (state_10790[(8)]);
var inst_10771 = (state_10790[(7)]);
var inst_10776__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_10777 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_10778 = [inst_10771,inst_10776__$1];
var inst_10779 = (new cljs.core.PersistentVector(null,2,(5),inst_10777,inst_10778,null));
var state_10790__$1 = (function (){var statearr_10801 = state_10790;
(statearr_10801[(8)] = inst_10776__$1);

return statearr_10801;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_10790__$1,(8),jobs,inst_10779);
} else {
if((state_val_10791 === (3))){
var inst_10788 = (state_10790[(2)]);
var state_10790__$1 = state_10790;
return cljs.core.async.impl.ioc_helpers.return_chan(state_10790__$1,inst_10788);
} else {
if((state_val_10791 === (2))){
var state_10790__$1 = state_10790;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_10790__$1,(4),from);
} else {
if((state_val_10791 === (9))){
var inst_10783 = (state_10790[(2)]);
var state_10790__$1 = (function (){var statearr_10804 = state_10790;
(statearr_10804[(9)] = inst_10783);

return statearr_10804;
})();
var statearr_10805_13088 = state_10790__$1;
(statearr_10805_13088[(2)] = null);

(statearr_10805_13088[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10791 === (5))){
var inst_10774 = cljs.core.async.close_BANG_(jobs);
var state_10790__$1 = state_10790;
var statearr_10807_13091 = state_10790__$1;
(statearr_10807_13091[(2)] = inst_10774);

(statearr_10807_13091[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10791 === (8))){
var inst_10776 = (state_10790[(8)]);
var inst_10781 = (state_10790[(2)]);
var state_10790__$1 = (function (){var statearr_10808 = state_10790;
(statearr_10808[(10)] = inst_10781);

return statearr_10808;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_10790__$1,(9),results,inst_10776);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0 = (function (){
var statearr_10811 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_10811[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__);

(statearr_10811[(1)] = (1));

return statearr_10811;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1 = (function (state_10790){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_10790);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e10812){var ex__9999__auto__ = e10812;
var statearr_10813_13095 = state_10790;
(statearr_10813_13095[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_10790[(4)]))){
var statearr_10815_13096 = state_10790;
(statearr_10815_13096[(1)] = cljs.core.first((state_10790[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13097 = state_10790;
state_10790 = G__13097;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = function(state_10790){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1.call(this,state_10790);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_10818 = f__10208__auto__();
(statearr_10818[(6)] = c__10207__auto___13083);

return statearr_10818;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


var c__10207__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_10856){
var state_val_10857 = (state_10856[(1)]);
if((state_val_10857 === (7))){
var inst_10852 = (state_10856[(2)]);
var state_10856__$1 = state_10856;
var statearr_10858_13099 = state_10856__$1;
(statearr_10858_13099[(2)] = inst_10852);

(statearr_10858_13099[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (20))){
var state_10856__$1 = state_10856;
var statearr_10859_13101 = state_10856__$1;
(statearr_10859_13101[(2)] = null);

(statearr_10859_13101[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (1))){
var state_10856__$1 = state_10856;
var statearr_10860_13102 = state_10856__$1;
(statearr_10860_13102[(2)] = null);

(statearr_10860_13102[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (4))){
var inst_10821 = (state_10856[(7)]);
var inst_10821__$1 = (state_10856[(2)]);
var inst_10822 = (inst_10821__$1 == null);
var state_10856__$1 = (function (){var statearr_10861 = state_10856;
(statearr_10861[(7)] = inst_10821__$1);

return statearr_10861;
})();
if(cljs.core.truth_(inst_10822)){
var statearr_10862_13103 = state_10856__$1;
(statearr_10862_13103[(1)] = (5));

} else {
var statearr_10863_13104 = state_10856__$1;
(statearr_10863_13104[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (15))){
var inst_10834 = (state_10856[(8)]);
var state_10856__$1 = state_10856;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_10856__$1,(18),to,inst_10834);
} else {
if((state_val_10857 === (21))){
var inst_10847 = (state_10856[(2)]);
var state_10856__$1 = state_10856;
var statearr_10864_13105 = state_10856__$1;
(statearr_10864_13105[(2)] = inst_10847);

(statearr_10864_13105[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (13))){
var inst_10849 = (state_10856[(2)]);
var state_10856__$1 = (function (){var statearr_10869 = state_10856;
(statearr_10869[(9)] = inst_10849);

return statearr_10869;
})();
var statearr_10870_13107 = state_10856__$1;
(statearr_10870_13107[(2)] = null);

(statearr_10870_13107[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (6))){
var inst_10821 = (state_10856[(7)]);
var state_10856__$1 = state_10856;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_10856__$1,(11),inst_10821);
} else {
if((state_val_10857 === (17))){
var inst_10842 = (state_10856[(2)]);
var state_10856__$1 = state_10856;
if(cljs.core.truth_(inst_10842)){
var statearr_10872_13109 = state_10856__$1;
(statearr_10872_13109[(1)] = (19));

} else {
var statearr_10876_13110 = state_10856__$1;
(statearr_10876_13110[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (3))){
var inst_10854 = (state_10856[(2)]);
var state_10856__$1 = state_10856;
return cljs.core.async.impl.ioc_helpers.return_chan(state_10856__$1,inst_10854);
} else {
if((state_val_10857 === (12))){
var inst_10831 = (state_10856[(10)]);
var state_10856__$1 = state_10856;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_10856__$1,(14),inst_10831);
} else {
if((state_val_10857 === (2))){
var state_10856__$1 = state_10856;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_10856__$1,(4),results);
} else {
if((state_val_10857 === (19))){
var state_10856__$1 = state_10856;
var statearr_10889_13111 = state_10856__$1;
(statearr_10889_13111[(2)] = null);

(statearr_10889_13111[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (11))){
var inst_10831 = (state_10856[(2)]);
var state_10856__$1 = (function (){var statearr_10891 = state_10856;
(statearr_10891[(10)] = inst_10831);

return statearr_10891;
})();
var statearr_10895_13112 = state_10856__$1;
(statearr_10895_13112[(2)] = null);

(statearr_10895_13112[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (9))){
var state_10856__$1 = state_10856;
var statearr_10900_13113 = state_10856__$1;
(statearr_10900_13113[(2)] = null);

(statearr_10900_13113[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (5))){
var state_10856__$1 = state_10856;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10911_13114 = state_10856__$1;
(statearr_10911_13114[(1)] = (8));

} else {
var statearr_10913_13115 = state_10856__$1;
(statearr_10913_13115[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (14))){
var inst_10834 = (state_10856[(8)]);
var inst_10836 = (state_10856[(11)]);
var inst_10834__$1 = (state_10856[(2)]);
var inst_10835 = (inst_10834__$1 == null);
var inst_10836__$1 = cljs.core.not(inst_10835);
var state_10856__$1 = (function (){var statearr_10921 = state_10856;
(statearr_10921[(8)] = inst_10834__$1);

(statearr_10921[(11)] = inst_10836__$1);

return statearr_10921;
})();
if(inst_10836__$1){
var statearr_10923_13116 = state_10856__$1;
(statearr_10923_13116[(1)] = (15));

} else {
var statearr_10924_13117 = state_10856__$1;
(statearr_10924_13117[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (16))){
var inst_10836 = (state_10856[(11)]);
var state_10856__$1 = state_10856;
var statearr_10930_13118 = state_10856__$1;
(statearr_10930_13118[(2)] = inst_10836);

(statearr_10930_13118[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (10))){
var inst_10828 = (state_10856[(2)]);
var state_10856__$1 = state_10856;
var statearr_10933_13120 = state_10856__$1;
(statearr_10933_13120[(2)] = inst_10828);

(statearr_10933_13120[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (18))){
var inst_10839 = (state_10856[(2)]);
var state_10856__$1 = state_10856;
var statearr_10938_13121 = state_10856__$1;
(statearr_10938_13121[(2)] = inst_10839);

(statearr_10938_13121[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10857 === (8))){
var inst_10825 = cljs.core.async.close_BANG_(to);
var state_10856__$1 = state_10856;
var statearr_10939_13122 = state_10856__$1;
(statearr_10939_13122[(2)] = inst_10825);

(statearr_10939_13122[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0 = (function (){
var statearr_10940 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10940[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__);

(statearr_10940[(1)] = (1));

return statearr_10940;
});
var cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1 = (function (state_10856){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_10856);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e10941){var ex__9999__auto__ = e10941;
var statearr_10942_13123 = state_10856;
(statearr_10942_13123[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_10856[(4)]))){
var statearr_10946_13124 = state_10856;
(statearr_10946_13124[(1)] = cljs.core.first((state_10856[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13126 = state_10856;
state_10856 = G__13126;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__ = function(state_10856){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1.call(this,state_10856);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__9996__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_10963 = f__10208__auto__();
(statearr_10963[(6)] = c__10207__auto__);

return statearr_10963;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));

return c__10207__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__10983 = arguments.length;
switch (G__10983) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__10992 = arguments.length;
switch (G__10992) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__11006 = arguments.length;
switch (G__11006) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__10207__auto___13142 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_11033){
var state_val_11034 = (state_11033[(1)]);
if((state_val_11034 === (7))){
var inst_11029 = (state_11033[(2)]);
var state_11033__$1 = state_11033;
var statearr_11040_13143 = state_11033__$1;
(statearr_11040_13143[(2)] = inst_11029);

(statearr_11040_13143[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (1))){
var state_11033__$1 = state_11033;
var statearr_11044_13144 = state_11033__$1;
(statearr_11044_13144[(2)] = null);

(statearr_11044_13144[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (4))){
var inst_11009 = (state_11033[(7)]);
var inst_11009__$1 = (state_11033[(2)]);
var inst_11010 = (inst_11009__$1 == null);
var state_11033__$1 = (function (){var statearr_11049 = state_11033;
(statearr_11049[(7)] = inst_11009__$1);

return statearr_11049;
})();
if(cljs.core.truth_(inst_11010)){
var statearr_11050_13146 = state_11033__$1;
(statearr_11050_13146[(1)] = (5));

} else {
var statearr_11051_13147 = state_11033__$1;
(statearr_11051_13147[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (13))){
var state_11033__$1 = state_11033;
var statearr_11053_13149 = state_11033__$1;
(statearr_11053_13149[(2)] = null);

(statearr_11053_13149[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (6))){
var inst_11009 = (state_11033[(7)]);
var inst_11016 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_11009) : p.call(null,inst_11009));
var state_11033__$1 = state_11033;
if(cljs.core.truth_(inst_11016)){
var statearr_11056_13153 = state_11033__$1;
(statearr_11056_13153[(1)] = (9));

} else {
var statearr_11061_13154 = state_11033__$1;
(statearr_11061_13154[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (3))){
var inst_11031 = (state_11033[(2)]);
var state_11033__$1 = state_11033;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11033__$1,inst_11031);
} else {
if((state_val_11034 === (12))){
var state_11033__$1 = state_11033;
var statearr_11065_13156 = state_11033__$1;
(statearr_11065_13156[(2)] = null);

(statearr_11065_13156[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (2))){
var state_11033__$1 = state_11033;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11033__$1,(4),ch);
} else {
if((state_val_11034 === (11))){
var inst_11009 = (state_11033[(7)]);
var inst_11020 = (state_11033[(2)]);
var state_11033__$1 = state_11033;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_11033__$1,(8),inst_11020,inst_11009);
} else {
if((state_val_11034 === (9))){
var state_11033__$1 = state_11033;
var statearr_11072_13157 = state_11033__$1;
(statearr_11072_13157[(2)] = tc);

(statearr_11072_13157[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (5))){
var inst_11012 = cljs.core.async.close_BANG_(tc);
var inst_11013 = cljs.core.async.close_BANG_(fc);
var state_11033__$1 = (function (){var statearr_11074 = state_11033;
(statearr_11074[(8)] = inst_11012);

return statearr_11074;
})();
var statearr_11075_13158 = state_11033__$1;
(statearr_11075_13158[(2)] = inst_11013);

(statearr_11075_13158[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (14))){
var inst_11027 = (state_11033[(2)]);
var state_11033__$1 = state_11033;
var statearr_11076_13160 = state_11033__$1;
(statearr_11076_13160[(2)] = inst_11027);

(statearr_11076_13160[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (10))){
var state_11033__$1 = state_11033;
var statearr_11077_13161 = state_11033__$1;
(statearr_11077_13161[(2)] = fc);

(statearr_11077_13161[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11034 === (8))){
var inst_11022 = (state_11033[(2)]);
var state_11033__$1 = state_11033;
if(cljs.core.truth_(inst_11022)){
var statearr_11078_13164 = state_11033__$1;
(statearr_11078_13164[(1)] = (12));

} else {
var statearr_11079_13166 = state_11033__$1;
(statearr_11079_13166[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_11081 = [null,null,null,null,null,null,null,null,null];
(statearr_11081[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_11081[(1)] = (1));

return statearr_11081;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_11033){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_11033);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e11082){var ex__9999__auto__ = e11082;
var statearr_11083_13170 = state_11033;
(statearr_11083_13170[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_11033[(4)]))){
var statearr_11084_13171 = state_11033;
(statearr_11084_13171[(1)] = cljs.core.first((state_11033[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13172 = state_11033;
state_11033 = G__13172;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_11033){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_11033);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_11089 = f__10208__auto__();
(statearr_11089[(6)] = c__10207__auto___13142);

return statearr_11089;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__10207__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_11113){
var state_val_11114 = (state_11113[(1)]);
if((state_val_11114 === (7))){
var inst_11109 = (state_11113[(2)]);
var state_11113__$1 = state_11113;
var statearr_11115_13174 = state_11113__$1;
(statearr_11115_13174[(2)] = inst_11109);

(statearr_11115_13174[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11114 === (1))){
var inst_11092 = init;
var inst_11093 = inst_11092;
var state_11113__$1 = (function (){var statearr_11116 = state_11113;
(statearr_11116[(7)] = inst_11093);

return statearr_11116;
})();
var statearr_11117_13177 = state_11113__$1;
(statearr_11117_13177[(2)] = null);

(statearr_11117_13177[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11114 === (4))){
var inst_11096 = (state_11113[(8)]);
var inst_11096__$1 = (state_11113[(2)]);
var inst_11097 = (inst_11096__$1 == null);
var state_11113__$1 = (function (){var statearr_11118 = state_11113;
(statearr_11118[(8)] = inst_11096__$1);

return statearr_11118;
})();
if(cljs.core.truth_(inst_11097)){
var statearr_11119_13180 = state_11113__$1;
(statearr_11119_13180[(1)] = (5));

} else {
var statearr_11120_13181 = state_11113__$1;
(statearr_11120_13181[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11114 === (6))){
var inst_11096 = (state_11113[(8)]);
var inst_11100 = (state_11113[(9)]);
var inst_11093 = (state_11113[(7)]);
var inst_11100__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_11093,inst_11096) : f.call(null,inst_11093,inst_11096));
var inst_11101 = cljs.core.reduced_QMARK_(inst_11100__$1);
var state_11113__$1 = (function (){var statearr_11123 = state_11113;
(statearr_11123[(9)] = inst_11100__$1);

return statearr_11123;
})();
if(inst_11101){
var statearr_11125_13183 = state_11113__$1;
(statearr_11125_13183[(1)] = (8));

} else {
var statearr_11126_13184 = state_11113__$1;
(statearr_11126_13184[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11114 === (3))){
var inst_11111 = (state_11113[(2)]);
var state_11113__$1 = state_11113;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11113__$1,inst_11111);
} else {
if((state_val_11114 === (2))){
var state_11113__$1 = state_11113;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11113__$1,(4),ch);
} else {
if((state_val_11114 === (9))){
var inst_11100 = (state_11113[(9)]);
var inst_11093 = inst_11100;
var state_11113__$1 = (function (){var statearr_11132 = state_11113;
(statearr_11132[(7)] = inst_11093);

return statearr_11132;
})();
var statearr_11133_13189 = state_11113__$1;
(statearr_11133_13189[(2)] = null);

(statearr_11133_13189[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11114 === (5))){
var inst_11093 = (state_11113[(7)]);
var state_11113__$1 = state_11113;
var statearr_11135_13190 = state_11113__$1;
(statearr_11135_13190[(2)] = inst_11093);

(statearr_11135_13190[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11114 === (10))){
var inst_11107 = (state_11113[(2)]);
var state_11113__$1 = state_11113;
var statearr_11137_13191 = state_11113__$1;
(statearr_11137_13191[(2)] = inst_11107);

(statearr_11137_13191[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11114 === (8))){
var inst_11100 = (state_11113[(9)]);
var inst_11103 = cljs.core.deref(inst_11100);
var state_11113__$1 = state_11113;
var statearr_11139_13192 = state_11113__$1;
(statearr_11139_13192[(2)] = inst_11103);

(statearr_11139_13192[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__9996__auto__ = null;
var cljs$core$async$reduce_$_state_machine__9996__auto____0 = (function (){
var statearr_11141 = [null,null,null,null,null,null,null,null,null,null];
(statearr_11141[(0)] = cljs$core$async$reduce_$_state_machine__9996__auto__);

(statearr_11141[(1)] = (1));

return statearr_11141;
});
var cljs$core$async$reduce_$_state_machine__9996__auto____1 = (function (state_11113){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_11113);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e11142){var ex__9999__auto__ = e11142;
var statearr_11143_13193 = state_11113;
(statearr_11143_13193[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_11113[(4)]))){
var statearr_11144_13194 = state_11113;
(statearr_11144_13194[(1)] = cljs.core.first((state_11113[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13195 = state_11113;
state_11113 = G__13195;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__9996__auto__ = function(state_11113){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__9996__auto____1.call(this,state_11113);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__9996__auto____0;
cljs$core$async$reduce_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__9996__auto____1;
return cljs$core$async$reduce_$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_11145 = f__10208__auto__();
(statearr_11145[(6)] = c__10207__auto__);

return statearr_11145;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));

return c__10207__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__10207__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_11159){
var state_val_11160 = (state_11159[(1)]);
if((state_val_11160 === (1))){
var inst_11153 = cljs.core.async.reduce(f__$1,init,ch);
var state_11159__$1 = state_11159;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11159__$1,(2),inst_11153);
} else {
if((state_val_11160 === (2))){
var inst_11155 = (state_11159[(2)]);
var inst_11157 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_11155) : f__$1.call(null,inst_11155));
var state_11159__$1 = state_11159;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11159__$1,inst_11157);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__9996__auto__ = null;
var cljs$core$async$transduce_$_state_machine__9996__auto____0 = (function (){
var statearr_11162 = [null,null,null,null,null,null,null];
(statearr_11162[(0)] = cljs$core$async$transduce_$_state_machine__9996__auto__);

(statearr_11162[(1)] = (1));

return statearr_11162;
});
var cljs$core$async$transduce_$_state_machine__9996__auto____1 = (function (state_11159){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_11159);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e11164){var ex__9999__auto__ = e11164;
var statearr_11165_13209 = state_11159;
(statearr_11165_13209[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_11159[(4)]))){
var statearr_11166_13210 = state_11159;
(statearr_11166_13210[(1)] = cljs.core.first((state_11159[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13213 = state_11159;
state_11159 = G__13213;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__9996__auto__ = function(state_11159){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__9996__auto____1.call(this,state_11159);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__9996__auto____0;
cljs$core$async$transduce_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__9996__auto____1;
return cljs$core$async$transduce_$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_11169 = f__10208__auto__();
(statearr_11169[(6)] = c__10207__auto__);

return statearr_11169;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));

return c__10207__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__11171 = arguments.length;
switch (G__11171) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__10207__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_11203){
var state_val_11204 = (state_11203[(1)]);
if((state_val_11204 === (7))){
var inst_11185 = (state_11203[(2)]);
var state_11203__$1 = state_11203;
var statearr_11206_13228 = state_11203__$1;
(statearr_11206_13228[(2)] = inst_11185);

(statearr_11206_13228[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (1))){
var inst_11179 = cljs.core.seq(coll);
var inst_11180 = inst_11179;
var state_11203__$1 = (function (){var statearr_11207 = state_11203;
(statearr_11207[(7)] = inst_11180);

return statearr_11207;
})();
var statearr_11208_13233 = state_11203__$1;
(statearr_11208_13233[(2)] = null);

(statearr_11208_13233[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (4))){
var inst_11180 = (state_11203[(7)]);
var inst_11183 = cljs.core.first(inst_11180);
var state_11203__$1 = state_11203;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_11203__$1,(7),ch,inst_11183);
} else {
if((state_val_11204 === (13))){
var inst_11197 = (state_11203[(2)]);
var state_11203__$1 = state_11203;
var statearr_11211_13234 = state_11203__$1;
(statearr_11211_13234[(2)] = inst_11197);

(statearr_11211_13234[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (6))){
var inst_11188 = (state_11203[(2)]);
var state_11203__$1 = state_11203;
if(cljs.core.truth_(inst_11188)){
var statearr_11214_13235 = state_11203__$1;
(statearr_11214_13235[(1)] = (8));

} else {
var statearr_11216_13236 = state_11203__$1;
(statearr_11216_13236[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (3))){
var inst_11201 = (state_11203[(2)]);
var state_11203__$1 = state_11203;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11203__$1,inst_11201);
} else {
if((state_val_11204 === (12))){
var state_11203__$1 = state_11203;
var statearr_11219_13237 = state_11203__$1;
(statearr_11219_13237[(2)] = null);

(statearr_11219_13237[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (2))){
var inst_11180 = (state_11203[(7)]);
var state_11203__$1 = state_11203;
if(cljs.core.truth_(inst_11180)){
var statearr_11220_13238 = state_11203__$1;
(statearr_11220_13238[(1)] = (4));

} else {
var statearr_11223_13239 = state_11203__$1;
(statearr_11223_13239[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (11))){
var inst_11194 = cljs.core.async.close_BANG_(ch);
var state_11203__$1 = state_11203;
var statearr_11224_13240 = state_11203__$1;
(statearr_11224_13240[(2)] = inst_11194);

(statearr_11224_13240[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (9))){
var state_11203__$1 = state_11203;
if(cljs.core.truth_(close_QMARK_)){
var statearr_11225_13244 = state_11203__$1;
(statearr_11225_13244[(1)] = (11));

} else {
var statearr_11226_13245 = state_11203__$1;
(statearr_11226_13245[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (5))){
var inst_11180 = (state_11203[(7)]);
var state_11203__$1 = state_11203;
var statearr_11227_13247 = state_11203__$1;
(statearr_11227_13247[(2)] = inst_11180);

(statearr_11227_13247[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (10))){
var inst_11199 = (state_11203[(2)]);
var state_11203__$1 = state_11203;
var statearr_11228_13248 = state_11203__$1;
(statearr_11228_13248[(2)] = inst_11199);

(statearr_11228_13248[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11204 === (8))){
var inst_11180 = (state_11203[(7)]);
var inst_11190 = cljs.core.next(inst_11180);
var inst_11180__$1 = inst_11190;
var state_11203__$1 = (function (){var statearr_11232 = state_11203;
(statearr_11232[(7)] = inst_11180__$1);

return statearr_11232;
})();
var statearr_11233_13249 = state_11203__$1;
(statearr_11233_13249[(2)] = null);

(statearr_11233_13249[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_11234 = [null,null,null,null,null,null,null,null];
(statearr_11234[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_11234[(1)] = (1));

return statearr_11234;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_11203){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_11203);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e11235){var ex__9999__auto__ = e11235;
var statearr_11236_13251 = state_11203;
(statearr_11236_13251[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_11203[(4)]))){
var statearr_11237_13252 = state_11203;
(statearr_11237_13252[(1)] = cljs.core.first((state_11203[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13253 = state_11203;
state_11203 = G__13253;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_11203){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_11203);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_11238 = f__10208__auto__();
(statearr_11238[(6)] = c__10207__auto__);

return statearr_11238;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));

return c__10207__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__11242 = arguments.length;
switch (G__11242) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_13258 = (function (_){
var x__5350__auto__ = (((_ == null))?null:_);
var m__5351__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5351__auto__.call(null,_));
} else {
var m__5349__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5349__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_13258(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_13263 = (function (m,ch,close_QMARK_){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5351__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5349__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5349__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_13263(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_13272 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null,m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_13272(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_13277 = (function (m){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5351__auto__.call(null,m));
} else {
var m__5349__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5349__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_13277(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11255 = (function (ch,cs,meta11256){
this.ch = ch;
this.cs = cs;
this.meta11256 = meta11256;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11257,meta11256__$1){
var self__ = this;
var _11257__$1 = this;
return (new cljs.core.async.t_cljs$core$async11255(self__.ch,self__.cs,meta11256__$1));
}));

(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11257){
var self__ = this;
var _11257__$1 = this;
return self__.meta11256;
}));

(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async11255.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async11255.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta11256","meta11256",-424742821,null)], null);
}));

(cljs.core.async.t_cljs$core$async11255.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async11255.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11255");

(cljs.core.async.t_cljs$core$async11255.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async11255");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async11255.
 */
cljs.core.async.__GT_t_cljs$core$async11255 = (function cljs$core$async$__GT_t_cljs$core$async11255(ch,cs,meta11256){
return (new cljs.core.async.t_cljs$core$async11255(ch,cs,meta11256));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async11255(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__10207__auto___13292 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_11402){
var state_val_11403 = (state_11402[(1)]);
if((state_val_11403 === (7))){
var inst_11397 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11408_13297 = state_11402__$1;
(statearr_11408_13297[(2)] = inst_11397);

(statearr_11408_13297[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (20))){
var inst_11301 = (state_11402[(7)]);
var inst_11313 = cljs.core.first(inst_11301);
var inst_11314 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_11313,(0),null);
var inst_11315 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_11313,(1),null);
var state_11402__$1 = (function (){var statearr_11412 = state_11402;
(statearr_11412[(8)] = inst_11314);

return statearr_11412;
})();
if(cljs.core.truth_(inst_11315)){
var statearr_11413_13298 = state_11402__$1;
(statearr_11413_13298[(1)] = (22));

} else {
var statearr_11415_13299 = state_11402__$1;
(statearr_11415_13299[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (27))){
var inst_11345 = (state_11402[(9)]);
var inst_11343 = (state_11402[(10)]);
var inst_11351 = (state_11402[(11)]);
var inst_11268 = (state_11402[(12)]);
var inst_11351__$1 = cljs.core._nth(inst_11343,inst_11345);
var inst_11352 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_11351__$1,inst_11268,done);
var state_11402__$1 = (function (){var statearr_11419 = state_11402;
(statearr_11419[(11)] = inst_11351__$1);

return statearr_11419;
})();
if(cljs.core.truth_(inst_11352)){
var statearr_11420_13303 = state_11402__$1;
(statearr_11420_13303[(1)] = (30));

} else {
var statearr_11421_13304 = state_11402__$1;
(statearr_11421_13304[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (1))){
var state_11402__$1 = state_11402;
var statearr_11422_13305 = state_11402__$1;
(statearr_11422_13305[(2)] = null);

(statearr_11422_13305[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (24))){
var inst_11301 = (state_11402[(7)]);
var inst_11320 = (state_11402[(2)]);
var inst_11321 = cljs.core.next(inst_11301);
var inst_11279 = inst_11321;
var inst_11280 = null;
var inst_11281 = (0);
var inst_11282 = (0);
var state_11402__$1 = (function (){var statearr_11423 = state_11402;
(statearr_11423[(13)] = inst_11280);

(statearr_11423[(14)] = inst_11281);

(statearr_11423[(15)] = inst_11320);

(statearr_11423[(16)] = inst_11279);

(statearr_11423[(17)] = inst_11282);

return statearr_11423;
})();
var statearr_11427_13310 = state_11402__$1;
(statearr_11427_13310[(2)] = null);

(statearr_11427_13310[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (39))){
var state_11402__$1 = state_11402;
var statearr_11436_13311 = state_11402__$1;
(statearr_11436_13311[(2)] = null);

(statearr_11436_13311[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (4))){
var inst_11268 = (state_11402[(12)]);
var inst_11268__$1 = (state_11402[(2)]);
var inst_11271 = (inst_11268__$1 == null);
var state_11402__$1 = (function (){var statearr_11439 = state_11402;
(statearr_11439[(12)] = inst_11268__$1);

return statearr_11439;
})();
if(cljs.core.truth_(inst_11271)){
var statearr_11442_13312 = state_11402__$1;
(statearr_11442_13312[(1)] = (5));

} else {
var statearr_11445_13313 = state_11402__$1;
(statearr_11445_13313[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (15))){
var inst_11280 = (state_11402[(13)]);
var inst_11281 = (state_11402[(14)]);
var inst_11279 = (state_11402[(16)]);
var inst_11282 = (state_11402[(17)]);
var inst_11297 = (state_11402[(2)]);
var inst_11298 = (inst_11282 + (1));
var tmp11428 = inst_11280;
var tmp11429 = inst_11281;
var tmp11430 = inst_11279;
var inst_11279__$1 = tmp11430;
var inst_11280__$1 = tmp11428;
var inst_11281__$1 = tmp11429;
var inst_11282__$1 = inst_11298;
var state_11402__$1 = (function (){var statearr_11446 = state_11402;
(statearr_11446[(13)] = inst_11280__$1);

(statearr_11446[(18)] = inst_11297);

(statearr_11446[(14)] = inst_11281__$1);

(statearr_11446[(16)] = inst_11279__$1);

(statearr_11446[(17)] = inst_11282__$1);

return statearr_11446;
})();
var statearr_11450_13314 = state_11402__$1;
(statearr_11450_13314[(2)] = null);

(statearr_11450_13314[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (21))){
var inst_11324 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11455_13315 = state_11402__$1;
(statearr_11455_13315[(2)] = inst_11324);

(statearr_11455_13315[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (31))){
var inst_11351 = (state_11402[(11)]);
var inst_11355 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_11351);
var state_11402__$1 = state_11402;
var statearr_11456_13320 = state_11402__$1;
(statearr_11456_13320[(2)] = inst_11355);

(statearr_11456_13320[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (32))){
var inst_11345 = (state_11402[(9)]);
var inst_11342 = (state_11402[(19)]);
var inst_11343 = (state_11402[(10)]);
var inst_11344 = (state_11402[(20)]);
var inst_11357 = (state_11402[(2)]);
var inst_11358 = (inst_11345 + (1));
var tmp11452 = inst_11342;
var tmp11453 = inst_11343;
var tmp11454 = inst_11344;
var inst_11342__$1 = tmp11452;
var inst_11343__$1 = tmp11453;
var inst_11344__$1 = tmp11454;
var inst_11345__$1 = inst_11358;
var state_11402__$1 = (function (){var statearr_11459 = state_11402;
(statearr_11459[(9)] = inst_11345__$1);

(statearr_11459[(19)] = inst_11342__$1);

(statearr_11459[(10)] = inst_11343__$1);

(statearr_11459[(20)] = inst_11344__$1);

(statearr_11459[(21)] = inst_11357);

return statearr_11459;
})();
var statearr_11460_13327 = state_11402__$1;
(statearr_11460_13327[(2)] = null);

(statearr_11460_13327[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (40))){
var inst_11370 = (state_11402[(22)]);
var inst_11374 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_11370);
var state_11402__$1 = state_11402;
var statearr_11471_13328 = state_11402__$1;
(statearr_11471_13328[(2)] = inst_11374);

(statearr_11471_13328[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (33))){
var inst_11361 = (state_11402[(23)]);
var inst_11363 = cljs.core.chunked_seq_QMARK_(inst_11361);
var state_11402__$1 = state_11402;
if(inst_11363){
var statearr_11475_13329 = state_11402__$1;
(statearr_11475_13329[(1)] = (36));

} else {
var statearr_11476_13330 = state_11402__$1;
(statearr_11476_13330[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (13))){
var inst_11291 = (state_11402[(24)]);
var inst_11294 = cljs.core.async.close_BANG_(inst_11291);
var state_11402__$1 = state_11402;
var statearr_11477_13331 = state_11402__$1;
(statearr_11477_13331[(2)] = inst_11294);

(statearr_11477_13331[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (22))){
var inst_11314 = (state_11402[(8)]);
var inst_11317 = cljs.core.async.close_BANG_(inst_11314);
var state_11402__$1 = state_11402;
var statearr_11480_13332 = state_11402__$1;
(statearr_11480_13332[(2)] = inst_11317);

(statearr_11480_13332[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (36))){
var inst_11361 = (state_11402[(23)]);
var inst_11365 = cljs.core.chunk_first(inst_11361);
var inst_11366 = cljs.core.chunk_rest(inst_11361);
var inst_11367 = cljs.core.count(inst_11365);
var inst_11342 = inst_11366;
var inst_11343 = inst_11365;
var inst_11344 = inst_11367;
var inst_11345 = (0);
var state_11402__$1 = (function (){var statearr_11489 = state_11402;
(statearr_11489[(9)] = inst_11345);

(statearr_11489[(19)] = inst_11342);

(statearr_11489[(10)] = inst_11343);

(statearr_11489[(20)] = inst_11344);

return statearr_11489;
})();
var statearr_11490_13333 = state_11402__$1;
(statearr_11490_13333[(2)] = null);

(statearr_11490_13333[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (41))){
var inst_11361 = (state_11402[(23)]);
var inst_11376 = (state_11402[(2)]);
var inst_11377 = cljs.core.next(inst_11361);
var inst_11342 = inst_11377;
var inst_11343 = null;
var inst_11344 = (0);
var inst_11345 = (0);
var state_11402__$1 = (function (){var statearr_11494 = state_11402;
(statearr_11494[(9)] = inst_11345);

(statearr_11494[(19)] = inst_11342);

(statearr_11494[(10)] = inst_11343);

(statearr_11494[(20)] = inst_11344);

(statearr_11494[(25)] = inst_11376);

return statearr_11494;
})();
var statearr_11498_13337 = state_11402__$1;
(statearr_11498_13337[(2)] = null);

(statearr_11498_13337[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (43))){
var state_11402__$1 = state_11402;
var statearr_11499_13338 = state_11402__$1;
(statearr_11499_13338[(2)] = null);

(statearr_11499_13338[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (29))){
var inst_11385 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11501_13339 = state_11402__$1;
(statearr_11501_13339[(2)] = inst_11385);

(statearr_11501_13339[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (44))){
var inst_11394 = (state_11402[(2)]);
var state_11402__$1 = (function (){var statearr_11505 = state_11402;
(statearr_11505[(26)] = inst_11394);

return statearr_11505;
})();
var statearr_11506_13343 = state_11402__$1;
(statearr_11506_13343[(2)] = null);

(statearr_11506_13343[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (6))){
var inst_11334 = (state_11402[(27)]);
var inst_11333 = cljs.core.deref(cs);
var inst_11334__$1 = cljs.core.keys(inst_11333);
var inst_11335 = cljs.core.count(inst_11334__$1);
var inst_11336 = cljs.core.reset_BANG_(dctr,inst_11335);
var inst_11341 = cljs.core.seq(inst_11334__$1);
var inst_11342 = inst_11341;
var inst_11343 = null;
var inst_11344 = (0);
var inst_11345 = (0);
var state_11402__$1 = (function (){var statearr_11509 = state_11402;
(statearr_11509[(9)] = inst_11345);

(statearr_11509[(19)] = inst_11342);

(statearr_11509[(10)] = inst_11343);

(statearr_11509[(20)] = inst_11344);

(statearr_11509[(28)] = inst_11336);

(statearr_11509[(27)] = inst_11334__$1);

return statearr_11509;
})();
var statearr_11511_13345 = state_11402__$1;
(statearr_11511_13345[(2)] = null);

(statearr_11511_13345[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (28))){
var inst_11342 = (state_11402[(19)]);
var inst_11361 = (state_11402[(23)]);
var inst_11361__$1 = cljs.core.seq(inst_11342);
var state_11402__$1 = (function (){var statearr_11514 = state_11402;
(statearr_11514[(23)] = inst_11361__$1);

return statearr_11514;
})();
if(inst_11361__$1){
var statearr_11516_13346 = state_11402__$1;
(statearr_11516_13346[(1)] = (33));

} else {
var statearr_11520_13347 = state_11402__$1;
(statearr_11520_13347[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (25))){
var inst_11345 = (state_11402[(9)]);
var inst_11344 = (state_11402[(20)]);
var inst_11348 = (inst_11345 < inst_11344);
var inst_11349 = inst_11348;
var state_11402__$1 = state_11402;
if(cljs.core.truth_(inst_11349)){
var statearr_11524_13348 = state_11402__$1;
(statearr_11524_13348[(1)] = (27));

} else {
var statearr_11528_13349 = state_11402__$1;
(statearr_11528_13349[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (34))){
var state_11402__$1 = state_11402;
var statearr_11530_13350 = state_11402__$1;
(statearr_11530_13350[(2)] = null);

(statearr_11530_13350[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (17))){
var state_11402__$1 = state_11402;
var statearr_11534_13351 = state_11402__$1;
(statearr_11534_13351[(2)] = null);

(statearr_11534_13351[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (3))){
var inst_11399 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11402__$1,inst_11399);
} else {
if((state_val_11403 === (12))){
var inst_11329 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11536_13352 = state_11402__$1;
(statearr_11536_13352[(2)] = inst_11329);

(statearr_11536_13352[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (2))){
var state_11402__$1 = state_11402;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11402__$1,(4),ch);
} else {
if((state_val_11403 === (23))){
var state_11402__$1 = state_11402;
var statearr_11540_13353 = state_11402__$1;
(statearr_11540_13353[(2)] = null);

(statearr_11540_13353[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (35))){
var inst_11383 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11541_13354 = state_11402__$1;
(statearr_11541_13354[(2)] = inst_11383);

(statearr_11541_13354[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (19))){
var inst_11301 = (state_11402[(7)]);
var inst_11305 = cljs.core.chunk_first(inst_11301);
var inst_11306 = cljs.core.chunk_rest(inst_11301);
var inst_11307 = cljs.core.count(inst_11305);
var inst_11279 = inst_11306;
var inst_11280 = inst_11305;
var inst_11281 = inst_11307;
var inst_11282 = (0);
var state_11402__$1 = (function (){var statearr_11544 = state_11402;
(statearr_11544[(13)] = inst_11280);

(statearr_11544[(14)] = inst_11281);

(statearr_11544[(16)] = inst_11279);

(statearr_11544[(17)] = inst_11282);

return statearr_11544;
})();
var statearr_11546_13357 = state_11402__$1;
(statearr_11546_13357[(2)] = null);

(statearr_11546_13357[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (11))){
var inst_11301 = (state_11402[(7)]);
var inst_11279 = (state_11402[(16)]);
var inst_11301__$1 = cljs.core.seq(inst_11279);
var state_11402__$1 = (function (){var statearr_11550 = state_11402;
(statearr_11550[(7)] = inst_11301__$1);

return statearr_11550;
})();
if(inst_11301__$1){
var statearr_11551_13358 = state_11402__$1;
(statearr_11551_13358[(1)] = (16));

} else {
var statearr_11552_13359 = state_11402__$1;
(statearr_11552_13359[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (9))){
var inst_11331 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11556_13360 = state_11402__$1;
(statearr_11556_13360[(2)] = inst_11331);

(statearr_11556_13360[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (5))){
var inst_11277 = cljs.core.deref(cs);
var inst_11278 = cljs.core.seq(inst_11277);
var inst_11279 = inst_11278;
var inst_11280 = null;
var inst_11281 = (0);
var inst_11282 = (0);
var state_11402__$1 = (function (){var statearr_11558 = state_11402;
(statearr_11558[(13)] = inst_11280);

(statearr_11558[(14)] = inst_11281);

(statearr_11558[(16)] = inst_11279);

(statearr_11558[(17)] = inst_11282);

return statearr_11558;
})();
var statearr_11559_13361 = state_11402__$1;
(statearr_11559_13361[(2)] = null);

(statearr_11559_13361[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (14))){
var state_11402__$1 = state_11402;
var statearr_11566_13362 = state_11402__$1;
(statearr_11566_13362[(2)] = null);

(statearr_11566_13362[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (45))){
var inst_11391 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11567_13363 = state_11402__$1;
(statearr_11567_13363[(2)] = inst_11391);

(statearr_11567_13363[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (26))){
var inst_11334 = (state_11402[(27)]);
var inst_11387 = (state_11402[(2)]);
var inst_11388 = cljs.core.seq(inst_11334);
var state_11402__$1 = (function (){var statearr_11571 = state_11402;
(statearr_11571[(29)] = inst_11387);

return statearr_11571;
})();
if(inst_11388){
var statearr_11573_13364 = state_11402__$1;
(statearr_11573_13364[(1)] = (42));

} else {
var statearr_11574_13365 = state_11402__$1;
(statearr_11574_13365[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (16))){
var inst_11301 = (state_11402[(7)]);
var inst_11303 = cljs.core.chunked_seq_QMARK_(inst_11301);
var state_11402__$1 = state_11402;
if(inst_11303){
var statearr_11575_13366 = state_11402__$1;
(statearr_11575_13366[(1)] = (19));

} else {
var statearr_11576_13367 = state_11402__$1;
(statearr_11576_13367[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (38))){
var inst_11380 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11577_13368 = state_11402__$1;
(statearr_11577_13368[(2)] = inst_11380);

(statearr_11577_13368[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (30))){
var state_11402__$1 = state_11402;
var statearr_11581_13369 = state_11402__$1;
(statearr_11581_13369[(2)] = null);

(statearr_11581_13369[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (10))){
var inst_11280 = (state_11402[(13)]);
var inst_11282 = (state_11402[(17)]);
var inst_11290 = cljs.core._nth(inst_11280,inst_11282);
var inst_11291 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_11290,(0),null);
var inst_11292 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_11290,(1),null);
var state_11402__$1 = (function (){var statearr_11582 = state_11402;
(statearr_11582[(24)] = inst_11291);

return statearr_11582;
})();
if(cljs.core.truth_(inst_11292)){
var statearr_11583_13370 = state_11402__$1;
(statearr_11583_13370[(1)] = (13));

} else {
var statearr_11584_13371 = state_11402__$1;
(statearr_11584_13371[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (18))){
var inst_11327 = (state_11402[(2)]);
var state_11402__$1 = state_11402;
var statearr_11588_13372 = state_11402__$1;
(statearr_11588_13372[(2)] = inst_11327);

(statearr_11588_13372[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (42))){
var state_11402__$1 = state_11402;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11402__$1,(45),dchan);
} else {
if((state_val_11403 === (37))){
var inst_11370 = (state_11402[(22)]);
var inst_11361 = (state_11402[(23)]);
var inst_11268 = (state_11402[(12)]);
var inst_11370__$1 = cljs.core.first(inst_11361);
var inst_11371 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_11370__$1,inst_11268,done);
var state_11402__$1 = (function (){var statearr_11591 = state_11402;
(statearr_11591[(22)] = inst_11370__$1);

return statearr_11591;
})();
if(cljs.core.truth_(inst_11371)){
var statearr_11592_13373 = state_11402__$1;
(statearr_11592_13373[(1)] = (39));

} else {
var statearr_11593_13374 = state_11402__$1;
(statearr_11593_13374[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11403 === (8))){
var inst_11281 = (state_11402[(14)]);
var inst_11282 = (state_11402[(17)]);
var inst_11284 = (inst_11282 < inst_11281);
var inst_11285 = inst_11284;
var state_11402__$1 = state_11402;
if(cljs.core.truth_(inst_11285)){
var statearr_11596_13375 = state_11402__$1;
(statearr_11596_13375[(1)] = (10));

} else {
var statearr_11597_13376 = state_11402__$1;
(statearr_11597_13376[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__9996__auto__ = null;
var cljs$core$async$mult_$_state_machine__9996__auto____0 = (function (){
var statearr_11605 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11605[(0)] = cljs$core$async$mult_$_state_machine__9996__auto__);

(statearr_11605[(1)] = (1));

return statearr_11605;
});
var cljs$core$async$mult_$_state_machine__9996__auto____1 = (function (state_11402){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_11402);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e11606){var ex__9999__auto__ = e11606;
var statearr_11607_13377 = state_11402;
(statearr_11607_13377[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_11402[(4)]))){
var statearr_11614_13379 = state_11402;
(statearr_11614_13379[(1)] = cljs.core.first((state_11402[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13382 = state_11402;
state_11402 = G__13382;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__9996__auto__ = function(state_11402){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__9996__auto____1.call(this,state_11402);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__9996__auto____0;
cljs$core$async$mult_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__9996__auto____1;
return cljs$core$async$mult_$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_11616 = f__10208__auto__();
(statearr_11616[(6)] = c__10207__auto___13292);

return statearr_11616;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__11619 = arguments.length;
switch (G__11619) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_13387 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null,m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_13387(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_13390 = (function (m,ch){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5351__auto__.call(null,m,ch));
} else {
var m__5349__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5349__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_13390(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_13391 = (function (m){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5351__auto__.call(null,m));
} else {
var m__5349__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5349__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_13391(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_13392 = (function (m,state_map){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5351__auto__.call(null,m,state_map));
} else {
var m__5349__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5349__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_13392(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_13393 = (function (m,mode){
var x__5350__auto__ = (((m == null))?null:m);
var m__5351__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5351__auto__.call(null,m,mode));
} else {
var m__5349__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5349__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_13393(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5732__auto__ = [];
var len__5726__auto___13394 = arguments.length;
var i__5727__auto___13395 = (0);
while(true){
if((i__5727__auto___13395 < len__5726__auto___13394)){
args__5732__auto__.push((arguments[i__5727__auto___13395]));

var G__13396 = (i__5727__auto___13395 + (1));
i__5727__auto___13395 = G__13396;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((3) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5733__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__11655){
var map__11656 = p__11655;
var map__11656__$1 = cljs.core.__destructure_map(map__11656);
var opts = map__11656__$1;
var statearr_11657_13397 = state;
(statearr_11657_13397[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_11658_13398 = state;
(statearr_11658_13398[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_11659_13399 = state;
(statearr_11659_13399[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq11650){
var G__11651 = cljs.core.first(seq11650);
var seq11650__$1 = cljs.core.next(seq11650);
var G__11652 = cljs.core.first(seq11650__$1);
var seq11650__$2 = cljs.core.next(seq11650__$1);
var G__11653 = cljs.core.first(seq11650__$2);
var seq11650__$3 = cljs.core.next(seq11650__$2);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__11651,G__11652,G__11653,seq11650__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11673 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta11674){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta11674 = meta11674;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11675,meta11674__$1){
var self__ = this;
var _11675__$1 = this;
return (new cljs.core.async.t_cljs$core$async11673(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta11674__$1));
}));

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11675){
var self__ = this;
var _11675__$1 = this;
return self__.meta11674;
}));

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async11673.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async11673.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta11674","meta11674",-49443071,null)], null);
}));

(cljs.core.async.t_cljs$core$async11673.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async11673.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11673");

(cljs.core.async.t_cljs$core$async11673.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async11673");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async11673.
 */
cljs.core.async.__GT_t_cljs$core$async11673 = (function cljs$core$async$__GT_t_cljs$core$async11673(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta11674){
return (new cljs.core.async.t_cljs$core$async11673(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta11674));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async11673(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__10207__auto___13419 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_11759){
var state_val_11760 = (state_11759[(1)]);
if((state_val_11760 === (7))){
var inst_11718 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
if(cljs.core.truth_(inst_11718)){
var statearr_11762_13420 = state_11759__$1;
(statearr_11762_13420[(1)] = (8));

} else {
var statearr_11763_13421 = state_11759__$1;
(statearr_11763_13421[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (20))){
var inst_11710 = (state_11759[(7)]);
var state_11759__$1 = state_11759;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_11759__$1,(23),out,inst_11710);
} else {
if((state_val_11760 === (1))){
var inst_11692 = calc_state();
var inst_11693 = cljs.core.__destructure_map(inst_11692);
var inst_11694 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_11693,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11695 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_11693,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11696 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_11693,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_11697 = inst_11692;
var state_11759__$1 = (function (){var statearr_11764 = state_11759;
(statearr_11764[(8)] = inst_11694);

(statearr_11764[(9)] = inst_11695);

(statearr_11764[(10)] = inst_11696);

(statearr_11764[(11)] = inst_11697);

return statearr_11764;
})();
var statearr_11765_13423 = state_11759__$1;
(statearr_11765_13423[(2)] = null);

(statearr_11765_13423[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (24))){
var inst_11700 = (state_11759[(12)]);
var inst_11697 = inst_11700;
var state_11759__$1 = (function (){var statearr_11766 = state_11759;
(statearr_11766[(11)] = inst_11697);

return statearr_11766;
})();
var statearr_11767_13427 = state_11759__$1;
(statearr_11767_13427[(2)] = null);

(statearr_11767_13427[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (4))){
var inst_11710 = (state_11759[(7)]);
var inst_11712 = (state_11759[(13)]);
var inst_11709 = (state_11759[(2)]);
var inst_11710__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_11709,(0),null);
var inst_11711 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_11709,(1),null);
var inst_11712__$1 = (inst_11710__$1 == null);
var state_11759__$1 = (function (){var statearr_11768 = state_11759;
(statearr_11768[(7)] = inst_11710__$1);

(statearr_11768[(14)] = inst_11711);

(statearr_11768[(13)] = inst_11712__$1);

return statearr_11768;
})();
if(cljs.core.truth_(inst_11712__$1)){
var statearr_11769_13430 = state_11759__$1;
(statearr_11769_13430[(1)] = (5));

} else {
var statearr_11770_13431 = state_11759__$1;
(statearr_11770_13431[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (15))){
var inst_11732 = (state_11759[(15)]);
var inst_11702 = (state_11759[(16)]);
var inst_11732__$1 = cljs.core.empty_QMARK_(inst_11702);
var state_11759__$1 = (function (){var statearr_11773 = state_11759;
(statearr_11773[(15)] = inst_11732__$1);

return statearr_11773;
})();
if(inst_11732__$1){
var statearr_11774_13432 = state_11759__$1;
(statearr_11774_13432[(1)] = (17));

} else {
var statearr_11775_13433 = state_11759__$1;
(statearr_11775_13433[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (21))){
var inst_11700 = (state_11759[(12)]);
var inst_11697 = inst_11700;
var state_11759__$1 = (function (){var statearr_11782 = state_11759;
(statearr_11782[(11)] = inst_11697);

return statearr_11782;
})();
var statearr_11783_13436 = state_11759__$1;
(statearr_11783_13436[(2)] = null);

(statearr_11783_13436[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (13))){
var inst_11725 = (state_11759[(2)]);
var inst_11726 = calc_state();
var inst_11697 = inst_11726;
var state_11759__$1 = (function (){var statearr_11784 = state_11759;
(statearr_11784[(17)] = inst_11725);

(statearr_11784[(11)] = inst_11697);

return statearr_11784;
})();
var statearr_11785_13438 = state_11759__$1;
(statearr_11785_13438[(2)] = null);

(statearr_11785_13438[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (22))){
var inst_11752 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
var statearr_11786_13441 = state_11759__$1;
(statearr_11786_13441[(2)] = inst_11752);

(statearr_11786_13441[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (6))){
var inst_11711 = (state_11759[(14)]);
var inst_11716 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_11711,change);
var state_11759__$1 = state_11759;
var statearr_11787_13443 = state_11759__$1;
(statearr_11787_13443[(2)] = inst_11716);

(statearr_11787_13443[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (25))){
var state_11759__$1 = state_11759;
var statearr_11788_13444 = state_11759__$1;
(statearr_11788_13444[(2)] = null);

(statearr_11788_13444[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (17))){
var inst_11711 = (state_11759[(14)]);
var inst_11703 = (state_11759[(18)]);
var inst_11734 = (inst_11703.cljs$core$IFn$_invoke$arity$1 ? inst_11703.cljs$core$IFn$_invoke$arity$1(inst_11711) : inst_11703.call(null,inst_11711));
var inst_11735 = cljs.core.not(inst_11734);
var state_11759__$1 = state_11759;
var statearr_11793_13445 = state_11759__$1;
(statearr_11793_13445[(2)] = inst_11735);

(statearr_11793_13445[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (3))){
var inst_11756 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11759__$1,inst_11756);
} else {
if((state_val_11760 === (12))){
var state_11759__$1 = state_11759;
var statearr_11802_13446 = state_11759__$1;
(statearr_11802_13446[(2)] = null);

(statearr_11802_13446[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (2))){
var inst_11700 = (state_11759[(12)]);
var inst_11697 = (state_11759[(11)]);
var inst_11700__$1 = cljs.core.__destructure_map(inst_11697);
var inst_11702 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_11700__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11703 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_11700__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11704 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_11700__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_11759__$1 = (function (){var statearr_11803 = state_11759;
(statearr_11803[(18)] = inst_11703);

(statearr_11803[(16)] = inst_11702);

(statearr_11803[(12)] = inst_11700__$1);

return statearr_11803;
})();
return cljs.core.async.ioc_alts_BANG_(state_11759__$1,(4),inst_11704);
} else {
if((state_val_11760 === (23))){
var inst_11743 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
if(cljs.core.truth_(inst_11743)){
var statearr_11806_13447 = state_11759__$1;
(statearr_11806_13447[(1)] = (24));

} else {
var statearr_11807_13448 = state_11759__$1;
(statearr_11807_13448[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (19))){
var inst_11738 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
var statearr_11808_13449 = state_11759__$1;
(statearr_11808_13449[(2)] = inst_11738);

(statearr_11808_13449[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (11))){
var inst_11711 = (state_11759[(14)]);
var inst_11722 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_11711);
var state_11759__$1 = state_11759;
var statearr_11815_13452 = state_11759__$1;
(statearr_11815_13452[(2)] = inst_11722);

(statearr_11815_13452[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (9))){
var inst_11711 = (state_11759[(14)]);
var inst_11729 = (state_11759[(19)]);
var inst_11702 = (state_11759[(16)]);
var inst_11729__$1 = (inst_11702.cljs$core$IFn$_invoke$arity$1 ? inst_11702.cljs$core$IFn$_invoke$arity$1(inst_11711) : inst_11702.call(null,inst_11711));
var state_11759__$1 = (function (){var statearr_11817 = state_11759;
(statearr_11817[(19)] = inst_11729__$1);

return statearr_11817;
})();
if(cljs.core.truth_(inst_11729__$1)){
var statearr_11818_13453 = state_11759__$1;
(statearr_11818_13453[(1)] = (14));

} else {
var statearr_11820_13454 = state_11759__$1;
(statearr_11820_13454[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (5))){
var inst_11712 = (state_11759[(13)]);
var state_11759__$1 = state_11759;
var statearr_11826_13455 = state_11759__$1;
(statearr_11826_13455[(2)] = inst_11712);

(statearr_11826_13455[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (14))){
var inst_11729 = (state_11759[(19)]);
var state_11759__$1 = state_11759;
var statearr_11828_13459 = state_11759__$1;
(statearr_11828_13459[(2)] = inst_11729);

(statearr_11828_13459[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (26))){
var inst_11748 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
var statearr_11831_13462 = state_11759__$1;
(statearr_11831_13462[(2)] = inst_11748);

(statearr_11831_13462[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (16))){
var inst_11740 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
if(cljs.core.truth_(inst_11740)){
var statearr_11834_13463 = state_11759__$1;
(statearr_11834_13463[(1)] = (20));

} else {
var statearr_11835_13464 = state_11759__$1;
(statearr_11835_13464[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (10))){
var inst_11754 = (state_11759[(2)]);
var state_11759__$1 = state_11759;
var statearr_11836_13465 = state_11759__$1;
(statearr_11836_13465[(2)] = inst_11754);

(statearr_11836_13465[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (18))){
var inst_11732 = (state_11759[(15)]);
var state_11759__$1 = state_11759;
var statearr_11837_13469 = state_11759__$1;
(statearr_11837_13469[(2)] = inst_11732);

(statearr_11837_13469[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11760 === (8))){
var inst_11710 = (state_11759[(7)]);
var inst_11720 = (inst_11710 == null);
var state_11759__$1 = state_11759;
if(cljs.core.truth_(inst_11720)){
var statearr_11838_13471 = state_11759__$1;
(statearr_11838_13471[(1)] = (11));

} else {
var statearr_11839_13472 = state_11759__$1;
(statearr_11839_13472[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__9996__auto__ = null;
var cljs$core$async$mix_$_state_machine__9996__auto____0 = (function (){
var statearr_11842 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11842[(0)] = cljs$core$async$mix_$_state_machine__9996__auto__);

(statearr_11842[(1)] = (1));

return statearr_11842;
});
var cljs$core$async$mix_$_state_machine__9996__auto____1 = (function (state_11759){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_11759);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e11844){var ex__9999__auto__ = e11844;
var statearr_11845_13474 = state_11759;
(statearr_11845_13474[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_11759[(4)]))){
var statearr_11846_13475 = state_11759;
(statearr_11846_13475[(1)] = cljs.core.first((state_11759[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13476 = state_11759;
state_11759 = G__13476;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__9996__auto__ = function(state_11759){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__9996__auto____1.call(this,state_11759);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__9996__auto____0;
cljs$core$async$mix_$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__9996__auto____1;
return cljs$core$async$mix_$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_11848 = f__10208__auto__();
(statearr_11848[(6)] = c__10207__auto___13419);

return statearr_11848;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_13478 = (function (p,v,ch,close_QMARK_){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5351__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5349__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5349__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_13478(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_13482 = (function (p,v,ch){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5351__auto__.call(null,p,v,ch));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5349__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_13482(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_13487 = (function() {
var G__13488 = null;
var G__13488__1 = (function (p){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5351__auto__.call(null,p));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5349__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__13488__2 = (function (p,v){
var x__5350__auto__ = (((p == null))?null:p);
var m__5351__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5350__auto__)]);
if((!((m__5351__auto__ == null)))){
return (m__5351__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5351__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5351__auto__.call(null,p,v));
} else {
var m__5349__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5349__auto__ == null)))){
return (m__5349__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5349__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5349__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__13488 = function(p,v){
switch(arguments.length){
case 1:
return G__13488__1.call(this,p);
case 2:
return G__13488__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__13488.cljs$core$IFn$_invoke$arity$1 = G__13488__1;
G__13488.cljs$core$IFn$_invoke$arity$2 = G__13488__2;
return G__13488;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__11892 = arguments.length;
switch (G__11892) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_13487(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_13487(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11902 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta11903){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta11903 = meta11903;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11904,meta11903__$1){
var self__ = this;
var _11904__$1 = this;
return (new cljs.core.async.t_cljs$core$async11902(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta11903__$1));
}));

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11904){
var self__ = this;
var _11904__$1 = this;
return self__.meta11903;
}));

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async11902.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async11902.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta11903","meta11903",1142271154,null)], null);
}));

(cljs.core.async.t_cljs$core$async11902.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async11902.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11902");

(cljs.core.async.t_cljs$core$async11902.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async11902");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async11902.
 */
cljs.core.async.__GT_t_cljs$core$async11902 = (function cljs$core$async$__GT_t_cljs$core$async11902(ch,topic_fn,buf_fn,mults,ensure_mult,meta11903){
return (new cljs.core.async.t_cljs$core$async11902(ch,topic_fn,buf_fn,mults,ensure_mult,meta11903));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__11899 = arguments.length;
switch (G__11899) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5002__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__11895_SHARP_){
if(cljs.core.truth_((p1__11895_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__11895_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__11895_SHARP_.call(null,topic)))){
return p1__11895_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__11895_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async11902(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__10207__auto___13533 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_11979){
var state_val_11980 = (state_11979[(1)]);
if((state_val_11980 === (7))){
var inst_11975 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
var statearr_11981_13535 = state_11979__$1;
(statearr_11981_13535[(2)] = inst_11975);

(statearr_11981_13535[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (20))){
var state_11979__$1 = state_11979;
var statearr_11984_13536 = state_11979__$1;
(statearr_11984_13536[(2)] = null);

(statearr_11984_13536[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (1))){
var state_11979__$1 = state_11979;
var statearr_11987_13537 = state_11979__$1;
(statearr_11987_13537[(2)] = null);

(statearr_11987_13537[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (24))){
var inst_11958 = (state_11979[(7)]);
var inst_11967 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_11958);
var state_11979__$1 = state_11979;
var statearr_11990_13538 = state_11979__$1;
(statearr_11990_13538[(2)] = inst_11967);

(statearr_11990_13538[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (4))){
var inst_11910 = (state_11979[(8)]);
var inst_11910__$1 = (state_11979[(2)]);
var inst_11911 = (inst_11910__$1 == null);
var state_11979__$1 = (function (){var statearr_11991 = state_11979;
(statearr_11991[(8)] = inst_11910__$1);

return statearr_11991;
})();
if(cljs.core.truth_(inst_11911)){
var statearr_11992_13540 = state_11979__$1;
(statearr_11992_13540[(1)] = (5));

} else {
var statearr_11993_13543 = state_11979__$1;
(statearr_11993_13543[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (15))){
var inst_11952 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
var statearr_11994_13545 = state_11979__$1;
(statearr_11994_13545[(2)] = inst_11952);

(statearr_11994_13545[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (21))){
var inst_11972 = (state_11979[(2)]);
var state_11979__$1 = (function (){var statearr_11995 = state_11979;
(statearr_11995[(9)] = inst_11972);

return statearr_11995;
})();
var statearr_11996_13546 = state_11979__$1;
(statearr_11996_13546[(2)] = null);

(statearr_11996_13546[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (13))){
var inst_11934 = (state_11979[(10)]);
var inst_11936 = cljs.core.chunked_seq_QMARK_(inst_11934);
var state_11979__$1 = state_11979;
if(inst_11936){
var statearr_11997_13547 = state_11979__$1;
(statearr_11997_13547[(1)] = (16));

} else {
var statearr_11998_13548 = state_11979__$1;
(statearr_11998_13548[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (22))){
var inst_11964 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
if(cljs.core.truth_(inst_11964)){
var statearr_11999_13549 = state_11979__$1;
(statearr_11999_13549[(1)] = (23));

} else {
var statearr_12000_13550 = state_11979__$1;
(statearr_12000_13550[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (6))){
var inst_11960 = (state_11979[(11)]);
var inst_11910 = (state_11979[(8)]);
var inst_11958 = (state_11979[(7)]);
var inst_11958__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_11910) : topic_fn.call(null,inst_11910));
var inst_11959 = cljs.core.deref(mults);
var inst_11960__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_11959,inst_11958__$1);
var state_11979__$1 = (function (){var statearr_12005 = state_11979;
(statearr_12005[(11)] = inst_11960__$1);

(statearr_12005[(7)] = inst_11958__$1);

return statearr_12005;
})();
if(cljs.core.truth_(inst_11960__$1)){
var statearr_12009_13551 = state_11979__$1;
(statearr_12009_13551[(1)] = (19));

} else {
var statearr_12010_13552 = state_11979__$1;
(statearr_12010_13552[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (25))){
var inst_11969 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
var statearr_12011_13553 = state_11979__$1;
(statearr_12011_13553[(2)] = inst_11969);

(statearr_12011_13553[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (17))){
var inst_11934 = (state_11979[(10)]);
var inst_11943 = cljs.core.first(inst_11934);
var inst_11944 = cljs.core.async.muxch_STAR_(inst_11943);
var inst_11945 = cljs.core.async.close_BANG_(inst_11944);
var inst_11946 = cljs.core.next(inst_11934);
var inst_11920 = inst_11946;
var inst_11921 = null;
var inst_11922 = (0);
var inst_11923 = (0);
var state_11979__$1 = (function (){var statearr_12013 = state_11979;
(statearr_12013[(12)] = inst_11922);

(statearr_12013[(13)] = inst_11923);

(statearr_12013[(14)] = inst_11920);

(statearr_12013[(15)] = inst_11921);

(statearr_12013[(16)] = inst_11945);

return statearr_12013;
})();
var statearr_12014_13555 = state_11979__$1;
(statearr_12014_13555[(2)] = null);

(statearr_12014_13555[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (3))){
var inst_11977 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
return cljs.core.async.impl.ioc_helpers.return_chan(state_11979__$1,inst_11977);
} else {
if((state_val_11980 === (12))){
var inst_11954 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
var statearr_12015_13558 = state_11979__$1;
(statearr_12015_13558[(2)] = inst_11954);

(statearr_12015_13558[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (2))){
var state_11979__$1 = state_11979;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_11979__$1,(4),ch);
} else {
if((state_val_11980 === (23))){
var state_11979__$1 = state_11979;
var statearr_12016_13562 = state_11979__$1;
(statearr_12016_13562[(2)] = null);

(statearr_12016_13562[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (19))){
var inst_11960 = (state_11979[(11)]);
var inst_11910 = (state_11979[(8)]);
var inst_11962 = cljs.core.async.muxch_STAR_(inst_11960);
var state_11979__$1 = state_11979;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_11979__$1,(22),inst_11962,inst_11910);
} else {
if((state_val_11980 === (11))){
var inst_11934 = (state_11979[(10)]);
var inst_11920 = (state_11979[(14)]);
var inst_11934__$1 = cljs.core.seq(inst_11920);
var state_11979__$1 = (function (){var statearr_12017 = state_11979;
(statearr_12017[(10)] = inst_11934__$1);

return statearr_12017;
})();
if(inst_11934__$1){
var statearr_12018_13565 = state_11979__$1;
(statearr_12018_13565[(1)] = (13));

} else {
var statearr_12019_13566 = state_11979__$1;
(statearr_12019_13566[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (9))){
var inst_11956 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
var statearr_12020_13567 = state_11979__$1;
(statearr_12020_13567[(2)] = inst_11956);

(statearr_12020_13567[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (5))){
var inst_11917 = cljs.core.deref(mults);
var inst_11918 = cljs.core.vals(inst_11917);
var inst_11919 = cljs.core.seq(inst_11918);
var inst_11920 = inst_11919;
var inst_11921 = null;
var inst_11922 = (0);
var inst_11923 = (0);
var state_11979__$1 = (function (){var statearr_12021 = state_11979;
(statearr_12021[(12)] = inst_11922);

(statearr_12021[(13)] = inst_11923);

(statearr_12021[(14)] = inst_11920);

(statearr_12021[(15)] = inst_11921);

return statearr_12021;
})();
var statearr_12022_13569 = state_11979__$1;
(statearr_12022_13569[(2)] = null);

(statearr_12022_13569[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (14))){
var state_11979__$1 = state_11979;
var statearr_12026_13570 = state_11979__$1;
(statearr_12026_13570[(2)] = null);

(statearr_12026_13570[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (16))){
var inst_11934 = (state_11979[(10)]);
var inst_11938 = cljs.core.chunk_first(inst_11934);
var inst_11939 = cljs.core.chunk_rest(inst_11934);
var inst_11940 = cljs.core.count(inst_11938);
var inst_11920 = inst_11939;
var inst_11921 = inst_11938;
var inst_11922 = inst_11940;
var inst_11923 = (0);
var state_11979__$1 = (function (){var statearr_12027 = state_11979;
(statearr_12027[(12)] = inst_11922);

(statearr_12027[(13)] = inst_11923);

(statearr_12027[(14)] = inst_11920);

(statearr_12027[(15)] = inst_11921);

return statearr_12027;
})();
var statearr_12028_13572 = state_11979__$1;
(statearr_12028_13572[(2)] = null);

(statearr_12028_13572[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (10))){
var inst_11922 = (state_11979[(12)]);
var inst_11923 = (state_11979[(13)]);
var inst_11920 = (state_11979[(14)]);
var inst_11921 = (state_11979[(15)]);
var inst_11928 = cljs.core._nth(inst_11921,inst_11923);
var inst_11929 = cljs.core.async.muxch_STAR_(inst_11928);
var inst_11930 = cljs.core.async.close_BANG_(inst_11929);
var inst_11931 = (inst_11923 + (1));
var tmp12023 = inst_11922;
var tmp12024 = inst_11920;
var tmp12025 = inst_11921;
var inst_11920__$1 = tmp12024;
var inst_11921__$1 = tmp12025;
var inst_11922__$1 = tmp12023;
var inst_11923__$1 = inst_11931;
var state_11979__$1 = (function (){var statearr_12029 = state_11979;
(statearr_12029[(17)] = inst_11930);

(statearr_12029[(12)] = inst_11922__$1);

(statearr_12029[(13)] = inst_11923__$1);

(statearr_12029[(14)] = inst_11920__$1);

(statearr_12029[(15)] = inst_11921__$1);

return statearr_12029;
})();
var statearr_12030_13574 = state_11979__$1;
(statearr_12030_13574[(2)] = null);

(statearr_12030_13574[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (18))){
var inst_11949 = (state_11979[(2)]);
var state_11979__$1 = state_11979;
var statearr_12035_13575 = state_11979__$1;
(statearr_12035_13575[(2)] = inst_11949);

(statearr_12035_13575[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11980 === (8))){
var inst_11922 = (state_11979[(12)]);
var inst_11923 = (state_11979[(13)]);
var inst_11925 = (inst_11923 < inst_11922);
var inst_11926 = inst_11925;
var state_11979__$1 = state_11979;
if(cljs.core.truth_(inst_11926)){
var statearr_12039_13576 = state_11979__$1;
(statearr_12039_13576[(1)] = (10));

} else {
var statearr_12040_13578 = state_11979__$1;
(statearr_12040_13578[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12041 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12041[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12041[(1)] = (1));

return statearr_12041;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_11979){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_11979);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12042){var ex__9999__auto__ = e12042;
var statearr_12043_13583 = state_11979;
(statearr_12043_13583[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_11979[(4)]))){
var statearr_12044_13584 = state_11979;
(statearr_12044_13584[(1)] = cljs.core.first((state_11979[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13586 = state_11979;
state_11979 = G__13586;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_11979){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_11979);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12045 = f__10208__auto__();
(statearr_12045[(6)] = c__10207__auto___13533);

return statearr_12045;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__12051 = arguments.length;
switch (G__12051) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__12058 = arguments.length;
switch (G__12058) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__12065 = arguments.length;
switch (G__12065) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__10207__auto___13597 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12112){
var state_val_12115 = (state_12112[(1)]);
if((state_val_12115 === (7))){
var state_12112__$1 = state_12112;
var statearr_12116_13598 = state_12112__$1;
(statearr_12116_13598[(2)] = null);

(statearr_12116_13598[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (1))){
var state_12112__$1 = state_12112;
var statearr_12117_13599 = state_12112__$1;
(statearr_12117_13599[(2)] = null);

(statearr_12117_13599[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (4))){
var inst_12071 = (state_12112[(7)]);
var inst_12069 = (state_12112[(8)]);
var inst_12073 = (inst_12071 < inst_12069);
var state_12112__$1 = state_12112;
if(cljs.core.truth_(inst_12073)){
var statearr_12118_13601 = state_12112__$1;
(statearr_12118_13601[(1)] = (6));

} else {
var statearr_12119_13602 = state_12112__$1;
(statearr_12119_13602[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (15))){
var inst_12097 = (state_12112[(9)]);
var inst_12102 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_12097);
var state_12112__$1 = state_12112;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12112__$1,(17),out,inst_12102);
} else {
if((state_val_12115 === (13))){
var inst_12097 = (state_12112[(9)]);
var inst_12097__$1 = (state_12112[(2)]);
var inst_12098 = cljs.core.some(cljs.core.nil_QMARK_,inst_12097__$1);
var state_12112__$1 = (function (){var statearr_12120 = state_12112;
(statearr_12120[(9)] = inst_12097__$1);

return statearr_12120;
})();
if(cljs.core.truth_(inst_12098)){
var statearr_12121_13604 = state_12112__$1;
(statearr_12121_13604[(1)] = (14));

} else {
var statearr_12122_13605 = state_12112__$1;
(statearr_12122_13605[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (6))){
var state_12112__$1 = state_12112;
var statearr_12123_13607 = state_12112__$1;
(statearr_12123_13607[(2)] = null);

(statearr_12123_13607[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (17))){
var inst_12104 = (state_12112[(2)]);
var state_12112__$1 = (function (){var statearr_12125 = state_12112;
(statearr_12125[(10)] = inst_12104);

return statearr_12125;
})();
var statearr_12126_13609 = state_12112__$1;
(statearr_12126_13609[(2)] = null);

(statearr_12126_13609[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (3))){
var inst_12110 = (state_12112[(2)]);
var state_12112__$1 = state_12112;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12112__$1,inst_12110);
} else {
if((state_val_12115 === (12))){
var _ = (function (){var statearr_12127 = state_12112;
(statearr_12127[(4)] = cljs.core.rest((state_12112[(4)])));

return statearr_12127;
})();
var state_12112__$1 = state_12112;
var ex12124 = (state_12112__$1[(2)]);
var statearr_12128_13611 = state_12112__$1;
(statearr_12128_13611[(5)] = ex12124);


if((ex12124 instanceof Object)){
var statearr_12129_13612 = state_12112__$1;
(statearr_12129_13612[(1)] = (11));

(statearr_12129_13612[(5)] = null);

} else {
throw ex12124;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (2))){
var inst_12068 = cljs.core.reset_BANG_(dctr,cnt);
var inst_12069 = cnt;
var inst_12071 = (0);
var state_12112__$1 = (function (){var statearr_12132 = state_12112;
(statearr_12132[(11)] = inst_12068);

(statearr_12132[(7)] = inst_12071);

(statearr_12132[(8)] = inst_12069);

return statearr_12132;
})();
var statearr_12133_13613 = state_12112__$1;
(statearr_12133_13613[(2)] = null);

(statearr_12133_13613[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (11))){
var inst_12076 = (state_12112[(2)]);
var inst_12077 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_12112__$1 = (function (){var statearr_12134 = state_12112;
(statearr_12134[(12)] = inst_12076);

return statearr_12134;
})();
var statearr_12135_13614 = state_12112__$1;
(statearr_12135_13614[(2)] = inst_12077);

(statearr_12135_13614[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (9))){
var inst_12071 = (state_12112[(7)]);
var _ = (function (){var statearr_12138 = state_12112;
(statearr_12138[(4)] = cljs.core.cons((12),(state_12112[(4)])));

return statearr_12138;
})();
var inst_12083 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_12071) : chs__$1.call(null,inst_12071));
var inst_12084 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_12071) : done.call(null,inst_12071));
var inst_12085 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_12083,inst_12084);
var ___$1 = (function (){var statearr_12139 = state_12112;
(statearr_12139[(4)] = cljs.core.rest((state_12112[(4)])));

return statearr_12139;
})();
var state_12112__$1 = state_12112;
var statearr_12140_13616 = state_12112__$1;
(statearr_12140_13616[(2)] = inst_12085);

(statearr_12140_13616[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (5))){
var inst_12095 = (state_12112[(2)]);
var state_12112__$1 = (function (){var statearr_12141 = state_12112;
(statearr_12141[(13)] = inst_12095);

return statearr_12141;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12112__$1,(13),dchan);
} else {
if((state_val_12115 === (14))){
var inst_12100 = cljs.core.async.close_BANG_(out);
var state_12112__$1 = state_12112;
var statearr_12142_13617 = state_12112__$1;
(statearr_12142_13617[(2)] = inst_12100);

(statearr_12142_13617[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (16))){
var inst_12108 = (state_12112[(2)]);
var state_12112__$1 = state_12112;
var statearr_12143_13618 = state_12112__$1;
(statearr_12143_13618[(2)] = inst_12108);

(statearr_12143_13618[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (10))){
var inst_12071 = (state_12112[(7)]);
var inst_12088 = (state_12112[(2)]);
var inst_12089 = (inst_12071 + (1));
var inst_12071__$1 = inst_12089;
var state_12112__$1 = (function (){var statearr_12144 = state_12112;
(statearr_12144[(7)] = inst_12071__$1);

(statearr_12144[(14)] = inst_12088);

return statearr_12144;
})();
var statearr_12146_13619 = state_12112__$1;
(statearr_12146_13619[(2)] = null);

(statearr_12146_13619[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12115 === (8))){
var inst_12093 = (state_12112[(2)]);
var state_12112__$1 = state_12112;
var statearr_12148_13620 = state_12112__$1;
(statearr_12148_13620[(2)] = inst_12093);

(statearr_12148_13620[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12151 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12151[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12151[(1)] = (1));

return statearr_12151;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_12112){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12112);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12152){var ex__9999__auto__ = e12152;
var statearr_12154_13622 = state_12112;
(statearr_12154_13622[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12112[(4)]))){
var statearr_12156_13623 = state_12112;
(statearr_12156_13623[(1)] = cljs.core.first((state_12112[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13625 = state_12112;
state_12112 = G__13625;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_12112){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_12112);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12157 = f__10208__auto__();
(statearr_12157[(6)] = c__10207__auto___13597);

return statearr_12157;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__12162 = arguments.length;
switch (G__12162) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__10207__auto___13627 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12196){
var state_val_12197 = (state_12196[(1)]);
if((state_val_12197 === (7))){
var inst_12175 = (state_12196[(7)]);
var inst_12176 = (state_12196[(8)]);
var inst_12175__$1 = (state_12196[(2)]);
var inst_12176__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_12175__$1,(0),null);
var inst_12177 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_12175__$1,(1),null);
var inst_12178 = (inst_12176__$1 == null);
var state_12196__$1 = (function (){var statearr_12198 = state_12196;
(statearr_12198[(9)] = inst_12177);

(statearr_12198[(7)] = inst_12175__$1);

(statearr_12198[(8)] = inst_12176__$1);

return statearr_12198;
})();
if(cljs.core.truth_(inst_12178)){
var statearr_12199_13631 = state_12196__$1;
(statearr_12199_13631[(1)] = (8));

} else {
var statearr_12200_13632 = state_12196__$1;
(statearr_12200_13632[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12197 === (1))){
var inst_12163 = cljs.core.vec(chs);
var inst_12164 = inst_12163;
var state_12196__$1 = (function (){var statearr_12201 = state_12196;
(statearr_12201[(10)] = inst_12164);

return statearr_12201;
})();
var statearr_12202_13634 = state_12196__$1;
(statearr_12202_13634[(2)] = null);

(statearr_12202_13634[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12197 === (4))){
var inst_12164 = (state_12196[(10)]);
var state_12196__$1 = state_12196;
return cljs.core.async.ioc_alts_BANG_(state_12196__$1,(7),inst_12164);
} else {
if((state_val_12197 === (6))){
var inst_12192 = (state_12196[(2)]);
var state_12196__$1 = state_12196;
var statearr_12204_13637 = state_12196__$1;
(statearr_12204_13637[(2)] = inst_12192);

(statearr_12204_13637[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12197 === (3))){
var inst_12194 = (state_12196[(2)]);
var state_12196__$1 = state_12196;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12196__$1,inst_12194);
} else {
if((state_val_12197 === (2))){
var inst_12164 = (state_12196[(10)]);
var inst_12167 = cljs.core.count(inst_12164);
var inst_12168 = (inst_12167 > (0));
var state_12196__$1 = state_12196;
if(cljs.core.truth_(inst_12168)){
var statearr_12208_13639 = state_12196__$1;
(statearr_12208_13639[(1)] = (4));

} else {
var statearr_12209_13640 = state_12196__$1;
(statearr_12209_13640[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12197 === (11))){
var inst_12164 = (state_12196[(10)]);
var inst_12185 = (state_12196[(2)]);
var tmp12205 = inst_12164;
var inst_12164__$1 = tmp12205;
var state_12196__$1 = (function (){var statearr_12211 = state_12196;
(statearr_12211[(11)] = inst_12185);

(statearr_12211[(10)] = inst_12164__$1);

return statearr_12211;
})();
var statearr_12212_13642 = state_12196__$1;
(statearr_12212_13642[(2)] = null);

(statearr_12212_13642[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12197 === (9))){
var inst_12176 = (state_12196[(8)]);
var state_12196__$1 = state_12196;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12196__$1,(11),out,inst_12176);
} else {
if((state_val_12197 === (5))){
var inst_12190 = cljs.core.async.close_BANG_(out);
var state_12196__$1 = state_12196;
var statearr_12214_13646 = state_12196__$1;
(statearr_12214_13646[(2)] = inst_12190);

(statearr_12214_13646[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12197 === (10))){
var inst_12188 = (state_12196[(2)]);
var state_12196__$1 = state_12196;
var statearr_12215_13649 = state_12196__$1;
(statearr_12215_13649[(2)] = inst_12188);

(statearr_12215_13649[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12197 === (8))){
var inst_12177 = (state_12196[(9)]);
var inst_12164 = (state_12196[(10)]);
var inst_12175 = (state_12196[(7)]);
var inst_12176 = (state_12196[(8)]);
var inst_12180 = (function (){var cs = inst_12164;
var vec__12171 = inst_12175;
var v = inst_12176;
var c = inst_12177;
return (function (p1__12160_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__12160_SHARP_);
});
})();
var inst_12181 = cljs.core.filterv(inst_12180,inst_12164);
var inst_12164__$1 = inst_12181;
var state_12196__$1 = (function (){var statearr_12217 = state_12196;
(statearr_12217[(10)] = inst_12164__$1);

return statearr_12217;
})();
var statearr_12218_13651 = state_12196__$1;
(statearr_12218_13651[(2)] = null);

(statearr_12218_13651[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12220 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12220[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12220[(1)] = (1));

return statearr_12220;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_12196){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12196);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12221){var ex__9999__auto__ = e12221;
var statearr_12222_13653 = state_12196;
(statearr_12222_13653[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12196[(4)]))){
var statearr_12223_13654 = state_12196;
(statearr_12223_13654[(1)] = cljs.core.first((state_12196[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13655 = state_12196;
state_12196 = G__13655;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_12196){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_12196);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12224 = f__10208__auto__();
(statearr_12224[(6)] = c__10207__auto___13627);

return statearr_12224;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__12232 = arguments.length;
switch (G__12232) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__10207__auto___13660 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12260){
var state_val_12261 = (state_12260[(1)]);
if((state_val_12261 === (7))){
var inst_12242 = (state_12260[(7)]);
var inst_12242__$1 = (state_12260[(2)]);
var inst_12243 = (inst_12242__$1 == null);
var inst_12244 = cljs.core.not(inst_12243);
var state_12260__$1 = (function (){var statearr_12262 = state_12260;
(statearr_12262[(7)] = inst_12242__$1);

return statearr_12262;
})();
if(inst_12244){
var statearr_12263_13662 = state_12260__$1;
(statearr_12263_13662[(1)] = (8));

} else {
var statearr_12264_13663 = state_12260__$1;
(statearr_12264_13663[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (1))){
var inst_12237 = (0);
var state_12260__$1 = (function (){var statearr_12265 = state_12260;
(statearr_12265[(8)] = inst_12237);

return statearr_12265;
})();
var statearr_12266_13665 = state_12260__$1;
(statearr_12266_13665[(2)] = null);

(statearr_12266_13665[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (4))){
var state_12260__$1 = state_12260;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12260__$1,(7),ch);
} else {
if((state_val_12261 === (6))){
var inst_12255 = (state_12260[(2)]);
var state_12260__$1 = state_12260;
var statearr_12267_13666 = state_12260__$1;
(statearr_12267_13666[(2)] = inst_12255);

(statearr_12267_13666[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (3))){
var inst_12257 = (state_12260[(2)]);
var inst_12258 = cljs.core.async.close_BANG_(out);
var state_12260__$1 = (function (){var statearr_12268 = state_12260;
(statearr_12268[(9)] = inst_12257);

return statearr_12268;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_12260__$1,inst_12258);
} else {
if((state_val_12261 === (2))){
var inst_12237 = (state_12260[(8)]);
var inst_12239 = (inst_12237 < n);
var state_12260__$1 = state_12260;
if(cljs.core.truth_(inst_12239)){
var statearr_12273_13667 = state_12260__$1;
(statearr_12273_13667[(1)] = (4));

} else {
var statearr_12275_13668 = state_12260__$1;
(statearr_12275_13668[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (11))){
var inst_12237 = (state_12260[(8)]);
var inst_12247 = (state_12260[(2)]);
var inst_12248 = (inst_12237 + (1));
var inst_12237__$1 = inst_12248;
var state_12260__$1 = (function (){var statearr_12280 = state_12260;
(statearr_12280[(10)] = inst_12247);

(statearr_12280[(8)] = inst_12237__$1);

return statearr_12280;
})();
var statearr_12281_13673 = state_12260__$1;
(statearr_12281_13673[(2)] = null);

(statearr_12281_13673[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (9))){
var state_12260__$1 = state_12260;
var statearr_12286_13674 = state_12260__$1;
(statearr_12286_13674[(2)] = null);

(statearr_12286_13674[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (5))){
var state_12260__$1 = state_12260;
var statearr_12287_13675 = state_12260__$1;
(statearr_12287_13675[(2)] = null);

(statearr_12287_13675[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (10))){
var inst_12252 = (state_12260[(2)]);
var state_12260__$1 = state_12260;
var statearr_12288_13676 = state_12260__$1;
(statearr_12288_13676[(2)] = inst_12252);

(statearr_12288_13676[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12261 === (8))){
var inst_12242 = (state_12260[(7)]);
var state_12260__$1 = state_12260;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12260__$1,(11),out,inst_12242);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12289 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12289[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12289[(1)] = (1));

return statearr_12289;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_12260){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12260);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12290){var ex__9999__auto__ = e12290;
var statearr_12291_13678 = state_12260;
(statearr_12291_13678[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12260[(4)]))){
var statearr_12292_13679 = state_12260;
(statearr_12292_13679[(1)] = cljs.core.first((state_12260[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13680 = state_12260;
state_12260 = G__13680;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_12260){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_12260);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12293 = f__10208__auto__();
(statearr_12293[(6)] = c__10207__auto___13660);

return statearr_12293;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12301 = (function (f,ch,meta12296,_,fn1,meta12302){
this.f = f;
this.ch = ch;
this.meta12296 = meta12296;
this._ = _;
this.fn1 = fn1;
this.meta12302 = meta12302;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async12301.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12303,meta12302__$1){
var self__ = this;
var _12303__$1 = this;
return (new cljs.core.async.t_cljs$core$async12301(self__.f,self__.ch,self__.meta12296,self__._,self__.fn1,meta12302__$1));
}));

(cljs.core.async.t_cljs$core$async12301.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12303){
var self__ = this;
var _12303__$1 = this;
return self__.meta12302;
}));

(cljs.core.async.t_cljs$core$async12301.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12301.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async12301.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async12301.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__12294_SHARP_){
var G__12309 = (((p1__12294_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__12294_SHARP_) : self__.f.call(null,p1__12294_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__12309) : f1.call(null,G__12309));
});
}));

(cljs.core.async.t_cljs$core$async12301.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12296","meta12296",1393380357,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async12295","cljs.core.async/t_cljs$core$async12295",-1617790174,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta12302","meta12302",100812326,null)], null);
}));

(cljs.core.async.t_cljs$core$async12301.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async12301.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12301");

(cljs.core.async.t_cljs$core$async12301.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async12301");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async12301.
 */
cljs.core.async.__GT_t_cljs$core$async12301 = (function cljs$core$async$__GT_t_cljs$core$async12301(f,ch,meta12296,_,fn1,meta12302){
return (new cljs.core.async.t_cljs$core$async12301(f,ch,meta12296,_,fn1,meta12302));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12295 = (function (f,ch,meta12296){
this.f = f;
this.ch = ch;
this.meta12296 = meta12296;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12297,meta12296__$1){
var self__ = this;
var _12297__$1 = this;
return (new cljs.core.async.t_cljs$core$async12295(self__.f,self__.ch,meta12296__$1));
}));

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12297){
var self__ = this;
var _12297__$1 = this;
return self__.meta12296;
}));

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async12301(self__.f,self__.ch,self__.meta12296,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5000__auto__ = ret;
if(cljs.core.truth_(and__5000__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5000__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__12315 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__12315) : self__.f.call(null,G__12315));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12295.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async12295.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12296","meta12296",1393380357,null)], null);
}));

(cljs.core.async.t_cljs$core$async12295.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async12295.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12295");

(cljs.core.async.t_cljs$core$async12295.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async12295");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async12295.
 */
cljs.core.async.__GT_t_cljs$core$async12295 = (function cljs$core$async$__GT_t_cljs$core$async12295(f,ch,meta12296){
return (new cljs.core.async.t_cljs$core$async12295(f,ch,meta12296));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async12295(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12317 = (function (f,ch,meta12318){
this.f = f;
this.ch = ch;
this.meta12318 = meta12318;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12319,meta12318__$1){
var self__ = this;
var _12319__$1 = this;
return (new cljs.core.async.t_cljs$core$async12317(self__.f,self__.ch,meta12318__$1));
}));

(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12319){
var self__ = this;
var _12319__$1 = this;
return self__.meta12318;
}));

(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12317.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async12317.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12318","meta12318",1659190556,null)], null);
}));

(cljs.core.async.t_cljs$core$async12317.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async12317.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12317");

(cljs.core.async.t_cljs$core$async12317.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async12317");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async12317.
 */
cljs.core.async.__GT_t_cljs$core$async12317 = (function cljs$core$async$__GT_t_cljs$core$async12317(f,ch,meta12318){
return (new cljs.core.async.t_cljs$core$async12317(f,ch,meta12318));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async12317(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12344 = (function (p,ch,meta12345){
this.p = p;
this.ch = ch;
this.meta12345 = meta12345;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12346,meta12345__$1){
var self__ = this;
var _12346__$1 = this;
return (new cljs.core.async.t_cljs$core$async12344(self__.p,self__.ch,meta12345__$1));
}));

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12346){
var self__ = this;
var _12346__$1 = this;
return self__.meta12345;
}));

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async12344.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async12344.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12345","meta12345",959175176,null)], null);
}));

(cljs.core.async.t_cljs$core$async12344.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async12344.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12344");

(cljs.core.async.t_cljs$core$async12344.cljs$lang$ctorPrWriter = (function (this__5287__auto__,writer__5288__auto__,opt__5289__auto__){
return cljs.core._write(writer__5288__auto__,"cljs.core.async/t_cljs$core$async12344");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async12344.
 */
cljs.core.async.__GT_t_cljs$core$async12344 = (function cljs$core$async$__GT_t_cljs$core$async12344(p,ch,meta12345){
return (new cljs.core.async.t_cljs$core$async12344(p,ch,meta12345));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async12344(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__12353 = arguments.length;
switch (G__12353) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__10207__auto___13688 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12379){
var state_val_12380 = (state_12379[(1)]);
if((state_val_12380 === (7))){
var inst_12375 = (state_12379[(2)]);
var state_12379__$1 = state_12379;
var statearr_12381_13689 = state_12379__$1;
(statearr_12381_13689[(2)] = inst_12375);

(statearr_12381_13689[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (1))){
var state_12379__$1 = state_12379;
var statearr_12382_13691 = state_12379__$1;
(statearr_12382_13691[(2)] = null);

(statearr_12382_13691[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (4))){
var inst_12361 = (state_12379[(7)]);
var inst_12361__$1 = (state_12379[(2)]);
var inst_12362 = (inst_12361__$1 == null);
var state_12379__$1 = (function (){var statearr_12383 = state_12379;
(statearr_12383[(7)] = inst_12361__$1);

return statearr_12383;
})();
if(cljs.core.truth_(inst_12362)){
var statearr_12384_13692 = state_12379__$1;
(statearr_12384_13692[(1)] = (5));

} else {
var statearr_12386_13693 = state_12379__$1;
(statearr_12386_13693[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (6))){
var inst_12361 = (state_12379[(7)]);
var inst_12366 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_12361) : p.call(null,inst_12361));
var state_12379__$1 = state_12379;
if(cljs.core.truth_(inst_12366)){
var statearr_12393_13694 = state_12379__$1;
(statearr_12393_13694[(1)] = (8));

} else {
var statearr_12394_13695 = state_12379__$1;
(statearr_12394_13695[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (3))){
var inst_12377 = (state_12379[(2)]);
var state_12379__$1 = state_12379;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12379__$1,inst_12377);
} else {
if((state_val_12380 === (2))){
var state_12379__$1 = state_12379;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12379__$1,(4),ch);
} else {
if((state_val_12380 === (11))){
var inst_12369 = (state_12379[(2)]);
var state_12379__$1 = state_12379;
var statearr_12396_13707 = state_12379__$1;
(statearr_12396_13707[(2)] = inst_12369);

(statearr_12396_13707[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (9))){
var state_12379__$1 = state_12379;
var statearr_12397_13709 = state_12379__$1;
(statearr_12397_13709[(2)] = null);

(statearr_12397_13709[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (5))){
var inst_12364 = cljs.core.async.close_BANG_(out);
var state_12379__$1 = state_12379;
var statearr_12400_13710 = state_12379__$1;
(statearr_12400_13710[(2)] = inst_12364);

(statearr_12400_13710[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (10))){
var inst_12372 = (state_12379[(2)]);
var state_12379__$1 = (function (){var statearr_12401 = state_12379;
(statearr_12401[(8)] = inst_12372);

return statearr_12401;
})();
var statearr_12402_13711 = state_12379__$1;
(statearr_12402_13711[(2)] = null);

(statearr_12402_13711[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12380 === (8))){
var inst_12361 = (state_12379[(7)]);
var state_12379__$1 = state_12379;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12379__$1,(11),out,inst_12361);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12404 = [null,null,null,null,null,null,null,null,null];
(statearr_12404[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12404[(1)] = (1));

return statearr_12404;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_12379){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12379);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12406){var ex__9999__auto__ = e12406;
var statearr_12407_13713 = state_12379;
(statearr_12407_13713[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12379[(4)]))){
var statearr_12408_13715 = state_12379;
(statearr_12408_13715[(1)] = cljs.core.first((state_12379[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13717 = state_12379;
state_12379 = G__13717;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_12379){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_12379);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12409 = f__10208__auto__();
(statearr_12409[(6)] = c__10207__auto___13688);

return statearr_12409;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__12412 = arguments.length;
switch (G__12412) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__10207__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12478){
var state_val_12479 = (state_12478[(1)]);
if((state_val_12479 === (7))){
var inst_12474 = (state_12478[(2)]);
var state_12478__$1 = state_12478;
var statearr_12481_13722 = state_12478__$1;
(statearr_12481_13722[(2)] = inst_12474);

(statearr_12481_13722[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (20))){
var inst_12443 = (state_12478[(7)]);
var inst_12455 = (state_12478[(2)]);
var inst_12456 = cljs.core.next(inst_12443);
var inst_12429 = inst_12456;
var inst_12430 = null;
var inst_12431 = (0);
var inst_12432 = (0);
var state_12478__$1 = (function (){var statearr_12482 = state_12478;
(statearr_12482[(8)] = inst_12432);

(statearr_12482[(9)] = inst_12455);

(statearr_12482[(10)] = inst_12431);

(statearr_12482[(11)] = inst_12430);

(statearr_12482[(12)] = inst_12429);

return statearr_12482;
})();
var statearr_12483_13726 = state_12478__$1;
(statearr_12483_13726[(2)] = null);

(statearr_12483_13726[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (1))){
var state_12478__$1 = state_12478;
var statearr_12484_13727 = state_12478__$1;
(statearr_12484_13727[(2)] = null);

(statearr_12484_13727[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (4))){
var inst_12418 = (state_12478[(13)]);
var inst_12418__$1 = (state_12478[(2)]);
var inst_12419 = (inst_12418__$1 == null);
var state_12478__$1 = (function (){var statearr_12485 = state_12478;
(statearr_12485[(13)] = inst_12418__$1);

return statearr_12485;
})();
if(cljs.core.truth_(inst_12419)){
var statearr_12486_13729 = state_12478__$1;
(statearr_12486_13729[(1)] = (5));

} else {
var statearr_12487_13730 = state_12478__$1;
(statearr_12487_13730[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (15))){
var state_12478__$1 = state_12478;
var statearr_12491_13731 = state_12478__$1;
(statearr_12491_13731[(2)] = null);

(statearr_12491_13731[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (21))){
var state_12478__$1 = state_12478;
var statearr_12492_13732 = state_12478__$1;
(statearr_12492_13732[(2)] = null);

(statearr_12492_13732[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (13))){
var inst_12432 = (state_12478[(8)]);
var inst_12431 = (state_12478[(10)]);
var inst_12430 = (state_12478[(11)]);
var inst_12429 = (state_12478[(12)]);
var inst_12439 = (state_12478[(2)]);
var inst_12440 = (inst_12432 + (1));
var tmp12488 = inst_12431;
var tmp12489 = inst_12430;
var tmp12490 = inst_12429;
var inst_12429__$1 = tmp12490;
var inst_12430__$1 = tmp12489;
var inst_12431__$1 = tmp12488;
var inst_12432__$1 = inst_12440;
var state_12478__$1 = (function (){var statearr_12494 = state_12478;
(statearr_12494[(8)] = inst_12432__$1);

(statearr_12494[(10)] = inst_12431__$1);

(statearr_12494[(11)] = inst_12430__$1);

(statearr_12494[(14)] = inst_12439);

(statearr_12494[(12)] = inst_12429__$1);

return statearr_12494;
})();
var statearr_12495_13733 = state_12478__$1;
(statearr_12495_13733[(2)] = null);

(statearr_12495_13733[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (22))){
var state_12478__$1 = state_12478;
var statearr_12496_13734 = state_12478__$1;
(statearr_12496_13734[(2)] = null);

(statearr_12496_13734[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (6))){
var inst_12418 = (state_12478[(13)]);
var inst_12427 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_12418) : f.call(null,inst_12418));
var inst_12428 = cljs.core.seq(inst_12427);
var inst_12429 = inst_12428;
var inst_12430 = null;
var inst_12431 = (0);
var inst_12432 = (0);
var state_12478__$1 = (function (){var statearr_12497 = state_12478;
(statearr_12497[(8)] = inst_12432);

(statearr_12497[(10)] = inst_12431);

(statearr_12497[(11)] = inst_12430);

(statearr_12497[(12)] = inst_12429);

return statearr_12497;
})();
var statearr_12498_13737 = state_12478__$1;
(statearr_12498_13737[(2)] = null);

(statearr_12498_13737[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (17))){
var inst_12443 = (state_12478[(7)]);
var inst_12448 = cljs.core.chunk_first(inst_12443);
var inst_12449 = cljs.core.chunk_rest(inst_12443);
var inst_12450 = cljs.core.count(inst_12448);
var inst_12429 = inst_12449;
var inst_12430 = inst_12448;
var inst_12431 = inst_12450;
var inst_12432 = (0);
var state_12478__$1 = (function (){var statearr_12499 = state_12478;
(statearr_12499[(8)] = inst_12432);

(statearr_12499[(10)] = inst_12431);

(statearr_12499[(11)] = inst_12430);

(statearr_12499[(12)] = inst_12429);

return statearr_12499;
})();
var statearr_12501_13738 = state_12478__$1;
(statearr_12501_13738[(2)] = null);

(statearr_12501_13738[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (3))){
var inst_12476 = (state_12478[(2)]);
var state_12478__$1 = state_12478;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12478__$1,inst_12476);
} else {
if((state_val_12479 === (12))){
var inst_12464 = (state_12478[(2)]);
var state_12478__$1 = state_12478;
var statearr_12504_13739 = state_12478__$1;
(statearr_12504_13739[(2)] = inst_12464);

(statearr_12504_13739[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (2))){
var state_12478__$1 = state_12478;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12478__$1,(4),in$);
} else {
if((state_val_12479 === (23))){
var inst_12472 = (state_12478[(2)]);
var state_12478__$1 = state_12478;
var statearr_12505_13746 = state_12478__$1;
(statearr_12505_13746[(2)] = inst_12472);

(statearr_12505_13746[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (19))){
var inst_12459 = (state_12478[(2)]);
var state_12478__$1 = state_12478;
var statearr_12506_13747 = state_12478__$1;
(statearr_12506_13747[(2)] = inst_12459);

(statearr_12506_13747[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (11))){
var inst_12443 = (state_12478[(7)]);
var inst_12429 = (state_12478[(12)]);
var inst_12443__$1 = cljs.core.seq(inst_12429);
var state_12478__$1 = (function (){var statearr_12507 = state_12478;
(statearr_12507[(7)] = inst_12443__$1);

return statearr_12507;
})();
if(inst_12443__$1){
var statearr_12509_13749 = state_12478__$1;
(statearr_12509_13749[(1)] = (14));

} else {
var statearr_12510_13750 = state_12478__$1;
(statearr_12510_13750[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (9))){
var inst_12466 = (state_12478[(2)]);
var inst_12467 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_12478__$1 = (function (){var statearr_12511 = state_12478;
(statearr_12511[(15)] = inst_12466);

return statearr_12511;
})();
if(cljs.core.truth_(inst_12467)){
var statearr_12512_13752 = state_12478__$1;
(statearr_12512_13752[(1)] = (21));

} else {
var statearr_12513_13754 = state_12478__$1;
(statearr_12513_13754[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (5))){
var inst_12421 = cljs.core.async.close_BANG_(out);
var state_12478__$1 = state_12478;
var statearr_12514_13756 = state_12478__$1;
(statearr_12514_13756[(2)] = inst_12421);

(statearr_12514_13756[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (14))){
var inst_12443 = (state_12478[(7)]);
var inst_12446 = cljs.core.chunked_seq_QMARK_(inst_12443);
var state_12478__$1 = state_12478;
if(inst_12446){
var statearr_12516_13758 = state_12478__$1;
(statearr_12516_13758[(1)] = (17));

} else {
var statearr_12517_13759 = state_12478__$1;
(statearr_12517_13759[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (16))){
var inst_12462 = (state_12478[(2)]);
var state_12478__$1 = state_12478;
var statearr_12518_13760 = state_12478__$1;
(statearr_12518_13760[(2)] = inst_12462);

(statearr_12518_13760[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12479 === (10))){
var inst_12432 = (state_12478[(8)]);
var inst_12430 = (state_12478[(11)]);
var inst_12437 = cljs.core._nth(inst_12430,inst_12432);
var state_12478__$1 = state_12478;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12478__$1,(13),out,inst_12437);
} else {
if((state_val_12479 === (18))){
var inst_12443 = (state_12478[(7)]);
var inst_12453 = cljs.core.first(inst_12443);
var state_12478__$1 = state_12478;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12478__$1,(20),out,inst_12453);
} else {
if((state_val_12479 === (8))){
var inst_12432 = (state_12478[(8)]);
var inst_12431 = (state_12478[(10)]);
var inst_12434 = (inst_12432 < inst_12431);
var inst_12435 = inst_12434;
var state_12478__$1 = state_12478;
if(cljs.core.truth_(inst_12435)){
var statearr_12519_13762 = state_12478__$1;
(statearr_12519_13762[(1)] = (10));

} else {
var statearr_12520_13763 = state_12478__$1;
(statearr_12520_13763[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__9996__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__9996__auto____0 = (function (){
var statearr_12521 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12521[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__9996__auto__);

(statearr_12521[(1)] = (1));

return statearr_12521;
});
var cljs$core$async$mapcat_STAR__$_state_machine__9996__auto____1 = (function (state_12478){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12478);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12524){var ex__9999__auto__ = e12524;
var statearr_12525_13766 = state_12478;
(statearr_12525_13766[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12478[(4)]))){
var statearr_12526_13767 = state_12478;
(statearr_12526_13767[(1)] = cljs.core.first((state_12478[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13768 = state_12478;
state_12478 = G__13768;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__9996__auto__ = function(state_12478){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__9996__auto____1.call(this,state_12478);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__9996__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__9996__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12528 = f__10208__auto__();
(statearr_12528[(6)] = c__10207__auto__);

return statearr_12528;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));

return c__10207__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__12531 = arguments.length;
switch (G__12531) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__12534 = arguments.length;
switch (G__12534) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__12536 = arguments.length;
switch (G__12536) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__10207__auto___13772 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12562){
var state_val_12563 = (state_12562[(1)]);
if((state_val_12563 === (7))){
var inst_12557 = (state_12562[(2)]);
var state_12562__$1 = state_12562;
var statearr_12566_13773 = state_12562__$1;
(statearr_12566_13773[(2)] = inst_12557);

(statearr_12566_13773[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12563 === (1))){
var inst_12539 = null;
var state_12562__$1 = (function (){var statearr_12568 = state_12562;
(statearr_12568[(7)] = inst_12539);

return statearr_12568;
})();
var statearr_12569_13774 = state_12562__$1;
(statearr_12569_13774[(2)] = null);

(statearr_12569_13774[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12563 === (4))){
var inst_12542 = (state_12562[(8)]);
var inst_12542__$1 = (state_12562[(2)]);
var inst_12543 = (inst_12542__$1 == null);
var inst_12544 = cljs.core.not(inst_12543);
var state_12562__$1 = (function (){var statearr_12570 = state_12562;
(statearr_12570[(8)] = inst_12542__$1);

return statearr_12570;
})();
if(inst_12544){
var statearr_12572_13775 = state_12562__$1;
(statearr_12572_13775[(1)] = (5));

} else {
var statearr_12573_13776 = state_12562__$1;
(statearr_12573_13776[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12563 === (6))){
var state_12562__$1 = state_12562;
var statearr_12574_13777 = state_12562__$1;
(statearr_12574_13777[(2)] = null);

(statearr_12574_13777[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12563 === (3))){
var inst_12559 = (state_12562[(2)]);
var inst_12560 = cljs.core.async.close_BANG_(out);
var state_12562__$1 = (function (){var statearr_12575 = state_12562;
(statearr_12575[(9)] = inst_12559);

return statearr_12575;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_12562__$1,inst_12560);
} else {
if((state_val_12563 === (2))){
var state_12562__$1 = state_12562;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12562__$1,(4),ch);
} else {
if((state_val_12563 === (11))){
var inst_12542 = (state_12562[(8)]);
var inst_12551 = (state_12562[(2)]);
var inst_12539 = inst_12542;
var state_12562__$1 = (function (){var statearr_12576 = state_12562;
(statearr_12576[(10)] = inst_12551);

(statearr_12576[(7)] = inst_12539);

return statearr_12576;
})();
var statearr_12578_13778 = state_12562__$1;
(statearr_12578_13778[(2)] = null);

(statearr_12578_13778[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12563 === (9))){
var inst_12542 = (state_12562[(8)]);
var state_12562__$1 = state_12562;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12562__$1,(11),out,inst_12542);
} else {
if((state_val_12563 === (5))){
var inst_12542 = (state_12562[(8)]);
var inst_12539 = (state_12562[(7)]);
var inst_12546 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_12542,inst_12539);
var state_12562__$1 = state_12562;
if(inst_12546){
var statearr_12580_13779 = state_12562__$1;
(statearr_12580_13779[(1)] = (8));

} else {
var statearr_12581_13780 = state_12562__$1;
(statearr_12581_13780[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12563 === (10))){
var inst_12554 = (state_12562[(2)]);
var state_12562__$1 = state_12562;
var statearr_12582_13781 = state_12562__$1;
(statearr_12582_13781[(2)] = inst_12554);

(statearr_12582_13781[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12563 === (8))){
var inst_12539 = (state_12562[(7)]);
var tmp12579 = inst_12539;
var inst_12539__$1 = tmp12579;
var state_12562__$1 = (function (){var statearr_12584 = state_12562;
(statearr_12584[(7)] = inst_12539__$1);

return statearr_12584;
})();
var statearr_12586_13782 = state_12562__$1;
(statearr_12586_13782[(2)] = null);

(statearr_12586_13782[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12587 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12587[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12587[(1)] = (1));

return statearr_12587;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_12562){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12562);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12588){var ex__9999__auto__ = e12588;
var statearr_12589_13785 = state_12562;
(statearr_12589_13785[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12562[(4)]))){
var statearr_12590_13786 = state_12562;
(statearr_12590_13786[(1)] = cljs.core.first((state_12562[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13788 = state_12562;
state_12562 = G__13788;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_12562){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_12562);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12591 = f__10208__auto__();
(statearr_12591[(6)] = c__10207__auto___13772);

return statearr_12591;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__12593 = arguments.length;
switch (G__12593) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__10207__auto___13793 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12632){
var state_val_12633 = (state_12632[(1)]);
if((state_val_12633 === (7))){
var inst_12628 = (state_12632[(2)]);
var state_12632__$1 = state_12632;
var statearr_12635_13796 = state_12632__$1;
(statearr_12635_13796[(2)] = inst_12628);

(statearr_12635_13796[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (1))){
var inst_12594 = (new Array(n));
var inst_12595 = inst_12594;
var inst_12596 = (0);
var state_12632__$1 = (function (){var statearr_12636 = state_12632;
(statearr_12636[(7)] = inst_12595);

(statearr_12636[(8)] = inst_12596);

return statearr_12636;
})();
var statearr_12640_13798 = state_12632__$1;
(statearr_12640_13798[(2)] = null);

(statearr_12640_13798[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (4))){
var inst_12600 = (state_12632[(9)]);
var inst_12600__$1 = (state_12632[(2)]);
var inst_12601 = (inst_12600__$1 == null);
var inst_12602 = cljs.core.not(inst_12601);
var state_12632__$1 = (function (){var statearr_12642 = state_12632;
(statearr_12642[(9)] = inst_12600__$1);

return statearr_12642;
})();
if(inst_12602){
var statearr_12648_13800 = state_12632__$1;
(statearr_12648_13800[(1)] = (5));

} else {
var statearr_12649_13802 = state_12632__$1;
(statearr_12649_13802[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (15))){
var inst_12622 = (state_12632[(2)]);
var state_12632__$1 = state_12632;
var statearr_12654_13804 = state_12632__$1;
(statearr_12654_13804[(2)] = inst_12622);

(statearr_12654_13804[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (13))){
var state_12632__$1 = state_12632;
var statearr_12655_13805 = state_12632__$1;
(statearr_12655_13805[(2)] = null);

(statearr_12655_13805[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (6))){
var inst_12596 = (state_12632[(8)]);
var inst_12618 = (inst_12596 > (0));
var state_12632__$1 = state_12632;
if(cljs.core.truth_(inst_12618)){
var statearr_12662_13806 = state_12632__$1;
(statearr_12662_13806[(1)] = (12));

} else {
var statearr_12663_13807 = state_12632__$1;
(statearr_12663_13807[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (3))){
var inst_12630 = (state_12632[(2)]);
var state_12632__$1 = state_12632;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12632__$1,inst_12630);
} else {
if((state_val_12633 === (12))){
var inst_12595 = (state_12632[(7)]);
var inst_12620 = cljs.core.vec(inst_12595);
var state_12632__$1 = state_12632;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12632__$1,(15),out,inst_12620);
} else {
if((state_val_12633 === (2))){
var state_12632__$1 = state_12632;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12632__$1,(4),ch);
} else {
if((state_val_12633 === (11))){
var inst_12612 = (state_12632[(2)]);
var inst_12613 = (new Array(n));
var inst_12595 = inst_12613;
var inst_12596 = (0);
var state_12632__$1 = (function (){var statearr_12672 = state_12632;
(statearr_12672[(7)] = inst_12595);

(statearr_12672[(8)] = inst_12596);

(statearr_12672[(10)] = inst_12612);

return statearr_12672;
})();
var statearr_12674_13809 = state_12632__$1;
(statearr_12674_13809[(2)] = null);

(statearr_12674_13809[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (9))){
var inst_12595 = (state_12632[(7)]);
var inst_12610 = cljs.core.vec(inst_12595);
var state_12632__$1 = state_12632;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12632__$1,(11),out,inst_12610);
} else {
if((state_val_12633 === (5))){
var inst_12595 = (state_12632[(7)]);
var inst_12596 = (state_12632[(8)]);
var inst_12600 = (state_12632[(9)]);
var inst_12605 = (state_12632[(11)]);
var inst_12604 = (inst_12595[inst_12596] = inst_12600);
var inst_12605__$1 = (inst_12596 + (1));
var inst_12606 = (inst_12605__$1 < n);
var state_12632__$1 = (function (){var statearr_12699 = state_12632;
(statearr_12699[(11)] = inst_12605__$1);

(statearr_12699[(12)] = inst_12604);

return statearr_12699;
})();
if(cljs.core.truth_(inst_12606)){
var statearr_12701_13812 = state_12632__$1;
(statearr_12701_13812[(1)] = (8));

} else {
var statearr_12707_13814 = state_12632__$1;
(statearr_12707_13814[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (14))){
var inst_12625 = (state_12632[(2)]);
var inst_12626 = cljs.core.async.close_BANG_(out);
var state_12632__$1 = (function (){var statearr_12717 = state_12632;
(statearr_12717[(13)] = inst_12625);

return statearr_12717;
})();
var statearr_12719_13815 = state_12632__$1;
(statearr_12719_13815[(2)] = inst_12626);

(statearr_12719_13815[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (10))){
var inst_12616 = (state_12632[(2)]);
var state_12632__$1 = state_12632;
var statearr_12730_13816 = state_12632__$1;
(statearr_12730_13816[(2)] = inst_12616);

(statearr_12730_13816[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12633 === (8))){
var inst_12595 = (state_12632[(7)]);
var inst_12605 = (state_12632[(11)]);
var tmp12714 = inst_12595;
var inst_12595__$1 = tmp12714;
var inst_12596 = inst_12605;
var state_12632__$1 = (function (){var statearr_12737 = state_12632;
(statearr_12737[(7)] = inst_12595__$1);

(statearr_12737[(8)] = inst_12596);

return statearr_12737;
})();
var statearr_12738_13818 = state_12632__$1;
(statearr_12738_13818[(2)] = null);

(statearr_12738_13818[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12746 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12746[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12746[(1)] = (1));

return statearr_12746;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_12632){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12632);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12749){var ex__9999__auto__ = e12749;
var statearr_12750_13821 = state_12632;
(statearr_12750_13821[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12632[(4)]))){
var statearr_12751_13822 = state_12632;
(statearr_12751_13822[(1)] = cljs.core.first((state_12632[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13823 = state_12632;
state_12632 = G__13823;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_12632){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_12632);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12753 = f__10208__auto__();
(statearr_12753[(6)] = c__10207__auto___13793);

return statearr_12753;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__12761 = arguments.length;
switch (G__12761) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__10207__auto___13826 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__10208__auto__ = (function (){var switch__9995__auto__ = (function (state_12826){
var state_val_12827 = (state_12826[(1)]);
if((state_val_12827 === (7))){
var inst_12822 = (state_12826[(2)]);
var state_12826__$1 = state_12826;
var statearr_12829_13827 = state_12826__$1;
(statearr_12829_13827[(2)] = inst_12822);

(statearr_12829_13827[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (1))){
var inst_12767 = [];
var inst_12768 = inst_12767;
var inst_12769 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_12826__$1 = (function (){var statearr_12830 = state_12826;
(statearr_12830[(7)] = inst_12768);

(statearr_12830[(8)] = inst_12769);

return statearr_12830;
})();
var statearr_12831_13828 = state_12826__$1;
(statearr_12831_13828[(2)] = null);

(statearr_12831_13828[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (4))){
var inst_12772 = (state_12826[(9)]);
var inst_12772__$1 = (state_12826[(2)]);
var inst_12773 = (inst_12772__$1 == null);
var inst_12774 = cljs.core.not(inst_12773);
var state_12826__$1 = (function (){var statearr_12834 = state_12826;
(statearr_12834[(9)] = inst_12772__$1);

return statearr_12834;
})();
if(inst_12774){
var statearr_12837_13829 = state_12826__$1;
(statearr_12837_13829[(1)] = (5));

} else {
var statearr_12838_13830 = state_12826__$1;
(statearr_12838_13830[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (15))){
var inst_12768 = (state_12826[(7)]);
var inst_12814 = cljs.core.vec(inst_12768);
var state_12826__$1 = state_12826;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12826__$1,(18),out,inst_12814);
} else {
if((state_val_12827 === (13))){
var inst_12806 = (state_12826[(2)]);
var state_12826__$1 = state_12826;
var statearr_12844_13831 = state_12826__$1;
(statearr_12844_13831[(2)] = inst_12806);

(statearr_12844_13831[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (6))){
var inst_12768 = (state_12826[(7)]);
var inst_12808 = inst_12768.length;
var inst_12809 = (inst_12808 > (0));
var state_12826__$1 = state_12826;
if(cljs.core.truth_(inst_12809)){
var statearr_12846_13834 = state_12826__$1;
(statearr_12846_13834[(1)] = (15));

} else {
var statearr_12847_13836 = state_12826__$1;
(statearr_12847_13836[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (17))){
var inst_12819 = (state_12826[(2)]);
var inst_12820 = cljs.core.async.close_BANG_(out);
var state_12826__$1 = (function (){var statearr_12848 = state_12826;
(statearr_12848[(10)] = inst_12819);

return statearr_12848;
})();
var statearr_12849_13840 = state_12826__$1;
(statearr_12849_13840[(2)] = inst_12820);

(statearr_12849_13840[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (3))){
var inst_12824 = (state_12826[(2)]);
var state_12826__$1 = state_12826;
return cljs.core.async.impl.ioc_helpers.return_chan(state_12826__$1,inst_12824);
} else {
if((state_val_12827 === (12))){
var inst_12768 = (state_12826[(7)]);
var inst_12791 = cljs.core.vec(inst_12768);
var state_12826__$1 = state_12826;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_12826__$1,(14),out,inst_12791);
} else {
if((state_val_12827 === (2))){
var state_12826__$1 = state_12826;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_12826__$1,(4),ch);
} else {
if((state_val_12827 === (11))){
var inst_12768 = (state_12826[(7)]);
var inst_12776 = (state_12826[(11)]);
var inst_12772 = (state_12826[(9)]);
var inst_12788 = inst_12768.push(inst_12772);
var tmp12851 = inst_12768;
var inst_12768__$1 = tmp12851;
var inst_12769 = inst_12776;
var state_12826__$1 = (function (){var statearr_12852 = state_12826;
(statearr_12852[(7)] = inst_12768__$1);

(statearr_12852[(8)] = inst_12769);

(statearr_12852[(12)] = inst_12788);

return statearr_12852;
})();
var statearr_12853_13857 = state_12826__$1;
(statearr_12853_13857[(2)] = null);

(statearr_12853_13857[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (9))){
var inst_12769 = (state_12826[(8)]);
var inst_12780 = cljs.core.keyword_identical_QMARK_(inst_12769,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_12826__$1 = state_12826;
var statearr_12854_13863 = state_12826__$1;
(statearr_12854_13863[(2)] = inst_12780);

(statearr_12854_13863[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (5))){
var inst_12777 = (state_12826[(13)]);
var inst_12776 = (state_12826[(11)]);
var inst_12769 = (state_12826[(8)]);
var inst_12772 = (state_12826[(9)]);
var inst_12776__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_12772) : f.call(null,inst_12772));
var inst_12777__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_12776__$1,inst_12769);
var state_12826__$1 = (function (){var statearr_12859 = state_12826;
(statearr_12859[(13)] = inst_12777__$1);

(statearr_12859[(11)] = inst_12776__$1);

return statearr_12859;
})();
if(inst_12777__$1){
var statearr_12860_13864 = state_12826__$1;
(statearr_12860_13864[(1)] = (8));

} else {
var statearr_12865_13866 = state_12826__$1;
(statearr_12865_13866[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (14))){
var inst_12776 = (state_12826[(11)]);
var inst_12772 = (state_12826[(9)]);
var inst_12797 = (state_12826[(2)]);
var inst_12802 = [];
var inst_12803 = inst_12802.push(inst_12772);
var inst_12768 = inst_12802;
var inst_12769 = inst_12776;
var state_12826__$1 = (function (){var statearr_12870 = state_12826;
(statearr_12870[(7)] = inst_12768);

(statearr_12870[(14)] = inst_12797);

(statearr_12870[(15)] = inst_12803);

(statearr_12870[(8)] = inst_12769);

return statearr_12870;
})();
var statearr_12871_13867 = state_12826__$1;
(statearr_12871_13867[(2)] = null);

(statearr_12871_13867[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (16))){
var state_12826__$1 = state_12826;
var statearr_12872_13868 = state_12826__$1;
(statearr_12872_13868[(2)] = null);

(statearr_12872_13868[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (10))){
var inst_12782 = (state_12826[(2)]);
var state_12826__$1 = state_12826;
if(cljs.core.truth_(inst_12782)){
var statearr_12873_13870 = state_12826__$1;
(statearr_12873_13870[(1)] = (11));

} else {
var statearr_12874_13874 = state_12826__$1;
(statearr_12874_13874[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (18))){
var inst_12816 = (state_12826[(2)]);
var state_12826__$1 = state_12826;
var statearr_12875_13875 = state_12826__$1;
(statearr_12875_13875[(2)] = inst_12816);

(statearr_12875_13875[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12827 === (8))){
var inst_12777 = (state_12826[(13)]);
var state_12826__$1 = state_12826;
var statearr_12876_13876 = state_12826__$1;
(statearr_12876_13876[(2)] = inst_12777);

(statearr_12876_13876[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__9996__auto__ = null;
var cljs$core$async$state_machine__9996__auto____0 = (function (){
var statearr_12881 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12881[(0)] = cljs$core$async$state_machine__9996__auto__);

(statearr_12881[(1)] = (1));

return statearr_12881;
});
var cljs$core$async$state_machine__9996__auto____1 = (function (state_12826){
while(true){
var ret_value__9997__auto__ = (function (){try{while(true){
var result__9998__auto__ = switch__9995__auto__(state_12826);
if(cljs.core.keyword_identical_QMARK_(result__9998__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__9998__auto__;
}
break;
}
}catch (e12882){var ex__9999__auto__ = e12882;
var statearr_12883_13880 = state_12826;
(statearr_12883_13880[(2)] = ex__9999__auto__);


if(cljs.core.seq((state_12826[(4)]))){
var statearr_12884_13881 = state_12826;
(statearr_12884_13881[(1)] = cljs.core.first((state_12826[(4)])));

} else {
throw ex__9999__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__9997__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13882 = state_12826;
state_12826 = G__13882;
continue;
} else {
return ret_value__9997__auto__;
}
break;
}
});
cljs$core$async$state_machine__9996__auto__ = function(state_12826){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__9996__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__9996__auto____1.call(this,state_12826);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__9996__auto____0;
cljs$core$async$state_machine__9996__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__9996__auto____1;
return cljs$core$async$state_machine__9996__auto__;
})()
})();
var state__10209__auto__ = (function (){var statearr_12893 = f__10208__auto__();
(statearr_12893[(6)] = c__10207__auto___13826);

return statearr_12893;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__10209__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
