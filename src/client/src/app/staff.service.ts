import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Staff } from './staff';
import { StaffId, EmptyStaffId, EmptyStaff } from './staff';
import { environment } from '../environments/environment';


@Injectable()
export class StaffService {

    public userId: string;
    public token: string;
    public userName: string;

    headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    /**
     * Creates an instance of StaffService.
     * @param {Http} http
     * @memberof StaffService
     */
    constructor(private http: Http) {
        this.userId = localStorage.getItem('weshare.userId');
        this.token = localStorage.getItem('weshare.token');
        this.userName = localStorage.getItem('weshare.userName');
    }

    login(userName: string, password: string): Promise<any> {
        return this.http.post(`${environment.serviceBaseUri}/staffs/authenticate`,
            JSON.stringify({ userName: userName, password: password}), this.options)
            .toPromise()
            .then(response => {
                if (response.status === 200) {
                    const data = response.json();
                    localStorage.setItem('weshare.userId', data.id);
                    localStorage.setItem('weshare.token', data.token);
                    localStorage.setItem('weshare.userName', data.name);
                    return data;
                } else {
                    return null;
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
                return new Staff(
                    result.id,
                    result.name,
                    result.localName,
                    result.avatarBase64
                );
            });
    }
}



