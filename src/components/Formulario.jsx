import { useNavigate } from "react-router-dom";
import { Formik, Form, Field} from "formik";
import * as Yup from 'yup';
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate();

    const nuevoClienteEsquema = Yup.object().shape({
        nombre: Yup.string()
                    .min(4, 'El nombre es muy corto')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('Email no valido')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .positive('Número no válido')
                    .integer('Número no válido')
                    .typeError('El número no es válido'),
    });

    const handleSubmit = async valores=>{
        try {
            let respuesta;

            if(cliente.id){
                //Editando
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            else{
                //Nuevo registro
                const url = import.meta.env.VITE_API_URL;
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            await respuesta.json();
            navigate('/clientes');
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        
        cargando ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto" >
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                {cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? '',
                }}
                onSubmit={ async (valores, {resetForm}) => {
                    await handleSubmit(valores)
                    resetForm();
                    navigate('/clientes');
                }}
                enableReinitialize={true}
                validationSchema={nuevoClienteEsquema}
            >

            {({errors, touched})=>{
                
                return (

                    <Form className="mt-10">
                        <div className="mb-4">
                            <label 
                                htmlFor="nombre"
                                className="text-cyan-700 font-bold"
                            >
                                Nombre:
                            </label>
                            <Field
                                id="nombre"
                                type='text'
                                className='mt-2 w-full p-3 bg-gray-50'
                                placeholder="Nombre del Cliente"
                                name="nombre"
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null}
                        </div>
                        
                        <div className="mb-4">
                            <label 
                                htmlFor="empresa"
                                className="text-cyan-700 font-bold"
                            >
                                Empresa:
                            </label>
                            <Field
                                id="empresa"
                                type='text'
                                className='mt-2 w-full p-3 bg-gray-50'
                                placeholder="Empresa del Cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ) : null}
                        </div>
                        
                        <div className="mb-4">
                            <label 
                                htmlFor="email"
                                className="text-cyan-700 font-bold"
                            >
                                E-mail:
                            </label>
                            <Field
                                id="email"
                                type='Email'
                                className='mt-2 w-full p-3 bg-gray-50'
                                placeholder="Email del Cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ) : null}
                        </div>
                        
                        <div className="mb-4">
                            <label 
                                htmlFor="telefono"
                                className="text-cyan-700 font-bold"
                            >
                                Teléfono:
                            </label>
                            <Field
                                id="telefono"
                                type='tel'
                                className='mt-2 w-full p-3 bg-gray-50'
                                placeholder="Teléfono del Cliente"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null}
                        </div>
                        
                        <div className="mb-4">
                            <label 
                                htmlFor="notas"
                                className="text-cyan-700 font-bold"
                            >
                                Notas:
                            </label>
                            <Field
                                as="textarea"
                                id="notas"
                                type='text'
                                className='mt-2 w-full p-3 bg-gray-50 h-40'
                                placeholder="Notas del Cliente"
                                name="notas"
                            />
                        </div>

                        <input 
                            type="submit" 
                            value={cliente.nombre ? 'Editar Cliente' : 'Agregar Cliente'} 
                            className="mt-5 w-full bg-cyan-700 p-3 text-white uppercase font-bold text-lg cursor-pointer hover:bg-cyan-800 transition-all"
                        />
                    </Form>
                )
            }}
            </Formik>
        </div>
    ))
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario