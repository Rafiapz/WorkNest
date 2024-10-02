import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { taskSchema } from "../schema/taskSchema";

const TaskForm = () => {
   const initialValues = {
      taskName: "",
      assignTo: "",
      description: "",
   };
   const [searchTerm, setSearchTerm] = useState("");
   const employees = [
      { id: "emp1", name: "John Doe" },
      { id: "emp2", name: "Jane Smith" },
      { id: "emp3", name: "Alice Johnson" },
      { id: "emp4", name: "Michael Brown" },
      { id: "emp5", name: "Sara Wilson" },
      { id: "emp6", name: "David Clark" },
      // Add more employees as needed
   ];

   const filteredEmployees = employees.filter((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase()));

   const handleSubmit = () => {};
   return (
      <Formik initialValues={initialValues} validationSchema={taskSchema} onSubmit={handleSubmit}>
         <Form className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* First Column */}
               <div>
                  <div className="mb-4">
                     <label className="block text-gray-700">Task Name:</label>
                     <Field
                        name="taskName"
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Task Name"
                     />
                     <ErrorMessage name="taskName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="mb-4">
                     <label className="block text-gray-700">Description:</label>
                     <Field
                        as="textarea"
                        name="description"
                        className="w-full px-3 py-2 mt-1 h-40 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Task Description"
                     />
                     <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>
               </div>

               {/* Second Column */}
               <div>
                  <div className="mb-4">
                     <label className="block text-gray-700">Search Employee:</label>
                     <input
                        type="text"
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>

                  {/* Scrollable Assign To Field */}
                  <div className="mb-4">
                     <label className="block text-gray-700">Assign To:</label>
                     <div className="h-40 overflow-y-auto border border-gray-300 rounded p-2">
                        {filteredEmployees.length > 0 ? (
                           filteredEmployees.map((employee) => (
                              <div key={employee.id} className="flex items-center mb-2">
                                 <Field type="checkbox" name="assignTo" value={employee.name} className="mr-2" />
                                 <label className="text-gray-700">{employee.name}</label>
                              </div>
                           ))
                        ) : (
                           <p className="text-gray-500">No employees found</p>
                        )}
                     </div>
                     <ErrorMessage name="assignTo" component="div" className="text-red-500 text-sm" />
                  </div>
               </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-3">
               Submit
            </button>
         </Form>
      </Formik>
   );
};

export default TaskForm;
