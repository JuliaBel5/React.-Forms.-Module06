//import { useRef } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export interface MarsForm {
  
  firstName: string;
  lastName: string;
  age: number;
  
 } 


 const schema = yup.object().shape({
  firstName: yup.string().required().matches(/^[A-Z]/, 'First letter should be capitalized'),
  lastName: yup.string().required().matches(/^[A-Z]/, 'First letter should be capitalized'),
  age: yup.number().required().positive().integer(),
});





  export function MarsForm () {
    const { register, handleSubmit, formState: { errors }} = useForm<MarsForm>({ resolver: yupResolver(schema) });
  
   const onSubmit = (data: unknown) => {
     console.log(data);
   };
  
   return (
    <div className='mars'>
     <form onSubmit={handleSubmit(onSubmit)} className="mars-form">
       <input {...register("firstName", { required: true })} placeholder="First Name" />
       {errors.firstName && <p> First Name is required</p>}
  
       <input {...register("lastName", { required: true })} placeholder="Last Name" />
       {errors.lastName && <p> Last Name is required</p>}
  
       <input {...register("age", { required: true, valueAsNumber: true })} placeholder="Age" />
       {errors.age && <p> Age is required</p>}
  
       <input type="submit" />
     </form>
     </div>
   );
  }
