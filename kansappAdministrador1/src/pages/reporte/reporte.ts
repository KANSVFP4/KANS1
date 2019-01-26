import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController, MenuController } from "ionic-angular";
import { Administrador } from "../../app/models/administrador";
import { AdministradorService } from "../../app/services/administrador.services";
import { SolicitudesService } from "../../app/services/solicitudes.services";


import chartJs from 'chart.js';
//import jsPDF from 'jspdf';
@Component({
  selector: 'page-reporte',
  templateUrl: 'reporte.html'
})
export class ReportePage {

  public vectorUsuarios;
  public vectorPagados;
  public vectorPorPagar;
  public vectorPendientes;

  public ContJanuary: any;
  public ContFebruary;
  public ContMarch;
  public ContApril;
  public ContMay;
  public ContJun;
  public ContJuly;
  public ContAugust;
  public ContSeptember;
  public ContOctober;
  public ContNov;
  public ContDecember;
  public ano=2019;
  public mes='January';
  public ContPorPagar;
  public ContPagadas;
  public ContPendientes;
  
  @ViewChild('barCanvas') barCanvas = null;
  @ViewChild('lineCanvas') lineCanvas: any;
  @ViewChild('pieCanvas') pieCanvas = null;
  @ViewChild('doughnutCanvas') doughnutCanvas = null;

  @ViewChild('content') content: ElementRef;

  barChart: any;
  lineChart: any;
  pieChart: any;
  doughnutChart: any;


  public viaje: any[] = [{ "ruta": "2018" },
  { "ruta": "2019" },
  { "ruta": "2020" },
  { "ruta": "2021" },
  { "ruta": "2022" },
  { "ruta": "2023" },
  { "ruta": "2024" },
  { "ruta": "2025" },
  { "ruta": "2026" },
  { "ruta": "2027" },
  { "ruta": "2028" },
  { "ruta": "2030" }];

  
  public meses: any[] = [{ "ruta": "January" },
  { "ruta": "February" },
  { "ruta": "March" },
  { "ruta": "April" },
  { "ruta": "May" },
  { "ruta": "June" },
  { "ruta": "July" },
  { "ruta": "August" },
  { "ruta": "September" },
  { "ruta": "October" },
  { "ruta": "November" },
  { "ruta": "December" }];


  constructor(public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    private _administradorService: AdministradorService,
    public navCtrl: NavController,
    public _solicitudesService: SolicitudesService,

    public navParams: NavParams,
  ) {
    this.getUsuariosRegistrados();
    this.getAllOfertas();

  }


  dibujar() {
    setTimeout(() => {
      this.barChart = this.getBarChart();
     // this.lineChart = this.getLineChart();
    }, 150)

    setTimeout(() => {
      this.pieChart = this.getPieChart();
      //this.doughnutChart = this.getDoughnutChart();
    }, 250)
  }


  getChart(context, chartType, data, options?) {
    return new chartJs(context, {
      data,
      options,
      type: chartType
    })
  }

  getBarChart() {
    
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [{
        label: 'Number of Users',
        data: [this.ContJanuary, this.ContFebruary, this.ContMarch, this.ContApril,this.ContMay,this.ContJun,
        this.ContJuly, this.ContAugust, this.ContSeptember,this.ContOctober,this.ContNov,this.ContDecember],
        backgroundColor: [
          'rgb(255,0,0)',
          'rgb(20,0,255)',
          'rgb(255,230,0)',
          'rgb(0,255,10)',
          'rgb(60,0,70)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }


  getLineChart() {
    const data =
    {
      labels: ['Janeiro', 'Fevereiro', 'Marco', 'Abril'],
      datasets: [{
        label: 'Meu Dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(0,178,255)',
        borderColor: 'rgb(231,205,35)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data: [20, 15, 98, 4],
        scanGaps: false,

      }, {
        label: 'Meu segundo Dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(117,0,49)',
        borderColor: 'rgb(51,50,46)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data: [29, 135, 13, 70],
        spanGaps: false,

      }]
    };

    try {
      return this.getChart(this.lineCanvas.nativeElement, 'line', data);
    } catch (e) {
      console.log(e);
    }

  }

  getPieChart() {
    const data =
    {
      labels: ['Payed', 'To Pay', 'Slopes'],
      datasets: [{
        data: [this.ContPagadas, this.ContPorPagar, this.ContPendientes],
        backgroundColor: ['rgb(200,6,0)', 'rgb(36,0,255)', 'rgb(242, 255,0)']
      }]
    }
    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  getDoughnutChart() {
    const data =
    {
      labels: ['Vermelho', 'Azul', 'Amarelo'],
      datasets: [{
        lables: 'Teste Chart',
        data: [12, 65, 32],
        backgroundColor: [
          'rgb(0, 244,97)',
          'rgb(37,39, 43)',
          'rgb(255,287,0)'
        ]
      }]
    }

    return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
  }

  getUsuariosRegistrados() {
    this.getAllOfertas();
    console.log("entre");
    this.ContJanuary = 0 ;
    this.ContFebruary = 0;
    this.ContMarch =0;
    this.ContApril =0;
    this.ContMay=0;
    this.ContJun =0;
    this.ContJuly = 0;
    this.ContAugust = 0;
    this.ContSeptember = 0;
    this.ContOctober =  0;
    this.ContNov = 0;
    this.ContDecember =0;
    var ContJanuary = 0;
    var ContFebruary = 0;
    var ContMarch=0;
    var ContApril=0;
    var ContMay=0;
    var ContJun=0;
    var ContJuly=0;
    var ContAugust=0;
    var ContSeptember=0;
    var ContOctober=0;
    var ContNov=0;
    var ContDecember=0;

  


    this._administradorService.getUsuariosRegistrados(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorUsuarios = response.messagess;
        console.log("mijin0" + this.vectorUsuarios);
        var nos= this.ano;
        console.log("ano empatadpo"+nos);
        this.vectorUsuarios.forEach(function (value) {

          var res = value.fechaRegistro.split("-");
          

          if ((res[0] == "01" && res[2]==nos.toString())) {
            console.log("entre"+nos.toString());
            console.log(ContJanuary);
            ContJanuary++;}

          if ((res[0] == "02" && res[2]==nos.toString())) {ContFebruary++;}

          if ((res[0] == "03" && res[2]==nos.toString())) {ContMarch++;}

          if ((res[0] == "04" && res[2]==nos.toString())) {ContApril++;}
          
          if ((res[0] == "05" && res[2]==nos.toString())) {ContMay++;}

          if ((res[0] == "06" && res[2]==nos.toString())) { ContJun++;}
          
          if ((res[0] == "07" && res[2]==nos.toString())) {ContJuly++;}

          if ((res[0] == "08" && res[2]==nos.toString())) {ContAugust++;}

          if ((res[0] == "09" && res[2]==nos.toString())) { ContSeptember++;}

          if ((res[0] == "10" && res[2]==nos.toString())) {ContOctober++;}

          if ((res[0] == "11" && res[2]==nos.toString())) {ContNov++;}

          if ((res[0] == "12" && res[2]==nos.toString())) {ContDecember++;}
        });
        this.ContJanuary = ContJanuary ;
        this.ContFebruary = ContFebruary;
        this.ContMarch =ContMarch;
        this.ContApril =ContApril;
        this.ContMay=ContMay;
        this.ContJun =ContJun;
        this.ContJuly = ContJuly;
        this.ContAugust = ContAugust;
        this.ContSeptember = ContSeptember;
        this.ContOctober =  ContOctober;
        this.ContNov = ContNov;
        this.ContDecember =ContDecember;
       this.dibujar();


      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );

  }

  getAllOfertas()
  {

    this.ContPorPagar=0;
    this.ContPagadas=0;
    this.ContPendientes=0;
    
    var ContPorPagar=0;
    var ContPagadas=0;
    var ContPendientes=0;
 

    this._solicitudesService.getOfertasPagadas(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
       this.vectorPagados = response.messagess;
       this.vectorPagados.forEach(function (value) {
        ContPagadas++;
        
       
      });

      this.ContPagadas=ContPagadas;
      console.log("ContPagadas"+this.ContPagadas);
    
    }
  
      
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  
    this._solicitudesService.getSolicitudesPorPagar(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorPorPagar = response.messagess;
        this.vectorPorPagar.forEach(function (value) {
          ContPorPagar++;
                  
        });
  
        this.ContPorPagar=ContPorPagar;
        console.log("COnt por pagar"+this.ContPorPagar);
        

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );


    this._solicitudesService.getAllOfertasPendientes(this._administradorService.getToken()).subscribe(response => {

      console.log("esto iene de la peticion" + JSON.stringify(response));
      if (response.messagess[0] != undefined) {
        this.vectorPendientes = response.messagess;
        this.vectorPendientes.forEach(function (value) {
          ContPendientes++;
                  
        });
  
        this.ContPendientes=ContPendientes;
        console.log("Cont pendientes"+this.ContPendientes);
       

      }
    }, (err) => { console.log("Existen Complicaciones Intente mas tarde", err) }
    );
  }

  imprimirpdf()
  {
    //let doc = new jsPDF();

    /*let specialElementHandlers=
    {
      '#editor':function(elemnt,renderer)
      {
        return true;
      }
    };
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHtml,15,15,{
      'width':190,
      'elementHandlers':specialElementHandlers
    });

    doc.save('test.pdf');*/
  }
  
  
}
