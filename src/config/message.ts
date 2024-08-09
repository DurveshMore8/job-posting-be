interface Message {
  statusCode: number;
  message: string;
}

class Message implements Message {
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default Message;
