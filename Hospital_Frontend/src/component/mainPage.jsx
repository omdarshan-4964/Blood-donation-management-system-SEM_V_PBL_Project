import { NavLink } from "react-router-dom";

const MainPage = () => {

  const userRole = localStorage.getItem('role')
  console.log(userRole);
  


  
  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-600 min-h-screen flex flex-col items-center justify-center text-center">
      <header className="w-full">
        <nav className="flex justify-end px-8 py-4">
          <ul className="flex gap-8 text-white text-lg font-medium">
          {
            userRole === 'Admin' &&  <NavLink>
            <a href="/adminHome" className="hover:underline">Login</a>
            </NavLink>
          }
           {
            userRole === 'Donor' &&  <NavLink>
            <a href="/donorDashboard" className="hover:underline">HOME</a>
            </NavLink>
          }
          
            <li><a href="about.html" target="_blank" className="hover:underline">ABOUT</a></li>
            <li><a href="contact.html" className="hover:underline">CONTACT</a></li>
            <li><a href="services.html" className="hover:underline">SERVICE</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-extrabold mb-8">
          <span className="text-red-600 animate-pulse">Don&apos;t be &quot;A negative&quot;</span>
          <br />
          <span className="text-green-500 underline decoration-wavy decoration-yellow-400">
            Be &quot;O positive&quot;
          </span>
        </h1>

        <div className="max-w-3xl text-lg leading-relaxed space-y-4">
          <p>
            Donating blood is one of the simplest yet most powerful ways to make a difference. 
            With just a small act of kindness, you can save lives and give hope to those in need.
          </p>
          <p>
            Each blood donation has the potential to help up to three patients, 
            making it an incredibly impactful contribution. Blood cannot be manufactured, 
            and donors like you are the lifeline for those facing surgery, illness, or trauma. 
            By donating, you become a hero in someone&apos;s story, offering them a second chance at life.
          </p>
        </div>

        <h3 className="text-2xl font-semibold mt-6 text-pink-400">
          Give the gift of life—<span className="text-yellow-300">donate blood today.</span>
        </h3>

        <a
          href="more-info.html"
          className="mt-8 inline-block bg-yellow-300 text-black px-6 py-2 rounded-full shadow-lg hover:bg-yellow-400 transition transform hover:scale-105"
        >
          Visit Us To Know More
        </a>
      </main>
    </div>
  );
};

export default MainPage;
