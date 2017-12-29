import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Staff } from './staff';
import { StaffId, EmptyStaffId, EmptyStaff } from './staff';
import { environment } from '../environments/environment';


@Injectable()
export class StaffService {

    constructor(private http: Http) { }

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



