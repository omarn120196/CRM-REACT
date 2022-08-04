import {Outlet, Link, useLocation} from 'react-router-dom';

const Layout = () => {

    const location = useLocation();
    const urlActual = location.pathname;

    return (
        <div 
            className='md:flex md:min-h-screen'
        >
            <div
                className='md:w-1/4 bg-cyan-900 px-5 py-10'
            >
                <h2
                    className='text-4xl font-black text-center text-white'
                >
                    CRM - Clientes
                </h2>

                <nav className="mt-10">
                    <Link 
                        to="/clientes"
                        className={`${urlActual === '/clientes' ? 'text-cyan-400' : 'text-white'} text-2xl block mt-2 hover:text-cyan-400`}
                    >
                        Clientes
                    </Link>
                    
                    <Link 
                        to="/clientes/nuevo"
                        className={`${urlActual === '/clientes/nuevo' ? 'text-cyan-400' : 'text-white'} text-2xl block mt-2 hover:text-cyan-400`}
                    >
                        Nuevo Cliente
                    </Link>
                </nav>
            </div>
        
            <div
                className='md:w-3/4 p-10 bg-slate-100 md:h-screen overflow-y-scroll'
            >
                <Outlet/>
            </div>

            
        </div>
    )
}

export default Layout