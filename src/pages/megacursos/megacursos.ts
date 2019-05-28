import { Component } from '@angular/core';
import {  NavController, NavParams, Nav, Tabs, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SERVER_URL } from '../../providers/global/global';
import 'rxjs/add/operator/map';
import { ProductPage } from '../product/product';
let url = SERVER_URL;

//@IonicPage()
@Component({
  selector: 'page-megacursos',
  templateUrl: 'megacursos.html',
})
export class MegacursosPage {
  extras: any;
  tab: Tabs;
  searchQuery: string = '';
  id_user;
  item;
  categories: any;
  catego: any;
  plan = {};
  compras;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private nav: Nav,
    public menuCtrl: MenuController
  ) {
    this.tab = this.navCtrl.parent;

  }

  getItems(ev: any) {
   const val = ev.target.value;
   //  console.log(val);
   // if the value is an empty string don't filter the items
   if (val && val.trim() != '') {
     let aux = []
     this.catego.filter((item) => {
       let auxItem = []
       item.hijos.filter(data => {
         if (data.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
           auxItem.push(data);
           if (aux.length > 0) {
             aux.filter(auxF => {
               if (auxF.id !== item.id) {
                 aux.push({
                   category_image: item.category_image,
                   hijos: auxItem,
                   id: item.id,
                   image: item.image,
                   name: item.name,
                   seo_title: item.seo_title,
                   slug: item.slug,
                 })
               }
             })
           }else{
             aux.push({
               category_image: item.category_image,
               hijos: auxItem,
               id: item.id,
               image: item.image,
               name: item.name,
               seo_title: item.seo_title,
               slug: item.slug,
             })
           }
         }
       })
     })
     this.categories = aux;
   }
   else {
     this.categories = this.catego;
   }
 }

  ionViewDidLoad() {
    //  console.log('ionViewDidLoad MegacursosPage');
    var data = JSON.parse(window.localStorage.getItem("isLogin"));
    this.id_user = data.datos.id;
  }

  ionViewWillEnter() {
    this.megacursos();
  }
  details(imagen, hijo, category) {
    let plan = this.plan;
    let extra = this.extras;
    this.item = { producto: hijo, imagen: imagen, plan: plan, extra: extra };
    this.navCtrl.push(ProductPage, { item: this.item });
  }
  megacursos() {
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    this.http.get(url + '/plans/megacursos/' + this.id_user, options)
      .map(res => res.json())
      .subscribe(res => {
        //loader.dismiss();
        this.categories = res.categorias;
        this.catego = res.categorias;
        this.plan = res.plans.plan;
        this.extras = res.plans.extras
      //  console.log(this.categories);
      });
  }

  openPage(page) {
    this.tab.select(page);
  }

}
