export interface IMailInfo {
  accepted: string[];
  rejected: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: IEnvelope;
  messageId: string;
}

interface IEnvelope {
  from: string;
  to: string[];
}
