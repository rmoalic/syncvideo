export class Vod {
    service: string;
    video_id: string;
    offset: number;
  
    constructor(service: string, video_id: string, offset: number) {
      this.service = service;
      this.video_id = video_id;
      this.offset = offset;
    }
  }
  