
export const Landing = () => {
    return <div className="mt-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
                <img src={"/chessboard.jpeg"} />
            </div>
        </div>
    </div>
}
// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Landing: React.FC = () => {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <h1 className="text-4xl font-bold mb-6">Welcome to Chess App</h1>
//             <p className="text-xl mb-8">Challenge your friends or play against random opponents!</p>
//             <Link 
//                 to="/game" 
//                 className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
//             >
//                 Start a New Game
//             </Link>
//         </div>
//     );
// };
