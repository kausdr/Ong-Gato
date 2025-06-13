interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}

export default function ToggleSwitch({ checked, onChange, disabled }: ToggleSwitchProps) {

    const buttonClasses = `relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        disabled ? 'bg-gray-300 cursor-not-allowed' : (checked ? 'bg-blue-900' : 'bg-gray-300')
    }`;

    const spanClasses = `inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
        checked ? 'translate-x-6' : 'translate-x-1'
    }`;

    return (
        <button
            type="button"
            onClick={onChange}
            disabled={disabled}
            className={buttonClasses}
        >
            <span className={spanClasses} />
        </button>
    );
}
