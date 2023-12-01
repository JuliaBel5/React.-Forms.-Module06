
import { useForm } from 'react-hook-form';

export function MoonForm() {
 const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = (data: unknown) => {
   console.log(data);
 };

 return (
  <div className="moon">
   <form onSubmit={handleSubmit(onSubmit)} className="moon-form">
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

export default MoonForm;