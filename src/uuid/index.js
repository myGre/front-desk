// 引入uuid游客ID
import { v4 as uuidv4 } from 'uuid';
// 封装一个获取随机游客ID，只获取一次
export const uuid = () => {
    // 本地存储
    let id = localStorage.getItem('UUID')
    // 如果没有存在，则随机生成一个
    if (!id) {
        localStorage.setItem('UUID', uuidv4())
    }
    return id
}
