export interface mailer{
    send(to:string,subject:string,body:string):void;
}