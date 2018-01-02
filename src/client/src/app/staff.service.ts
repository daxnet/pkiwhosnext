import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Staff } from './staff';
import { StaffId, EmptyStaffId, EmptyStaff } from './staff';
import { environment } from '../environments/environment';


@Injectable()
export class StaffService {

    public userId: string;
    public token: string;
    public userName: string;

    constructor(private http: Http) {
        this.userId = localStorage.getItem('weshare.userId');
        this.token = localStorage.getItem('weshare.token');
        this.userName = localStorage.getItem('weshare.userName');
    }

    login(userName: string, password: string): Promise<boolean> {
        return this.http.post(`${environment.serviceBaseUri}/staffs/authenticate`,
            JSON.stringify({ userName: userName, password: password}))
            .toPromise()
            .then(response => {
                if (response.status === 200) {
                    const data = response.json();
                    localStorage.setItem('weshare.userId', data.id);
                    localStorage.setItem('weshare.token', data.token);
                    localStorage.setItem('weshare.userName', data.userName);
                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        localStorage.removeItem('weshare.userId');
        localStorage.removeItem('weshare.token');
        localStorage.removeItem('weshare.userName');
    }

    getRandomizedIdList(): Promise<StaffId[]> {
        const url = `${environment.serviceBaseUri}/staffs/randomize`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json());
    }

    getStaffById(id: StaffId): Promise<Staff> {
        if (id === EmptyStaffId) {
            return Promise.resolve(EmptyStaff);
        }

        const url = `${environment.serviceBaseUri}/staffs/${id.id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                const result = response.json();
                console.log(result);
                return new Staff(
                    result.id,
                    result.name,
                    result.localName,
                    result.avatarBase64
                );
            });
    }
}



