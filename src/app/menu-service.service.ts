import { MenuItem } from 'src/app/menuItem';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    $activeButton: BehaviorSubject<MenuItem> = new BehaviorSubject<MenuItem>({} as MenuItem);

    constructor() {}
}
