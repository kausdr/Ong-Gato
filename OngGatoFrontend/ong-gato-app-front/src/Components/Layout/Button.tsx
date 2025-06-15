import React from 'react';

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    order?: 'primary' | 'secondary' | 'nav' | 'inactive' | 'cancel' | 'active' | 'quit' | 'danger';
    isLoading?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

function Button({ children, order = 'primary', icon, isLoading = false, ...props }: ButtonProps) {

    const buttonClass
        = order == "primary" ? "text-white font-semibold bg-[#28538f] hover:bg-[#214475]"
            : order == "secondary" ? "border-1 bg-hoverSecondary"
                : order == "nav" ? "rounded-md font-semibold text-white hover:bg-[#3873C7]"
                    : order == "inactive" ? "dark inactive-button pointer-events-none"
                        : order == "cancel" ? "bg-yellow-400 font-semibold text-slate-700 hover:bg-yellow-500"
                            : order == "active" ? "bg-active border-1 border-sky-500 text-sky-700 hover:bg-slate-100"
                                : order == "quit" ? "bg-red-700 hover:bg-red-800 text-white"
                                    : order == "danger" ? "bg-red-700 hover:bg-red-800 text-white"
                                        : ""

    const isDisabled = isLoading || props.disabled;

    return (
        <button
            {...props}
            className={`button inline-flex justify-center items-center gap-2 rounded py-2 px-4 font-sans transition-colors duration-200 ${buttonClass} ${props.className || ''} ${isDisabled ? 'dark inactive-button cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
            disabled={isDisabled}
        >
            {isLoading ? (
                <>
                    <Spinner />
                    <span>Carregando...</span>
                </>
            ) : (
                <>
                    {order == "nav" ? (
                        <>
                            <div className="block lg:hidden">
                                {icon}
                            </div>
                            <div className="hidden lg:block">
                                {children}
                            </div>
                        </>
                    ) : (
                        <>
                            {icon && icon}
                            {children}
                        </>
                    )}
                </>
            )}
        </button>
    );
}

export default Button