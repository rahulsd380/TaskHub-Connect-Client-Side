

const AppDownloadBanner = () => {
    return (
        <div className="max-w-7xl mx-auto py-10">
            
    <section className="flex min-h-[700px]  w-full items-center justify-center bg-gray-800 px-8 rounded-xl">
    <div className="flex w-full max-w-6xl gap-10 lg:flex-row flex-col items-center justify-between">
      <div className="max-w-md md:space-y-6 sm:space-y-5 space-y-4">
        <h1 className="lg:text-4xl sm:text-4xl text-3xl font-bold leading-tight text-white">Unlock Productivity: Download TaskHub Connect Now!</h1>
        <p className="lg:text-lg sm:text-base text-sm text-gray-300">
        Effortless task management in the palm of your hand! Download our app for a seamless productivity experience anytime, anywhere. Get started now!
        </p>
        <div className="flex space-x-4">
          <button className="inline-flex flex-nowrap items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal-700 h-10 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            Get Started
          </button>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-teal-600 hover:text-white h-10 px-4 py-2 bg-transparent text-teal-600">
            Learn More
          </button>
        </div>
        <p className="text-sm text-gray-500">Trusted by 5000+ Users</p>
      </div>
      <div className="relative">  
        <img src="https://i.ibb.co/5BCzkng/original-d0cf648243f5313b943606f73663ae34.png"  className="relative md:h-[600px]  sm:h-[500px] h-[300px]   w-[500px] bg-gray-400 rounded-b-full object-cover"  />
      </div>
    </div>
  </section>       
    
        </div>
    );
};

export default AppDownloadBanner;