import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Pipe, PipeTransform, NgZone } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DynamicScriptLoaderService } from '../_services/dynamic-script-loader.service';
import { UtilService } from '../_services/util.service';
import { MainService } from "../_services/main.service";
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
declare const $: any;
declare let videojs: any;
import { Globals } from "../globals";

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(200)),
    ]),
  ]
})
export class LiveComponent implements OnInit {
  messages = [];
  questionsChat = [];
  chats = [];
  chatUser = [];
  testTemp = [];
  chatText;
  connection;
  objHub;
  disableInput = true;
  userIp;
  showMessage = 1;
  UserAnswer = false;
  //create new test
  createTest = false;
  questions = [];
  textQuestion = '';
  filterMessages = [];
  selectedTest;
  createTestText = "ثبت"
  //user Answer Question
  TestText = '';
  testOptins = [];
  userSelectedAnswer;
  selectedQuestion;
  selectedAnswer;

  //show Result
  showResult = false;
  //signalR functions
  reciveMessage: any;
  reciveMessageAdmin: any;
  reciveMessageUserFromAdmin: any;
  refreshUserPage: any;
  refreshUserVideo: any;
  sendAllMessages: any;
  sendDeleteMessage: any;
  getTest: any;
  getMessageFromAdmin: any;
  getUserConnectionId: any;
  getTempTest: any;
  getFinishTest: any;
  userType;
  selectedMessage;

  //chartjs
  pieCahrt;

  //stream 
  streamId
  // @ViewChild('myvid', {static: false}) vid: ElementRef;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService,
    private changeDitection: ChangeDetectorRef,
    private utilService: UtilService,
    private mainService: MainService, private zone: NgZone, private router: Router, private global: Globals) { }

  ngOnInit() {
    //get user is admin or not
    this.userType = this.utilService.checkUserType();
    this.dynamicScriptLoader.load("hub").then(async () => {
      await this.endHub();
      //approve message from admin to all user
      this.reciveMessage = (userName, message, messageId) => {
        this.zone.run(() => {
          if (this.messages.findIndex(x => x.messageId === messageId) !== -1) {
            return;
          }
          this.messages.push({
            name: userName,
            text: message,
            messageId: messageId
          })
          this.filter();
        })
        //if user yourself message

      }
      //admin get message from user
      this.reciveMessageAdmin = (message) => {
        console.log(message, "admin get message from user");
        this.zone.run(() => {
          let data = JSON.parse(message);
          this.messages.push({
            id: data.UserId,
            name: data.UserName,
            phone: data.phone,
            monitor: data.monitor,
            video: data.video,
            device: data.device,
            text: data.Message,
            ip: data.ip,
            messageId: data.MessageId,
            approved: false,
            connectionId: data.ConnectionId,
            fullName: data.FullName
          })
          this.chatText = "";
          this.filter();
        })

      }
      //admin replay message
      this.reciveMessageUserFromAdmin = (msgId, msg) => {
        this.zone.run(() => {
          let msgObj = this.messages.find(x => x.messageId == msgId);
          if (msgObj) {
            msgObj['replay'] = msg
          }
        })
      }
      //refresh Video
      this.refreshUserVideo = () => {
        this.zone.run(() => {

        })
      }
      //refresh Page
      this.refreshUserVideo = () => {
        this.zone.run(() => {

        })
      }
      //get all message when join
      this.sendAllMessages = (messages) => {
        let msg = JSON.parse(messages);
        this.messages = [];
        if (this.userType === 1) {
          for (let data of msg) {
            this.messages.push({
              id: data.UserId,
              name: data.UserName,
              phone: data.phone,
              monitor: data.monitor,
              video: data.video,
              device: data.device,
              text: data.Message,
              ip: data.ip,
              messageId: data.MessageId,
              approved: data.Approved,
              connectionId: data.ConnectionId,
              fullName: data.FullName,
              questionId: data.QuestionId,
              options: data.Options ? JSON.parse(data.Options) : {},
              type: data.type,
              isAdmin: data.IsAdmin,
              isEnd: data.IsEnd,
              replay: data.Replay
            })
          }
        }
        else if (this.userType === 2) {
          for (let data of msg) {
            this.messages.push({
              name: data.UserName,
              text: data.Message,
              messageId: data.MessageId,
              questionId: data.QuestionId,
              options: data.Options ? JSON.parse(data.Options) : {},
              type: data.type,
              isEnd: data.IsEnd,
              replay: data.Replay
            })
          }
        }
        this.filter();


      }
      //delete message from admin
      this.sendDeleteMessage = (messageId) => {
        this.zone.run(() => {
          let index = this.messages.findIndex(x => x.messageId == messageId);
          if (index != -1) {
            {
              //delete message
              this.messages.splice(index, 1);

            }
          }

          this.filter();
        })

      }

      //get Test From Admin
      this.getTest = (testObj) => {
        this.zone.run(() => {
          let test = JSON.parse(testObj);
          //check user is admin or not
          //check test is exist or not
          let msg = this.messages.find(x => x.questionId == test['id']);
          if (msg) {
            msg.type = 2;
          } else {
            this.messages.push({
              type: 2,
              text: test['text'],
              options: test['options'],
              questionId: test['id']
            })
          }
          this.filter();
          setTimeout(() => {
            if (this.userType === 2) {
              this.showTest(test['id']);
            }
          }, 0);
        })
      }

      //get message from admin
      this.getMessageFromAdmin = (msg, messageId) => {
        this.zone.run(() => {
          //get message from admin
          if (this.userType === 1) {
            this.messages.push({
              name: 'ادمین',
              text: msg,
              messageId: messageId,
              approved: true,
              type: 1,
              isAdmin: true
            })
          }
          else {
            this.messages.push({
              type: 1,
              name: 'ادمین',
              text: msg,
              messageId: messageId,
            })
          }
          this.filter();
        })

      }

      //get temp test 
      this.getTempTest = (obj) => {
        this.zone.run(() => {
          let tempTest = JSON.parse(obj);
          let msg = this.messages.find(x => x.questionId == tempTest['id']);
          if (msg) {
            msg.text = tempTest['text'];
            msg.options = tempTest['options'];
            msg.questionId = tempTest['id'];
          } else {
            this.messages.push({
              type: 3,
              text: tempTest['text'],
              options: tempTest['options'],
              questionId: tempTest['id']
            })
          }
        })

      }
      this.getFinishTest = (id, options) => {
        this.zone.run(() => {
          //find test
          let msg = this.messages.find(x => x.questionId == id);
          msg['options'] = JSON.parse(options);
          msg['isEnd'] = true;
          this.showResult = true;
          this.generateChart(msg);
        })
      }
      await this.startHub();
      this.disableInput = false;
      this.userIp = "";
      this.objHub.server.join(this.utilService.checkUserType(), this.userIp);

    })
    this.getStream();
  }

  handleMessage() {
    let activetab = $(".nav-link.active").attr('type');
    switch (activetab) {
      case "1":
      case "3":
        if (this.utilService.checkUserType() == 1) {
          this.sendMessage();
        } else {
          this.sendMessageToAdmin();
        }
        break;
      case "2":
        break;
      default:
        if ($(".nav-link.active").attr('href').startsWith('#user')) {
          this.selectedMessage = $(".nav-link.active").attr('href').replace('#user', '');
          this.replayMessge(this.selectedMessage, this.chatText);
        } else {
          return;
        }
    }

  }
  sendMessage() {
    if (!this.chatText.trim()) {
      alert('لطفا پیغام خود را وارد کنید');
      return;
    }
    let guid = this.utilService.Guid();
    this.objHub.server.sendMessageTOUsers(this.chatText, guid);
    this.chatText = '';

  }
  sendMessageToAdmin() {
    if (!this.chatText.trim()) {
      alert('لطفا پیغام خود را وارد کنید');
      return;
    }
    let guid = this.utilService.Guid();
    this.objHub.server.sendMessageToAdmin(this.chatText, +this.userType, guid);
    this.messages.push({
      type: 1,
      name: 'member',
      text: this.chatText,
      messageId: guid
    })
    this.filter();
    this.chatText = '';
  }
  createQuiz() {

  }
  rejectMessage(messageId) {
    // this.messages.splice(index, 1);
    let msg = this.messages.find(x => x.messageId == messageId);
    this.objHub.server.deleteMessage(msg['messageId']);

  }
  startHub() {
    return new Promise((resolve, reject) => {
      $.connection.hub.url = this.global.url + "signalr/";
      $.connection.hub.qs = { 'access_token': localStorage.getItem('token') };
      var objHub = $.connection.chatHub;
      objHub.client.getMessages = this.reciveMessage;
      objHub.client.sendUserMessage = this.reciveMessageUserFromAdmin;
      objHub.client.refreshPage = this.refreshUserPage;
      objHub.client.refreshVideo = this.refreshUserVideo;
      objHub.client.sendAllMessages = this.sendAllMessages;
      objHub.client.sendDeleteMessage = this.sendDeleteMessage;
      objHub.client.getTest = this.getTest;
      objHub.client.getMessageFromAdmin = this.getMessageFromAdmin;
      objHub.client.getTempTest = this.getTempTest;
      objHub.client.getFinishTest = this.getFinishTest;
      if (this.utilService.checkUserType() === 1) {
        objHub.client.sendAdminMessage = this.reciveMessageAdmin;
      }
      //when hub is start
      $.connection.hub.start().done(() => {
        this.objHub = objHub;
        resolve();
      }).fail((error) => {
        console.log('start hub:error', error);
      });
    })
  }
  endHub() {
    return new Promise((resolve, reject) => {
      try {
        $.connection.hub.stop();
      } catch{

      } finally {
        setTimeout(() => {
          resolve();
        }, 200);
      }


    })
  }
  checkMessage(messageId) {

    let msg = this.messages.find(x => x.messageId == messageId);
    this.chatUser.push(JSON.parse(JSON.stringify(msg)));

  }
  removeSelectedChat(index) {
    this.chatUser.splice(index, 1);
  }
  refreshVideo(id) {
    if (this.userType !== 1) {
      return;
    }
    this.objHub.refreshVideo(id);
  }
  refreshPage(id) {
    if (this.userType !== 1) {
      return;
    }
    this.objHub.refreshPage(id);
  }
  //admin send recived message to all users
  aproveMessage(messageId) {
    let msg = this.messages.find(x => x.messageId == messageId);
    this.objHub.server.broadCastMessage(msg.name, msg.text, msg.messageId);
    msg.approved = true;

  }
  //admin replay message
  replayMessge(messageId, message) {
    //find user id
    let msg = this.messages.find(x => x.messageId == messageId);
    this.objHub.server.sendMessageToUser(messageId, message, msg.connectionId);
    let chat = this.chatUser.find(x => x.messageId == messageId);
    chat['replay'] = message;
    this.chatText = '';

  }
  showTestModal() {
    this.createTest = true;
    this.questions = [];
    this.selectedTest = '';
    this.textQuestion = '';
    this.createTestText = 'ثبت';
    for (let i = 0; i < 4; i++) {
      this.questions.push({
        text: '',
        isAnswer: false,
      })
    }

  }
  removeTest(index) {
    this.questions.splice(index, 1);
  }
  addTest() {
    this.questions.push({
      text: '',
      isAnswer: false,
    })

  }
  setBorder(i) {
    $(".opt").removeClass('test-border');
    $("#op" + i).addClass('test-border');
    if (this.userType == 1) {
      this.questions.forEach(x => x.isAnswer = false);
      this.questions[i]['isAnswer'] = true;
    } else {
      let obj = this.messages.find(x => x.questionId == this.selectedQuestion);
      obj['selectedAnswer'] = i;
    }

  }
  closeCreateTest() {
    this.createTest = false;

  }
  sendTest() {
    //check requird input
    if (!this.textQuestion) {
      this.utilService.showNotify('لطفا صورت سوال را وارد کنید', 'error');
      return;
    }
    //create 
    if (!this.selectedTest) {
      this.selectedTest = this.utilService.Guid();
    }

    let obj = {
      text: this.textQuestion,
      options: this.questions,
      id: this.selectedTest
    }
    this.objHub.server.sendTempTest(JSON.stringify(obj));
    this.createTest = false;


  }
  filter() {
    this.zone.run(()=>{
      setTimeout(() => {
        if (this.showMessage == 1) {
          this.filterMessages = [];
          this.filterMessages = Array.from(this.messages.filter(x => x.type != 3));
        }
        if (this.showMessage == 2) {
          this.filterMessages = [];
          this.filterMessages = Array.from(this.messages.filter(x => x.type == 2));
        }
        if (this.showMessage == 3) {
          this.filterMessages = [];
          this.filterMessages = Array.from(this.messages.filter(x => x.type != 2 && x.type != 3));
        }
      }, 0);
    })



  }
  handeShowMessage(type) {
    this.showMessage = type;
    $(".user-chat").removeClass('active show');
    $("#all").addClass('active show');
    this.filter();
  }
  showTest(id) {
    //if user is admin
    let msg = this.messages.find(x => x.questionId == id);
    //show result
    if (msg['isEnd']) {
      this.showResult = true;


      this.generateChart(msg);
      return;
    }
    if (this.userType == 1) {
      this.selectedTest = id;
      this.questions = msg['options'];
      this.textQuestion = msg['text'];
      this.createTest = true;
      this.createTestText = "به روز رسانی";
    } else {
      this.TestText = msg['text'];
      this.testOptins = msg['options'];
      this.UserAnswer = true;
      this.selectedQuestion = msg['questionId'];
      if (msg['selectedAnswer']) {
        setTimeout(() => {
          $(".opt").removeClass('test-border');
          $("#op" + msg['selectedAnswer']).addClass('test-border');
        }, 0);

      }
    }

  }
  //admin start test
  async startTest(id) {
    let test = this.messages.find(x => x.questionId == id);
    for (let i = 0; i < test.options.length; i++) {
      test.options[i]['text'] = test.options[i]['text'] || `گزینه ${i + 1}`;
    }
    let obj = {
      text: test.text || 'کدام گزینه صحیح است',
      options: test.options,
      id: test.questionId
    }
    let Ansewers = new Array("", "", "", "", "");
    for (let i = 0; i < obj.options.length; i++) {
      Ansewers[i] = obj.options[i]['text'] || `گزینه ${i + 1}`;
    }
    //Save in DB
    const testdb = {
      Id: id,
      Question: obj.text,
      Answer1: Ansewers[0],
      Answer2: Ansewers[1],
      Answer3: Ansewers[2],
      Answer4: Ansewers[3],
      Answer5: Ansewers[4],
      CourseId: 1
    };
    try {
      await this.mainService.SaveTest(testdb);
    } catch{

    }
    this.objHub.server.createTest(JSON.stringify(obj));
  }
  //hide test modal
  closeUserAnswer() {
    this.UserAnswer = false;

  }
  //user Answer the test
  sendAnswer() {
    let obj = this.messages.find(x => x.questionId == this.selectedQuestion);
    if (!obj['selectedAnswer']) {
      this.utilService.showNotify('error', 'لطفا یک جواب انتخاب کنید')
    }
    let test = {
      TestId: this.selectedQuestion,
      Answer: obj['selectedAnswer'] + 1
    }
    this.mainService.AnswerTest(test).subscribe(data => {
      console.log(data);
      this.UserAnswer = false;


    }, error => {
      console.log(error);
    })


  }
  endTest(id) {
    //get Result Test from sp
    this.mainService.getTestResult(id).subscribe(data => {
      //get test
      let test = this.messages.find(x => x.questionId == id);
      for (let i = 0; i < test.options.length; i++) {
        let res = data['data'].find(x => x.fldResult == i + 1);
        if (res) {
          test.options[i]['persent'] = res['nesbat'] * 100;
        } else {
          test.options[i]['persent'] = 0
        }

      }
      this.objHub.server.finishTest(id, JSON.stringify(test.options));
    }, error => {
      console.log(error);
    })
    //send end test from users and show result
  }
  closeResult() {
    this.showResult = false;

  }
  generateChart(msg) {
    setTimeout(() => {
      let labels = [];
      let values = [];
      for (let opt of msg.options) {
        labels.push(opt['text']);
        values.push(opt['persent']);
      }
      this.pieCahrt = new Chart('canvasBar', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              borderColor: '#3cba9f',
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "Blue",
                "Red",
                "Blue"
              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
      new Chart('canvasPie', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              borderColor: '#3cba9f',
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "Blue",
                "Red",
                "Blue"
              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    }, 0);

  }

  getStream() {
    this.mainService.getStream().subscribe(
      data => {
        this.streamId = "//lahzenegar.com/iframe/" + data['data'][0]['streamID'];
      },
      error => {

      });
  }
}
