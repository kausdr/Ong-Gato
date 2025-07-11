interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    iconOn?: React.ReactNode;
    iconOff?: React.ReactNode;
    hasIcon?: boolean;
}

export default function ToggleSwitch({ checked, onChange, disabled, iconOn, iconOff, hasIcon = false }: ToggleSwitchProps) {

    const buttonClasses = `relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${disabled ? 'bg-gray-300 cursor-not-allowed' : (`cursor-pointer ${checked  ? 'bg-blue-900' : 'bg-gray-300'}`)
        }`;

    const spanClasses = `inline-block h-4 w-4 transform rounded-full ${hasIcon ? "": "bg-white"}  transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'
        }`;

    return (
        <button
            type="button"
            onClick={onChange}
            disabled={disabled}
            className={buttonClasses}
        >
            <span className={spanClasses}>
                {checked ? iconOn : iconOff}
            </span>
        </button>
    );
}
