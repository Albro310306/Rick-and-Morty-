import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const searchSchema = z.object({
  search: z.string().optional(),
});

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get('name') || '';

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: currentSearch
    }
  });

  const onSubmit = (data) => {
    if (data.search) {
      setSearchParams({ name: data.search });
    } else {
      setSearchParams({});
    }
  };

  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-white hover:text-orange-400 transition-colors">
          Rick & Morty
        </Link>
        
        <form onSubmit={handleSubmit(onSubmit)} className="relative w-full max-w-md ml-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar personaje..." 
              {...register('search')}
              className="w-full bg-gray-700 text-white border-2 border-transparent focus:border-orange-500 rounded-full py-2 pl-10 pr-4 outline-none transition-all"
            />
            <button type="submit" className="absolute right-2 bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 px-3 rounded-full transition-colors font-medium">
              Buscar
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
