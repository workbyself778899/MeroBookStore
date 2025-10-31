import { Link } from "react-router-dom"

const Hero = () => {

  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">

      <div className="w-full pl-2 mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-center lg:text-left">Discover Your Next Great Book</h1>
        <p className="mt-4 text-xl text-zinc-500 text-center lg:text-left">Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.</p>
        <div className="mt-8">
          <Link to="/all-books" className=" shadow-2xl bg-green-700 hover:bg-green-600 border-2  rounded-lg py-1 px-4 text-white text-xl lg:text-2xl font-semibold ">Discover Books</Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img src="./hero.png" alt="Buy Now" />
      </div>
    </div>
  )
}
export default Hero