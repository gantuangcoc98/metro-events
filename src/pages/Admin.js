import { useEffect, useState } from "react"
import { approveRequest, denyRequest } from "../custom_components/Functions";

export const Admin = () => {
    const [requests, setRequests] = useState([]);
    
    useEffect(
        () => {
            const _requests = JSON.parse(window.localStorage.getItem('organizer_requests')) || [];
            setRequests(_requests);
        }, []
    )
    
    const handleOnClick = (state, userId) => {
        switch (state) {
            case 'Approve':
                console.log('Approving request for user ' + userId + "...");
                approveRequest(userId);
                break;
            case 'Deny':
                console.log('Denying request for user ' + userId + "...");
                denyRequest(userId);
                break;
            default:
                break;
        }
    }

    return (
        <div className="flex bg-darker-dirty-white h-screen items-center justify-center">
            <div className="flex flex-col h-full w-[90%] mt-[50px] gap-[20px]">
                <h2 className="text-[30px] ml-[20px]">Manage Requests</h2>
                <ul className="flex flex-col border-2 border-black rounded-[12px]">
                    {requests.map(
                        (item, index) => {
                            return(
                                <li key={index} className="flex justify-between items-center pr-[20px] pl-[20px] pt-[10px] pb-[10px] hover:bg-dirty-white hover:rounded-[12px] text-[18px]">
                                    <div>
                                        <span>{item.lastname}, </span>
                                        <span className="border-r-2 border-dark-green pr-[10px]">{item.firstname}</span>
                                        <span className="pl-[10px]">{item.username}</span>
                                    </div>

                                    <div>
                                        <button className="bg-lighter-green text-[16px] p-[5px] hover:bg-dark-green hover:text-white"
                                            onClick={()=>{handleOnClick('Approve', item.userId)}}>
                                            Approve
                                        </button>
                                        <button className="bg-light-brown text-[16px] p-[5px] hover:bg-lighter-brown"
                                            onClick={()=>{handleOnClick('Deny', item.userId)}}>
                                            Deny
                                        </button>
                                    </div>
                                    
                                </li>
                            )
                        }
                    )}
                    
                </ul>
            </div>
        </div>
    )
}