import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  constructor(public toastr: ToastrService, private http : HttpClient, private router: Router) {

  }
  requestObject={}
  myDate = new Date();
  createIssue(issueName:any,category:any,description:any,problemsFaced:any,solutionProposed:any,otherInfo:any){
    this.requestObject={
      "issueName":issueName,
      "category":category,
      "description":description,
      "problemsFaced":problemsFaced,
      "solutionProposed":solutionProposed,
      "otherInfo":otherInfo
    }
    this.toastr.success()
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("endpoint",this.requestObject,{headers: header}).subscribe((res) => {
            this.router.navigate(['./mytask']);
            //tostr message
            console.log(res);
        });
  }
  getAllIssueForUser(username:any):any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint"+'/{'+username+'}',{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
        
  }
  getSpecificIssueForSpecificUser(username:any,issueId:any):any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint"+'/{'+username+'}'+'/{'+issueId+'}',{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }
  getAllIssues():any{
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint",{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
        
  }

  deleteSpecificIssue(){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.delete("endpoint"+'/issues'/*+issueid */,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }
  
  editSpecificIssue(issueName:any,category:any,description:any,problemsFaced:any,solutionProposed:any,otherInfo:any){
    this.requestObject={
      "issueName":issueName,
      "category":category,
      "description":description,
      "problemsFaced":problemsFaced,
      "solutionProposed":solutionProposed,
      "otherInfo":otherInfo
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.put("endpoint"+'/issues'/*+issueid */,this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }

  login(username:any,password:any):any{
    this.requestObject={
      "username":username,
      "password":password,
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("https://i18253eej8.execute-api.us-east-1.amazonaws.com/prod/login"+'/login',this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            sessionStorage.setItem('userType',res['userType'])
  sessionStorage.setItem('loggedIn','true')
  sessionStorage.setItem('flag','true')
            sessionStorage.setItem('name',username)
  sessionStorage.setItem('userType',res['userType'])
            console.log(res);
            this.router.navigate(['./dashboard'])
            return res
        });
        this.toastr.success("Welcome")
  }
  signup(username:any,password:any,email:any){

    this.requestObject={
      "username":username,
      "email":email,
      "password":password,
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("endpoint"+'/login',this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            sessionStorage.setItem('name',username)
  sessionStorage.setItem('userType',res['userType'])
            console.log(res);
            this.router.navigate(['./dashboard'])
            return res
        });
  }


  donate(username: any,donateAmount: any,issueId: any){
    this.requestObject={
      "username":username,
      "donatedAmount":donateAmount,
      "issueId":issueId,
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.post("endpoint"+'/Donate',this.requestObject,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });

  }

  getDonors(id: string){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
     this.http.get("endpoint"+'/:'+id,{headers: header}).subscribe((res) => {
            //tostr message
            console.log(res);
            return res
        });
  }
}