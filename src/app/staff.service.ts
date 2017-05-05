import {Injectable} from '@angular/core';
import {Staff} from './staff';

@Injectable()
export class StaffService {
    getStaffs(): Staff[] {
        return STAFFS;
    }
}

const STAFFS: Staff[] = [
    { id: 1, name: "Brian An", name_cn: "安泽胜", avatar: "images/Brian An.jpg"},
    { id: 2, name: "Cheng-cheng", name_cn: "陈成成", avatar: "images/Cheng-cheng.jpg" },
    { id: 3,  name: "Frank Zhou", name_cn: "周洋鸥", avatar: "images/Frank Zhou.jpg"},
    { id: 4,  name: "Jamie Tao", name_cn: "陶进强", avatar: "images/Jamie Tao.jpg"},
    { id: 5,  name: "Jill Ye", name_cn: "叶诚忆", avatar: "images/Jill Ye.jpg"},
    { id: 6,  name: "Leon Qin", name_cn: "秦岭", avatar: "images/Leon Qin.jpg"},
    { id: 7, name:  "Seven Jin", name_cn: "金秋亮", avatar: "images/Seven Jin.jpg"},
    { id: 8, name:  "Sunny Chen", name_cn: "陈晴阳", avatar: "images/Sunny Chen.jpg"},
    { id: 9, name:  "Sunny Sun", name_cn: "孙远", avatar: "images/Sunny Sun.jpg"},
    { id: 10, name:  "Tim Liang", name_cn: "梁永新", avatar: "images/Tim Liang.jpg"},
    { id: 11, name:  "Wilson Tian", name_cn: "田华伟", avatar: "images/Wilson Tian.jpg"},
    { id: 12, name:  "Boris Liu", name_cn: "刘雪喆", avatar: "images/Boris Liu.jpg"},
    { id: 13, name:  "Wu Zhang-Lin", name_cn: "武章林", avatar: "images/ZhangLin_Wu.jpg"},
    { id: 14, name:  "Doris Ni", name_cn: "倪雨婷", avatar: "images/Doris Ni.jpg"}
];

export const EmptyStaff: Staff = { id: -1, name: "", name_cn: "", avatar: "images/_none.jpg"}