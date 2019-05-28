import { Component } from '@angular/core';
import { NavController, Nav, Tabs, MenuController, AlertController, LoadingController,ToastController } from 'ionic-angular';
import { MegacursosPage } from '../megacursos/megacursos';
import { AsistenciaPage } from '../asistencia/asistencia';
import { RecientesPage } from '../recientes/recientes';
import { SERVER_URL } from '../../providers/global/global';
import { Http, Headers, RequestOptions } from '@angular/http';

let url = SERVER_URL;

@Component({
	selector: 'page-grupo',
  	templateUrl: 'grupo.html'
})

export class GrupoPage {


	

}