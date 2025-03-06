import React from 'react';
import useMeals from '../Hooks/useMeals';
import { FaComment, FaHeart, FaThumbsUp } from "react-icons/fa6";
import { BsEmojiDizzyFill, BsFillEmojiHeartEyesFill } from 'react-icons/bs';
import Loading from '../components/Loading';
const Home = () => {
    const { meals, isLoading } = useMeals();
    if(isLoading) {
        return <Loading></Loading>
    }
    if(!meals) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className=' text-red-600'>THis is home {meals.length}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {meals.map((meal) => (
                    <div key={meal._id} className="card shadow-lg p-4">
                        <img
                            src={meal.image}
                            alt={meal.title}
                            className="w-full h-48 object-cover mb-4 rounded"
                        />
                        <div className='my-4 flex justify-between'>
                            <div className='flex items-center justify-center gap-2 '>
                                <FaThumbsUp className='text-2xl text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-150 hover:-translate-y-2' />
                                <FaHeart className='text-2xl text-red-600 hover:text-red-800 transition-all duration-200 hover:scale-150 hover:-translate-y-2' />
                                <BsFillEmojiHeartEyesFill className='text-2xl text-yellow-300 hover:text-yellow-500 transition-all duration-200 hover:scale-150 hover:-translate-y-2' />
                                <h1 className='text-2xl'>{meal.likes}</h1>
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <FaComment className='text-2xl text-gray-400' />
                                <h1 className='text-2xl'>{meal.reviews_count}</h1>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold">{meal.title}</h3>
                        <p className="text-sm text-gray-600">{meal.description}</p>
                        <p className="mt-2">Price: ${meal.price}</p>
                        <p className="text-sm text-gray-500">Category: {meal.category}</p>
                        {/* {console.log("Middle id", meal._id)} */}
                        <button>View details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;