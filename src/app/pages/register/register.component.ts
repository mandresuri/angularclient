import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PaisesService } from '../../services/paises.service';
import { Pais } from "../../entities/pais";
import { Admin } from 'src/app/entities/admin';
import { AdminsService } from "../../services/admins.service";

import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // toggle webcam on/off
  public showWebcam;
  public allowCameraSwitch;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  paises: Array<Pais>;
  pais: Pais;
  formData: Admin;

  private image: ImageSelected = null;
  constructor(private router: Router, private http: HttpClient, private paisesService: PaisesService, private adminsService: AdminsService) {
    this.formData = new Admin();
    this.paises = [];
  }


  ngOnInit() {
    this.loadCountries();
  }
  register() {

  }

  //obtenemos los datos necesarios de la imagen para mandarla a la Api backend
  onUploadFinish(event) {
    console.log(event);
    this.image = new ImageSelected();
    this.image.name = event.src;
    this.image.image = event.file.name;
  }

  //metodo para enviar la imagen por medio del Http, la ruta sera la del servidor que tenga la Api y la reciba
  sendImage() {
    if (this.image != null) {
      console.log('send image');
      //en la ruta, admins es la clase PHP que va a recibir la imagen en un metodo
      this.http.post('http://localhost/apiprimeraslim/public/admins', {
        file: this.image.image,
        name: this.image.name
      }).subscribe((d) => {
        console.log(d);
      });
    }
  }

  public loadCountries() {
    this.paisesService.getAllCountries().subscribe(
      (data: Array<any>) => {
        for (let p of data) {

          if (p['estado'] == 1) {
            this.pais = new Pais();

            this.pais.id = p['id'];
            this.pais.nombre = p['nombre'];
            this.pais.estado = p['estado'];

            this.paises.push(this.pais);
          }
        }
      },
      error => {

      }
    )
  }

  onfileselected(event) {
    console.log(event);
  }

  save() {
    this.adminsService.save(this.formData).subscribe((response) => {
      this.router.navigate(['main', 'admin']);
    });
  }

  public activateCam(): void {
    this.showWebcam = true;
    this.allowCameraSwitch = true;
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public deactivateCam(): void {
    this.showWebcam = false;
    this.allowCameraSwitch = false;
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public again(): void {

  }

}

class ImageSelected {
  public name: string;
  public image: string;
}
