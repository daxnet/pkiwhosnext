// ============================================================================
// __          ________  _____ _    _          _____  ______
// \ \        / /  ____|/ ____| |  | |   /\   |  __ \|  ____|
//  \ \  /\  / /| |__  | (___ | |__| |  /  \  | |__) | |__
//   \ \/  \/ / |  __|  \___ \|  __  | / /\ \ |  _  /|  __|
//    \  /\  /  | |____ ____) | |  | |/ ____ \| | \ \| |____
//     \/  \/   |______|_____/|_|  |_/_/    \_\_|  \_\______|
//
// WeShare - A simple lottery application built for internal group meeting.
//
// Copyright (C) 2017-2018, PerkinElmer Inc. Informatics
// All rights reserved.
// Program by Sunny Chen (daxnet)
//
// ============================================================================

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Staff } from './staff';
import { StaffId, EmptyStaffId, EmptyStaff } from './staff';
import { environment } from '../environments/environment';

/**
 * Represents the API service that handles the Staff related operations.
 *
 * @export
 * @class StaffService
 */
@Injectable()
export class StaffService {

    public userId: string;
    public token: string;
    public userName: string;

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

    /**
     * Login the user credential with the given user name and password.
     *
     * @param {string} userName The name of the user.
     * @param {string} password The password of the user that is going to login.
     * @returns {Promise<any>} The login result.
     * @memberof StaffService
     */
    login(userName: string, password: string): Promise<any> {
        // Prepares the http request headers.
        const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        // Calls RESTful API for authentication.
        return this.http.post(`${environment.serviceBaseUri}/staffs/authenticate`,
            JSON.stringify({ userName: userName, password: password }), options)
            .toPromise()
            .then(response => {
                if (response.status === 200) {
                    // When authentication succeeded, update the userId, userName and access token.
                    const data = response.json();
                    this.userId = data.id;
                    this.token = data.token;
                    this.userName = data.name;
                    localStorage.setItem('weshare.userId', this.userId);
                    localStorage.setItem('weshare.token', this.token);
                    localStorage.setItem('weshare.userName', this.userName);
                    return data;
                } else {
                    return null;
                }
            })
            .catch(err => {
                switch (err.status) {
                    case 404:
                        throw Error('User does not exist.');
                    case 401:
                        throw Error('Password is incorrect.');
                }
            });
    }

    /**
     * Logout the current user.
     *
     * @memberof StaffService
     */
    logout(): void {
        localStorage.removeItem('weshare.userId');
        localStorage.removeItem('weshare.token');
        localStorage.removeItem('weshare.userName');
    }

    /**
     * Retrieves the randomized list of the staff Id.
     *
     * @returns {Promise<StaffId[]>} The randomized list of the staff Id.
     * @memberof StaffService
     */
    getRandomizedIdList(): Promise<StaffId[]> {
        const url = `${environment.serviceBaseUri}/staffs/disorganize`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json());
    }

    /**
     * Gets the staff information by using its ID.
     *
     * @param {StaffId} id The ID of the staff.
     * @returns {Promise<Staff>} The staff information.
     * @memberof StaffService
     */
    getStaffById(id: StaffId): Promise<Staff> {
        if (id === EmptyStaffId) {
            return Promise.resolve(EmptyStaff);
        }

        const url = `${environment.serviceBaseUri}/staffs/${id.id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                const result = response.json();
                return new Staff(result.id, result.name, result.localName, result.email, result.avatarBase64);
            });
    }

    /**
     * Updates the staff by using the given data.
     *
     * @param {Staff} staff to be updated.
     * @returns {Promise<any>} Update result.
     * @memberof StaffService
     */
    updateStaff(staff: Staff): Promise<any> {
        const url = `${environment.serviceBaseUri}/staffs`;
        const body = JSON.stringify([{
            op: 'replace', path: '/AvatarBase64', value: staff.avatar
        }]);
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${this.token}`
        });
        const options = new RequestOptions({ headers: headers });

        return this.http.patch(url, body, options)
            .toPromise()
            .catch(err => {
                switch (err.status) {
                    case 401:
                        throw Error('Insufficient privilege, please check the permission.');
                }
            });
    }

    /**
     * Changes the password for the current staff.
     *
     * @param {string} oldPassword The original password.
     * @param {string} newPassword The new password.
     * @returns {Promise<any>} The password changing result.
     * @memberof StaffService
     */
    changePassword(oldPassword: string, newPassword: string): Promise<any> {
        const url = `${environment.serviceBaseUri}/staffs/pwd/change`;
        const body = JSON.stringify({ oldPassword, newPassword });
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${this.token}`
        });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .toPromise()
            .then(response => {
                if (response.status === 204) {
                    // Login again to refresh the token.
                    this.login(this.userName, newPassword);
                }
            })
            .catch(err => {
                switch (err.status) {
                    case 401:
                        throw Error('The original password is incorrect.');
                }
            });
    }
}
