'use client'

import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function ReactHookFormBasicExample() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data)

  console.log(watch('example')) // watch input value by passing the name of it

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Form Example
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <input
            defaultValue="test"
            {...register('example')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        <div>
          <input
            {...register('exampleRequired', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Required Field"
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && (
            <span className="text-sm text-red-500 mt-1">
              This field is required
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
