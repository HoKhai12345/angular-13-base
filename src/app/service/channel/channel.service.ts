import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/_services/api/api.service';
import { ChannelModel } from 'src/app/models/channel.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channelSubject = new BehaviorSubject<ChannelModel[]>([])
  channelItems$ = this.channelSubject.asObservable();
  constructor(private apiService: ApiService) {
   }


   getChannelItem(): ChannelModel[] {
      return this.channelSubject.value
   }

   addChannelItem(channel: ChannelModel){
    const currentCart = this.getChannelItem();
    this.channelSubject.next([...currentCart, channel]);
   }


   getList(options: {limit: number, offset: number}): Observable<any> {
    const path = environment.pathBackend.channel.getList;
    return this.apiService.get(path, options).pipe(
      map((result) => {
        let channel: any[] = [];
        if (result.status === 1) {
          result.data.rows.forEach((value: any) => {
            channel.push(new ChannelModel(value))
          });
          console.log("channel", channel);
          return {
            status: 1,
            code: 200,
            data: channel
          }
        }
        return false;
      }),
      catchError((error) => {
        console.error('Channel error', error);
        return of(false); 
      })
    );
  }
}
