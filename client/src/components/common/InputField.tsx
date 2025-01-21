import { Eye, EyeClosed } from "lucide-react";


interface InputFieldProps{
    value:string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder:string;
    error:string | undefined;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type:string;
    onToggleViewPass:(() => void) | null;
    showPasswordToggle: string | null;
    isPasswordVisible: boolean | undefined;
}

const InputField = ({ value, onChange, placeholder, error, icon: Icon, type ,onToggleViewPass, showPasswordToggle ,  isPasswordVisible  }:InputFieldProps) => (
  <div className="space-y-1">
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border ${
          error ? 'border-red-500' : 'border-gray-800'
        }`}
      />

{showPasswordToggle && (
        <button
          type="button"
          onClick={onToggleViewPass ? onToggleViewPass : ()=>{}}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
        >
          {isPasswordVisible ? <Eye /> : <EyeClosed />}
        </button>
      )}
    </div>
    {error && <div className="text-red-500 text-sm px-2">{error}</div>}
  </div>
);

export default InputField;
