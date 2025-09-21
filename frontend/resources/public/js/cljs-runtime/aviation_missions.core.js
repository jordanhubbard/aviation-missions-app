goog.provide('aviation_missions.core');
if((typeof aviation_missions !== 'undefined') && (typeof aviation_missions.core !== 'undefined') && (typeof aviation_missions.core.app_state !== 'undefined')){
} else {
aviation_missions.core.app_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"edit-mission-id","edit-mission-id",-1879290907),new cljs.core.Keyword(null,"login-dialog-open","login-dialog-open",845923398),new cljs.core.Keyword(null,"mission-details-loading","mission-details-loading",133475783),new cljs.core.Keyword(null,"page-number","page-number",556880104),new cljs.core.Keyword(null,"submissions","submissions",248615114),new cljs.core.Keyword(null,"mission-details","mission-details",-850239280),new cljs.core.Keyword(null,"create-dialog-open","create-dialog-open",771901202),new cljs.core.Keyword(null,"login-credentials","login-credentials",925412435),new cljs.core.Keyword(null,"loading","loading",-737050189),new cljs.core.Keyword(null,"admin-token","admin-token",-891410220),new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798),new cljs.core.Keyword(null,"pending-updates","pending-updates",-942903722),new cljs.core.Keyword(null,"missions-per-page","missions-per-page",1078906969),new cljs.core.Keyword(null,"selected-mission-id","selected-mission-id",-442618885),new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"admin-name","admin-name",723821790),new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),new cljs.core.Keyword(null,"edit-dialog-open","edit-dialog-open",1061074430),new cljs.core.Keyword(null,"missions","missions",2065000991)],[null,false,false,(1),cljs.core.PersistentVector.EMPTY,null,false,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"admin_name","admin_name",-391736032),"",new cljs.core.Keyword(null,"password","password",417022471),""], null),false,null,false,cljs.core.PersistentVector.EMPTY,(8),null,new cljs.core.Keyword(null,"missions","missions",2065000991),null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"title","title",636505583),"",new cljs.core.Keyword(null,"category","category",-593092832),"Training",new cljs.core.Keyword(null,"difficulty","difficulty",755680807),(1),new cljs.core.Keyword(null,"objective","objective",1301058585),"",new cljs.core.Keyword(null,"mission_description","mission_description",-974904226),"",new cljs.core.Keyword(null,"why_description","why_description",1681539809),""], null),false,cljs.core.PersistentVector.EMPTY]));
}
aviation_missions.core.admin_login = (function aviation_missions$core$admin_login(credentials){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_7808){
var state_val_7809 = (state_7808[(1)]);
if((state_val_7809 === (1))){
var inst_7781 = [aviation_missions.config.api_base_url,"/admin/login"].join('');
var inst_7782 = [new cljs.core.Keyword(null,"json-params","json-params",-1112693596)];
var inst_7783 = [credentials];
var inst_7784 = cljs.core.PersistentHashMap.fromArrays(inst_7782,inst_7783);
var inst_7785 = cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(inst_7781,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_7784], 0));
var state_7808__$1 = state_7808;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_7808__$1,(2),inst_7785);
} else {
if((state_val_7809 === (2))){
var inst_7787 = (state_7808[(7)]);
var inst_7787__$1 = (state_7808[(2)]);
var inst_7788 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_7787__$1);
var inst_7789 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_7788);
var state_7808__$1 = (function (){var statearr_7810 = state_7808;
(statearr_7810[(7)] = inst_7787__$1);

return statearr_7810;
})();
if(inst_7789){
var statearr_7811_8305 = state_7808__$1;
(statearr_7811_8305[(1)] = (3));

} else {
var statearr_7812_8306 = state_7808__$1;
(statearr_7812_8306[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7809 === (3))){
var inst_7787 = (state_7808[(7)]);
var inst_7791 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7787);
var inst_7792 = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(inst_7791);
var inst_7793 = new cljs.core.Keyword(null,"admin_name","admin_name",-391736032).cljs$core$IFn$_invoke$arity$1(inst_7791);
var inst_7794 = console.log("Admin login successful");
var inst_7795 = [new cljs.core.Keyword(null,"admin_name","admin_name",-391736032),new cljs.core.Keyword(null,"password","password",417022471)];
var inst_7796 = ["",""];
var inst_7797 = cljs.core.PersistentHashMap.fromArrays(inst_7795,inst_7796);
var inst_7798 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798),true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"admin-token","admin-token",-891410220),inst_7792,new cljs.core.Keyword(null,"admin-name","admin-name",723821790),inst_7793,new cljs.core.Keyword(null,"login-dialog-open","login-dialog-open",845923398),false,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"admin","admin",-1239101627),new cljs.core.Keyword(null,"login-credentials","login-credentials",925412435),inst_7797], 0));
var inst_7799 = localStorage.setItem("admin-token",inst_7792);
var inst_7800 = localStorage.setItem("admin-name",inst_7793);
var state_7808__$1 = (function (){var statearr_7813 = state_7808;
(statearr_7813[(8)] = inst_7799);

(statearr_7813[(9)] = inst_7798);

(statearr_7813[(10)] = inst_7794);

return statearr_7813;
})();
var statearr_7814_8307 = state_7808__$1;
(statearr_7814_8307[(2)] = inst_7800);

(statearr_7814_8307[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7809 === (4))){
var inst_7787 = (state_7808[(7)]);
var inst_7802 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7787);
var inst_7803 = console.error("Admin login failed:",inst_7802);
var inst_7804 = alert("Login failed. Please check your credentials.");
var state_7808__$1 = (function (){var statearr_7815 = state_7808;
(statearr_7815[(11)] = inst_7803);

return statearr_7815;
})();
var statearr_7816_8308 = state_7808__$1;
(statearr_7816_8308[(2)] = inst_7804);

(statearr_7816_8308[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7809 === (5))){
var inst_7806 = (state_7808[(2)]);
var state_7808__$1 = state_7808;
return cljs.core.async.impl.ioc_helpers.return_chan(state_7808__$1,inst_7806);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$admin_login_$_state_machine__7514__auto__ = null;
var aviation_missions$core$admin_login_$_state_machine__7514__auto____0 = (function (){
var statearr_7817 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_7817[(0)] = aviation_missions$core$admin_login_$_state_machine__7514__auto__);

(statearr_7817[(1)] = (1));

return statearr_7817;
});
var aviation_missions$core$admin_login_$_state_machine__7514__auto____1 = (function (state_7808){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_7808);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e7818){var ex__7517__auto__ = e7818;
var statearr_7819_8309 = state_7808;
(statearr_7819_8309[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_7808[(4)]))){
var statearr_7820_8310 = state_7808;
(statearr_7820_8310[(1)] = cljs.core.first((state_7808[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8311 = state_7808;
state_7808 = G__8311;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$admin_login_$_state_machine__7514__auto__ = function(state_7808){
switch(arguments.length){
case 0:
return aviation_missions$core$admin_login_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$admin_login_$_state_machine__7514__auto____1.call(this,state_7808);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$admin_login_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$admin_login_$_state_machine__7514__auto____0;
aviation_missions$core$admin_login_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$admin_login_$_state_machine__7514__auto____1;
return aviation_missions$core$admin_login_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_7821 = f__7591__auto__();
(statearr_7821[(6)] = c__7590__auto__);

return statearr_7821;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
});
aviation_missions.core.admin_logout = (function aviation_missions$core$admin_logout(){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798),false,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"admin-token","admin-token",-891410220),null,new cljs.core.Keyword(null,"admin-name","admin-name",723821790),null,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"missions","missions",2065000991)], 0));

localStorage.removeItem("admin-token");

localStorage.removeItem("admin-name");

return console.log("Admin logged out");
});
aviation_missions.core.check_admin_status = (function aviation_missions$core$check_admin_status(){

var stored_token = localStorage.getItem("admin-token");
var stored_name = localStorage.getItem("admin-name");
if(cljs.core.truth_((function (){var and__5000__auto__ = stored_token;
if(cljs.core.truth_(and__5000__auto__)){
return stored_name;
} else {
return and__5000__auto__;
}
})())){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_7850){
var state_val_7851 = (state_7850[(1)]);
if((state_val_7851 === (1))){
var inst_7822 = [aviation_missions.config.api_base_url,"/admin/status"].join('');
var inst_7823 = [new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_7824 = ["Authorization"];
var inst_7825 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(stored_token)].join('');
var inst_7826 = [inst_7825];
var inst_7827 = cljs.core.PersistentHashMap.fromArrays(inst_7824,inst_7826);
var inst_7828 = [inst_7827];
var inst_7829 = cljs.core.PersistentHashMap.fromArrays(inst_7823,inst_7828);
var inst_7830 = cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(inst_7822,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_7829], 0));
var state_7850__$1 = state_7850;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_7850__$1,(2),inst_7830);
} else {
if((state_val_7851 === (2))){
var inst_7832 = (state_7850[(7)]);
var inst_7834 = (state_7850[(8)]);
var inst_7832__$1 = (state_7850[(2)]);
var inst_7833 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_7832__$1);
var inst_7834__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_7833);
var state_7850__$1 = (function (){var statearr_7852 = state_7850;
(statearr_7852[(7)] = inst_7832__$1);

(statearr_7852[(8)] = inst_7834__$1);

return statearr_7852;
})();
if(inst_7834__$1){
var statearr_7853_8312 = state_7850__$1;
(statearr_7853_8312[(1)] = (3));

} else {
var statearr_7854_8313 = state_7850__$1;
(statearr_7854_8313[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7851 === (3))){
var inst_7832 = (state_7850[(7)]);
var inst_7836 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7832);
var inst_7837 = new cljs.core.Keyword(null,"is_admin","is_admin",1660377453).cljs$core$IFn$_invoke$arity$1(inst_7836);
var state_7850__$1 = state_7850;
var statearr_7855_8314 = state_7850__$1;
(statearr_7855_8314[(2)] = inst_7837);

(statearr_7855_8314[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7851 === (4))){
var inst_7834 = (state_7850[(8)]);
var state_7850__$1 = state_7850;
var statearr_7856_8315 = state_7850__$1;
(statearr_7856_8315[(2)] = inst_7834);

(statearr_7856_8315[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7851 === (5))){
var inst_7840 = (state_7850[(2)]);
var state_7850__$1 = state_7850;
if(cljs.core.truth_(inst_7840)){
var statearr_7857_8316 = state_7850__$1;
(statearr_7857_8316[(1)] = (6));

} else {
var statearr_7858_8317 = state_7850__$1;
(statearr_7858_8317[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7851 === (6))){
var inst_7842 = console.log("Admin session restored");
var inst_7843 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798),true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"admin-token","admin-token",-891410220),stored_token,new cljs.core.Keyword(null,"admin-name","admin-name",723821790),stored_name], 0));
var state_7850__$1 = (function (){var statearr_7859 = state_7850;
(statearr_7859[(9)] = inst_7842);

return statearr_7859;
})();
var statearr_7860_8318 = state_7850__$1;
(statearr_7860_8318[(2)] = inst_7843);

(statearr_7860_8318[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7851 === (7))){
var inst_7845 = console.log("Admin session expired");
var inst_7846 = aviation_missions.core.admin_logout();
var state_7850__$1 = (function (){var statearr_7861 = state_7850;
(statearr_7861[(10)] = inst_7845);

return statearr_7861;
})();
var statearr_7862_8319 = state_7850__$1;
(statearr_7862_8319[(2)] = inst_7846);

(statearr_7862_8319[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7851 === (8))){
var inst_7848 = (state_7850[(2)]);
var state_7850__$1 = state_7850;
return cljs.core.async.impl.ioc_helpers.return_chan(state_7850__$1,inst_7848);
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
});
return (function() {
var aviation_missions$core$check_admin_status_$_state_machine__7514__auto__ = null;
var aviation_missions$core$check_admin_status_$_state_machine__7514__auto____0 = (function (){
var statearr_7863 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_7863[(0)] = aviation_missions$core$check_admin_status_$_state_machine__7514__auto__);

(statearr_7863[(1)] = (1));

return statearr_7863;
});
var aviation_missions$core$check_admin_status_$_state_machine__7514__auto____1 = (function (state_7850){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_7850);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e7864){var ex__7517__auto__ = e7864;
var statearr_7865_8320 = state_7850;
(statearr_7865_8320[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_7850[(4)]))){
var statearr_7866_8321 = state_7850;
(statearr_7866_8321[(1)] = cljs.core.first((state_7850[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8322 = state_7850;
state_7850 = G__8322;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$check_admin_status_$_state_machine__7514__auto__ = function(state_7850){
switch(arguments.length){
case 0:
return aviation_missions$core$check_admin_status_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$check_admin_status_$_state_machine__7514__auto____1.call(this,state_7850);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$check_admin_status_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$check_admin_status_$_state_machine__7514__auto____0;
aviation_missions$core$check_admin_status_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$check_admin_status_$_state_machine__7514__auto____1;
return aviation_missions$core$check_admin_status_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_7867 = f__7591__auto__();
(statearr_7867[(6)] = c__7590__auto__);

return statearr_7867;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
} else {
return null;
}
});
aviation_missions.core.fetch_submissions = (function aviation_missions$core$fetch_submissions(){

if(cljs.core.truth_(new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_7893){
var state_val_7894 = (state_7893[(1)]);
if((state_val_7894 === (1))){
var inst_7868 = [aviation_missions.config.api_base_url,"/submissions"].join('');
var inst_7869 = [new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_7870 = ["Authorization"];
var inst_7871 = cljs.core.deref(aviation_missions.core.app_state);
var inst_7872 = new cljs.core.Keyword(null,"admin-token","admin-token",-891410220).cljs$core$IFn$_invoke$arity$1(inst_7871);
var inst_7873 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_7872)].join('');
var inst_7874 = [inst_7873];
var inst_7875 = cljs.core.PersistentHashMap.fromArrays(inst_7870,inst_7874);
var inst_7876 = [inst_7875];
var inst_7877 = cljs.core.PersistentHashMap.fromArrays(inst_7869,inst_7876);
var inst_7878 = cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(inst_7868,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_7877], 0));
var state_7893__$1 = state_7893;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_7893__$1,(2),inst_7878);
} else {
if((state_val_7894 === (2))){
var inst_7880 = (state_7893[(7)]);
var inst_7880__$1 = (state_7893[(2)]);
var inst_7881 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_7880__$1);
var inst_7882 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_7881);
var state_7893__$1 = (function (){var statearr_7895 = state_7893;
(statearr_7895[(7)] = inst_7880__$1);

return statearr_7895;
})();
if(inst_7882){
var statearr_7896_8323 = state_7893__$1;
(statearr_7896_8323[(1)] = (3));

} else {
var statearr_7897_8324 = state_7893__$1;
(statearr_7897_8324[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7894 === (3))){
var inst_7880 = (state_7893[(7)]);
var inst_7884 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7880);
var inst_7885 = new cljs.core.Keyword(null,"submissions","submissions",248615114).cljs$core$IFn$_invoke$arity$1(inst_7884);
var inst_7886 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"submissions","submissions",248615114),inst_7885);
var state_7893__$1 = state_7893;
var statearr_7898_8325 = state_7893__$1;
(statearr_7898_8325[(2)] = inst_7886);

(statearr_7898_8325[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7894 === (4))){
var inst_7880 = (state_7893[(7)]);
var inst_7888 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7880);
var inst_7889 = console.error("Failed to fetch submissions:",inst_7888);
var state_7893__$1 = state_7893;
var statearr_7899_8326 = state_7893__$1;
(statearr_7899_8326[(2)] = inst_7889);

(statearr_7899_8326[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7894 === (5))){
var inst_7891 = (state_7893[(2)]);
var state_7893__$1 = state_7893;
return cljs.core.async.impl.ioc_helpers.return_chan(state_7893__$1,inst_7891);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$fetch_submissions_$_state_machine__7514__auto__ = null;
var aviation_missions$core$fetch_submissions_$_state_machine__7514__auto____0 = (function (){
var statearr_7900 = [null,null,null,null,null,null,null,null];
(statearr_7900[(0)] = aviation_missions$core$fetch_submissions_$_state_machine__7514__auto__);

(statearr_7900[(1)] = (1));

return statearr_7900;
});
var aviation_missions$core$fetch_submissions_$_state_machine__7514__auto____1 = (function (state_7893){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_7893);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e7901){var ex__7517__auto__ = e7901;
var statearr_7902_8327 = state_7893;
(statearr_7902_8327[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_7893[(4)]))){
var statearr_7903_8328 = state_7893;
(statearr_7903_8328[(1)] = cljs.core.first((state_7893[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8329 = state_7893;
state_7893 = G__8329;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$fetch_submissions_$_state_machine__7514__auto__ = function(state_7893){
switch(arguments.length){
case 0:
return aviation_missions$core$fetch_submissions_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$fetch_submissions_$_state_machine__7514__auto____1.call(this,state_7893);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$fetch_submissions_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$fetch_submissions_$_state_machine__7514__auto____0;
aviation_missions$core$fetch_submissions_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$fetch_submissions_$_state_machine__7514__auto____1;
return aviation_missions$core$fetch_submissions_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_7904 = f__7591__auto__();
(statearr_7904[(6)] = c__7590__auto__);

return statearr_7904;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
} else {
return null;
}
});
aviation_missions.core.fetch_pending_updates = (function aviation_missions$core$fetch_pending_updates(){

if(cljs.core.truth_(new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_7930){
var state_val_7931 = (state_7930[(1)]);
if((state_val_7931 === (1))){
var inst_7905 = [aviation_missions.config.api_base_url,"/updates"].join('');
var inst_7906 = [new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_7907 = ["Authorization"];
var inst_7908 = cljs.core.deref(aviation_missions.core.app_state);
var inst_7909 = new cljs.core.Keyword(null,"admin-token","admin-token",-891410220).cljs$core$IFn$_invoke$arity$1(inst_7908);
var inst_7910 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_7909)].join('');
var inst_7911 = [inst_7910];
var inst_7912 = cljs.core.PersistentHashMap.fromArrays(inst_7907,inst_7911);
var inst_7913 = [inst_7912];
var inst_7914 = cljs.core.PersistentHashMap.fromArrays(inst_7906,inst_7913);
var inst_7915 = cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(inst_7905,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_7914], 0));
var state_7930__$1 = state_7930;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_7930__$1,(2),inst_7915);
} else {
if((state_val_7931 === (2))){
var inst_7917 = (state_7930[(7)]);
var inst_7917__$1 = (state_7930[(2)]);
var inst_7918 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_7917__$1);
var inst_7919 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_7918);
var state_7930__$1 = (function (){var statearr_7932 = state_7930;
(statearr_7932[(7)] = inst_7917__$1);

return statearr_7932;
})();
if(inst_7919){
var statearr_7933_8330 = state_7930__$1;
(statearr_7933_8330[(1)] = (3));

} else {
var statearr_7934_8331 = state_7930__$1;
(statearr_7934_8331[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7931 === (3))){
var inst_7917 = (state_7930[(7)]);
var inst_7921 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7917);
var inst_7922 = new cljs.core.Keyword(null,"updates","updates",2013983452).cljs$core$IFn$_invoke$arity$1(inst_7921);
var inst_7923 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"pending-updates","pending-updates",-942903722),inst_7922);
var state_7930__$1 = state_7930;
var statearr_7935_8332 = state_7930__$1;
(statearr_7935_8332[(2)] = inst_7923);

(statearr_7935_8332[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7931 === (4))){
var inst_7917 = (state_7930[(7)]);
var inst_7925 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7917);
var inst_7926 = console.error("Failed to fetch pending updates:",inst_7925);
var state_7930__$1 = state_7930;
var statearr_7936_8333 = state_7930__$1;
(statearr_7936_8333[(2)] = inst_7926);

(statearr_7936_8333[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7931 === (5))){
var inst_7928 = (state_7930[(2)]);
var state_7930__$1 = state_7930;
return cljs.core.async.impl.ioc_helpers.return_chan(state_7930__$1,inst_7928);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto__ = null;
var aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto____0 = (function (){
var statearr_7937 = [null,null,null,null,null,null,null,null];
(statearr_7937[(0)] = aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto__);

(statearr_7937[(1)] = (1));

return statearr_7937;
});
var aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto____1 = (function (state_7930){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_7930);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e7938){var ex__7517__auto__ = e7938;
var statearr_7939_8334 = state_7930;
(statearr_7939_8334[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_7930[(4)]))){
var statearr_7940_8335 = state_7930;
(statearr_7940_8335[(1)] = cljs.core.first((state_7930[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8336 = state_7930;
state_7930 = G__8336;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto__ = function(state_7930){
switch(arguments.length){
case 0:
return aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto____1.call(this,state_7930);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto____0;
aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto____1;
return aviation_missions$core$fetch_pending_updates_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_7941 = f__7591__auto__();
(statearr_7941[(6)] = c__7590__auto__);

return statearr_7941;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
} else {
return null;
}
});
aviation_missions.core.approve_submission = (function aviation_missions$core$approve_submission(submission_id){

if(cljs.core.truth_(new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_7967){
var state_val_7968 = (state_7967[(1)]);
if((state_val_7968 === (1))){
var inst_7942 = [aviation_missions.config.api_base_url,"/submissions/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(submission_id),"/approve"].join('');
var inst_7943 = [new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_7944 = ["Authorization"];
var inst_7945 = cljs.core.deref(aviation_missions.core.app_state);
var inst_7946 = new cljs.core.Keyword(null,"admin-token","admin-token",-891410220).cljs$core$IFn$_invoke$arity$1(inst_7945);
var inst_7947 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_7946)].join('');
var inst_7948 = [inst_7947];
var inst_7949 = cljs.core.PersistentHashMap.fromArrays(inst_7944,inst_7948);
var inst_7950 = [inst_7949];
var inst_7951 = cljs.core.PersistentHashMap.fromArrays(inst_7943,inst_7950);
var inst_7952 = cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(inst_7942,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_7951], 0));
var state_7967__$1 = state_7967;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_7967__$1,(2),inst_7952);
} else {
if((state_val_7968 === (2))){
var inst_7954 = (state_7967[(7)]);
var inst_7954__$1 = (state_7967[(2)]);
var inst_7955 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_7954__$1);
var inst_7956 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_7955);
var state_7967__$1 = (function (){var statearr_7969 = state_7967;
(statearr_7969[(7)] = inst_7954__$1);

return statearr_7969;
})();
if(inst_7956){
var statearr_7970_8337 = state_7967__$1;
(statearr_7970_8337[(1)] = (3));

} else {
var statearr_7971_8338 = state_7967__$1;
(statearr_7971_8338[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7968 === (3))){
var inst_7958 = console.log("Submission approved successfully");
var inst_7959 = aviation_missions.core.fetch_submissions();
var inst_7960 = (aviation_missions.core.fetch_missions.cljs$core$IFn$_invoke$arity$0 ? aviation_missions.core.fetch_missions.cljs$core$IFn$_invoke$arity$0() : aviation_missions.core.fetch_missions.call(null));
var state_7967__$1 = (function (){var statearr_7972 = state_7967;
(statearr_7972[(8)] = inst_7959);

(statearr_7972[(9)] = inst_7958);

return statearr_7972;
})();
var statearr_7973_8339 = state_7967__$1;
(statearr_7973_8339[(2)] = inst_7960);

(statearr_7973_8339[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7968 === (4))){
var inst_7954 = (state_7967[(7)]);
var inst_7962 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7954);
var inst_7963 = console.error("Failed to approve submission:",inst_7962);
var state_7967__$1 = state_7967;
var statearr_7974_8340 = state_7967__$1;
(statearr_7974_8340[(2)] = inst_7963);

(statearr_7974_8340[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7968 === (5))){
var inst_7965 = (state_7967[(2)]);
var state_7967__$1 = state_7967;
return cljs.core.async.impl.ioc_helpers.return_chan(state_7967__$1,inst_7965);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$approve_submission_$_state_machine__7514__auto__ = null;
var aviation_missions$core$approve_submission_$_state_machine__7514__auto____0 = (function (){
var statearr_7975 = [null,null,null,null,null,null,null,null,null,null];
(statearr_7975[(0)] = aviation_missions$core$approve_submission_$_state_machine__7514__auto__);

(statearr_7975[(1)] = (1));

return statearr_7975;
});
var aviation_missions$core$approve_submission_$_state_machine__7514__auto____1 = (function (state_7967){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_7967);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e7976){var ex__7517__auto__ = e7976;
var statearr_7977_8341 = state_7967;
(statearr_7977_8341[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_7967[(4)]))){
var statearr_7978_8342 = state_7967;
(statearr_7978_8342[(1)] = cljs.core.first((state_7967[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8343 = state_7967;
state_7967 = G__8343;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$approve_submission_$_state_machine__7514__auto__ = function(state_7967){
switch(arguments.length){
case 0:
return aviation_missions$core$approve_submission_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$approve_submission_$_state_machine__7514__auto____1.call(this,state_7967);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$approve_submission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$approve_submission_$_state_machine__7514__auto____0;
aviation_missions$core$approve_submission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$approve_submission_$_state_machine__7514__auto____1;
return aviation_missions$core$approve_submission_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_7979 = f__7591__auto__();
(statearr_7979[(6)] = c__7590__auto__);

return statearr_7979;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
} else {
return null;
}
});
aviation_missions.core.reject_submission = (function aviation_missions$core$reject_submission(submission_id){

if(cljs.core.truth_(new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_8004){
var state_val_8005 = (state_8004[(1)]);
if((state_val_8005 === (1))){
var inst_7980 = [aviation_missions.config.api_base_url,"/submissions/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(submission_id),"/reject"].join('');
var inst_7981 = [new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_7982 = ["Authorization"];
var inst_7983 = cljs.core.deref(aviation_missions.core.app_state);
var inst_7984 = new cljs.core.Keyword(null,"admin-token","admin-token",-891410220).cljs$core$IFn$_invoke$arity$1(inst_7983);
var inst_7985 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_7984)].join('');
var inst_7986 = [inst_7985];
var inst_7987 = cljs.core.PersistentHashMap.fromArrays(inst_7982,inst_7986);
var inst_7988 = [inst_7987];
var inst_7989 = cljs.core.PersistentHashMap.fromArrays(inst_7981,inst_7988);
var inst_7990 = cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(inst_7980,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_7989], 0));
var state_8004__$1 = state_8004;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_8004__$1,(2),inst_7990);
} else {
if((state_val_8005 === (2))){
var inst_7992 = (state_8004[(7)]);
var inst_7992__$1 = (state_8004[(2)]);
var inst_7993 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_7992__$1);
var inst_7994 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_7993);
var state_8004__$1 = (function (){var statearr_8006 = state_8004;
(statearr_8006[(7)] = inst_7992__$1);

return statearr_8006;
})();
if(inst_7994){
var statearr_8007_8344 = state_8004__$1;
(statearr_8007_8344[(1)] = (3));

} else {
var statearr_8008_8345 = state_8004__$1;
(statearr_8008_8345[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8005 === (3))){
var inst_7996 = console.log("Submission rejected successfully");
var inst_7997 = aviation_missions.core.fetch_submissions();
var state_8004__$1 = (function (){var statearr_8009 = state_8004;
(statearr_8009[(8)] = inst_7996);

return statearr_8009;
})();
var statearr_8010_8346 = state_8004__$1;
(statearr_8010_8346[(2)] = inst_7997);

(statearr_8010_8346[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8005 === (4))){
var inst_7992 = (state_8004[(7)]);
var inst_7999 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_7992);
var inst_8000 = console.error("Failed to reject submission:",inst_7999);
var state_8004__$1 = state_8004;
var statearr_8011_8347 = state_8004__$1;
(statearr_8011_8347[(2)] = inst_8000);

(statearr_8011_8347[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8005 === (5))){
var inst_8002 = (state_8004[(2)]);
var state_8004__$1 = state_8004;
return cljs.core.async.impl.ioc_helpers.return_chan(state_8004__$1,inst_8002);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$reject_submission_$_state_machine__7514__auto__ = null;
var aviation_missions$core$reject_submission_$_state_machine__7514__auto____0 = (function (){
var statearr_8012 = [null,null,null,null,null,null,null,null,null];
(statearr_8012[(0)] = aviation_missions$core$reject_submission_$_state_machine__7514__auto__);

(statearr_8012[(1)] = (1));

return statearr_8012;
});
var aviation_missions$core$reject_submission_$_state_machine__7514__auto____1 = (function (state_8004){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_8004);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e8013){var ex__7517__auto__ = e8013;
var statearr_8014_8348 = state_8004;
(statearr_8014_8348[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_8004[(4)]))){
var statearr_8015_8349 = state_8004;
(statearr_8015_8349[(1)] = cljs.core.first((state_8004[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8350 = state_8004;
state_8004 = G__8350;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$reject_submission_$_state_machine__7514__auto__ = function(state_8004){
switch(arguments.length){
case 0:
return aviation_missions$core$reject_submission_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$reject_submission_$_state_machine__7514__auto____1.call(this,state_8004);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$reject_submission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$reject_submission_$_state_machine__7514__auto____0;
aviation_missions$core$reject_submission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$reject_submission_$_state_machine__7514__auto____1;
return aviation_missions$core$reject_submission_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_8016 = f__7591__auto__();
(statearr_8016[(6)] = c__7590__auto__);

return statearr_8016;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
} else {
return null;
}
});
aviation_missions.core.delete_mission = (function aviation_missions$core$delete_mission(mission_id){

if(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state));
if(cljs.core.truth_(and__5000__auto__)){
return confirm("Are you sure you want to delete this mission? This action cannot be undone.");
} else {
return and__5000__auto__;
}
})())){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_8041){
var state_val_8042 = (state_8041[(1)]);
if((state_val_8042 === (1))){
var inst_8017 = [aviation_missions.config.api_base_url,"/missions/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(mission_id)].join('');
var inst_8018 = [new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_8019 = ["Authorization"];
var inst_8020 = cljs.core.deref(aviation_missions.core.app_state);
var inst_8021 = new cljs.core.Keyword(null,"admin-token","admin-token",-891410220).cljs$core$IFn$_invoke$arity$1(inst_8020);
var inst_8022 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_8021)].join('');
var inst_8023 = [inst_8022];
var inst_8024 = cljs.core.PersistentHashMap.fromArrays(inst_8019,inst_8023);
var inst_8025 = [inst_8024];
var inst_8026 = cljs.core.PersistentHashMap.fromArrays(inst_8018,inst_8025);
var inst_8027 = cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic(inst_8017,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_8026], 0));
var state_8041__$1 = state_8041;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_8041__$1,(2),inst_8027);
} else {
if((state_val_8042 === (2))){
var inst_8029 = (state_8041[(7)]);
var inst_8029__$1 = (state_8041[(2)]);
var inst_8030 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8029__$1);
var inst_8031 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_8030);
var state_8041__$1 = (function (){var statearr_8043 = state_8041;
(statearr_8043[(7)] = inst_8029__$1);

return statearr_8043;
})();
if(inst_8031){
var statearr_8044_8351 = state_8041__$1;
(statearr_8044_8351[(1)] = (3));

} else {
var statearr_8045_8352 = state_8041__$1;
(statearr_8045_8352[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8042 === (3))){
var inst_8033 = console.log("Mission deleted successfully");
var inst_8034 = (aviation_missions.core.fetch_missions.cljs$core$IFn$_invoke$arity$0 ? aviation_missions.core.fetch_missions.cljs$core$IFn$_invoke$arity$0() : aviation_missions.core.fetch_missions.call(null));
var state_8041__$1 = (function (){var statearr_8046 = state_8041;
(statearr_8046[(8)] = inst_8033);

return statearr_8046;
})();
var statearr_8047_8353 = state_8041__$1;
(statearr_8047_8353[(2)] = inst_8034);

(statearr_8047_8353[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8042 === (4))){
var inst_8029 = (state_8041[(7)]);
var inst_8036 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8029);
var inst_8037 = console.error("Failed to delete mission:",inst_8036);
var state_8041__$1 = state_8041;
var statearr_8048_8354 = state_8041__$1;
(statearr_8048_8354[(2)] = inst_8037);

(statearr_8048_8354[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8042 === (5))){
var inst_8039 = (state_8041[(2)]);
var state_8041__$1 = state_8041;
return cljs.core.async.impl.ioc_helpers.return_chan(state_8041__$1,inst_8039);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$delete_mission_$_state_machine__7514__auto__ = null;
var aviation_missions$core$delete_mission_$_state_machine__7514__auto____0 = (function (){
var statearr_8049 = [null,null,null,null,null,null,null,null,null];
(statearr_8049[(0)] = aviation_missions$core$delete_mission_$_state_machine__7514__auto__);

(statearr_8049[(1)] = (1));

return statearr_8049;
});
var aviation_missions$core$delete_mission_$_state_machine__7514__auto____1 = (function (state_8041){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_8041);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e8050){var ex__7517__auto__ = e8050;
var statearr_8051_8355 = state_8041;
(statearr_8051_8355[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_8041[(4)]))){
var statearr_8052_8356 = state_8041;
(statearr_8052_8356[(1)] = cljs.core.first((state_8041[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8357 = state_8041;
state_8041 = G__8357;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$delete_mission_$_state_machine__7514__auto__ = function(state_8041){
switch(arguments.length){
case 0:
return aviation_missions$core$delete_mission_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$delete_mission_$_state_machine__7514__auto____1.call(this,state_8041);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$delete_mission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$delete_mission_$_state_machine__7514__auto____0;
aviation_missions$core$delete_mission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$delete_mission_$_state_machine__7514__auto____1;
return aviation_missions$core$delete_mission_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_8053 = f__7591__auto__();
(statearr_8053[(6)] = c__7590__auto__);

return statearr_8053;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
} else {
return null;
}
});
aviation_missions.core.update_mission = (function aviation_missions$core$update_mission(mission_id,mission_data){

if(cljs.core.truth_(new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_8079){
var state_val_8080 = (state_8079[(1)]);
if((state_val_8080 === (1))){
var inst_8054 = [aviation_missions.config.api_base_url,"/missions/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(mission_id)].join('');
var inst_8055 = [new cljs.core.Keyword(null,"json-params","json-params",-1112693596),new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_8056 = ["Authorization"];
var inst_8057 = cljs.core.deref(aviation_missions.core.app_state);
var inst_8058 = new cljs.core.Keyword(null,"admin-token","admin-token",-891410220).cljs$core$IFn$_invoke$arity$1(inst_8057);
var inst_8059 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_8058)].join('');
var inst_8060 = [inst_8059];
var inst_8061 = cljs.core.PersistentHashMap.fromArrays(inst_8056,inst_8060);
var inst_8062 = [mission_data,inst_8061];
var inst_8063 = cljs.core.PersistentHashMap.fromArrays(inst_8055,inst_8062);
var inst_8064 = cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(inst_8054,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_8063], 0));
var state_8079__$1 = state_8079;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_8079__$1,(2),inst_8064);
} else {
if((state_val_8080 === (2))){
var inst_8066 = (state_8079[(7)]);
var inst_8066__$1 = (state_8079[(2)]);
var inst_8067 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8066__$1);
var inst_8068 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_8067);
var state_8079__$1 = (function (){var statearr_8081 = state_8079;
(statearr_8081[(7)] = inst_8066__$1);

return statearr_8081;
})();
if(inst_8068){
var statearr_8082_8358 = state_8079__$1;
(statearr_8082_8358[(1)] = (3));

} else {
var statearr_8083_8359 = state_8079__$1;
(statearr_8083_8359[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8080 === (3))){
var inst_8070 = console.log("Mission updated successfully");
var inst_8071 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"edit-dialog-open","edit-dialog-open",1061074430),false);
var inst_8072 = (aviation_missions.core.fetch_missions.cljs$core$IFn$_invoke$arity$0 ? aviation_missions.core.fetch_missions.cljs$core$IFn$_invoke$arity$0() : aviation_missions.core.fetch_missions.call(null));
var state_8079__$1 = (function (){var statearr_8084 = state_8079;
(statearr_8084[(8)] = inst_8070);

(statearr_8084[(9)] = inst_8071);

return statearr_8084;
})();
var statearr_8085_8360 = state_8079__$1;
(statearr_8085_8360[(2)] = inst_8072);

(statearr_8085_8360[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8080 === (4))){
var inst_8066 = (state_8079[(7)]);
var inst_8074 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8066);
var inst_8075 = console.error("Failed to update mission:",inst_8074);
var state_8079__$1 = state_8079;
var statearr_8086_8361 = state_8079__$1;
(statearr_8086_8361[(2)] = inst_8075);

(statearr_8086_8361[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8080 === (5))){
var inst_8077 = (state_8079[(2)]);
var state_8079__$1 = state_8079;
return cljs.core.async.impl.ioc_helpers.return_chan(state_8079__$1,inst_8077);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$update_mission_$_state_machine__7514__auto__ = null;
var aviation_missions$core$update_mission_$_state_machine__7514__auto____0 = (function (){
var statearr_8087 = [null,null,null,null,null,null,null,null,null,null];
(statearr_8087[(0)] = aviation_missions$core$update_mission_$_state_machine__7514__auto__);

(statearr_8087[(1)] = (1));

return statearr_8087;
});
var aviation_missions$core$update_mission_$_state_machine__7514__auto____1 = (function (state_8079){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_8079);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e8088){var ex__7517__auto__ = e8088;
var statearr_8089_8362 = state_8079;
(statearr_8089_8362[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_8079[(4)]))){
var statearr_8090_8363 = state_8079;
(statearr_8090_8363[(1)] = cljs.core.first((state_8079[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8364 = state_8079;
state_8079 = G__8364;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$update_mission_$_state_machine__7514__auto__ = function(state_8079){
switch(arguments.length){
case 0:
return aviation_missions$core$update_mission_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$update_mission_$_state_machine__7514__auto____1.call(this,state_8079);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$update_mission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$update_mission_$_state_machine__7514__auto____0;
aviation_missions$core$update_mission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$update_mission_$_state_machine__7514__auto____1;
return aviation_missions$core$update_mission_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_8091 = f__7591__auto__();
(statearr_8091[(6)] = c__7590__auto__);

return statearr_8091;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
} else {
return null;
}
});
aviation_missions.core.fetch_missions = (function aviation_missions$core$fetch_missions(){
console.log("Fetching missions from API...");

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"loading","loading",-737050189),true);

var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_8117){
var state_val_8118 = (state_8117[(1)]);
if((state_val_8118 === (1))){
var inst_8092 = [aviation_missions.config.api_base_url,"/missions"].join('');
var inst_8093 = console.log("Making request to:",inst_8092);
var inst_8094 = cljs_http.client.get(inst_8092);
var state_8117__$1 = (function (){var statearr_8119 = state_8117;
(statearr_8119[(7)] = inst_8093);

return statearr_8119;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_8117__$1,(2),inst_8094);
} else {
if((state_val_8118 === (2))){
var inst_8096 = (state_8117[(8)]);
var inst_8096__$1 = (state_8117[(2)]);
var inst_8097 = console.log("Response received:",inst_8096__$1);
var inst_8098 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8096__$1);
var inst_8099 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_8098);
var state_8117__$1 = (function (){var statearr_8120 = state_8117;
(statearr_8120[(8)] = inst_8096__$1);

(statearr_8120[(9)] = inst_8097);

return statearr_8120;
})();
if(inst_8099){
var statearr_8121_8365 = state_8117__$1;
(statearr_8121_8365[(1)] = (3));

} else {
var statearr_8122_8366 = state_8117__$1;
(statearr_8122_8366[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8118 === (3))){
var inst_8096 = (state_8117[(8)]);
var inst_8101 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8096);
var inst_8102 = new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(inst_8101);
var inst_8103 = cljs.core.count(inst_8102);
var inst_8104 = ["Loaded ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_8103)," missions from API"].join('');
var inst_8105 = console.log(inst_8104);
var inst_8106 = console.log("\u2705 UI PHASE 3 COMPLETE: Mission data loaded, UI fully operational!");
var inst_8107 = console.log("\uD83C\uDFAF Aviation Mission Management UI ready for user interaction");
var inst_8108 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"missions","missions",2065000991),inst_8102,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"loading","loading",-737050189),false], 0));
var state_8117__$1 = (function (){var statearr_8123 = state_8117;
(statearr_8123[(10)] = inst_8106);

(statearr_8123[(11)] = inst_8105);

(statearr_8123[(12)] = inst_8107);

return statearr_8123;
})();
var statearr_8124_8367 = state_8117__$1;
(statearr_8124_8367[(2)] = inst_8108);

(statearr_8124_8367[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8118 === (4))){
var inst_8096 = (state_8117[(8)]);
var inst_8110 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8096);
var inst_8111 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8096);
var inst_8112 = console.error("Failed to fetch missions. Status:",inst_8110,"Body:",inst_8111);
var inst_8113 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"loading","loading",-737050189),false);
var state_8117__$1 = (function (){var statearr_8125 = state_8117;
(statearr_8125[(13)] = inst_8112);

return statearr_8125;
})();
var statearr_8126_8368 = state_8117__$1;
(statearr_8126_8368[(2)] = inst_8113);

(statearr_8126_8368[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8118 === (5))){
var inst_8115 = (state_8117[(2)]);
var state_8117__$1 = state_8117;
return cljs.core.async.impl.ioc_helpers.return_chan(state_8117__$1,inst_8115);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$fetch_missions_$_state_machine__7514__auto__ = null;
var aviation_missions$core$fetch_missions_$_state_machine__7514__auto____0 = (function (){
var statearr_8127 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_8127[(0)] = aviation_missions$core$fetch_missions_$_state_machine__7514__auto__);

(statearr_8127[(1)] = (1));

return statearr_8127;
});
var aviation_missions$core$fetch_missions_$_state_machine__7514__auto____1 = (function (state_8117){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_8117);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e8128){var ex__7517__auto__ = e8128;
var statearr_8129_8369 = state_8117;
(statearr_8129_8369[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_8117[(4)]))){
var statearr_8130_8370 = state_8117;
(statearr_8130_8370[(1)] = cljs.core.first((state_8117[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8371 = state_8117;
state_8117 = G__8371;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$fetch_missions_$_state_machine__7514__auto__ = function(state_8117){
switch(arguments.length){
case 0:
return aviation_missions$core$fetch_missions_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$fetch_missions_$_state_machine__7514__auto____1.call(this,state_8117);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$fetch_missions_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$fetch_missions_$_state_machine__7514__auto____0;
aviation_missions$core$fetch_missions_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$fetch_missions_$_state_machine__7514__auto____1;
return aviation_missions$core$fetch_missions_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_8131 = f__7591__auto__();
(statearr_8131[(6)] = c__7590__auto__);

return statearr_8131;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
});
aviation_missions.core.create_mission = (function aviation_missions$core$create_mission(mission){
var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_8181){
var state_val_8182 = (state_8181[(1)]);
if((state_val_8182 === (7))){
var inst_8151 = (state_8181[(7)]);
var inst_8156 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8151);
var inst_8157 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((201),inst_8156);
var state_8181__$1 = state_8181;
var statearr_8183_8372 = state_8181__$1;
(statearr_8183_8372[(2)] = inst_8157);

(statearr_8183_8372[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (1))){
var inst_8132 = cljs.core.deref(aviation_missions.core.app_state);
var inst_8133 = new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(inst_8132);
var state_8181__$1 = state_8181;
if(cljs.core.truth_(inst_8133)){
var statearr_8184_8373 = state_8181__$1;
(statearr_8184_8373[(1)] = (2));

} else {
var statearr_8185_8374 = state_8181__$1;
(statearr_8185_8374[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (4))){
var inst_8144 = (state_8181[(2)]);
var inst_8145 = [aviation_missions.config.api_base_url,"/missions"].join('');
var inst_8146 = [new cljs.core.Keyword(null,"json-params","json-params",-1112693596),new cljs.core.Keyword(null,"headers","headers",-835030129)];
var inst_8147 = [mission,inst_8144];
var inst_8148 = cljs.core.PersistentHashMap.fromArrays(inst_8146,inst_8147);
var inst_8149 = cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(inst_8145,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([inst_8148], 0));
var state_8181__$1 = state_8181;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_8181__$1,(5),inst_8149);
} else {
if((state_val_8182 === (13))){
var state_8181__$1 = state_8181;
var statearr_8186_8375 = state_8181__$1;
(statearr_8186_8375[(2)] = null);

(statearr_8186_8375[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (6))){
var inst_8153 = (state_8181[(8)]);
var state_8181__$1 = state_8181;
var statearr_8187_8376 = state_8181__$1;
(statearr_8187_8376[(2)] = inst_8153);

(statearr_8187_8376[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (3))){
var inst_8142 = cljs.core.PersistentHashMap.EMPTY;
var state_8181__$1 = state_8181;
var statearr_8188_8377 = state_8181__$1;
(statearr_8188_8377[(2)] = inst_8142);

(statearr_8188_8377[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (12))){
var inst_8171 = aviation_missions.core.fetch_submissions();
var state_8181__$1 = state_8181;
var statearr_8189_8378 = state_8181__$1;
(statearr_8189_8378[(2)] = inst_8171);

(statearr_8189_8378[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (2))){
var inst_8135 = ["Authorization"];
var inst_8136 = cljs.core.deref(aviation_missions.core.app_state);
var inst_8137 = new cljs.core.Keyword(null,"admin-token","admin-token",-891410220).cljs$core$IFn$_invoke$arity$1(inst_8136);
var inst_8138 = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_8137)].join('');
var inst_8139 = [inst_8138];
var inst_8140 = cljs.core.PersistentHashMap.fromArrays(inst_8135,inst_8139);
var state_8181__$1 = state_8181;
var statearr_8190_8379 = state_8181__$1;
(statearr_8190_8379[(2)] = inst_8140);

(statearr_8190_8379[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (11))){
var inst_8179 = (state_8181[(2)]);
var state_8181__$1 = state_8181;
return cljs.core.async.impl.ioc_helpers.return_chan(state_8181__$1,inst_8179);
} else {
if((state_val_8182 === (9))){
var inst_8161 = console.log("Mission created successfully!");
var inst_8162 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"create-dialog-open","create-dialog-open",771901202),false);
var inst_8163 = [new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"category","category",-593092832),new cljs.core.Keyword(null,"difficulty","difficulty",755680807),new cljs.core.Keyword(null,"objective","objective",1301058585),new cljs.core.Keyword(null,"mission_description","mission_description",-974904226),new cljs.core.Keyword(null,"why_description","why_description",1681539809)];
var inst_8164 = ["","Training",(1),"","",""];
var inst_8165 = cljs.core.PersistentHashMap.fromArrays(inst_8163,inst_8164);
var inst_8166 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),inst_8165);
var inst_8167 = aviation_missions.core.fetch_missions();
var inst_8168 = cljs.core.deref(aviation_missions.core.app_state);
var inst_8169 = new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(inst_8168);
var state_8181__$1 = (function (){var statearr_8191 = state_8181;
(statearr_8191[(9)] = inst_8161);

(statearr_8191[(10)] = inst_8166);

(statearr_8191[(11)] = inst_8167);

(statearr_8191[(12)] = inst_8162);

return statearr_8191;
})();
if(cljs.core.truth_(inst_8169)){
var statearr_8192_8380 = state_8181__$1;
(statearr_8192_8380[(1)] = (12));

} else {
var statearr_8193_8381 = state_8181__$1;
(statearr_8193_8381[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (5))){
var inst_8151 = (state_8181[(7)]);
var inst_8153 = (state_8181[(8)]);
var inst_8151__$1 = (state_8181[(2)]);
var inst_8152 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8151__$1);
var inst_8153__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_8152);
var state_8181__$1 = (function (){var statearr_8194 = state_8181;
(statearr_8194[(7)] = inst_8151__$1);

(statearr_8194[(8)] = inst_8153__$1);

return statearr_8194;
})();
if(inst_8153__$1){
var statearr_8195_8382 = state_8181__$1;
(statearr_8195_8382[(1)] = (6));

} else {
var statearr_8196_8383 = state_8181__$1;
(statearr_8196_8383[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (14))){
var inst_8174 = (state_8181[(2)]);
var state_8181__$1 = state_8181;
var statearr_8197_8384 = state_8181__$1;
(statearr_8197_8384[(2)] = inst_8174);

(statearr_8197_8384[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (10))){
var inst_8151 = (state_8181[(7)]);
var inst_8176 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8151);
var inst_8177 = console.error("Failed to create mission:",inst_8176);
var state_8181__$1 = state_8181;
var statearr_8198_8385 = state_8181__$1;
(statearr_8198_8385[(2)] = inst_8177);

(statearr_8198_8385[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8182 === (8))){
var inst_8159 = (state_8181[(2)]);
var state_8181__$1 = state_8181;
if(cljs.core.truth_(inst_8159)){
var statearr_8199_8386 = state_8181__$1;
(statearr_8199_8386[(1)] = (9));

} else {
var statearr_8200_8387 = state_8181__$1;
(statearr_8200_8387[(1)] = (10));

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
var aviation_missions$core$create_mission_$_state_machine__7514__auto__ = null;
var aviation_missions$core$create_mission_$_state_machine__7514__auto____0 = (function (){
var statearr_8201 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_8201[(0)] = aviation_missions$core$create_mission_$_state_machine__7514__auto__);

(statearr_8201[(1)] = (1));

return statearr_8201;
});
var aviation_missions$core$create_mission_$_state_machine__7514__auto____1 = (function (state_8181){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_8181);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e8202){var ex__7517__auto__ = e8202;
var statearr_8203_8388 = state_8181;
(statearr_8203_8388[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_8181[(4)]))){
var statearr_8204_8389 = state_8181;
(statearr_8204_8389[(1)] = cljs.core.first((state_8181[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8390 = state_8181;
state_8181 = G__8390;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$create_mission_$_state_machine__7514__auto__ = function(state_8181){
switch(arguments.length){
case 0:
return aviation_missions$core$create_mission_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$create_mission_$_state_machine__7514__auto____1.call(this,state_8181);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$create_mission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$create_mission_$_state_machine__7514__auto____0;
aviation_missions$core$create_mission_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$create_mission_$_state_machine__7514__auto____1;
return aviation_missions$core$create_mission_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_8205 = f__7591__auto__();
(statearr_8205[(6)] = c__7590__auto__);

return statearr_8205;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
});
aviation_missions.core.fetch_mission_details = (function aviation_missions$core$fetch_mission_details(mission_id){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"mission-details-loading","mission-details-loading",133475783),true);

var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_8223){
var state_val_8224 = (state_8223[(1)]);
if((state_val_8224 === (1))){
var inst_8206 = [aviation_missions.config.api_base_url,"/missions/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(mission_id)].join('');
var inst_8207 = cljs_http.client.get(inst_8206);
var state_8223__$1 = state_8223;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_8223__$1,(2),inst_8207);
} else {
if((state_val_8224 === (2))){
var inst_8209 = (state_8223[(7)]);
var inst_8209__$1 = (state_8223[(2)]);
var inst_8210 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8209__$1);
var inst_8211 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((200),inst_8210);
var state_8223__$1 = (function (){var statearr_8225 = state_8223;
(statearr_8225[(7)] = inst_8209__$1);

return statearr_8225;
})();
if(inst_8211){
var statearr_8226_8391 = state_8223__$1;
(statearr_8226_8391[(1)] = (3));

} else {
var statearr_8227_8392 = state_8223__$1;
(statearr_8227_8392[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8224 === (3))){
var inst_8209 = (state_8223[(7)]);
var inst_8213 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8209);
var inst_8214 = new cljs.core.Keyword(null,"mission","mission",1740288522).cljs$core$IFn$_invoke$arity$1(inst_8213);
var inst_8215 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"mission-details","mission-details",-850239280),inst_8214,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"mission-details-loading","mission-details-loading",133475783),false,new cljs.core.Keyword(null,"selected-mission-id","selected-mission-id",-442618885),mission_id,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"mission-details","mission-details",-850239280)], 0));
var state_8223__$1 = state_8223;
var statearr_8228_8393 = state_8223__$1;
(statearr_8228_8393[(2)] = inst_8215);

(statearr_8228_8393[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8224 === (4))){
var inst_8209 = (state_8223[(7)]);
var inst_8217 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8209);
var inst_8218 = console.error("Failed to fetch mission details:",inst_8217);
var inst_8219 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"mission-details-loading","mission-details-loading",133475783),false);
var state_8223__$1 = (function (){var statearr_8229 = state_8223;
(statearr_8229[(8)] = inst_8218);

return statearr_8229;
})();
var statearr_8230_8394 = state_8223__$1;
(statearr_8230_8394[(2)] = inst_8219);

(statearr_8230_8394[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8224 === (5))){
var inst_8221 = (state_8223[(2)]);
var state_8223__$1 = state_8223;
return cljs.core.async.impl.ioc_helpers.return_chan(state_8223__$1,inst_8221);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto__ = null;
var aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto____0 = (function (){
var statearr_8231 = [null,null,null,null,null,null,null,null,null];
(statearr_8231[(0)] = aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto__);

(statearr_8231[(1)] = (1));

return statearr_8231;
});
var aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto____1 = (function (state_8223){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_8223);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e8232){var ex__7517__auto__ = e8232;
var statearr_8233_8395 = state_8223;
(statearr_8233_8395[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_8223[(4)]))){
var statearr_8234_8396 = state_8223;
(statearr_8234_8396[(1)] = cljs.core.first((state_8223[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8397 = state_8223;
state_8223 = G__8397;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto__ = function(state_8223){
switch(arguments.length){
case 0:
return aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto____1.call(this,state_8223);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto____0;
aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto____1;
return aviation_missions$core$fetch_mission_details_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_8235 = f__7591__auto__();
(statearr_8235[(6)] = c__7590__auto__);

return statearr_8235;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
});
aviation_missions.core.get_paginated_missions = (function aviation_missions$core$get_paginated_missions(missions,page_number,per_page){
var start_idx = ((page_number - (1)) * per_page);
var end_idx = (start_idx + per_page);
return cljs.core.take.cljs$core$IFn$_invoke$arity$2(per_page,cljs.core.drop.cljs$core$IFn$_invoke$arity$2(start_idx,missions));
});
aviation_missions.core.get_total_pages = (function aviation_missions$core$get_total_pages(missions,per_page){
return Math.ceil((cljs.core.count(missions) / per_page));
});
aviation_missions.core.challenge_definitions = new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"short-runway","short-runway",-1557465624),"Short Runway",new cljs.core.Keyword(null,"narrow-runway","narrow-runway",2004404856),"Narrow Runway",new cljs.core.Keyword(null,"high-da","high-da",58122629),"High DA",new cljs.core.Keyword(null,"mountain-flying","mountain-flying",-735465272),"Mountain Flying",new cljs.core.Keyword(null,"time-restrictions","time-restrictions",1490499372),"Time Restrictions",new cljs.core.Keyword(null,"soft-field","soft-field",486920544),"Soft Field",new cljs.core.Keyword(null,"obstacles","obstacles",1370670211),"Obstacles within 1 mile of threshold",new cljs.core.Keyword(null,"complex-airspace","complex-airspace",777862843),"Complex Airspace"], null);
aviation_missions.core.analyze_mission_challenges = (function aviation_missions$core$analyze_mission_challenges(mission){

var description = clojure.string.lower_case([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mission_description","mission_description",-974904226).cljs$core$IFn$_invoke$arity$1(mission))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(mission))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"objective","objective",1301058585).cljs$core$IFn$_invoke$arity$1(mission))].join(''));
var route = clojure.string.lower_case((function (){var or__5002__auto__ = new cljs.core.Keyword(null,"route","route",329891309).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "";
}
})());
var title = clojure.string.lower_case(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(mission));
var category = clojure.string.lower_case(new cljs.core.Keyword(null,"category","category",-593092832).cljs$core$IFn$_invoke$arity$1(mission));
var all_text = [description," ",route," ",title," ",category].join('');
var G__8236 = cljs.core.PersistentHashSet.EMPTY;
var G__8236__$1 = ((((clojure.string.includes_QMARK_(all_text,"density altitude")) || (((clojure.string.includes_QMARK_(all_text,"high altitude")) || (((clojure.string.includes_QMARK_(all_text,"mountain")) || (((clojure.string.includes_QMARK_(all_text,"sierra")) || (((clojure.string.includes_QMARK_(all_text,"truckee")) || (((clojure.string.includes_QMARK_(all_text,"tahoe")) || (((clojure.string.includes_QMARK_(all_text,"mammoth")) || (((clojure.string.includes_QMARK_(all_text,"reno")) || (((clojure.string.includes_QMARK_(all_text,"death valley")) || (clojure.string.includes_QMARK_(all_text,"furnace creek"))))))))))))))))))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8236,new cljs.core.Keyword(null,"high-da","high-da",58122629)):G__8236);
var G__8236__$2 = ((((((clojure.string.includes_QMARK_(all_text,"mountain")) && (((clojure.string.includes_QMARK_(all_text,"flying")) || (((clojure.string.includes_QMARK_(all_text,"terrain")) || (((clojure.string.includes_QMARK_(all_text,"valley")) || (((clojure.string.includes_QMARK_(all_text,"downdraft")) || (clojure.string.includes_QMARK_(all_text,"updraft")))))))))))) || (((clojure.string.includes_QMARK_(all_text,"sierra")) || (((clojure.string.includes_QMARK_(all_text,"ktrk")) || (((clojure.string.includes_QMARK_(all_text,"kmmh")) || (((clojure.string.includes_QMARK_(all_text,"high altitude")) || (((clojure.string.includes_QMARK_(all_text,"density altitude")) || (clojure.string.includes_QMARK_(all_text,"terrain clearance"))))))))))))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8236__$1,new cljs.core.Keyword(null,"mountain-flying","mountain-flying",-735465272)):G__8236__$1);
var G__8236__$3 = ((((clojure.string.includes_QMARK_(all_text,"class b")) || (((clojure.string.includes_QMARK_(all_text,"class c")) || (((clojure.string.includes_QMARK_(all_text,"bravo")) || (((clojure.string.includes_QMARK_(all_text,"charlie")) || (((clojure.string.includes_QMARK_(all_text,"clearance")) || (((clojure.string.includes_QMARK_(all_text,"atc")) || (((clojure.string.includes_QMARK_(all_text,"approach control")) || (((clojure.string.includes_QMARK_(all_text,"moa")) || (clojure.string.includes_QMARK_(all_text,"airspace"))))))))))))))))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8236__$2,new cljs.core.Keyword(null,"complex-airspace","complex-airspace",777862843)):G__8236__$2);
var G__8236__$4 = ((((clojure.string.includes_QMARK_(all_text,"short")) || (((clojure.string.includes_QMARK_(all_text,"0q5")) || (((clojure.string.includes_QMARK_(all_text,"shelter cove")) || (((clojure.string.includes_QMARK_(all_text,"1o2")) || (((clojure.string.includes_QMARK_(all_text,"lampson")) || (((clojure.string.includes_QMARK_(all_text,"o22")) || (((clojure.string.includes_QMARK_(all_text,"columbia")) || (((clojure.string.includes_QMARK_(all_text,"l06")) || (clojure.string.includes_QMARK_(all_text,"furnace creek"))))))))))))))))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8236__$3,new cljs.core.Keyword(null,"short-runway","short-runway",-1557465624)):G__8236__$3);
var G__8236__$5 = ((((clojure.string.includes_QMARK_(all_text,"soft field")) || (((clojure.string.includes_QMARK_(all_text,"grass")) || (((clojure.string.includes_QMARK_(all_text,"dirt")) || (((clojure.string.includes_QMARK_(all_text,"rough")) || (clojure.string.includes_QMARK_(all_text,"gravel"))))))))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8236__$4,new cljs.core.Keyword(null,"soft-field","soft-field",486920544)):G__8236__$4);
var G__8236__$6 = ((((clojure.string.includes_QMARK_(all_text,"obstacle")) || (((clojure.string.includes_QMARK_(all_text,"terrain")) || (((clojure.string.includes_QMARK_(all_text,"wake turbulence")) || (((clojure.string.includes_QMARK_(all_text,"downdraft")) || (clojure.string.includes_QMARK_(all_text,"challenging winds"))))))))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8236__$5,new cljs.core.Keyword(null,"obstacles","obstacles",1370670211)):G__8236__$5);
if(((clojure.string.includes_QMARK_(all_text,"time")) || (((clojure.string.includes_QMARK_(all_text,"morning departure")) || (((clojure.string.includes_QMARK_(all_text,"afternoon")) || (((clojure.string.includes_QMARK_(all_text,"peak hours")) || (clojure.string.includes_QMARK_(all_text,"busy")))))))))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(G__8236__$6,new cljs.core.Keyword(null,"time-restrictions","time-restrictions",1490499372));
} else {
return G__8236__$6;
}
});
aviation_missions.core.export_missions = (function aviation_missions$core$export_missions(){

var missions_data = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"missions","missions",2065000991),new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)),new cljs.core.Keyword(null,"exported-at","exported-at",1661975683),(new Date()),new cljs.core.Keyword(null,"version","version",425292698),"2.1"], null);
var json_str = JSON.stringify(cljs.core.clj__GT_js(missions_data),null,(2));
var blob = (new Blob(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [json_str], null),({"type": "application/json"})));
var url = URL.createObjectURL(blob);
var link = document.createElement("a");
(link.href = url);

(link.download = ["aviation-missions-",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).toISOString()),".json"].join(''));

link.click();

URL.revokeObjectURL(url);

return console.log("Missions exported successfully");
});
aviation_missions.core.import_missions = (function aviation_missions$core$import_missions(file){

if(cljs.core.truth_(file)){
var reader = (new FileReader());
(reader.onload = (function (e){
try{var json_data = JSON.parse(e.result);
var missions = cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(json_data.missions,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"missions","missions",2065000991),missions);

console.log("Missions imported successfully",cljs.core.count(missions),"missions");

return alert(["Successfully imported ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(missions))," missions!"].join(''));
}catch (e8237){if((e8237 instanceof Error)){
var e__$1 = e8237;
console.error("Import error:",e__$1);

return alert("Error importing missions. Please check the file format.");
} else {
throw e8237;

}
}}));

return reader.readAsText(file);
} else {
return null;
}
});
aviation_missions.core.refresh_missions = (function aviation_missions$core$refresh_missions(){

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"loading","loading",-737050189),true);

var c__7590__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__7591__auto__ = (function (){var switch__7513__auto__ = (function (state_8256){
var state_val_8257 = (state_8256[(1)]);
if((state_val_8257 === (1))){
var inst_8238 = [aviation_missions.config.api_base_url,"/missions"].join('');
var inst_8239 = cljs_http.client.get(inst_8238);
var state_8256__$1 = state_8256;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_8256__$1,(2),inst_8239);
} else {
if((state_val_8257 === (2))){
var inst_8241 = (state_8256[(7)]);
var inst_8241__$1 = (state_8256[(2)]);
var inst_8242 = new cljs.core.Keyword(null,"status","status",-1997798413).cljs$core$IFn$_invoke$arity$1(inst_8241__$1);
var inst_8243 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_8242,(200));
var state_8256__$1 = (function (){var statearr_8258 = state_8256;
(statearr_8258[(7)] = inst_8241__$1);

return statearr_8258;
})();
if(inst_8243){
var statearr_8259_8398 = state_8256__$1;
(statearr_8259_8398[(1)] = (3));

} else {
var statearr_8260_8399 = state_8256__$1;
(statearr_8260_8399[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8257 === (3))){
var inst_8241 = (state_8256[(7)]);
var inst_8245 = new cljs.core.Keyword(null,"body","body",-2049205669).cljs$core$IFn$_invoke$arity$1(inst_8241);
var inst_8246 = new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(inst_8245);
var inst_8247 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"missions","missions",2065000991),inst_8246);
var inst_8248 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"loading","loading",-737050189),false);
var inst_8249 = console.log("Missions refreshed successfully");
var state_8256__$1 = (function (){var statearr_8261 = state_8256;
(statearr_8261[(8)] = inst_8247);

(statearr_8261[(9)] = inst_8248);

return statearr_8261;
})();
var statearr_8262_8400 = state_8256__$1;
(statearr_8262_8400[(2)] = inst_8249);

(statearr_8262_8400[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8257 === (4))){
var inst_8251 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"loading","loading",-737050189),false);
var inst_8252 = console.error("Failed to refresh missions");
var state_8256__$1 = (function (){var statearr_8263 = state_8256;
(statearr_8263[(10)] = inst_8251);

return statearr_8263;
})();
var statearr_8264_8401 = state_8256__$1;
(statearr_8264_8401[(2)] = inst_8252);

(statearr_8264_8401[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8257 === (5))){
var inst_8254 = (state_8256[(2)]);
var state_8256__$1 = state_8256;
return cljs.core.async.impl.ioc_helpers.return_chan(state_8256__$1,inst_8254);
} else {
return null;
}
}
}
}
}
});
return (function() {
var aviation_missions$core$refresh_missions_$_state_machine__7514__auto__ = null;
var aviation_missions$core$refresh_missions_$_state_machine__7514__auto____0 = (function (){
var statearr_8265 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_8265[(0)] = aviation_missions$core$refresh_missions_$_state_machine__7514__auto__);

(statearr_8265[(1)] = (1));

return statearr_8265;
});
var aviation_missions$core$refresh_missions_$_state_machine__7514__auto____1 = (function (state_8256){
while(true){
var ret_value__7515__auto__ = (function (){try{while(true){
var result__7516__auto__ = switch__7513__auto__(state_8256);
if(cljs.core.keyword_identical_QMARK_(result__7516__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7516__auto__;
}
break;
}
}catch (e8266){var ex__7517__auto__ = e8266;
var statearr_8267_8402 = state_8256;
(statearr_8267_8402[(2)] = ex__7517__auto__);


if(cljs.core.seq((state_8256[(4)]))){
var statearr_8268_8403 = state_8256;
(statearr_8268_8403[(1)] = cljs.core.first((state_8256[(4)])));

} else {
throw ex__7517__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__7515__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8404 = state_8256;
state_8256 = G__8404;
continue;
} else {
return ret_value__7515__auto__;
}
break;
}
});
aviation_missions$core$refresh_missions_$_state_machine__7514__auto__ = function(state_8256){
switch(arguments.length){
case 0:
return aviation_missions$core$refresh_missions_$_state_machine__7514__auto____0.call(this);
case 1:
return aviation_missions$core$refresh_missions_$_state_machine__7514__auto____1.call(this,state_8256);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
aviation_missions$core$refresh_missions_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$0 = aviation_missions$core$refresh_missions_$_state_machine__7514__auto____0;
aviation_missions$core$refresh_missions_$_state_machine__7514__auto__.cljs$core$IFn$_invoke$arity$1 = aviation_missions$core$refresh_missions_$_state_machine__7514__auto____1;
return aviation_missions$core$refresh_missions_$_state_machine__7514__auto__;
})()
})();
var state__7592__auto__ = (function (){var statearr_8269 = f__7591__auto__();
(statearr_8269[(6)] = c__7590__auto__);

return statearr_8269;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__7592__auto__);
}));

return c__7590__auto__;
});
aviation_missions.core.clear_mission_cache = (function aviation_missions$core$clear_mission_cache(){

if(cljs.core.truth_(confirm("Are you sure you want to clear the mission cache?"))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"missions","missions",2065000991),cljs.core.PersistentVector.EMPTY);

aviation_missions.core.refresh_missions();

return console.log("Mission cache cleared");
} else {
return null;
}
});
aviation_missions.core.validate_missions = (function aviation_missions$core$validate_missions(){

var missions = new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state));
var validation_errors = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var seq__8270_8405 = cljs.core.seq(missions);
var chunk__8271_8406 = null;
var count__8272_8407 = (0);
var i__8273_8408 = (0);
while(true){
if((i__8273_8408 < count__8272_8407)){
var mission_8409 = chunk__8271_8406.cljs$core$IIndexed$_nth$arity$2(null,i__8273_8408);
if(cljs.core.not(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(mission_8409))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(validation_errors,cljs.core.conj,["Mission missing title: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission_8409))].join(''));
} else {
}

if(cljs.core.not(new cljs.core.Keyword(null,"category","category",-593092832).cljs$core$IFn$_invoke$arity$1(mission_8409))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(validation_errors,cljs.core.conj,["Mission missing category: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission_8409))].join(''));
} else {
}

if(cljs.core.not(new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(mission_8409))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(validation_errors,cljs.core.conj,["Mission missing difficulty: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission_8409))].join(''));
} else {
}


var G__8410 = seq__8270_8405;
var G__8411 = chunk__8271_8406;
var G__8412 = count__8272_8407;
var G__8413 = (i__8273_8408 + (1));
seq__8270_8405 = G__8410;
chunk__8271_8406 = G__8411;
count__8272_8407 = G__8412;
i__8273_8408 = G__8413;
continue;
} else {
var temp__5804__auto___8414 = cljs.core.seq(seq__8270_8405);
if(temp__5804__auto___8414){
var seq__8270_8415__$1 = temp__5804__auto___8414;
if(cljs.core.chunked_seq_QMARK_(seq__8270_8415__$1)){
var c__5525__auto___8416 = cljs.core.chunk_first(seq__8270_8415__$1);
var G__8417 = cljs.core.chunk_rest(seq__8270_8415__$1);
var G__8418 = c__5525__auto___8416;
var G__8419 = cljs.core.count(c__5525__auto___8416);
var G__8420 = (0);
seq__8270_8405 = G__8417;
chunk__8271_8406 = G__8418;
count__8272_8407 = G__8419;
i__8273_8408 = G__8420;
continue;
} else {
var mission_8421 = cljs.core.first(seq__8270_8415__$1);
if(cljs.core.not(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(mission_8421))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(validation_errors,cljs.core.conj,["Mission missing title: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission_8421))].join(''));
} else {
}

if(cljs.core.not(new cljs.core.Keyword(null,"category","category",-593092832).cljs$core$IFn$_invoke$arity$1(mission_8421))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(validation_errors,cljs.core.conj,["Mission missing category: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission_8421))].join(''));
} else {
}

if(cljs.core.not(new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(mission_8421))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(validation_errors,cljs.core.conj,["Mission missing difficulty: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission_8421))].join(''));
} else {
}


var G__8422 = cljs.core.next(seq__8270_8415__$1);
var G__8423 = null;
var G__8424 = (0);
var G__8425 = (0);
seq__8270_8405 = G__8422;
chunk__8271_8406 = G__8423;
count__8272_8407 = G__8424;
i__8273_8408 = G__8425;
continue;
}
} else {
}
}
break;
}

if(cljs.core.empty_QMARK_(cljs.core.deref(validation_errors))){
return alert("\u2705 All missions are valid!");
} else {
return alert(["\u274C Found ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.deref(validation_errors)))," validation errors:\n",clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.deref(validation_errors))].join(''));
}
});
aviation_missions.core.challenges_table = (function aviation_missions$core$challenges_table(challenges){

if(cljs.core.seq(challenges)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.challenges-section","div.challenges-section",-783035998),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"FLIGHT CHALLENGES"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.challenges-grid","div.challenges-grid",1705909621),(function (){var iter__5480__auto__ = (function aviation_missions$core$challenges_table_$_iter__8274(s__8275){
return (new cljs.core.LazySeq(null,(function (){
var s__8275__$1 = s__8275;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__8275__$1);
if(temp__5804__auto__){
var s__8275__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__8275__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__8275__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__8277 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__8276 = (0);
while(true){
if((i__8276 < size__5479__auto__)){
var challenge_key = cljs.core._nth(c__5478__auto__,i__8276);
cljs.core.chunk_append(b__8277,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.challenge-item","div.challenge-item",1148326435),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-icon","span.challenge-icon",-878973991),"\u26A0"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-label","span.challenge-label",-3168798),cljs.core.get.cljs$core$IFn$_invoke$arity$2(aviation_missions.core.challenge_definitions,challenge_key)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),challenge_key], null)));

var G__8426 = (i__8276 + (1));
i__8276 = G__8426;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8277),aviation_missions$core$challenges_table_$_iter__8274(cljs.core.chunk_rest(s__8275__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8277),null);
}
} else {
var challenge_key = cljs.core.first(s__8275__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.challenge-item","div.challenge-item",1148326435),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-icon","span.challenge-icon",-878973991),"\u26A0"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-label","span.challenge-label",-3168798),cljs.core.get.cljs$core$IFn$_invoke$arity$2(aviation_missions.core.challenge_definitions,challenge_key)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),challenge_key], null)),aviation_missions$core$challenges_table_$_iter__8274(cljs.core.rest(s__8275__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(challenges));
})()], null)], null);
} else {
return null;
}
});
aviation_missions.core.page_navigation = (function aviation_missions$core$page_navigation(){
var state = cljs.core.deref(aviation_missions.core.app_state);
var total_missions = cljs.core.count(new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(state));
var per_page = new cljs.core.Keyword(null,"missions-per-page","missions-per-page",1078906969).cljs$core$IFn$_invoke$arity$1(state);
var current_page = new cljs.core.Keyword(null,"page-number","page-number",556880104).cljs$core$IFn$_invoke$arity$1(state);
var total_pages = aviation_missions.core.get_total_pages(new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(state),per_page);
var start_mission = (((current_page - (1)) * per_page) + (1));
var end_mission = (function (){var x__5090__auto__ = (current_page * per_page);
var y__5091__auto__ = total_missions;
return ((x__5090__auto__ < y__5091__auto__) ? x__5090__auto__ : y__5091__auto__);
})();
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.page-navigation","div.page-navigation",-1029110018),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.nav-button","button.nav-button",-1159360206),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_page,(1)),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"page-number","page-number",556880104),(1));
})], null),"\u27EA FIRST"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.nav-button","button.nav-button",-1159360206),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_page,(1)),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.update,new cljs.core.Keyword(null,"page-number","page-number",556880104),cljs.core.dec);
})], null),"\u2039 PREV"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.page-info","div.page-info",1292133220),["PAGE ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(current_page)," OF ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total_pages)," \u2022 MISSIONS ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(start_mission),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(end_mission)," OF ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(total_missions)].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.nav-button","button.nav-button",-1159360206),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_page,total_pages),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.update,new cljs.core.Keyword(null,"page-number","page-number",556880104),cljs.core.inc);
})], null),"NEXT \u203A"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.nav-button","button.nav-button",-1159360206),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"disabled","disabled",-1529784218),cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_page,total_pages),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"page-number","page-number",556880104),total_pages);
})], null),"LAST \u27EB"], null)], null);
});
aviation_missions.core.mission_card = (function aviation_missions$core$mission_card(mission){

var challenges = aviation_missions.core.analyze_mission_challenges(mission);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-card","div.mission-card",-408072555),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-header","div.mission-header",2046518876),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3.mission-title","h3.mission-title",628838765),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(mission)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-meta","div.mission-meta",935600612),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.category-badge","span.category-badge",1329647870),new cljs.core.Keyword(null,"category","category",-593092832).cljs$core$IFn$_invoke$arity$1(mission)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.difficulty-badge","span.difficulty-badge",-1924890965),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),["badge-difficulty-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(mission))].join('')], null),(function (){var G__8278 = new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(mission);
switch (G__8278) {
case (1):
return "EASY";

break;
case (2):
return "MEDIUM";

break;
case (3):
return "HARD";

break;
case (4):
return "HARD";

break;
case (5):
return "HARD";

break;
case (6):
return "EXPERT";

break;
case (7):
return "EXPERT";

break;
case (8):
return "EXPERT";

break;
case (9):
return "EXPERT";

break;
default:
return "UNK";

}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.experience-badge","span.experience-badge",1759336752),(cljs.core.truth_(new cljs.core.Keyword(null,"pilot_experience","pilot_experience",-1652556168).cljs$core$IFn$_invoke$arity$1(mission))?clojure.string.replace(clojure.string.replace(clojure.string.replace(new cljs.core.Keyword(null,"pilot_experience","pilot_experience",-1652556168).cljs$core$IFn$_invoke$arity$1(mission),/Beginner.*/,"STUDENT"),/Intermediate.*/,"PRIVATE"),/Advanced.*/,"COMMERCIAL"):"STUDENT")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-content","div.mission-content",-316267815),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-data-grid","div.mission-data-grid",1501664147),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-label","span.mission-data-label",-1700642424),"ROUTE:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-value","span.mission-data-value",-621183724),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"route","route",329891309).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = new cljs.core.Keyword(null,"suggested_route","suggested_route",-569827062).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return "See description";
}
}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-label","span.mission-data-label",-1700642424),"OBJECTIVE:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-value","span.mission-data-value",-621183724),new cljs.core.Keyword(null,"objective","objective",1301058585).cljs$core$IFn$_invoke$arity$1(mission)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-label","span.mission-data-label",-1700642424),"DESCRIPTION:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-value","span.mission-data-value",-621183724),new cljs.core.Keyword(null,"mission_description","mission_description",-974904226).cljs$core$IFn$_invoke$arity$1(mission)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.challenges_table,challenges], null),(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_empty(new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(mission));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-section","div.mission-section",-2084650134),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Notes"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(mission)], null)], null):null),(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"special_challenges","special_challenges",312009460).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_empty(new cljs.core.Keyword(null,"special_challenges","special_challenges",312009460).cljs$core$IFn$_invoke$arity$1(mission));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-section","div.mission-section",-2084650134),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h4","h4",2004862993),"Special Challenges"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"special_challenges","special_challenges",312009460).cljs$core$IFn$_invoke$arity$1(mission)], null)], null):null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-footer","div.mission-footer",1999223222),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.pilot-experience","div.pilot-experience",2143181516),["MIN EXP: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = new cljs.core.Keyword(null,"pilot_experience","pilot_experience",-1652556168).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "Student Pilot";
}
})())].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-stats","div.mission-stats",1149451399),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-item","div.stat-item",2034518119),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.stat-icon","span.stat-icon",1754476427),"\uD83D\uDCAC"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.stat-count","span.stat-count",1773169668),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"comment_count","comment_count",-518974220).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.stat-label","span.stat-label",1556734311),"Comments"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-item","div.stat-item",2034518119),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.stat-icon","span.stat-icon",1754476427),"\u2713"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.stat-count","span.stat-count",1773169668),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"completion_count","completion_count",-335664244).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.stat-label","span.stat-label",1556734311),"Completed"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn-mission.primary","button.btn-mission.primary",-385023129),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return aviation_missions.core.fetch_mission_details(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission));
})], null),"BRIEF"], null)], null)], null)], null);
});
aviation_missions.core.create_mission_dialog = (function aviation_missions$core$create_mission_dialog(){

var new_mission = new cljs.core.Keyword(null,"new-mission","new-mission",2132479262).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state));
if(cljs.core.truth_(new cljs.core.Keyword(null,"create-dialog-open","create-dialog-open",771901202).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal.modal-open","div.modal.modal-open",-1742142103),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-backdrop","div.modal-backdrop",-1603920212),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"create-dialog-open","create-dialog-open",771901202),false);
})], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-content","div.modal-content",-83470844),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-header","div.modal-header",-799180845),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Create New Mission"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.modal-close","button.modal-close",-1886946939),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"create-dialog-open","create-dialog-open",771901202),false);
})], null),"\u00D7"], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-body","div.modal-body",-2141892968),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Mission Title *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.form-input","input.form-input",-1259370157),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(new_mission),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8279_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),new cljs.core.Keyword(null,"title","title",636505583)], null),p1__8279_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Mission Description *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea.form-textarea","textarea.form-textarea",-1575552247),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"mission_description","mission_description",-974904226).cljs$core$IFn$_invoke$arity$1(new_mission),new cljs.core.Keyword(null,"rows","rows",850049680),(3),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Describe what the pilot will do in this mission",new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8280_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),new cljs.core.Keyword(null,"mission_description","mission_description",-974904226)], null),p1__8280_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Why This Mission? *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea.form-textarea","textarea.form-textarea",-1575552247),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"why_description","why_description",1681539809).cljs$core$IFn$_invoke$arity$1(new_mission),new cljs.core.Keyword(null,"rows","rows",850049680),(2),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Explain the educational value and purpose",new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8281_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),new cljs.core.Keyword(null,"why_description","why_description",1681539809)], null),p1__8281_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-row","div.form-row",-937983498),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Category"], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select.form-select","select.form-select",1844412748),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"category","category",-593092832).cljs$core$IFn$_invoke$arity$1(new_mission),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8282_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),new cljs.core.Keyword(null,"category","category",-593092832)], null),p1__8282_SHARP_.target.value);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Training"], null),"Training"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Proficiency"], null),"Proficiency"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Cross-Country"], null),"Cross-Country"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Emergency"], null),"Emergency Procedures"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Difficulty"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select.form-select","select.form-select",1844412748),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(new_mission),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8283_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),new cljs.core.Keyword(null,"difficulty","difficulty",755680807)], null),parseInt(p1__8283_SHARP_.target.value));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"1"], null),"1 - Beginner"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"2"], null),"2 - Intermediate"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"3"], null),"3 - Advanced"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Primary Objective *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.form-input","input.form-input",-1259370157),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"e.g., Practice standard rate turns",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"objective","objective",1301058585).cljs$core$IFn$_invoke$arity$1(new_mission),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8284_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-mission","new-mission",2132479262),new cljs.core.Keyword(null,"objective","objective",1301058585)], null),p1__8284_SHARP_.target.value);
})], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-footer","div.modal-footer",1309572241),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-secondary","button.btn.btn-secondary",-2100184270),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"create-dialog-open","create-dialog-open",771901202),false);
})], null),"Cancel"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-primary","button.btn.btn-primary",510358192),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
if(cljs.core.truth_((function (){var and__5000__auto__ = cljs.core.not_empty(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(new_mission));
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = cljs.core.not_empty(new cljs.core.Keyword(null,"mission_description","mission_description",-974904226).cljs$core$IFn$_invoke$arity$1(new_mission));
if(cljs.core.truth_(and__5000__auto____$1)){
var and__5000__auto____$2 = cljs.core.not_empty(new cljs.core.Keyword(null,"why_description","why_description",1681539809).cljs$core$IFn$_invoke$arity$1(new_mission));
if(cljs.core.truth_(and__5000__auto____$2)){
return cljs.core.not_empty(new cljs.core.Keyword(null,"objective","objective",1301058585).cljs$core$IFn$_invoke$arity$1(new_mission));
} else {
return and__5000__auto____$2;
}
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
return aviation_missions.core.create_mission(new_mission);
} else {
return null;
}
})], null),"Create Mission"], null)], null)], null)], null);
} else {
return null;
}
});
aviation_missions.core.missions_page = (function aviation_missions$core$missions_page(){

return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.missions-page","div.missions-page",-546766199),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.page-header","div.page-header",-18181304),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"\u2708\uFE0F Aviation Training Missions"], null)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"loading","loading",-737050189).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.loading","div.loading",-155515768),"Loading missions..."], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.page_navigation], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.missions-grid","div.missions-grid",1409968726),((cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.empty-state","div.empty-state",1970626869),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"No missions found. Create your first mission to get started!"], null)], null):(function (){var paginated_missions = aviation_missions.core.get_paginated_missions(new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)),new cljs.core.Keyword(null,"page-number","page-number",556880104).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)),new cljs.core.Keyword(null,"missions-per-page","missions-per-page",1078906969).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)));
var iter__5480__auto__ = (function aviation_missions$core$missions_page_$_iter__8285(s__8286){
return (new cljs.core.LazySeq(null,(function (){
var s__8286__$1 = s__8286;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__8286__$1);
if(temp__5804__auto__){
var s__8286__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__8286__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__8286__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__8288 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__8287 = (0);
while(true){
if((i__8287 < size__5479__auto__)){
var mission = cljs.core._nth(c__5478__auto__,i__8287);
cljs.core.chunk_append(b__8288,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.mission_card,mission], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission)], null)));

var G__8428 = (i__8287 + (1));
i__8287 = G__8428;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8288),aviation_missions$core$missions_page_$_iter__8285(cljs.core.chunk_rest(s__8286__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8288),null);
}
} else {
var mission = cljs.core.first(s__8286__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.mission_card,mission], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission)], null)),aviation_missions$core$missions_page_$_iter__8285(cljs.core.rest(s__8286__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(paginated_missions);
})())], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.page_navigation], null)], null)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.fab","button.fab",-1011699885),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"create-dialog-open","create-dialog-open",771901202),true);
}),new cljs.core.Keyword(null,"title","title",636505583),"Create New Mission"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.fab-icon","span.fab-icon",-1313560808),"\u2708\uFE0F"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.fab-label","span.fab-label",-1319423021),"Create Mission"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.create_mission_dialog], null)], null);
});
aviation_missions.core.mission_details_page = (function aviation_missions$core$mission_details_page(){

var state = cljs.core.deref(aviation_missions.core.app_state);
var mission = new cljs.core.Keyword(null,"mission-details","mission-details",-850239280).cljs$core$IFn$_invoke$arity$1(state);
var loading_QMARK_ = new cljs.core.Keyword(null,"mission-details-loading","mission-details-loading",133475783).cljs$core$IFn$_invoke$arity$1(state);
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-details-page","div.mission-details-page",824385602),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.page-header","div.page-header",-18181304),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-secondary","button.btn.btn-secondary",-2100184270),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"missions","missions",2065000991));
})], null),"\u2190 Back to Missions"], null),(cljs.core.truth_(mission)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.mission-title","h1.mission-title",1532661489),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(mission)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"Mission Details"], null))], null),(cljs.core.truth_(loading_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.loading","div.loading",-155515768),"Loading mission details..."], null):((cljs.core.not(mission))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.error","div.error",314336058),"Mission not found or failed to load."], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-details-content","div.mission-details-content",1409220524),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-details-main","div.mission-details-main",250472810),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-section","div.detail-section",-1522718495),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Mission Overview"], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-data-grid","div.mission-data-grid",1501664147),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-label","span.mission-data-label",-1700642424),"CATEGORY:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-value","span.mission-data-value",-621183724),new cljs.core.Keyword(null,"category","category",-593092832).cljs$core$IFn$_invoke$arity$1(mission)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-label","span.mission-data-label",-1700642424),"DIFFICULTY:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-value","span.mission-data-value",-621183724),(function (){var G__8299 = new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(mission);
switch (G__8299) {
case (1):
return "EASY (1/9)";

break;
case (2):
return "MEDIUM (2/9)";

break;
case (3):
return "HARD (3/9)";

break;
case (4):
return "HARD (4/9)";

break;
case (5):
return "HARD (5/9)";

break;
case (6):
return "EXPERT (6/9)";

break;
case (7):
return "EXPERT (7/9)";

break;
case (8):
return "EXPERT (8/9)";

break;
case (9):
return "EXPERT (9/9)";

break;
default:
return ["LEVEL ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(mission))].join('');

}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-label","span.mission-data-label",-1700642424),"PILOT EXPERIENCE:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-value","span.mission-data-value",-621183724),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"pilot_experience","pilot_experience",-1652556168).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "Student Pilot";
}
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-label","span.mission-data-label",-1700642424),"ROUTE:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.mission-data-value","span.mission-data-value",-621183724),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"route","route",329891309).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = new cljs.core.Keyword(null,"suggested_route","suggested_route",-569827062).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return "See description";
}
}
})()], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-section","div.detail-section",-1522718495),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Mission Objective"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"objective","objective",1301058585).cljs$core$IFn$_invoke$arity$1(mission)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-section","div.detail-section",-1522718495),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Mission Description"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"mission_description","mission_description",-974904226).cljs$core$IFn$_invoke$arity$1(mission)], null)], null),(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"why_description","why_description",1681539809).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_empty(new cljs.core.Keyword(null,"why_description","why_description",1681539809).cljs$core$IFn$_invoke$arity$1(mission));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-section","div.detail-section",-1522718495),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Why This Mission Matters"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"why_description","why_description",1681539809).cljs$core$IFn$_invoke$arity$1(mission)], null)], null):null),(function (){var challenges = aviation_missions.core.analyze_mission_challenges(mission);
if(cljs.core.seq(challenges)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-section","div.detail-section",-1522718495),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Flight Challenges"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.challenges-grid","div.challenges-grid",1705909621),(function (){var iter__5480__auto__ = (function aviation_missions$core$mission_details_page_$_iter__8300(s__8301){
return (new cljs.core.LazySeq(null,(function (){
var s__8301__$1 = s__8301;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__8301__$1);
if(temp__5804__auto__){
var s__8301__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__8301__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__8301__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__8303 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__8302 = (0);
while(true){
if((i__8302 < size__5479__auto__)){
var challenge_key = cljs.core._nth(c__5478__auto__,i__8302);
cljs.core.chunk_append(b__8303,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.challenge-item","div.challenge-item",1148326435),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-icon","span.challenge-icon",-878973991),"\u26A0"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-label","span.challenge-label",-3168798),cljs.core.get.cljs$core$IFn$_invoke$arity$2(aviation_missions.core.challenge_definitions,challenge_key)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),challenge_key], null)));

var G__8430 = (i__8302 + (1));
i__8302 = G__8430;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__8303),aviation_missions$core$mission_details_page_$_iter__8300(cljs.core.chunk_rest(s__8301__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__8303),null);
}
} else {
var challenge_key = cljs.core.first(s__8301__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.challenge-item","div.challenge-item",1148326435),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-icon","span.challenge-icon",-878973991),"\u26A0"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.challenge-label","span.challenge-label",-3168798),cljs.core.get.cljs$core$IFn$_invoke$arity$2(aviation_missions.core.challenge_definitions,challenge_key)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),challenge_key], null)),aviation_missions$core$mission_details_page_$_iter__8300(cljs.core.rest(s__8301__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(challenges));
})()], null)], null);
} else {
return null;
}
})(),(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_empty(new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(mission));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-section","div.detail-section",-1522718495),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Important Notes"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"notes","notes",-1039600523).cljs$core$IFn$_invoke$arity$1(mission)], null)], null):null),(cljs.core.truth_((function (){var and__5000__auto__ = new cljs.core.Keyword(null,"special_challenges","special_challenges",312009460).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_empty(new cljs.core.Keyword(null,"special_challenges","special_challenges",312009460).cljs$core$IFn$_invoke$arity$1(mission));
} else {
return and__5000__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-section","div.detail-section",-1522718495),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Special Challenges"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"special_challenges","special_challenges",312009460).cljs$core$IFn$_invoke$arity$1(mission)], null)], null):null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.mission-details-sidebar","div.mission-details-sidebar",293141066),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-card","div.detail-card",1558089532),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Mission Statistics"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-item","div.detail-item",-256470164),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-label","span.detail-label",1043702188),"Comments"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-value","span.detail-value",-962273458),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"comment_count","comment_count",-518974220).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-item","div.detail-item",-256470164),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-label","span.detail-label",1043702188),"Completions"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-value","span.detail-value",-962273458),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"completion_count","completion_count",-335664244).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-item","div.detail-item",-256470164),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-label","span.detail-label",1043702188),"Thumbs Up"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-value","span.detail-value",-962273458),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"thumbs_up","thumbs_up",-326341174).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-item","div.detail-item",-256470164),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-label","span.detail-label",1043702188),"Thumbs Down"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-value","span.detail-value",-962273458),(function (){var or__5002__auto__ = new cljs.core.Keyword(null,"thumbs_down","thumbs_down",-1347107271).cljs$core$IFn$_invoke$arity$1(mission);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (0);
}
})()], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-card","div.detail-card",1558089532),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Mission Information"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-item","div.detail-item",-256470164),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-label","span.detail-label",1043702188),"Created"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-value","span.detail-value",-962273458),(cljs.core.truth_(new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(mission))?clojure.string.replace(clojure.string.replace(new cljs.core.Keyword(null,"created_at","created_at",1484050750).cljs$core$IFn$_invoke$arity$1(mission),/T.*/,""),/-/,"/"):"Unknown")], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-item","div.detail-item",-256470164),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-label","span.detail-label",1043702188),"Last Updated"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-value","span.detail-value",-962273458),(cljs.core.truth_(new cljs.core.Keyword(null,"updated_at","updated_at",-460224592).cljs$core$IFn$_invoke$arity$1(mission))?clojure.string.replace(clojure.string.replace(new cljs.core.Keyword(null,"updated_at","updated_at",-460224592).cljs$core$IFn$_invoke$arity$1(mission),/T.*/,""),/-/,"/"):"Unknown")], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-item","div.detail-item",-256470164),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-label","span.detail-label",1043702188),"Mission ID"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.detail-value","span.detail-value",-962273458),["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission))].join('')], null)], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.detail-card","div.detail-card",1558089532),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Actions"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-primary","button.btn.btn-primary",510358192),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"10px"], null)], null),"\uD83D\uDCCB Print Mission Brief"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-secondary","button.btn.btn-secondary",-2100184270),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"10px"], null)], null),"\u2713 Mark as Completed"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-outline","button.btn.btn-outline",83642451),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null)], null),"\uD83D\uDCAC Add Comment"], null),(cljs.core.truth_(new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px 0"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-warning","button.btn.btn-warning",1403209115),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),"100%",new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),"10px"], null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"edit-mission-id","edit-mission-id",-1879290907),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223),mission,new cljs.core.Keyword(null,"edit-dialog-open","edit-dialog-open",1061074430),true], 0));
})], null),"\u270F\uFE0F Edit Mission"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-danger","button.btn.btn-danger",533883282),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return aviation_missions.core.delete_mission(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(mission));
})], null),"\uD83D\uDDD1\uFE0F Delete Mission"], null)], null):null)], null)], null)], null)
)),aviation_missions.core.admin_login_dialog = (function aviation_missions$core$mission_details_page_$_admin_login_dialog(){

var credentials = new cljs.core.Keyword(null,"login-credentials","login-credentials",925412435).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal","div.modal",-610985484),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(new cljs.core.Keyword(null,"login-dialog-open","login-dialog-open",845923398).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))?"modal-open":null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-backdrop","div.modal-backdrop",-1603920212),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"login-dialog-open","login-dialog-open",845923398),false);
})], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-content","div.modal-content",-83470844),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-header","div.modal-header",-799180845),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83D\uDD10 Administrator Login"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.modal-close","button.modal-close",-1886946939),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"login-dialog-open","login-dialog-open",845923398),false);
})], null),"\u00D7"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-body","div.modal-body",-2141892968),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Admin Username"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.form-input","input.form-input",-1259370157),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"admin_name","admin_name",-391736032).cljs$core$IFn$_invoke$arity$1(credentials),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Enter admin username",new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8289_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"login-credentials","login-credentials",925412435),new cljs.core.Keyword(null,"admin_name","admin_name",-391736032)], null),p1__8289_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Password"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.form-input","input.form-input",-1259370157),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),"password",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"password","password",417022471).cljs$core$IFn$_invoke$arity$1(credentials),new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Enter admin password",new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8290_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"login-credentials","login-credentials",925412435),new cljs.core.Keyword(null,"password","password",417022471)], null),p1__8290_SHARP_.target.value);
}),new cljs.core.Keyword(null,"on-key-press","on-key-press",-399563677),(function (p1__8291_SHARP_){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__8291_SHARP_.key,"Enter")){
return aviation_missions.core.admin_login(credentials);
} else {
return null;
}
})], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-info","div.admin-info",-1722675662),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Default credentials for demo:"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Username: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),"admin"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Password: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"code","code",1586293142),"aviation123"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-footer","div.modal-footer",1309572241),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-secondary","button.btn.btn-secondary",-2100184270),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"login-dialog-open","login-dialog-open",845923398),false);
})], null),"Cancel"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-primary","button.btn.btn-primary",510358192),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return aviation_missions.core.admin_login(credentials);
}),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),((cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"admin_name","admin_name",-391736032).cljs$core$IFn$_invoke$arity$1(credentials))) || (cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"password","password",417022471).cljs$core$IFn$_invoke$arity$1(credentials))))], null),"\uD83D\uDD13 Login"], null)], null)], null)], null);
}),aviation_missions.core.edit_mission_dialog = (function aviation_missions$core$mission_details_page_$_edit_mission_dialog(){

var mission__$1 = new cljs.core.Keyword(null,"mission-details","mission-details",-850239280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state));
var edit_data = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return mission__$1;
}
})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"edit-dialog-open","edit-dialog-open",1061074430).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal.modal-open","div.modal.modal-open",-1742142103),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-backdrop","div.modal-backdrop",-1603920212),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"edit-dialog-open","edit-dialog-open",1061074430),false);
})], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-content","div.modal-content",-83470844),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-header","div.modal-header",-799180845),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\u270F\uFE0F Edit Mission"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.modal-close","button.modal-close",-1886946939),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"edit-dialog-open","edit-dialog-open",1061074430),false);
})], null),"\u00D7"], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-body","div.modal-body",-2141892968),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Mission Title *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.form-input","input.form-input",-1259370157),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(edit_data),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8292_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223),new cljs.core.Keyword(null,"title","title",636505583)], null),p1__8292_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Mission Description *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea.form-textarea","textarea.form-textarea",-1575552247),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"mission_description","mission_description",-974904226).cljs$core$IFn$_invoke$arity$1(edit_data),new cljs.core.Keyword(null,"rows","rows",850049680),(3),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8293_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223),new cljs.core.Keyword(null,"mission_description","mission_description",-974904226)], null),p1__8293_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Why This Mission? *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea.form-textarea","textarea.form-textarea",-1575552247),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"why_description","why_description",1681539809).cljs$core$IFn$_invoke$arity$1(edit_data),new cljs.core.Keyword(null,"rows","rows",850049680),(2),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8294_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223),new cljs.core.Keyword(null,"why_description","why_description",1681539809)], null),p1__8294_SHARP_.target.value);
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-row","div.form-row",-937983498),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Category"], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select.form-select","select.form-select",1844412748),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"category","category",-593092832).cljs$core$IFn$_invoke$arity$1(edit_data),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8295_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223),new cljs.core.Keyword(null,"category","category",-593092832)], null),p1__8295_SHARP_.target.value);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Training"], null),"Training"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Proficiency"], null),"Proficiency"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Cross-Country"], null),"Cross-Country"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"Emergency"], null),"Emergency Procedures"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Difficulty"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select.form-select","select.form-select",1844412748),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"difficulty","difficulty",755680807).cljs$core$IFn$_invoke$arity$1(edit_data),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8296_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223),new cljs.core.Keyword(null,"difficulty","difficulty",755680807)], null),parseInt(p1__8296_SHARP_.target.value));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"1"], null),"1 - Beginner"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"2"], null),"2 - Intermediate"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),"3"], null),"3 - Advanced"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.form-group","div.form-group",-1721134770),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),"Primary Objective *"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input.form-input","input.form-input",-1259370157),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"objective","objective",1301058585).cljs$core$IFn$_invoke$arity$1(edit_data),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8297_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223),new cljs.core.Keyword(null,"objective","objective",1301058585)], null),p1__8297_SHARP_.target.value);
})], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.modal-footer","div.modal-footer",1309572241),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-secondary","button.btn.btn-secondary",-2100184270),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"edit-dialog-open","edit-dialog-open",1061074430),false);
})], null),"Cancel"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-primary","button.btn.btn-primary",510358192),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
aviation_missions.core.update_mission(new cljs.core.Keyword(null,"edit-mission-id","edit-mission-id",-1879290907).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)),new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(aviation_missions.core.app_state,cljs.core.dissoc,new cljs.core.Keyword(null,"edit-mission-data","edit-mission-data",241261223));
})], null),"\uD83D\uDCBE Save Changes"], null)], null)], null)], null);
} else {
return null;
}
}),aviation_missions.core.admin_panel = (function aviation_missions$core$mission_details_page_$_admin_panel(){

return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-panel","div.admin-panel",1617944644),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.page-header","div.page-header",-18181304),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"\u2699\uFE0F Admin Panel"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Mission database management and system administration"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-content","div.admin-content",-423380361),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-section","div.admin-section",-821049841),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83D\uDCCA Database Management"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-cards","div.admin-cards",721920635),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-card","div.admin-card",1696229093),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Export Missions"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Download all missions as JSON file"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-primary","button.btn.btn-primary",510358192),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return aviation_missions.core.export_missions();
})], null),"\uD83D\uDCE5 Export JSON"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-card","div.admin-card",1696229093),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Import Missions"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"Upload missions from JSON file"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"file",new cljs.core.Keyword(null,"accept","accept",1874130431),".json",new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__8298_SHARP_){
return aviation_missions.core.import_missions((p1__8298_SHARP_.target.files[(0)]));
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-secondary","button.btn.btn-secondary",-2100184270),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return document.querySelector("input[type=file]").click();
})], null),"\uD83D\uDCE4 Choose File"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-section","div.admin-section",-821049841),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83D\uDCC8 System Statistics"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stats-grid","div.stats-grid",456561578),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-card","div.stat-card",-1315972816),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Total Missions"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-value","div.stat-value",1336227416),cljs.core.count(new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-card","div.stat-card",-1315972816),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Categories"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-value","div.stat-value",1336227416),cljs.core.count(cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"category","category",-593092832),new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-card","div.stat-card",-1315972816),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),"Avg Difficulty"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.stat-value","div.stat-value",1336227416),((cljs.core.seq(new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state))))?(function (){var difficulties = cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.number_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"difficulty","difficulty",755680807),new cljs.core.Keyword(null,"missions","missions",2065000991).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state))));
if(cljs.core.seq(difficulties)){
return (cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,difficulties) / cljs.core.count(difficulties)).toFixed((1));
} else {
return "N/A";
}
})():"N/A")], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-section","div.admin-section",-821049841),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83D\uDD27 Mission Management"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-actions","div.admin-actions",-1915652139),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-warning","button.btn.btn-warning",1403209115),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return aviation_missions.core.refresh_missions();
})], null),"\uD83D\uDD04 Refresh Missions"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-danger","button.btn.btn-danger",533883282),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return aviation_missions.core.clear_mission_cache();
})], null),"\uD83D\uDDD1\uFE0F Clear Cache"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button.btn.btn-info","button.btn.btn-info",-749622712),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return aviation_missions.core.validate_missions();
})], null),"\u2705 Validate Data"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.admin-section","div.admin-section",-821049841),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"\uD83D\uDCCB Recent Activity"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.activity-log","div.activity-log",2025412918),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),"System logs and recent changes will appear here."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.log-entry","div.log-entry",-436334720),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.log-time","span.log-time",912126976),["Last updated: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.log-message","span.log-message",1866247179),"Admin panel loaded successfully"], null)], null)], null)], null)], null)], null);
}),aviation_missions.core.navigation = (function aviation_missions$core$mission_details_page_$_navigation(){

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nav.navigation","nav.navigation",58470174),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.nav-container","div.nav-container",786437332),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.nav-tabs","div.nav-tabs",-1895872651),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.nav-tab","a.nav-tab",326599970),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)),new cljs.core.Keyword(null,"missions","missions",2065000991)))?"active":null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"missions","missions",2065000991));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-icon","span.nav-icon",422844455),"\u2708\uFE0F"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-label","span.nav-label",-1366408016),"Missions"], null)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"admin-authenticated","admin-authenticated",993887798).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.nav-tab","a.nav-tab",326599970),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)),new cljs.core.Keyword(null,"admin","admin",-1239101627)))?"active":null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
aviation_missions.core.fetch_submissions();

aviation_missions.core.fetch_pending_updates();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"admin","admin",-1239101627));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-icon","span.nav-icon",422844455),"\u2699\uFE0F"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-label","span.nav-label",-1366408016),"Admin Panel"], null)], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.nav-tab","a.nav-tab",326599970),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"login-dialog-open","login-dialog-open",845923398),true);
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-icon","span.nav-icon",422844455),"\uD83D\uDD10"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-label","span.nav-label",-1366408016),"Admin Login"], null)], null)),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.nav-tab","a.nav-tab",326599970),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state)),new cljs.core.Keyword(null,"challenges","challenges",1539156264)))?"active":null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(aviation_missions.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"current-page","current-page",-101294180),new cljs.core.Keyword(null,"challenges","challenges",1539156264));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-icon","span.nav-icon",422844455),"\uD83C\uDFAF"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.nav-label","span.nav-label",-1366408016),"Challenges"], null)], null)], null)], null)], null);
}),aviation_missions.core.app = (function aviation_missions$core$mission_details_page_$_app(){

return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.app","div.app",-99849286),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"header.app-header","header.app-header",-637446905),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container","div.container",72419955),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1.app-title","h1.app-title",-1252602906),"\u2708\uFE0F Aviation Mission Management v2.1"], null)], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.navigation], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"main.main-content","main.main-content",-770458257),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.container","div.container",72419955),(function (){var G__8304 = new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(aviation_missions.core.app_state));
var G__8304__$1 = (((G__8304 instanceof cljs.core.Keyword))?G__8304.fqn:null);
switch (G__8304__$1) {
case "missions":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.missions_page], null);

break;
case "mission-details":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.mission_details_page], null);

break;
case "admin":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.admin_panel], null);

break;
case "challenges":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Challenges page coming soon..."], null);

break;
default:
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.missions_page], null);

}
})()], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.admin_login_dialog], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.edit_mission_dialog], null)], null);
}),aviation_missions.core.dev_setup = (function aviation_missions$core$mission_details_page_$_dev_setup(){
if(aviation_missions.config.debug_QMARK_){
console.log("Development mode enabled");

console.log("Frontend HTTP server listening on port 8280");
} else {
}

return console.log("\uD83C\uDF10 UI HTTP Service: Frontend available via backend server");
}),aviation_missions.core.mount_root = (function aviation_missions$core$mission_details_page_$_mount_root(){
var root_el = document.getElementById("app");
reagent.dom.unmount_component_at_node(root_el);

return reagent.dom.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [aviation_missions.core.app], null),root_el);
}),aviation_missions.core.init_BANG_ = (function aviation_missions$core$mission_details_page_$_init_BANG_(){
console.log("\uD83C\uDFE0 FRONTEND STARTUP: Aviation Missions UI initializing...");

console.log("Debug mode:",aviation_missions.config.debug_QMARK_);

console.log("API base URL:",aviation_missions.config.api_base_url);

console.log("\uD83D\uDD27 UI PHASE 1: Setting up development environment...");

aviation_missions.core.dev_setup();

console.log("\u2705 UI PHASE 1 COMPLETE: Development environment ready");

console.log("\uD83C\uDFAD UI PHASE 2: Mounting React components...");

aviation_missions.core.mount_root();

console.log("\u2705 UI PHASE 2 COMPLETE: React components mounted, UI ready");

console.log("\uD83D\uDCCA UI PHASE 3: Loading application data...");

aviation_missions.core.check_admin_status();

return aviation_missions.core.fetch_missions();
})], null);
});

//# sourceMappingURL=aviation_missions.core.js.map
