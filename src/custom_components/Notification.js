import { NotificationData } from "./SampleNotificationData"
import '../App.css';

export const Notification = () => {

    const handleOnClick = (item) => {
        console.log(item);
    }

    return (
        <div className="notification">
            <ul className="flex flex-col h-full w-[300px] gap-2 overflow-y-scroll">
                {NotificationData.map(
                    (item, index) => {
                        return (
                            <li key={index} className='flex flex-col text-dark-green w-full p-[10px] border-b-2 border-dark-green hover:cursor-pointer hover:bg-darker-dirty-white'
                                onClick={()=>{handleOnClick(item)}}>
                                <div className="flex items-center gap-2">
                                    <span className="text-[30px]">{item.icon}</span>
                                    <div className="flex flex-col">
                                        <span>{item.title}</span>
                                        <span className="text-[12px]">{item.description}</span>
                                    </div>
                                </div>
                                <div className="flex w-full justify-end mt-[10px]">{item.date}</div>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>
    )
}