import { Outlet } from "react-router-dom"



export const OngPage = () => {
    const navbarPlaceholder = "aqui-é-a-barra-de-navegação"

    return (
        <div className="flex w-full bg-slate-50 h-screen">
            <div role="navigation" className="flex flex-col justify-center items-center h-screen bg-white w-[100px] border-1 border-slate-200">
                {navbarPlaceholder.split('').map((t)=>(
                    <div>{t}</div>
                ))}
            </div>

            <div className="w-full rounded rounded-md">
                <Outlet/>
            </div>
            
        </div>
    )    
}