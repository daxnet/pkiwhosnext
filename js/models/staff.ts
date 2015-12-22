
module WhosNextApplication {
    'use strict';
    export class Staff {
        
        constructor(public id: number, public name: string, public file: string){
            
        }
        
        // Initialize the Staff repository.
        public static init = () => {
            return [new Staff(1, "Brian An", "images/Brian An.jpg"),
                    new Staff(2, "Cheng-cheng", "images/Cheng-cheng.jpg"),
                    new Staff(3, "Frank Zhou", "images/Frank Zhou.jpg"),
                    new Staff(4, "Jamie Tao", "images/Jamie Tao.jpg"),
                    new Staff(5, "Jason Yan", "images/Jason Yan.jpg"),
                    new Staff(6, "Jeff Chen", "images/Jeff Chen.jpg"),
                    new Staff(7, "Jenkin Zhang", "images/Jenkin Zhang.jpg"),
                    new Staff(8, "Jill Ye", "images/Jill Ye.jpg"),
                    new Staff(9, "Leon Qin", "images/Leon Qin.jpg"),
                    new Staff(10, "Ralf Wang", "images/Ralf Wang.jpg"),
                    new Staff(11, "Seven Jin", "images/Seven Jin.jpg"),
                    new Staff(12, "Sunny Chen", "images/Sunny Chen.jpg"),
                    new Staff(13, "Sunny Sun", "images/Sunny Sun.jpg"),
                    new Staff(14, "Tim Liang", "images/Tim Liang.jpg"),
                    new Staff(15, "Wilson Tian", "images/Wilson Tian.jpg"),
                    new Staff(16, "Zoe Zhao", "images/Zoe Zhao.jpg")];
        }
    }
}