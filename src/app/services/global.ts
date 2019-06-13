import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly urlServeUsers: string = 'https://explous.com/bigdataUsers';
    readonly urlServeGames: string = 'https://explous.com/bigdataGames';
}