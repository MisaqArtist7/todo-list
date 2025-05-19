import React, { useEffect, useState } from 'react';

const App: React.FC = () => {

  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleRightClick);
    return () => {
      window.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);
  
  interface Todo {
    id: number;
    title: string;
    isComplete: boolean;
  }

  const [inputValue, setInputValue] = useState<string>("");   
  const [todos, setTodos] = useState<Todo[]>([]);            

  // 3) هندلرِ تغییرِ input
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 4) هندلرِ ارسال فرم
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = inputValue.trim();
    if (trimmed === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmed,
      isComplete: false, 
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue("");
  };

  const removeItem = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

   
  return (
    <>
      <header className="flex-row-center bg-sky-600 h-20 text-white">
        <h1 className="text-3xl font-semibold">Todo App</h1>
      </header>

      <div className='flex-row-center mt-11 mb-7'>
        <form action="" onSubmit={submitHandler} className='w-[44%] bg-white flex-col-center p-5 rounded shadow gap-3'>
          <input onChange={inputHandler} value={inputValue}
          type="text" placeholder='Enter title' className='outline-none border border-gray-300 py-1 px-2 rounded-xs'/>
          <button className='flex items-center gap-x-1 bg-sky-600 px-5 text-lg rounded-xs hover:bg-sky-500 text-white cursor-pointer'>
            Add todo
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </form>
      </div>

      <div className='flex-row-center'>
        <div className={`w-[44%] flex-col-center p-5 rounded ${todos.length > 0 ? 'bg-white shadow' : ''} gap-3`}>
          {/* todo list */}
          {todos.map((todo) => (
          <div className='flex items-center justify-between border-b border-b-gray-300 w-full p-1 rounded-xs'>
            <h2 className='text-lg'>{todo.title}</h2>
            <div className='flex items-center gap-x-2 *:cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-sky-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              <svg onClick={() => removeItem(todo.id)}
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
