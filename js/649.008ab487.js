"use strict";(self["webpackChunkchat_app_vue"]=self["webpackChunkchat_app_vue"]||[]).push([[649],{6649:function(e,l,a){a.r(l),a.d(l,{default:function(){return C}});var s=a(3396),r=a(9242),o=a(7139);const t=e=>((0,s.dD)("data-v-1572cce2"),e=e(),(0,s.Cn)(),e),n={key:0,class:"auth_handler"},d=t((()=>(0,s._)("h3",null,"Регистрация",-1))),c={class:"form_content"},i={class:"form_field"},m={class:"form_field"},u={class:"form_field"},p=t((()=>(0,s._)("br",null,null,-1))),h={class:"form_field"},_=t((()=>(0,s._)("label",{for:"check"},"Алина Овчинникова - лучшая девочка",-1))),v={class:"form_ending"};function w(e,l,a,t,w,$){const f=(0,s.up)("base-loader"),g=(0,s.up)("base-input"),k=(0,s.up)("base-button"),b=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)(s.HY,null,[w.loading?((0,s.wg)(),(0,s.iD)("div",n,[(0,s.Wm)(f)])):(0,s.kq)("",!0),(0,s._)("form",{onSubmit:l[5]||(l[5]=(0,r.iM)(((...e)=>$.handleForm&&$.handleForm(...e)),["prevent"])),class:"register_form"},[d,(0,s._)("div",c,[(0,s._)("div",i,[(0,s.Wm)(g,{autocomplete:"nickname",placehldr:"Введите имя",label:"Имя пользователя",class:(0,o.C_)({incorrect:w.v$.name.$errors.length}),modelValue:w.name,"onUpdate:modelValue":l[0]||(l[0]=e=>w.name=e)},null,8,["class","modelValue"]),(0,s._)("small",{class:(0,o.C_)({visible:w.v$.name.$errors.length})}," Введите имя пользователя ",2)]),(0,s._)("div",m,[(0,s.Wm)(g,{autocomplete:"email",placehldr:"Введите почту",label:"Почта",class:(0,o.C_)({incorrect:w.v$.email.$errors.length}),modelValue:w.email,"onUpdate:modelValue":l[1]||(l[1]=e=>w.email=e)},null,8,["class","modelValue"]),(0,s._)("small",{class:(0,o.C_)({visible:w.v$.email.$errors.length})}," Введите корректный адрес электронной почты ",2)]),(0,s._)("div",u,[(0,s.Wm)(g,{autocomplete:"new-password",placehldr:"Введите пароль",label:"Пароль",type:"password",class:(0,o.C_)({incorrect:w.v$.password.$errors.length}),modelValue:w.password,"onUpdate:modelValue":l[2]||(l[2]=e=>w.password=e)},null,8,["class","modelValue"]),(0,s._)("small",{class:(0,o.C_)({visible:w.v$.password.$errors.length})},[(0,s.Uk)(" Минимальная длина пароля - 6 символов."),p,(0,s.Uk)("Текущая длина пароля - "+(0,o.zw)(w.password.length),1)],2)]),(0,s._)("div",h,[(0,s.Wm)(g,{autocomplete:"off",placehldr:"Повторите пароль",label:"Повторите пароль",type:"password",class:(0,o.C_)({incorrect:w.v$.repeatPassword.$errors.length}),modelValue:w.repeatPassword,"onUpdate:modelValue":l[3]||(l[3]=e=>w.repeatPassword=e)},null,8,["class","modelValue"]),(0,s._)("small",{class:(0,o.C_)({visible:w.v$.repeatPassword.$errors.length})}," Введённое значение не равно паролю ",2)]),(0,s._)("div",{class:(0,o.C_)(["check_box",{incorrect:w.v$.check.$errors.length}])},[(0,s.wy)((0,s._)("input",{type:"checkbox",name:"",id:"check","onUpdate:modelValue":l[4]||(l[4]=e=>w.check=e)},null,512),[[r.e8,w.check]]),_],2)]),(0,s._)("div",v,[(0,s.Wm)(k,null,{default:(0,s.w5)((()=>[(0,s.Uk)("Регистрация")])),_:1}),(0,s._)("p",null,[(0,s.Uk)("Уже есть аккаунт? "),(0,s.Wm)(b,{to:"/login"},{default:(0,s.w5)((()=>[(0,s.Uk)("Войти")])),_:1})])])],32)],64)}a(7658);var $=a(3053),f=a(9117),g={data(){return{v$:(0,$.Xw)(),name:"",email:"",password:"",repeatPassword:"",check:"",loading:!1}},validations(){return{name:{required:f.C1},email:{required:f.C1,email:f.Do},password:{required:f.C1,minLength:(0,f.Ei)(6)},repeatPassword:{required:f.C1,sameAs:(0,f.sH)(this.password)},check:{required:f.C1}}},methods:{async handleForm(){if(this.v$.$validate(),!this.v$.$errors.length){try{this.loading=!0;const e={email:this.email,password:this.password,name:this.name};await this.$store.dispatch("signUp",e),this.$router.push("/register/photo")}catch(e){alert("При регистрации что-то пошло не так"),console.log(e)}this.loading=!1}}}},k=a(89);const b=(0,k.Z)(g,[["render",w],["__scopeId","data-v-1572cce2"]]);var C=b}}]);
//# sourceMappingURL=649.008ab487.js.map