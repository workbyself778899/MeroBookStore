
const Footer = () => {
  return (
    <footer className="bg-[#F85606] text-white px-6 py-8 ">
      <div className="my-3 flex items-center gap-2 mb-5">
        <img src="https://cdn-icons-png.flaticon.com/128/17174/17174470.png" className="h-10 bg-amber-50 p-1 rounded-2xl " alt="" />
        <p className="text-xl font-bold">MERO BOOKSTORE</p> </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* project name  */}
        <div className="pl-4">
          <h2 className="text-xl font-semibold"> Developed By </h2>
          <ul className="list-disc ">
            <li className="">Rohit Prashad Pandeya </li>
            <li>Siddhartha Joshi </li>
            <li>Ayush Giri </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold">CONTACT</h2>
          <p className="text-sm mt-2">Email : yourbookstore799@gmail.com</p>
          <p className="text-sm">Phone : +977-9887898767</p>
        </div>

        {/* Payments */}
        <div>
          <h2 className="text-lg font-semibold">PAYMENT METHOD</h2>

          <ul className="list-disc">
            <li>Cash On Delivery</li>
          </ul>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-[15px] border-gray-700 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Online book store application. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
