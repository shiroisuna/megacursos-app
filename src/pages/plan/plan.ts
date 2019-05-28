import { Component, OnInit } from '@angular/core';
import { NavController, Tabs, NavParams, LoadingController, Platform, AlertController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from '../../providers/global/global';
let url = SERVER_URL;
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2';
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html',
})
export class PlanPage1 implements OnInit {
  public product: any = {
    name: 'Suscripcion',
    appleProductId: '1234',
    googleProductId: 'plan_mensual_premium_01'
  };
  planes;
  item;
  planx: any = [];
  curr;
  tab: Tabs;
  id_plan_stripe;
  precioss;
  preciosx;
  xx;
  currencies = ['usd', 'brl', 'eur', 'pen'];
  currency;
  tipo;
  currencyUser: any = {};
  currencyUser1;
  divisas;
  selectOptions;
  idUser;
  pet;
  actual: any = { "tipo": '' };
  anualx;
  mensualx;
  trimestralx;
  email;
  bandera: boolean = false;
  change;
  idplan;
  precio_mensual_premium;
  precio_mensual_normal;
  precio_trimestral_premium;
  precio_trimestral_normal;
  precio_anual_premium;
  precio_anual_normal;
  //this.productos:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    private http: Http,
    public store: InAppPurchase2,
    public platform: Platform,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) {
    this.tab = this.navCtrl.parent;
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    if (data) {
      this.email = data.datos.email;
      this.idUser = data.datos.id;
    }
    this.pet = "ax";
    this.xx = 1;
    this.anualx = "apremium";
    this.mensualx = "mpremium";
    this.trimestralx = "tpremium";
    //this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanPage');
  }
  ionViewWillEnter() {
    this.planss();
  }
  planss() {
    //alert("si");
    let idU = this.idUser;
    let loader = this.loading.create({
      content: '...',
    });
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    //var data={};
    loader.present()
      .then(() => {
        this.http.get(url + '/plansapp/android/' + idU, options)
          .map(res => res.json())
          .subscribe(res => {
            loader.dismiss();
            //console.log(res);
            this.planes = res.plans;
            this.currencyUser = res.currency;
            this.divisas = res.divisa;
            this.actual = res.actual;
            this.change = res.changePlan;
            this.planx = [];
            this.pagos(1, this.currencyUser);
            this.tipo = 1;
          });
      })
      .catch(
        error => console.log(error));
  }
  pagos(id, currencyUser) {
    if (id == 0) {
      this.xx = 0;
      this.anualx = "apremium";
    }
    if (id == 1) {
      this.xx = 1;
      this.mensualx = "mpremium";
    }
    if (id == 2) {
      this.xx = 2;
      this.trimestralx = "tpremium";
    }
    this.planx = [];
    for (let data of this.planes[id]) {//plan seleccionado
      //console.log("extras");
      //  console.log(data.extras);
      for (let precio of data.precios) {
        let min = currencyUser.selcurrencyiso;
        let mini = min.toUpperCase();
        //  console.log(precio.currency);
        if (precio.currency == mini) {
          //  console.log("if");
          let str = currencyUser.selcurrencyiso;
          this.currency = str.toUpperCase();
          let x = precio.currency;
          this.curr = x.toUpperCase();
          this.id_plan_stripe = precio.id_plan_stripe;
          if ((this.curr == 'CLP') || (this.curr == 'PYG')) {
            this.preciosx = precio.precio;
            //this.preciosx=precio.precio;
            if (id == 0) {
              this.precioss = this.preciosx;
            }
            if (id == 1) {
              this.precioss = this.preciosx / 12;
              this.precioss = Number(this.precioss.toFixed(2));
            }
          }
          else {
            //this.preciosx = precio.precio / 100;
            this.preciosx = precio.precio;
            if (id == 0) {
              this.precioss = this.preciosx;
            }
            if (id == 1) {
              this.precioss = this.preciosx / 12;
              this.precioss = Number(this.precioss.toFixed(2));
            }
          }
        }
      }
      let datos =
      {
        'nombre': data.plann,
        'idPlan': data.id,
        'renovacion': data.frecuencia,
        'status': data.status,
        'id_externo': data.id_externo,
        'descripcion': data.detalles,
        'idPlanstripe': this.id_plan_stripe,
        'precio': this.precioss,
        'currency': this.curr,
        'isoCode': currencyUser.selsymbol,
        'country': currencyUser.country,
        'extras': data.extras,
        'preciox': this.preciosx,
      };
      this.planx.push(datos);
    }
  }
  update(id) {
    this.pagos(id, this.currencyUser);
  }
  ngOnInit() {
    this.configurePurchasing();
  }
  configurePurchasing() {
    if (!this.platform.is('cordova')) { return; }
    let productId;
    try {
      if (this.platform.is('ios')) {
        //  productId = this.product.appleProductId;
      } else if (this.platform.is('android')) {
        //  productId = this.product.googleProductId;
      }
      this.store.verbosity = this.store.DEBUG;
      // Register the product with the store
      this.store.register({
        id: "plan_mensual_premium_01",
        alias: "plan_mensual_premium_01",
        type: this.store.PAID_SUBSCRIPTION
      });
      this.registerHandlers("plan_mensual_premium_01");
      this.store.register({
        id: "plan_normal_anual_01",
        alias: "plan_normal_anual_01",
        type: this.store.PAID_SUBSCRIPTION
      });
      this.registerHandlers("plan_normal_anual_01");

      this.store.register({
        id: "plan_mensual_normal_01",
        alias: "plan_mensual_normal_01",
        type: this.store.PAID_SUBSCRIPTION
      });
      this.registerHandlers("plan_mensual_normal_01");

      this.store.register({
        id: "plan_anual_premium_01",
        alias: "plan_anual_premium_01",
        type: this.store.PAID_SUBSCRIPTION
      });
      this.registerHandlers("plan_anual_premium_01");

      this.store.register({
        id: "plan_trimestral_normal_01",
        alias: "plan_trimestral_normal_01",
        type: this.store.PAID_SUBSCRIPTION
      });
      this.registerHandlers("plan_trimestral_normal_01");

      this.store.register({
        id: "plan_trimestral_premium_01",
        alias: "plan_trimestral_premium_01",
        type: this.store.PAID_SUBSCRIPTION
      });
      this.registerHandlers("plan_trimestral_premium_01");
      this.store.ready(() => {

        this.precio_mensual_premium = this.divide(this.store.get('plan_mensual_premium_01'), 1);
        this.precio_mensual_normal = this.divide(this.store.get('plan_mensual_normal_01'), 1);
        this.precio_trimestral_premium = this.divide(this.store.get('plan_trimestral_premium_01'), 3);
        this.precio_trimestral_normal = this.divide(this.store.get('plan_trimestral_normal_01'), 3);
        this.precio_anual_premium = this.divide(this.store.get('plan_anual_premium_01'), 12);
        this.precio_anual_normal = this.divide(this.store.get('plan_normal_anual_01'), 12);

        /*
        this.precio_mensual_premium=this.store.get('plan_mensual_premium_01');
        //alert('Registered: ' + JSON.stringify(this.precio_mensual_premium));
     //  let mensuall=this.divide(this.precio_mensual_premium,2);
     //  alert(mensuall);
        this.precio_mensual_normal=this.store.get('plan_mensual_normal_01');
        this.precio_trimestral_premium=this.store.get('plan_trimestral_premium_01');
        this.precio_trimestral_normal=this.store.get('plan_trimestral_normal_01');
       this.precio_anual_premium=this.store.get('plan_anual_premium_01');
       this.precio_anual_normal=this.store.get('plan_normal_anual_01');
       */
      });
      // Refresh Always
      console.log('Refresh Store');
      this.store.refresh();
    } catch (err) {
      console.log('Error On Store Issues' + JSON.stringify(err));
    }
  }
  registerHandlers(productId) {
    // Handlers
    this.store.when(productId).approved((product: IAPProduct) => {
      let producto = {
        idProducto: product.id,//usar id product android or ios
        idPlan: this.idplan,//plan asignado en tabla planes
      };
      let compra = {
        idCompra: product.transaction.id,
        token: product.transaction.purchaseToken,//"aakfmbijbmaomophinheklmh.AO-J1Oy8Lp_wVjU7vmKtM8QZ_ULEcn9lQHtYsyPpQ4Lciz766R0U3KhOdYznjGypNh28JvCDe8_OCC_3H7EbDS3uhzulC77EL5g05zRjLTL_yhO8X2bPhT1MGCkaUHEDZD2culMyMXT7",
        status: "Activo",//status Suscripcion
        pasarelaPago: "Google Play",//usar andoid or Apple Store
        total: product.price,//"USD 254.90", //product.price,
        moneda: product.currency,//"USD",//obtener currency en eso EUR,COP,PEN,USD
        renovacion: "mensual",//use mensual o anual
      };
      let data = {
        email: this.email,
        idUser: this.idUser,
        tipo: "live",//usar test or live
        compra: compra,
        producto: producto,
      }
      product.finish();
      this.testcompra(data);
    });
    //  this.store.order(productId)
    this.store.when(productId).registered((product: IAPProduct) => {
      console.log('Registered: ' + JSON.stringify(product));
    });

    this.store.when(productId).updated((product: IAPProduct) => {
      console.log('Loaded' + JSON.stringify(product));
    });
    this.store.when(productId).cancelled((product) => {
      //  alert('Compra cancelada');
      let toast = this.toastCtrl.create({
        message: 'Proceso de suscripción cancelado',
        duration: 3000,
        position: 'middle',
        cssClass: "toast-success"
      });
      toast.present();
    });
    // Overall Store Error
    this.store.error((err) => {
      //alert('Store Error ' + JSON.stringify(err));
    });
  }

  divide(total, multiplo) {
    let precio = total.price;
    //  alert("precio"+precio);
    let moneda = total.currency;
    //  alert("moneda"+moneda);
    precio = precio.replace(moneda, "");//quita la moneda
    let preciototaltrim = precio.trim();
    let preciototal = preciototaltrim.replace(",", ".");
    let valor = Number((preciototal / multiplo).toFixed(2));
    if (this.isFloat(valor)) {
      return valor + " " + moneda + "" + "/mes";
    }
    else {
      return total.price;
    }

  }
  isInt(x) {
    return !isNaN(x) && eval(x).toString().length == parseInt(eval(x)).toString().length
  }

  isFloat(x) {
    return !isNaN(x) && !this.isInt(eval(x)) && x.toString().length > 0
  }

  async purchase(idPlan, productId) {
    //  console.log(productId);
    //  console.log(idPlan);
    this.bandera = true;
    if (this.change == false) {
      let alert = this.alertCtrl.create({
        title: "Información",
        subTitle: "Por favor utilice su método originario, si quiere realizar un cambio/subida de plan.",
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    this.idplan = idPlan;
    /* Only configuring purchase when you want to buy, because when you configure a purchase
    It prompts the user to input their apple id info on config which is annoying */
    if (!this.platform.is('cordova')) { return };

    //let productId;
    //console.log('Products: ' + JSON.stringify(this.store.products));
    //console.log('Ordering From Store: ' + productId);
    try {
      let product = this.store.get(productId);
      //  console.log('Product Info: ' + JSON.stringify(product));
      let order = await this.store.order(productId);
      //  alert('suscripcion');
    } catch (err) {
      console.log('Error Ordering ' + JSON.stringify(err));
    }
  }
  testcompra(data) {
    if (this.bandera == false) {
      return;
    }
    let loader = this.loading.create({
      content: 'Enviando...',
    });

    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let data1 = data;
    loader.present()
      .then(() => {
        this.http.post(url + "/users/appsuscribe", data1, options)
          .map(res => res.json())
          .subscribe(res => {
            //  alert('response ' + JSON.stringify(res));
            loader.dismiss();
            if (res.response == "true") {
              let alert = this.alertCtrl.create({
                title: "Suscripción",
                subTitle: res.mensaje,
                buttons: ['OK']
              });
              alert.present();
              //  this.navCtrl.pop();
              this.tab.select(2);
            }
            if (res.response == "error") {
              let alert = this.alertCtrl.create({
                title: "Alerta",
                subTitle: "Ha ocurrido un error:  ",
                buttons: ['OK']
              });
              alert.present();
            }
          },
            (Error => {
              console.log("error");
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: "Alerta",
                subTitle: "Ha ocurrido un error inesperado.!",
                buttons: ['OK']
              });
              alert.present();
            }));
      })
      .catch(error => { console.log("error") });
  }
}
