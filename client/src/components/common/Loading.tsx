import loadinfLogo from '../../../public/images/logo.webp'

const Loading = () => {
  return (
    <div className="bg-slate-900  flex justify-center items-center min-h-screen">
        <div className='animate-ping'>
        <img src={loadinfLogo} alt="logo" className='w-32 h-32 animate-pulse'/>
        </div>
        
    </div>
  )
}

export default Loading