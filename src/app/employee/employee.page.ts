import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../Employee/modal/modal.page';
import { ViewPage } from '../Employee/view/view.page';
import { EditPage } from '../Employee/edit/edit.page';
import { Guid } from "guid-typescript";
import { ToastController } from '@ionic/angular';
import { viewAttached } from '@angular/core/src/render3/instructions';
import * as _ from 'lodash';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],

})
export class EmployeePage implements OnInit {


  constructor(private modalController: ModalController, public toastController: ToastController) { }
  name: any;
  incidentTitle: any;
  date: any;
  category: any;
  priority: any;
  description: any;
  public dom: any;
  public id: any;
  public saving: any;
  public form = [
    { value: "IT", isChecked: false },
    { value: "Accounting", isChecked: false },
    { value: "Transportation", isChecked: false },
    { value: "Civil", isChecked: false },
    { value: "Telecom", isChecked: false },
    { value: "Architecture", isChecked: false }
  ];
  tasks = [];

  ngOnInit() {

    const me = this;
    this.tasks = [];
    if (localStorage.length != 0) {
      me.tasks = JSON.parse(localStorage.getItem("Incidents"));
    }

    console.log('newTask', me.tasks);
  }

  saveEdit(task: any) {
    console.log(this.tasks);
    var checked = [];
    var arr = [];
    var index;
    for (let entry of this.form) {
      if (entry.isChecked == true) {
        checked.push(entry.value)
      }
    }
    this.name = task.fullName;
    this.incidentTitle = task.incidentTitle;
    this.date = task.date;
    this.category = task.category;
    this.priority = task.priority;
    this.description = task.description;

    var obj = {
      "id": task.id,
      "fullName": task.fullName,
      "incidentTitle": task.incidentTitle,
      "date": task.date,
      "category": task.category,
      "domain": task.domain,
      "priority": task.priority,
      "description": task.description
    }

    arr = JSON.parse(localStorage.getItem("Incidents"));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === task.id) {
        index = i;
      }
    }
    arr.splice(index, 1, obj);
    this.tasks = arr;
    localStorage.setItem('Incidents', JSON.stringify(arr));

    this.presentToast("Task successfully edited.")
    this.closeModal()

  }

  saveData(task: any) {
    var checked = [];
    var arr = [];

    for (let entry of this.form) {
      if (entry.isChecked == true) {
        checked.push(entry.value)
      }
    }

    this.id = Guid.create();
    var obj = {
      "id": this.id.value,
      "fullName": task.fullName,
      "incidentTitle": task.incidentTitle,
      "date": task.date,
      "category": task.category,
      "domain": task.domain,
      "priority": task.priority,
      "description": task.description
    }
    if (localStorage.length != 0) {
      arr = JSON.parse(localStorage.getItem("Incidents"));
    }
    arr.push(obj);
    console.log(this.tasks);
    this.tasks.push(obj);


    localStorage.setItem('Incidents', JSON.stringify(arr));

    this.presentToast("Task successfully saved.")
    this.closeModal();

  }


  async openModal() {
    var bindCreate = this.saveData.bind(this);
    const modal = await this.modalController.create({ component: ModalPage, componentProps: { bindFunction: bindCreate } });
    modal.present();
  }

  async openView(returnedId: any) {
    const task = _.find(this.tasks, { id: returnedId });
    const view = await this.modalController.create({ component: ViewPage, componentProps: { value: task } });
    view.present();
  }

  async openEdit(returnedId: any) {
    var bindEdit = this.saveEdit.bind(this);
    const task = _.find(this.tasks, { id: returnedId });
    console.log(task);
    const edit = await this.modalController.create({ component: EditPage, componentProps: { value: task, bindedFunction: bindEdit } });
    edit.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({ message: msg, duration: 1000 });
    toast.present();
  }
}