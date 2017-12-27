import {Injectable} from '@angular/core';
import {Staff} from './staff';

@Injectable()
export class StaffService {
    getStaffs(): Staff[] {
        // tslint:disable-next-line:no-use-before-declare
        return STAFFS;
    }
}

const STAFFS: Staff[] = [
    { id: 1, name: 'Brian An', name_cn: '安泽胜', avatar: 'images/Brian An.jpg'},
    { id: 2, name: 'Cheng-cheng', name_cn: '陈成成', avatar: 'images/Cheng-cheng.jpg' },
    { id: 3,  name: 'Frank Zhou', name_cn: '周洋鸥', avatar: 'images/Frank Zhou.jpg'},
    { id: 4,  name: 'Jamie Tao', name_cn: '陶进强', avatar: 'images/Jamie Tao.jpg'},
    { id: 5,  name: 'Jill Ye', name_cn: '叶诚忆', avatar: 'images/Jill Ye.jpg'},
    { id: 6,  name: 'Leon Qin', name_cn: '秦岭', avatar: 'images/Leon Qin.jpg'},
    { id: 7, name:  'Seven Jin', name_cn: '金秋亮', avatar: 'images/Seven Jin.jpg'},
    { id: 8, name:  'Sunny Chen', name_cn: '陈晴阳', avatar: 'images/Sunny Chen.jpg'},
    { id: 9, name:  'Sunny Sun', name_cn: '孙远', avatar: 'images/Sunny Sun.jpg'},
    { id: 10, name:  'Tim Liang', name_cn: '梁永新', avatar: 'images/Tim Liang.jpg'},
    { id: 11, name:  'Wilson Tian', name_cn: '田华伟', avatar: 'images/Wilson Tian.jpg'},
    { id: 12, name:  'Boris Liu', name_cn: '刘雪喆', avatar: 'images/Boris Liu.jpg'},
    { id: 13, name:  'Wu Zhang-Lin', name_cn: '伍章林', avatar: 'images/ZhangLin_Wu.jpg'},
    { id: 14, name:  'Doris Ni', name_cn: '倪雨婷', avatar: 'images/Doris Ni.jpg'},
    { id: 15, name: 'Susan Wang', name_cn: '王淑媛', avatar: 'images/SusanWang.jpg'},
    { id: 16, name: 'Zhang Qian', name_cn: '张倩', avatar: 'images/ZHANGQ.jpg'},
    { id: 17, name: 'Gao Xing', name_cn: '高星', avatar: 'images/XingGao.jpg'},
    { id: 18, name: 'Jimmy Zhu', name_cn: '朱明州', avatar: 'images/Jimmy.jpg'},
    { id: 19, name: 'Shirley Guo', name_cn: '郭银', avatar: 'images/ShirleyGuo.jpg'}
];

export const EmptyStaff: Staff = { id: -1, name: '', name_cn: '', avatar: 'images/_none.jpg'}
