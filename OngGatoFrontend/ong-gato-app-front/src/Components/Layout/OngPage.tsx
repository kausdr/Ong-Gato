import { Outlet } from "react-router-dom"



export const OngPage = () => {
    return (
        <div className="flex w-full bg-slate-50 h-screen">
            <div role="navigation" className="h-screen bg-white w-[100px] border-1 border-slate-200">
            </div>

            <div className="w-full rounded rounded-md">
                <Outlet/>
            </div>
            
        </div>
    )    
}