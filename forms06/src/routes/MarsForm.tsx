//import { useRef } from 'react';
//import * as yup from 'yup';
import { useForm } from 'react-hook-form';

/*const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required().positive().integer(),
});*/





  export function MarsForm () {
   const { register, handleSubmit, formState: { errors } } = useForm();
  
   const onSubmit = (data: unknown) => {
     console.log(data);
   };
  
   return (
    <div className='mars'>
     <form onSubmit={handleSubmit(onSubmit)} className="mars-form">
       <input {...register("firstName", { required: true })} placeholder="First Name" />
       {errors.firstName && <p>First Name is required</p>}
  
       <input {...register("lastName", { required: true })} placeholder="Last Name" />
       {errors.lastName && <p>Last Name is required</p>}
  
       <input {...register("age", { required: true, valueAsNumber: true })} placeholder="Age" />
       {errors.age && <p>Age is required</p>}
  
       <input type="submit" />
     </form>
     </div>
   );
  }
